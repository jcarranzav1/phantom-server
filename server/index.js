const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');
const { requestId, requestLog } = require('./config/logger');
// const { client } = require('./config');

const app = express();

app.use(cors({ credentials: true }));
app.use(requestId);
app.use(requestLog);
app.use(express.json());
app.use(graphqlUploadExpress());
module.exports = app;
