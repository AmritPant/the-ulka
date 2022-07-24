const mongoose = require('mongoose');

const connectDatabase = function () {
  const { DATABASE_URI } = process.env;
  const connectStirng = DATABASE_URI.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

  mongoose.connect(connectStirng).then(() => {
    console.log(`Connected to Database sucessfully`);
  });
};

module.exports = connectDatabase;
