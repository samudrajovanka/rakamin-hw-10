const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { notFound, error } = require('./api/middlewares');
const routers = require('./routes');

const app = express();

/**
 * cors
 */
app.use(cors());

/**
 * express middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

/**
 * routing
 */
app.use(routers);
app.use(notFound);
app.use(error);

/**
 * server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});