const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret.json');
const util = require('util');
const verify = util.promisify(jwt.verify);
class UserController {
    static async postLogin (ctx) {
		console.log('jwt2', jwt);
        console.log('passed verify')
        const data = ctx.request.body;
        //查询用户
		let user = await UserModel.queryUser(data.name);
		if(user[0]){
			user = user[0];
		}else{
			//do nothing
		}
        //转化成json对象
        console.log('user', user)
        let strUser = JSON.stringify(user);
		let jsonUsesr = JSON.parse(strUser);
		console.log('pwd',data['password']);
		console.log('pwd2',jsonUsesr.password);
        if(user) {
            // if(bcrypt.compareSync(data['password'], jsonUsesr.password)) {
            if(data['password']===jsonUsesr.password) {
                console.log('chenggong');
                //用户 token
                const userToken = {
                    name: jsonUsesr.name,
                    id: user.id
                }
                console.log('userToken', userToken);
                // 签发 token
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '2 days'})
                let payload = await verify(token, secret.sign);
                console.log('util2', util);
                console.log('jwtpayload', payload)
                ctx.body = {
                    name:userToken.name,
                    message: '成功',
                    bean: {
                        token
                    },
                    code: 0,
                    cc:0
                }
            }
            else {
                console.log('用户名和密码错误');
                ctx.body = {
                    code: 1,
					message: '用户名和密码错误',
					cc:1
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
    static async loginOut (ctx) {
		ctx.body = {
			message:'登出成功'
		}
    }   
    static async test(ctx){
        ctx.body = {
            message:"成功"
        }
    }
}
module.exports = UserController