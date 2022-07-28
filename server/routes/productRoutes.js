const express = require('express');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.route('/').get(productController.getAllProducts);

productRouter.route('/').post(productController.createNewProduct);

productRouter
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
