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
                        <i class="el-icon-circle-plus"></i>
                        <span>新建文章</span>
                    </el-header>
                    <el-main class="catalog-content">
                        <div v-for="(article, index) in articles" :class="select(index)">
                            <el-row>
                                <el-col :span="20">
                                    <h1>{{article.update_time}}</h1>
                                    <h3 class="note-content">{{article.content|delHtmlTag}}</h3>
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
                        <div class="content-time">2018-07-18</div>
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
                editorConter: '',
                editingID: '',
                defaultIndex: 0
            }
        },
        created() {
            this.$http({
                url: '/api/edit/articles',
                methods: 'GET'
            }).
                then((res) => {
                    let _res = res.data;
                    if (_res.cc === 0) {
                        this.articles = _res.data;
                        this.editingID = this.articles[0].id;
                    } else {
                        alert('获取文章失败！')
                    }
                })
        },
        mounted() {
            let editor2 = new wangEditor('#writeArea');
            editor2.customConfig.onchange = (html) => {
                this.editorConter = html;
            }
            editor2.create();
        },
        methods: {
            releaseArticle() {
                let t = new MYTime();
                console.log(t.time1());
                let content = {
                    id: 1,
                    content: this.editorConter,
                    update_time: t.time1()
                }
                this.$http({
                    url: '/api/edit/articles',
                    method: 'post',
                    data: content
                })
            }         
        },
        computed:{
            select(index){
                console.log('index', index)
                console.log('defaultIndex', defaultIndex)
                return {
                    'catalog-content-item' :true,
                    'selected': article === defaultIndex
                };
            }
        },
        filters:{
            delHtmlTag: function(str = ''){
                //去掉所有的html标记
                return str.replace(/<[^>]+>/g, "");
            }               
        }
    }
</script>
<style lang="less">
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

    .content-time {
        margin-bottom: 20px;
    }

    .note-content {
        text-overflow: ellipsis;
        max-width: 275px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
</style>