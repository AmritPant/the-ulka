const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

//  Hadling unCaught Exception
process.on('uncaughtException', err => {
  console.log(`Error:  ${err.message}`);
  console.error('Shutting down the server due to Uncaught Exception ');
  process.exit(1);
});

const app = require('./app');
const connectDatabase = require('./config/database');

const { PORT } = process.env;
connectDatabase();

const server = app.listen(PORT, () => {
  console.log(
    `Server has been started successfully on http://localhost:${PORT}`
  );
});

//  Hadling unCaught Exception
process.on('unhandledRejection', err => {
  console.log(`Error:  ${err.message}`);
  console.error('Shutting down the server due ot unhanlded Rejection ');
  server.close(() => {
    process.exit(1);
  });
});
