const morgan = require('morgan');
const express = require('express');
const productRouter = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use('/api/v1', productRouter);

// Error Handling
app.use(errorMiddleware);

module.exports = app;
