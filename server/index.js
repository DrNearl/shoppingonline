require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const admin = require('./api/admin');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', admin);

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server' });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

// apis admin
app.use('/api/admin', require('./api/admin.js'));

// apis customer
app.use('/api/customer', require('./api/customer.js'));

app.use(express.json());