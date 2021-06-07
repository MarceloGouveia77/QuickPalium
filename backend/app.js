var express = require('express');
var cors = require('cors')
var router = require('./routes');

const app = express();
app.use(cors())

app.use(express.json());
app.use(router);

module.exports = app;