const mongoose = require('mongoose');
const config = require('./config');

module.exports = async () => {
  try {
    if (config.env === 'test' || config.env === 'dev') {
      await mongoose.connect(
        config.mongo_db_test,
        { useNewUrlParser: true, useCreateIndex: true }
      );
      console.log('Test Mongo conect.');
    } else {
      await mongoose.connect(
        config.mongo_db,
        { useNewUrlParser: true, useCreateIndex: true }
      );
      console.log('Mongo conect.');
    }
  } catch (err) {
    console.error(err.message);
  }
};
