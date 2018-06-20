const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./server/routes/index');
const jwt = require('koa-jwt');
const secret = require('./server/config/secret.json');
const err = require('./server/middleware/error');