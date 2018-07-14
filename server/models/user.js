const mongoose = require('mongoose');
const userScheam = require('../schema/user.js');
const db = require('../config/db.js');
const _model = mongoose.model('_model', userScheam);
const secret = require('../config/secret.json');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
class UserModel {
    //模型化用户表
    /**
     * 创建一条user数据
     * @param data
     * @returns {Promise.<*>}
     */
    static async createUser (data) {
      let example = new _model(data);
          await example.save(function(err, example) {
              if(err){
                  console.log('用户保存失败');
              }else{
                  console.log('用户保存成功')
              }      
      })
    }
    /**
     * 更新一条user数据
     * @param name
     * @returns {Promise.<boolean>}
     */
    static async updateUser (token) {
        console.log('wcx2222',token);
        let payload = await verify(token, secret.sign);
        let name = payload.name;
        let conditions = {name};
        let update = {$set:{name:'wcx2'}};
        _model.update({name:"wcx"}, {token:'wcx2'},function(err, docs){
            if(err){
                console.log('err', err)
                return false;
            }else{
                console.log(`update ${name} succcess`);
                console.log(docs);
                // _model.find(function(err, docs){
                //     console.log(docs);
                // });
                return true;
            }
        })     
      }
    /**
     * 查询一条user数据
     * @param name
     * @returns {Promise.<*>}
     */
    static async queryUser (name) {
      console.log('entering db')
        return await _model.find({name:name}, function(err, docs) {
              if(err){
                  console.log(err);
              }else{
                  return docs;
              }
        });
    }    
}
module.exports = UserModel

