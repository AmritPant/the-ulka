const Product = require('../models/productModels');
const catchAsync = require('../utils/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Create New Product
exports.createNewProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: product,
  });
});

// Get all product
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const Products = await Product.find({});
  res.status(200).json({
    status: 'success',
    count: Products.length,
    data: Products,
  });
});

// Update Product
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product Not Found', 400));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

// Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product Not Found', 400));

  product.remove();
  res
    .status(200)
    .json({ status: 'success', message: 'Product Deleted Successfully' });
});

// Get One Product
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler('Product Not Found', 400));
  res.status(200).json({ status: 'success', data: product });
});
