const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');

const logger = require('koa-logger');

const config = require('./config');
const router = require('./router');
const db = require('./db');

db();
const app = new Koa();

app.use(json());
app.use(bodyparser());
app.use(cors());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => console.log(`App listen on port ${config.port}`));

module.exports = { app };
