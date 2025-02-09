require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Define Product Schema
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
}), 'items'); // Collection: 'items' in MongoDB

// Home Route - Fetch products and render index.ejs
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// Add Product
app.post('/add', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        await Product.create({ name, price, quantity });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// Update Product
app.put('/update/:id', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, price, quantity });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Error updating product');
    }
});

// Delete Product
app.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
});

// Checkout Route
app.post('/checkout', async (req, res) => {
    try {
        const products = await Product.find();

        // Convert products to Stripe line_items format
        const line_items = products.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`
        });

        res.redirect(session.url);
    } catch (error) {
        console.error('❌ Checkout Error:', error);
        res.status(500).send('Error creating checkout session');
    }
});

// Success & Cancel Routes
app.get('/success', (req, res) => res.render('success'));
app.get('/cancel', (req, res) => res.render('cancel'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
