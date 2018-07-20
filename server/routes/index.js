const Router = require('koa-router');
const UserController = require('../controller/user.js');
const router = new Router({
	prefix: '/api'
});
router.post('/', UserController.postLogin)
router.post('/login', UserController.postLogin)
router.post('/login_out', UserController.loginOut)
router.post('/edit/articles', ArticleModel.createArticle)
router.post('/edit/articles', ArticleModel.deleteArticle)
router.post('/test', UserController.test)

module.exports = router;