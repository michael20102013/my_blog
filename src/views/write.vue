<template>
    <div id="write">
        <el-row>
            <el-col :span="4" class="back">
                <el-container  class="catalogList">
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
                        <div v-for="(article, index) in articles" :class="select(index)"  :key="article._id">
                            <el-row>
                                <el-col :span="20" class="artilce-title">
                                    <div @click="selected(index)">
                                        <div class="article-title-h1">{{article.title}}</div>
                                        <div class="note-content" v-html = "article.html_content"></div>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                        <el-dropdown trigger="click" @command="deleteArticle">
                                            <span class="el-dropdown-link">
                                                <i class="el-icon-setting el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item :command = "article._id">删除</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                    <el-footer>

                    </el-footer>
                </el-container>
            </el-col>
            <el-col :span="14" :class="{content:true, hide: articles.length === 0}">
                    <el-header class="content-title">
                        <input :placeholder="title" id="contentTitle" v-model="title"></input>
                        <el-button class="myfont fa fa-mail-forward small-font release" @click="releaseArticle"></el-button>
                    </el-header>
                    <el-main class="content-content">
                        <mavon-editor 
                        v-model = 'editorContent'
                        :ishljs="true"
                        :codeStyle="code_style"
                        ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"
                        />
                    </el-main>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    const MYTime = require('../common/common').MYTime;
    export default {
        data() {
            return {
                articles: [{
                    time: "2018-07-18",
                    title: "JS 权威指南"
                }],
                editorContent: '',
                editorHtml: '',
                editingID: '',
                defaultIndex: 0,
                title:"123",
                clearId: '',
                code_style: 'atelier-dune-dark',
                img_file: {}
            }
        },
        created() {
            // 
        },
        mounted() {
            this.getArticles();
            // this.initWangEditor();
            jQuery('.content-content').on('keyup', () => {
                this.saveArticle();
                if(this.articles.length !== 0) {
                    this.articles[this.defaultIndex].html_content = jQuery(".v-show-content").html()
                }
            })
        },
        updated(){
            // 
        },
        methods: {
            //更新文章(发布文章)
            releaseArticle() {
                let t = new MYTime();
                this.editorHtml =  jQuery(".v-show-content").html();
                let content = {
                    _id: this.editingID,
                    md_content: this.editorContent,
                    html_content: this.editorHtml,
                    update_time: t.time(),
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
            //实时保存文章
            saveArticle() {
                let t = new MYTime();
                this.editorHtml = jQuery(".v-show-content").html();
                let content = {
                    _id: this.editingID,
                    md_content: this.editorContent,
                    html_content: this.editorHtml,
                    update_time: t.time(),
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
                                // this.getArticles();
                            } else {
                                alert('保存文章失败！')
                            }
                        }
                    )
            },
            //删除文章
            deleteArticle(id) {
                let content = {_id: id}
                this.$http({
                    url: '/api/delete/article',
                    method: 'post',
                    data: content
                }).then((res) => {
                        if(res.data.cc === 0) {
                            this.getArticles()
                        }else {
                            alert('删除文章失败')
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
                this.editorContent = this.articles[index].md_content;
                this.editingID = this.articles[index]._id;
                this.title = this.articles[index].title;
            },
            //新建文章
            addArticle() {
                let t = new MYTime();
                let content = {
                    page_view_time: [],
                    page_view_count: 0,
                    md_content: "",
                    html_content:"",
                    update_time: t.time(),
                    create_time: t.time(),
                    title:t.time(),
                    user_view: [],
                    user_view_count: 0,
                    comment: [],
                    comment_count: 0
                }
                this.$http({
                    url: '/api/edit/articles',
                    method: 'post',
                    data: content
                }).then((res) => {
                        this.getArticles()
                    }
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
                            if(this.articles.length !== 0) {
                                this.editingID = this.articles[this.defaultIndex]._id;
                                this.editorContent = this.articles[this.defaultIndex].md_content;
                                this.title = this.articles[this.defaultIndex].title;
                            }else {
                                this.editingID = '';
                                this.editorContent = '';
                                this.title = '';
                            }
                            this.recomputeEditCotent();
                        }else if (_res.cc === 401) {
                            alert('未登录或者token到期，请重新登录');
                            let location = '/home/articles';
                            this.$router.push(location);
                        }
                        else {
                            alert('获取文章失败！')
                        }
                    })
            },
            changeTitle(value){
                this.title = value;
            },
            //重新绘制文编区高度
            recomputeEditCotent() {
                let h = jQuery("#write").css('height').split('px')[0] - 250;
                jQuery(".w-e-text-container").css('height', h + 'px');
                jQuery(window).on('resize', () => {
                    clearTimeout(this.clearId)
                    this.clearId = setTimeout(() => {
                        let h = jQuery("#write").css('height').split('px')[0] - 250;
                        jQuery(".w-e-text-container").css('height', h + 'px');
                    }, 20)
                })                
            },
            delHtmlTag(str) {
                //去掉所有的html标记
                return str.replace(/<[^>]+>/g, "");
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.img_file[pos] = $file;
                this.$http({
                    url: '/api/edit/uploadimg',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    let _res = res.data;
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, _res.url);
                })
            },
            $imgDel(pos) {
                delete this.img_file[pos];
            }
        },
        computed: {
            
        },
        filters: {

        }
    }
</script>
<style lang="less" scoped>
    .hide {
        display: none;
    }
    .el-icon-setting,
    .el-icon-circle-plus {
        color: #fff;
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
        background-color: #fff;
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
        overflow: hidden;
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

    #writeArea {
        color: #333;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
        bottom: 0;
        outline: 0;
        min-height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 600px;
        background-color: #fff;
        .w-e-text{
            background-color: #fff !important;
        }
    }
    .w-e-toolbar{
        background-color:#D9D9D9;
    }
    .note-content {
        text-overflow: ellipsis;
        max-width: 275px;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        max-height:48px;
    }

    .artilce-title {
        cursor: pointer;
    }
    .article-title-h1 {
        text-overflow: ellipsis;
        max-width: 275px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        max-height:48px;
        font-size: 2em;
        -webkit-margin-before: 0.67em;
        -webkit-margin-after: 0.67em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
        overflow: hidden;      
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
    .catalogList {
        height: 100%;
    }
    .conentWrapper {
        height: 100%;
    }
    .content-content {
        height: 100%;
    }
    .markdown-body {
        height: 90%;
    }
</style>
<style lang="less">
    #write .w-e-toolbar .w-e-menu i {
        line-height: 26px !important;
    }
    #write .w-e-text {
        overflow: auto;
    }
</style>