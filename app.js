const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./server/routes/index.js');
const jwt = require('koa-jwt');
const secret = require('./server/config/secret.json');
const err = require('./server/middleware/error.js');
const app = new Koa();

app.use(jwt({secret: secret.sign}).unless({path: [/^\/api\/login/]}));
app.use(err());
app.use(logger());
app.use(bodyParser());

// app.use(jwt({secret: secret.sign}).unless({path: [/^\/login/]}));

app
   .use(router.routes())
   .use(router.allowedMethods())

// // Unprotected middleware
// app.use(function(ctx, next){
// 	console.log(ctx);
//   if (ctx.url.match(/^\/login/)) {
//     ctx.body = 'unprotected\n';
//     console.log('unprotected\n')
//   } else {
    
//   }
//   return next();
// });

// // Protected middleware
// app.use(function(ctx){
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n';
//     console.log('protected\n')
//   }
//   return next();
// });
app.listen(9527, ()=> {
	console.log(`server running success`)
})
