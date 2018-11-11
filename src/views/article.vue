<template>
    <div class="mainWrapper">
        <el-container>
            <el-main>
                <el-header id="article-title">{{article.title}}</el-header>
                <el-header class="tag" v-html = "tag"></el-header>
                <el-main class= "article-content" v-html="article.content"></el-main>
                <el-main class="bottom">
                    <el-row>
                        <el-col :span="24">
                            <div :class="{like: true, liked: liked}" @click="setLikeStatus">
                                <span :class="{'like-font': true, liked:liked}">喜欢</span><i :class="{'like-icon': true, fa: true, 'fa-heart-o': true, liked:liked}"></i>
                            </div>
                        </el-col>
                    </el-row>      
                    <el-row>
                        <el-col :span="24" class="comment">
                                <el-input
                                id="comment"
                                type="textarea"
                                :autosize="{minRows: 6}"
                                placeholder="写下你的评论">
                            </el-input> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="comment ">
                            <el-input id="name" v-model="name" placeholder="请输入你的大名（必填）"></el-input>     
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="comment ">
                            <el-input id="email" v-model="email" placeholder="请输入你的邮箱地址（必填， 不公开）"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="comment ">
                            <el-button type="primary">评论</el-button>
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
            return {
                article:'',
                text:'',
                tag:'',
                liked:false,
                name:'',
                email:''
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
                            this.text = this.rmQuotation(this.article.content)
                            this.tag = `创建时间：${this.article.create_time} &nbsp 更新时间：${this.article.update_time}`
                        } else {
                            alert('获取文章失败！')
                        }
                    })
            },
            rmQuotation (str) {
                let _str = str.substring(0, str.length-1);
                return _str
            },
            setLikeStatus() {
                this.liked = !this.liked;
                
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
</style>