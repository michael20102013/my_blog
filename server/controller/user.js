const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
	static async postLogin (ctx) {
		const data = ctx.request.body
		//查询用户
		const user = await UserModel.queryUser(data.name);
		console.log(data.password, user.password);
		console.log(ctx);
		if(user) {
			if(bcrypt.compareSync(data.password, user.password)) {
				console.log('chenggong');
				//用户 token
				const userToken = {
					name: user.name,
					id: user.id
				}
				// 签发 token
				const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})
				ctx.body = {
					message: '成功',
					bean: {
						token
					},
					code: 0
				}
			}
			else {
				console.log('用户名和密码错误');
				ctx.body = {
					code: 1,
					message: '用户名和密码错误'
				}
			}
		}
		else {
			ctx.body = {
				code: 2,
				message: '用户名不存在'
			}
		}
	}
}
module.exports = UserController