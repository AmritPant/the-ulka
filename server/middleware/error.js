const handleErrorDev = (err, res) =>
  res.status(err.statusCode).json({ success: false, error: err });

const handleErrorProd = (err, res) => {
  if (err.isOperational) {
    // const message = '';
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    res
      .status(500)
      .json({ success: false, message: 'Something went very wrong' });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong | Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    handleErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleErrorProd(error, res);
  }
};
