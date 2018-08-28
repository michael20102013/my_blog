const ArticleModel = require('../models/articles.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret.json');
const util = require('util');
const verify = util.promisify(jwt.verify);
const common = require('../common/common.js')
class ArticleController {
    //增加文章
    static async createArticle (ctx) {
        const data = ctx.request.body;
        let verifyTk = await common.verifyToken(ctx);
        if(verifyTk === true){
            let addArticle = await ArticleModel.createArticle(data)
            if(addArticle){
                ctx.body = {
                    message:'文章添加成功',
                    cc:0,
                }         
            }else{
                ctx.body = {
                    message:'文章添加失败',
                    cc:1,
                }                
            }
        }else{
            throw(ctx.throw(401));
        }        
    }
    static async deleteArticle (ctx) {
        
    }
    static async updateArticle (ctx) {
        let verifyTk = await common.verifyToken(ctx);
        const data = ctx.request.body;
        if (verifyTk === true) {
            let articles = await ArticleModel.updateArticle(data);
            if (articles) {
                ctx.body = {
                    message: '文章查询成功',
                    cc: 0
                }
            } else {
                ctx.body = {
                    message: '文章查询失败',
                    cc: 1
                }
            }
        }        
    }
    static async queryArticle (ctx) {
        console.log('queryArticle')
        // let verifyTk = await common.verifyToken(ctx);
        // console.log('verifyTk', verifyTk)
        let articles = await ArticleModel.queryArticles();
        if (articles) {
            ctx.body = {
                message: '文章查询成功',
                data: articles,
                cc: 0
            }
        }else{
            ctx.body = {
                message: '文章查询成功',
                data: articles,
                cc: 0
            }            
        }
    }    
}
module.exports = ArticleController