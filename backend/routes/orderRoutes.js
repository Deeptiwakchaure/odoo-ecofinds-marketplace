const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

module.exports = router;