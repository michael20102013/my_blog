const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./server/routes/index');
const jwt = require('koa-jwt');
const secret = require('./server/config/secret.json');
const err = require('./server/middleware/error');
const app = new Koa();

app.use(err());
app.use(logger());
app.use(bodyParser());

app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/]}));

app
	.use(router.routes())
	.use(router.allowMethods())
	
app.listen(9527, ()=> {
	console.log(`server running success`)
})
