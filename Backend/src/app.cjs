const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cookieParser());
// TODO: change the frontend origin
app.use(
  cors({
    origin: "http://localhost:3000", // EXACT frontend origin
    credentials: true,               // ALLOW cookies
  })
);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


// Routes
const authRoutes = require('./routes/auth.cjs');
const expensesRoutes = require('./routes/expenses.cjs');
const roommatesRoutes = require('./routes/roommate.cjs');
const groupRoutes = require('./routes/group.cjs');
const billRoutes = require('./routes/bill.cjs');
const taskRoutes = require('./routes/task.cjs');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/user', roommatesRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/tasks', taskRoutes);

// Basic route to check if the API is running
app.get('/', (req, res) => {
  res.send('RoomieManager API is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
