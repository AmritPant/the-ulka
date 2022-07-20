const morgan = require('morgan');
const express = require('express');
const productRouter = require('./routes/productRoute');

const app = express();

app.use(express.Router());
app.use(morgan('dev'));

// Routers
app.use('/api/v1', productRouter);

module.exports = app;
