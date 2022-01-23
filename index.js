require('dotenv').config();
require('./src/database/Connector').connect();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./src/routes/index');

const SERVER_PORT = process.env.YOUR_PORT || process.env.PORT || 4000;
const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(fileUpload({}));
app.use('/api', router);

// eslint-disable-next-line no-console
app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Server ready at ${SERVER_PORT} port`));
