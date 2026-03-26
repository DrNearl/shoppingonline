const express = require('express');
const router = express.Router();

// 1. Move ALL requires to the top to avoid initialization issues
const JwtUtil = require('../utils/JwtUtil');
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');
const EmailUtil = require('../utils/EmailUtil');

// --- LOGIN ---
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken();
      res.json({ success: true, message: 'Authentication successful', token: token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});

// --- CATEGORIES ---
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const category = { name: name };
  const result = await CategoryDAO.insert(category);
  res.json(result);
});

router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id: _id, name: name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async function(req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

// --- PRODUCTS ---
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    // 2. Fetch data inside the try block
    let products = await ProductDAO.selectAll();
    if (!products) products = [];

    // 3. Keep pagination logic inside the try block so 'products' is accessible
    const sizePage = 4;
    const noPages = Math.ceil(products.length / sizePage);
    var curPage = 1;
    if (req.query.page) curPage = parseInt(req.query.page);

    const offset = (curPage - 1) * sizePage;
    const productsSliced = products.slice(offset, offset + sizePage);

    const result = {
      products: productsSliced,
      noPages: noPages,
      curPage: curPage
    };

    res.json(result);

  } catch (err) {
    console.error("Error in GET /products:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.post('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    const { name, price, category: cid, image } = req.body;
    const now = new Date().getTime();
    const category = await CategoryDAO.selectByID(cid);
    const product = { name, price, image, cdate: now, category };
    const result = await ProductDAO.insert(product);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const { name, price, category: cid, image } = req.body;
    const now = new Date().getTime();
    const category = await CategoryDAO.selectByID(cid);
    const product = { _id, name, price, image, cdate: now, category };
    const result = await ProductDAO.update(product);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const result = await ProductDAO.delete(_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ORDERS ---
router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  try {
    const orders = await OrderDAO.selectAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const newStatus = req.body.status;
    const result = await OrderDAO.update(_id, newStatus);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 // Lấy danh sách customer
router.get('/customers', JwtUtil.checkToken, async function (req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});

// Xem order của từng customer
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

// Vô hiệu hóa customer
router.put('/customers/deactive/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});

// Gửi mail cho customer
router.get('/customers/sendmail/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectByID(_id);
  if (cust) {
    const send = await EmailUtil.send(cust.email, cust._id, cust.token);
    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});

module.exports = router;