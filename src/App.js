const express = require('express');
const app = express();

// Handle root URL
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Handle /hello URL
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// Handle /lab5 URL
app.get('/lab5', (req, res) => {
    res.send('Welcome to Lab5!');
});

// Start the server
app.listen(process.env.PORT || 4000)
