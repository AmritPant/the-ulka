const morgan = require('morgan');
const express = require('express');
const errorMiddleware = require('./middleware/error');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Error Handling
app.use(errorMiddleware);

module.exports = app;
