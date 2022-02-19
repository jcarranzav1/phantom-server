const express = require('express');
const cors = require('cors');
const { requestId, requestLog } = require('./config/logger');

const app = express();

app.use(cors({ credentials: true }));
app.use(requestId);
app.use(requestLog);
app.use(express.json());

module.exports = app;
