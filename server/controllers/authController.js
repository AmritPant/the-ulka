const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../utils/catchAsyncError');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// SIGNUP ///////////////////////////////////////////////////////
exports.signup = catchAsync(async (req, res, next) => {
  // Getting the required data
  const { name, email, password, passwordConfirm } = req.body;

  // Creating user
  await User.create({
    name,
    email,
    password,
    passwordConfirm,
    avatar: {
      public_id: 'avatar',
      url: 'avatar.jpg',
    },
  });

  const token = user.getJWTToken();

  // Sending the user's token
  res.status(201).json({ sucess: true, token });
});

exports.login = catchAsync(async (req, res, next) => {
  // Chekcking for email and password
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler('Please Enter Email and Password', 401));

  // Checking if user exist with that email
  const user = User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorHandler('Invalid email or Password'));

  // Checking whether provided password is correct or not
  const isPasswordCorrect = user.comparePassword();
  if (!isPasswordCorrect)
    return next(new ErrorHandler('Invalid email or Password', 401));

  // Sending password if everythign goes as per plan
  const token = user.getJWTToken();
  res.status(201).json({ sucess: true, token });
});
