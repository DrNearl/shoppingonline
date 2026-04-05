require('dotenv').config();
require('./utils/MongooseUtil');

const express = require('express');
const cors = require('cors');

const app = express();
const admin = require('./api/admin');

const path = require('path');

app.use(cors());

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use('/api/admin', admin);

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

// apis admin
app.use('/api/admin', require('./api/admin.js'));

// apis customer
app.use('/api/customer', require('./api/customer.js'));

app.use(express.json({ limit: '16mb' }));

console.log("Server is running on port " + PORT);