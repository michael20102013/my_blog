const mongoose = require('mongoose');
const userScheam = require('../schema/user.js');
const db = require('../config/db.js');
const _model = mongoose.model('_model', userScheam);

class UserModel {
    //模型化用户表
    /**
     * 创建一条user数据
     * @param data
     * @returns {Promise.<boolean>}
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
     * 查询一条user数据
     * @param name
     * @returns {Promise.<boolean>}
     */
    static async queryUser (name) {
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

