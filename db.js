'use strict';

const mongoose = require('mongoose');
const { getEnvVar } = require('./env');

async function connectDB() {
  try {
    await mongoose.connect(getEnvVar('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

module.exports = connectDB;
