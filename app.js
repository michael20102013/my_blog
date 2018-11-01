const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./server/routes/index.js');
const jwt = require('koa-jwt');
const secret = require('./server/config/secret.json');
const err = require('./server/middleware/error.js');
const app = new Koa();
// app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/]}));
app.use(err());
app.use(logger());
app.use(bodyParser());
app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/login_out/, /^\/api\/see/,/^\/mock\/login/]}));

app
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(9527, ()=> {
	console.log(`server running success`)
})
