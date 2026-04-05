const express = require('express');
const router = express.Router();

const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
// utils
const CryptoUtil = require('../utils/CryptoUtil');
const EmailUtil = require('../utils/EmailUtil');
const JwtUtil = require('../utils/JwtUtil');
// daos
const CustomerDAO = require('../models/CustomerDAO');
const OrderDAO = require('../models/OrderDAO');

// signup
router.post('/signup', async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);

  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } 
  else {
    const now = new Date().getTime();
    const token = CryptoUtil.md5(now.toString());

    const newCust = {
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email,
      active: 0,
      token: token
    };

    const result = await CustomerDAO.insert(newCust);

    if (result) {
      const send = await EmailUtil.send(email, result._id, token);

      if (send) {
        res.json({ success: true, message: 'Please check email' });
      } else {
        res.json({ success: false, message: 'Email failure' });
      }

    } else {
      res.json({ success: false, message: 'Insert failure' });
    }
  }

});

// customer
router.post('/active', async function (req, res) {
  const _id = req.body.id;
  const token = req.body.token;

  const result = await CustomerDAO.active(_id, token, 1);

  res.json(result);
});

// update profile
router.put('/customers/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const customer = req.body;
  customer._id = _id;
  const result = await CustomerDAO.update(customer);
  res.json(result);
});

router.get('/categories', async function(req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.get('/products/new', async function(req, res) {
  const products = await ProductDAO.selectTopNew(10);
  res.json(products);
});

router.get('/products/hot', async function(req, res) {
  const products = await ProductDAO.selectTopHot(10);
  res.json(products);
});

router.get('/products/category/:cid', async function(req, res) {
  const cid = req.params.cid;
  const products = await ProductDAO.selectByCatID(cid);
  res.json(products);
});

router.get('/products/search/:keyword', async function(req, res) {
  const keyword = req.params.keyword;
  const products = await ProductDAO.selectByKeyword(keyword);
  res.json(products);
});

router.get('/products/:id', async function(req, res) {
  const id = req.params.id;
  const product = await ProductDAO.selectByID(id);
  res.json(product);
});

router.post('/login', async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

    const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);

    if (customer) {

      if (customer.active === 1) {

       const token = JwtUtil.genToken(username, password);

        res.json({
          success: true,
          message: 'Authentication successful',
          token: token,
          customer: customer
        });

      } else {

        res.json({
          success: false,
          message: 'Account is deactive'
        });

      }

    } else {

      res.json({
        success: false,
        message: 'Incorrect username or password'
      });

    }

  } else {

    res.json({
      success: false,
      message: 'Please input username and password'
    });

  }

});

router.get('/token', JwtUtil.checkToken, function (req, res) {

  const token =
    req.headers['x-access-token'] ||
    req.headers['authorization'];

  res.json({
    success: true,
    message: 'Token is valid',
    token: token
  });

});

// checkout
router.post('/orders', JwtUtil.checkToken, async function(req, res) {

  const body = req.body;
  const mongoose = require('mongoose');

  // GÁN CỨNG TRẠNG THÁI "PENDING" Ở ĐÂY
  const order = {
    _id: new mongoose.Types.ObjectId(),
    cdate: new Date().getTime(),
    total: body.total,
    customer: body.customer,
    items: body.items,
    status: "PENDING" 
  };

  const result = await OrderDAO.insert(order);

  res.json({
    success: true,
    message: "Checkout successful",
    order: result
  });

});

// get orders by customer
router.get('/orders/:cid', JwtUtil.checkToken, async function(req, res) {

  const cid = req.params.cid;

  const orders = await OrderDAO.selectByCustID(cid);

  res.json(orders);

});

module.exports = router;