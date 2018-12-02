<template>
	<div class="mainWrapper">
		<el-container>
			<el-main v-loading="loading">
				<el-container v-if="showSearch">
					<el-main>
						<span class="searchTitle">搜索结果：</span><span class="searchContent">共{{articles.length}}条记录</span>
					</el-main>
				</el-container>
				<el-container v-for="(item, index) in articles" :key = "index">
					<el-container :class="index !==0 ? 'article-container' : false">
						<el-header>
							<span class="hover font-orange" @click="enterArticle(item._id, item.page_view_count, item.user_view_count)">{{item.title}}</span>
						</el-header>
						<el-main>
							<div class="catalog">{{item.html_content | delHtmlTag}}
							</div>
						</el-main>
						<el-footer>
							<el-row>
								<el-col :span="9"><span>更新时间：{{item.update_time}}</span></el-col>
								<el-col :span="5"><span>浏览量：{{item.page_view_count}}</span></el-col>
								<el-col :span="5"><span>浏览人数：{{item.user_view_count}}</span></el-col>
								<el-col :span="5"><span>评论数：{{item.comment_count}}</span></el-col>
							</el-row>							
						</el-footer>
					</el-container>
				</el-container>
				<div id="readmore" @click = "readmore()">阅读更多</div>
			</el-main>
			<el-aside width="200px" class="rank-list">
			<el-row>
				<el-col :span="24">排行榜开发中</el-col>
			</el-row>				
			</el-aside>
		</el-container>
	</div>
</template>
<script>
	import{ MYTime} from '../common/common.js';
	export default {
		data() {
			return {
				total: 0,//默认数据总数
				pagesize: 7,//每页的数据条数
				currentPage: 1,//默认开始页面	
				articles: [],
				limit: 5,
				loading: false,
				showSearch: this.$store.state.showSearch
			}
		},
		created() {
			this.init();
		},
		computed: {
			watchIsSearchShow() {
				return {
					isSearchShow: this.$store.state.showSearch,
					searchArticles: this.$store.state.searchArticles
				}
			}
		},
		watch: {
			watchIsSearchShow(curVal, oldVal) {
				this.showSearch = curVal.isSearchShow;
				this.articles = curVal.searchArticles;
				if(!this.showSearch) {
					this.init();
				}
			}
		},
		methods: {
			//初始化
			init() {
				if (!this.showSearch) {
					let content = {
						limit: 5
					}
					console.log('重新获取articles')
					this.getArticles(undefined, content);
				} else {
					this.articles = this.$store.state.searchArticles
				}
			},			
			//获取文章
			getArticles(id, content) {
				this.loading = true;
				this.$http({
					url: '/api/see/articles',
					method: 'post',
					Authorization: '',
					data: content
				}).
					then((res) => {
						this.loading = false;
						let _res = res.data;
						if (_res.cc === 0) {
							this.articles = _res.data;
							this.total = _res.data.length;
						}else if(_res.cc === 2) {
							window.localStorage.setItem('token_name','');
							this.$store.commit('changeTologout');
							this.$http.defaults.headers.common['Authorization'] = '';
							this.getArticles(undefined, {limit: 5});
						}
						else {
							alert('获取文章失败！')
						}
					})
			},
			//进入文章
			enterArticle(id, page_view_count, user_view_count) {
				this.setViewInfo(id, page_view_count, user_view_count);
				let location = {
					path: `/home/article`,
					name: 'article',
					params: {
						id
					}
				}
				this.$router.push(location)
			},
			//阅读更多
			readmore() {
				let skip = 0;
				this.limit = this.limit + 5;
				let content = {
					skip : skip,
					limit: this.limit
				}
				this.getArticles(undefined, content)
			},
			//设置pv和uv信息
			setViewInfo(id, page_view_count, user_view_count) {
				let t = new MYTime();
				let pv_count = parseInt(page_view_count) + 1;
				let uv_count = parseInt(user_view_count) + 1;
				let content = {
					_id: id
				}
                this.$http({
                    url: '/api/pageview/articles',
                    method: 'put',
                    data: content
                })
                    .then(
                        (res) => {
                            let _res = res.data;
                            if (_res.cc === 0) {
                                // console.log('添加pv成功')
                            } else {
                                // console.log('添加pv失败')
                            }
                        }
                    )				
			}
		},
		filters: {
			delHtmlTag: function (str = '') {
				let html;
				//去掉所有的html标记
				html = str.replace(/<[^>]+>/g, "");
				//去掉&nbsp
				html = html.replace(/&nbsp;*/g, " ");
				return html;
			}
		}
	}
</script>
<style lang="less" scoped>
	#article1 {
		width: 1200px;
		margin: 0 auto;
		/* height: 1000px; */
		/* overflow: hidden; */
	}
	.el-aside-time {		
		padding: 20px;
		background-color: #AAAAAA;
		margin-top:20px;
	}
	.article-container {
		border-top: 1px #F4F4F4 solid;
	}
	.catalog {	
		/* white-space: nowrap; */
		/* text-overflow: ellipsis; */
		overflow: hidden;
		width:580px;
		height: 76px;
		line-height: 25px;
		text-align: left;
		color:#999;
	}
	.font-orange {
		&:hover {
			color: orange;
		}
	}
	.el-pagination {
		padding-top:30px;
	}
    .el-header {
        background-color: #fff;
        color: #333;
        text-align: left;
		line-height: 60px;
		font-size: 30px;
		font-family: "microsoft yahei"
	}
    .el-footer {
        color: #333;
        text-align: left;
        line-height: 60px;
    }	

    .el-main {
        background-color: #fff;
        color: #333;
        line-height: 160px;
	}
	#readmore {
		cursor: pointer;
		background-color: #A5A5A5;
		width:100%;
		line-height: 50px;
		text-align: center;
		border-radius: 20px;
	}
	.rank-list {
		padding: 20px;
	}
	.font-center {
		text-align: center;
	}
	.searchTitle {
		font-size: 24px;
		font-weight: bold;
		color: #333
	}
	.searchContent {
		font-size: 14px;
		color: #FF4400
	}
</style>