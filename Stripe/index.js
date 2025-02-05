require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/checkout',  async (req,res)=>{
    const session = await stripe.checkout.sessions.create({

        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Apple'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            },
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Bread'
                    },
                    unit_amount: 20 * 100
                },
                quantity: 2
            }            
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })
    res.redirect(session.url)

    app.get('/success', async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
            res.render('success', { sessionId: session.id });
        } catch (error) {
            console.error('Error retrieving session:', error);
            res.status(500).send('Error fetching payment details');
        }
    });
    
    
    app.get('/canceled', (req, res) => {
        res.render('cancel');
    });
    
})

app.listen(3000, () => console.log('Server started on port 3000'))