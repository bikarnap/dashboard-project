const express = require('express');
const bodyParser = require('body-parser');
const poolsRouter = require('./controllers/pools');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v0/pools', poolsRouter);

module.exports = app;