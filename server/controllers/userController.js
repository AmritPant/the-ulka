const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsyncError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({ sucess: true, data: users });
});
