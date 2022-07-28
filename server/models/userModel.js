const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User's Name cannot be empty"],
    minLength: [3, 'Name cannot be less than 2 characters'],
    maxLength: [20, 'Name cannot exceed 20 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User's email cannot be empty"],
    unique: [true, 'Another User already exist with same email address!'],
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, "User's password cannot be empty"],
    minLength: [8, 'Password cannot be less than 8 characters'],
    maxLength: [16, 'Password cannot exceed 16 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    validate: {
      validator: function (val) {
        // This only runs in .save()
        return this.password === val;
      },
      message: 'Password are not the same',
    },
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpiresIn: Date,
  passwordChangedAt: Date,
});

// Hash the Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// JWT TOKEN CREATION
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Comparing Password
userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
