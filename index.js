'use strict';

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const { getEnvVar } = require('./env');

dotenv.config({ path: './config.env' });
connectDB();

const app = express();
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const NODE_ENV = getEnvVar('NODE_ENV');
const PORT = getEnvVar('PORT');
app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
