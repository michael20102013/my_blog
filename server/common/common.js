const secret = require('../config/secret.json');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const UserModel = require('../models/user.js');
 // 验证token
let verifyToken = async (ctx)=>{
     let token = ctx.request.header.authorization.split(' ')[1];
     let payload = await verify(token, secret.sign);
     let user = await UserModel.queryUser(payload.name);
	if(user[0]){
		user = user[0];
	}else{
		//do nothing
	}
     //转化成json对象
     let strUser = JSON.stringify(user);
     let dbUser = JSON.parse(strUser);
     console.log('dbUser.token',dbUser.token);
     console.log('token',token);
     if(dbUser.token === token){
        console.log('相等')
         return true;
     }else{
         return false;
     }     
}
 module.exports = {
     verifyToken
}