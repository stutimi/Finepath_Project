const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // To store user data in a file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from the "public" folder

// Sample expense data
let expenses = [
    { id: 1, name: 'Gas', amount: 45.90, date: '2024-10-01' },
    { id: 2, name: 'Groceries', amount: 150.25, date: '2024-10-02' },
];

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Ensure this points to your HTML file
});

// Get all expenses
app.get('/expenses', (req, res) => {
    res.json(expenses);
});

// Add a new expense
app.post('/expenses', (req, res) => {
    const newExpense = {
        id: expenses.length + 1,
        name: req.body.name,
        amount: req.body.amount,
        date: new Date().toISOString().split('T')[0],
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

// Handle user form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;

    // Store the data (you can also save it to a database)
    const userData = `Name: ${name}, Phone: ${phone}\n`;
    fs.appendFile('users.txt', userData, (err) => {
        if (err) throw err;
        console.log('User data saved!');
        res.send('Thank you for signing up!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
