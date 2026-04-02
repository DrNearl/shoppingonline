require('dotenv').config();
require('./utils/MongooseUtil');

const express = require('express');
const cors = require('cors');

const app = express();
const admin = require('./api/admin');

const path = require('path');

// Serve admin panel
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// Serve customer site
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use(express.json());

console.log("Server is running on port " + PORT);