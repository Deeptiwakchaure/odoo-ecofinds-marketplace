const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getMyProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createProduct)
  .get(getProducts);

router.get('/category/:category', getProductsByCategory);
router.get('/search/:keyword', searchProducts);
router.get('/mylistings', protect, getMyProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;