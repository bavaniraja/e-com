// neenu-backend/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

router.post('/', userController.authenticate, orderController.createOrder);
router.get('/', userController.authenticate, orderController.getOrders);

module.exports = router;
