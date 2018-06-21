const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
	return async function (ctx, next) {
		try{
			// 获取jwt
			const token = ctx.header.authorization;
			if(token)
			{
				try{
					// 解密payload， 获取用户名和ID
					let payload = await verify(token.split(' ')[1], secret)；
					ctx.user 
				}
			}
		}
	}
}