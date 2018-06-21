const Router = require('koa-router');
const UserController = require('../controller/user');
const router = new Router({
	prefix: '/api'
})

router
	.post('/login', UserController.postLogin)

module.exports = router;