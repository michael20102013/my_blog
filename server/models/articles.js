const mongoose = require('mongoose');
const articleScheam = require('../schema/user.js');
const db = require('../config/db.js');
const articles = mongoose.model('articles', articleScheam);
// const _models = mongoose.model('_models',mongoose.Schema({
//     name:String,
//     password:String
// }))
const secret = require('../config/secret.json');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
class ArticleModel {
    //模型化文章表
    /**
     * 创建一条文章数据
     * @param data
     * @returns {Promise.<*>}
     */
    static async createArticle (data) {
      let example = new articles(data);
          return await example.save(function(err, example) {
              if(err){
                  console.log('文章保存失败');
                  return false
              }else{
                  console.log(example)
                  console.log('文章保存成功')
                  return true
              }      
      })
    }
    /**
     * 删除一条文章数据
     * @param id
     * @returns {Promise.<boolean>}
     */    
    static async deleteArticle(id){
        console.log('delete');
        let conditons = {id:id};
        articles.remove(conditons, (err, res) => {
            if(err){
                console.log('删除失败:',err);
            }else{
                console.log('删除成功：', res);
            }
        })
    }
    /**
     * 更新一条文章数据
     * @param id, data
     * @returns {Promise.<boolean>}
     */
    static async updateArticle (id,data) {
        console.log('updatearticle',token);
        let conditions = {id};
        let update = {$set:data};//要更新的数据
        console.log('update', update);
        return await _models.update(conditions, update, function(err, res){
            if(err){
                console.log('err', err)
                return false;
            }else{
                console.log(res);
                console.log(`update ${id} succcess`);
                return true;
            }
        })          
      }
    /**
     * 查询文章数据
     * @param id
     * @returns {Promise.<*>}
     */
    static async queryArticles (id) {
      console.log('entering db')
      let conditions = id ? {id} : {};
        return await _models.find(conditions, function(err, docs) {
              if(err){
                  console.log(err);
              }else{
                  return docs;
              }
        });
    }    
}
module.exports = ArticleModel

