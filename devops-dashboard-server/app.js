const express = require('express');
const bodyParser = require('body-parser');
const poolsRouter = require('./controllers/pools');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cors = require('cors');
const vmsRouter = require('./controllers/vms');
const xenRouter = require('./controllers/xen');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v0/authenticate', loginRouter);
app.use('/api/v0/users', usersRouter);
app.use('/api/v0/pools', poolsRouter);
app.use('/api/v0/vms', vmsRouter);
app.use('/api/v0/xen', xenRouter);

module.exports = app;