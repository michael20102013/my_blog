const secret = require('../config/secret.json');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const UserModel = require('../models/user.js');
 // 验证token
let verifyToken = async (ctx)=>{
     let token = ctx.header.token;
     let payload = await verify(token, secret.sign);
     console.log('payload', payload)
     let user = await UserModel.queryUser(payload.name);
	if(user[0]){
		user = user[0];
	}else{
		//do nothing
	}
     //转化成json对象
     console.log('user', user)
     let strUser = JSON.stringify(user);
     let dbUser = JSON.parse(strUser);
     if(dbUser.token === token){
         return true;
     }else{
         return false;
     }     
}
 module.exports = {
     verifyToken
}