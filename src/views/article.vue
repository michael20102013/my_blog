<template>
    <div class="mainWrapper">
        <el-container>
            <el-main>
                <el-header id="article-title">{{article.title}}</el-header>
                <el-header class="tag" v-html = "tag"></el-header>
                <el-main class= "article-content" v-html="article.content"></el-main>
                <el-main class="bottom">                 
                    <el-form :model='ruleForm' status-icon :rules="rules" ref='ruleForm' hide-required-asterisk='true'>
                            <el-row>
                                <el-col :span='24'>
                                    <el-form-item prop="comment_content" hide-required-asterisk='true'>
                                        <el-input 
                                        type="textarea"
                                        :autosize="{minRows: 6}"
                                        placeholder="写下你的评论"
                                        v-model="ruleForm.comment_content"
                                        hide-required-asterisk='true'>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='8'>
                                    <el-form-item prop='name'>
                                            <el-input v-model="ruleForm.name" placeholder="请输入你的大名（必填）"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='9'>
                                    <el-form-item prop='email'>
                                            <el-input type='email' v-model="ruleForm.email" placeholder="请输入你的邮箱地址（必填， 不公开）"></el-input>
                                    </el-form-item>                            
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-button type="primary" @click='submitForm("ruleForm")'>评论</el-button>
                                </el-col>
                            </el-row>
                    </el-form>
                    <el-row>
                        <el-col :span='24' v-for="(item,index) in article.comment" :key="index" class="commentArea">
                            <el-main class="comment-left commentCount">{{article.comment.length}} 条评论</el-main>
                            <el-main class="comment-left">{{item.name}}：</el-main>
                            <el-main class="comment-left">{{item.comment_content}}</el-main>
                        </el-col>
                    </el-row>
                </el-main>
            </el-main>
            <el-aside width="200px">排行榜开发中</el-aside>
        </el-container>
    </div>
</template>
<script>
    export default {
        data() {
            //邮箱校验规则
            let checkEmail = (rule, value, callback)=> {
                let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                if(reg.test(value)) {
                    callback();
                }else {
                    callback(new Error("请输入正确的邮箱地址"))
                }
            }
            return {
                article:'',
                text:'',
                tag:'',
                name:'',
                email:'',
                ruleForm: {
                    name:'',
                    email:'',
                    comment_content:''
                },
                rules: {
                    comment_content:[
                        {required:true, message:'评论内容不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required:true, message:'大名不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {validator:checkEmail, trigger: 'blur'}
                    ]                    
                }
            }
        },
        created() {
           this.getArticle();
        },
        methods: {
            getArticle() {
                let id = this.$route.params.id;
                let content = {
                    id: id
                }
                this.$http({
                    url: '/api/see/articles',
                    method: 'post',
                    data: content
                }).
                    then((res) => {
                        let _res = res.data;
                        if (_res.cc === 0) {
                            this.article = _res.data[0];
                            this.text = this.article.content;
                            this.tag = `创建时间：${this.article.create_time} &nbsp 更新时间：${this.article.update_time}`
                        } else {
                            alert('获取文章失败！')
                        }
                    })
            },
            //评论
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if(valid) {
                            let content = {
                                _id: this.$route.params.id,
                                comment: {
                                    email: this.ruleForm.email,
                                    name: this.ruleForm.name,
                                    comment_content: this.ruleForm.comment_content
                                }
                            }
                            this.$http({
                                url:'/api/comment',
                                method: 'post',
                                data: content
                            })
                                .then((res) => {
                                    if(res.cc === 0) {
                                        console.log('评论成功')
                                    }else {
                                        console.log('评论失败')
                                    }
                                })
                        }
                        else {
                            console.log('aaaa')
                            return false;
                        }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-header,
    .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        background-color: #fff;
        color: #333;
        /* text-align: center; */
    }
    #article-title {
        background-color: #fff;
        font-size: 2em;
        -webkit-margin-before: 0.67em;
        -webkit-margin-after: 0.67em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
        overflow: hidden;         
    }
    .article-content {
       text-align: left;
    }
    #article {
        width: 1000px;
    }
    .like {
        font-size: 24px;
        border:1px solid #CC0000;
        overflow: hidden;
        width: 150px;
        border-radius: 40px;
        text-align: center;
        float: left;
        cursor: pointer;
        .like-font {
            color: #CC0000;
            margin-right:15px;
            margin-left:auto;
        }
        .like-icon {
            color: #CC0000;
            line-height: 60px;
        }
    }
    .bottom {
            margin-top: 30px;
            padding: 20px;

    }
    .liked {
        color: #fff !important;
        background-color: #CC0000;
    }
    .el-main {
        /* overflow: hidden; */
    }
    .comment {
        margin-top: 30px;
    }
    .commentArea {
        margin-top: 30px;
        border-top: 1px solid #f0f0f0;;
        border-bottom: 1px solid #f0f0f0;;
    }
    .commentCount {
        font-size: 24px;
        font-weight: bold;
    }
    .comment-left {
        padding-left: 0;
    }
</style>