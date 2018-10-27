<template>
    <div class="mainWrapper">
        <el-container>
            <el-main>
                <el-header id="article-title">{{article.title}}</el-header>
                <el-header class="tag" v-html = "tag"></el-header>
                <el-main class= "article-content" v-html="article.content"></el-main>
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
                tag:''
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
                console.log('_str', _str)
                return _str
            }            
        }
    }
</script>
<style lang="less" scoped>
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
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
    #article{
        width: 1000px;
    }
</style>