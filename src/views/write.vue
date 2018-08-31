<template>
    <div id="write">
        <el-row>
            <el-col :span="4" class="back">
                <el-container>
                    <el-header>
                        <!-- <el-button type="text"> -->
                        <span class="backToIndex">
                            <router-link to="/home">返回首页</router-link>
                        </span>
                        <!-- </el-button> -->
                    </el-header>
                    <el-main></el-main>
                    <el-footer></el-footer>
                </el-container>
            </el-col>
            <el-col :span="6" class="catalog">
                <el-container>
                    <el-header class="add">
                        <i class="el-icon-circle-plus" @click="addArticle"></i>
                        <span>新建文章</span>
                    </el-header>
                    <el-main class="catalog-content">
                        <div v-for="(article, index) in articles" :class="select(index)">
                            <el-row>
                                <el-col :span="20" class="artilce-title">
                                    <div @click="selected(index)">
                                        <h1>{{article.title}}</h1>
                                        <h3 class="note-content">{{article.content|delHtmlTag}}</h3>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <i class="el-icon-setting"></i>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>

                    </el-footer>
                </el-container>
            </el-col>
            <el-col :span="14" class="content">
                <el-container>
                    <el-header class="content-title">
                        <input :placeholder="title" id="contentTitle" v-model="title"></input>
                        <el-button class="myfont fa fa-mail-forward small-font release" @click="releaseArticle"></el-button>
                    </el-header>
                    <el-main class="content-content">
                        <div id="writeArea" class="writeArea"></div>
                    </el-main>
                    <el-footer>
                    </el-footer>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import wangEditor from 'wangeditor';
    const MYTime = require('../common/common').MYTime;
    export default {
        data() {
            return {
                // ishFontShow:true,
                // isArrowShow:false,
                articles: [{
                    time: "2018-07-18",
                    title: "JS 权威指南"
                }],
                editorContent: '',
                editingID: '',
                defaultIndex: 0,
                title:"123"
            }
        },
        created() {
            // this.getArticles();
        },
        mounted() {
            this.getArticles();
            // this.initWangEditor();
        },
        updated(){
            // this.initWangEditor(this.editorContent);
        },
        methods: {
            //更新文章(发布文章)
            releaseArticle() {
                let t = new MYTime();
                let content = {
                    _id: this.editingID,
                    content: this.editorContent,
                    update_time: t.time1(),
                    title:this.title
                }
                this.$http({
                    url: '/api/edit/articles',
                    method: 'put',
                    data: content
                })
                    .then(
                        (res) => {
                            let _res = res.data;
                            if (_res.cc === 0) {
                                this.getArticles();
                            } else {
                                alert('获取文章失败！')
                            }
                        }
                    )
            },
            //选中文章样式
            select(index) {
                return {
                    'catalog-content-item': true,
                    'selected': index === this.defaultIndex
                };
            },
            //处理选中文章
            selected(index) {
                this.defaultIndex = index;
                this.editorContent = this.articles[index].content;
                this.editingID = this.articles[index]._id;
                this.initWangEditor(this.editorContent);
                this.title = this.articles[index].title;
            },
            //新建文章
            addArticle() {
                let t = new MYTime();
                let content = {
                    content: "",
                    update_time: t.time1(),
                    title:t.time1()
                }
                this.$http({
                    url: '/api/edit/articles',
                    method: 'post',
                    data: content
                }).then(
                    this.getArticles()
                )
            },
            //获取文章
            getArticles() {
                this.$http({
                    url: '/api/query/articles',
                    method: 'post',
                    content:{}
                }).
                    then((res) => {
                        let _res = res.data;
                        if (_res.cc === 0) {
                            this.articles = _res.data;
                            this.editingID = this.articles[this.defaultIndex]._id;
                            this.editorContent = this.articles[this.defaultIndex].content;
                            this.title = this.articles[this.defaultIndex].title;
                            this.initWangEditor(this.editorContent);
                        } else {
                            alert('获取文章失败！')
                        }
                    })
            },
            //初始化文章内容
            initWangEditor(content = '') {
                let editor2 = new wangEditor('#writeArea');
                editor2.customConfig.onchange = (html) => {
                    this.editorContent = html;
                }
                editor2.create();
                editor2.txt.html(content);
            },
            changeTitle(value){
                this.title = value;
            }            
        },
        computed: {

        },
        filters: {
            delHtmlTag: function (str = '') {
                //去掉所有的html标记
                return str.replace(/<[^>]+>/g, "");
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-icon-setting,
    .el-icon-circle-plus {
        cursor: pointer;
    }

    #write {
        height: 100%;
        min-width: 1380px;
    }

    .el-row {
        height: 100%;
    }

    .back {
        text-align: center;
        height: 100%;
        float: left;
        background-color: #404040;
    }

    .catalog {
        height: 100%;
        float: left;
        background-color: gray;
        color: #fff;
    }

    .content {
        min-width: 800px;
        height: 100%;
        float: left;
        background-color: blanchedalmond;
    }

    .backBtn {
        /* margin-left: 15px; */
    }

    .add {
        font-size: 24px;
        text-align: center;
        color: #303133;
        span {
            color: #fff;
        }
    }

    .el-icon-circle-plus {
        margin-right: 15px;
    }

    .backToIndex {
        font-size: 24px;
    }

    .selected {
        background-color: #909399;
    }

    .catalog-content {
        .el-row {
            display: flex;
            align-items: center;
        }
        h1,
        h3 {
            -webkit-margin: 0;
        }
        .catalog-content-item {
            padding: 15px;
        }
        .el-icon-setting {
            font-size: 21px;
        }
        .el-col-4 {
            text-align: center;
        }
    }
    #write .el-col{
        overflow: auto
    }
    .el-header {
        padding-top: 15px;
    }

    .content-title {
        /* overflow: hidden; */
        font-size: 24px;
        text-align: center;
        color: #303133;
        span {
            margin-bottom: 24px;
        }
        height: 100px !important;
    }

    .toolbox {
        margin-top: 30px;
        background-color: #d9d9d9;
        border: 0;
    }

    .myfont {
        background-color: #D9D9D9;
        border: 0;
        &:hover {
            color: #fff;
            background-color: #595959;
        }
    }

    .small-font {
        font-size: 16px;
        border-radius: 0;
    }

    .arrow {
        position: relative;
        display: block;
        width: 0;
        height: 0;
        border: 5px solid #999;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom: 0;
        position: absolute;
        top: 8px;
        right: 5px;
        &.hide {
            display: none;
        }
    }

    .release {
        &:before {
            content: '\F064 发布文章'
        }
    }

    #hFont {
        float: left;
        display: inline-block;
        button {
            display: block;
            margin-left: 0;
        }
    }

    #hFont.hide {
        display: none
    }

    .hWrapper {
        margin-bottom: -113px;
        width: 50px;
        display: inline-block;
        /* overflow: hidden; */
        button {
            position: relative;
        }
    }

    .writeArea {
        color: #333;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
        bottom: 0;
        outline: 0;
        min-height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0px 40px 80px;
        min-height: 300px;
        ;
        .w-e-text-container {
            height: 600px !important;
        }
    }
    .note-content {
        text-overflow: ellipsis;
        max-width: 275px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }

    .artilce-title {
        cursor: pointer;
    }
    #contentTitle{
            background: transparent;
            width: 100%;
            padding: 0 80px 10px 40px;
            margin-bottom: 0;
            border: none;
            font-size: 30px;
            font-weight: 400;
            line-height: 30px;
            -webkit-box-shadow: none;
            box-shadow: none;
            color: #595959;
            background-color: transparent;
            outline: none;
            border-radius: 0;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 50px;
    }
</style>