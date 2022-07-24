const express = require('express');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.route('/products').get(productController.getAllProducts);

productRouter.route('/product').post(productController.createNewProduct);

productRouter
  .route('/product/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
