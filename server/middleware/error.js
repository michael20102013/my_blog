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
            console.log(123);
            if(token)
            {
                try{
                    // 解密payload， 获取用户名和ID
                    let payload = await verify(token.split(' ')[1], secret);
                    ctx.user = {
                        name: payload.name
                    }
                }
                catch(err){
                    console.log(`token verify fail: `, err)
                }
            }
            console.log(`token: ${token}`);

            await next();
        }
        catch(err){
            if(err.status === 401) {
                ctx.body = {
                    code: -1,
                    message: '认证失败'
                }
            } else {
                err.status = 404;
                ctx.body = '404';
                console.log('不服就怼: ', err)
            }
        }
    }
}