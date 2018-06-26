const Router = require('koa-router');
const UserController = require('../controller/user.js');
const router = new Router({
	prefix: '/api'
});
router.post('/', UserController.postLogin)
router.post('/login', UserController.postLogin)

module.exports = router;