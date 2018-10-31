<template>
	<div class="mainWrapper">
		<el-container>
			<el-main>
				<el-container v-for="(item, index) in articles">
					<el-main>
						<el-container class="article-container">
							<el-header>
								<span class="hover font-orange" @click ="enterArticle(item._id)">{{item.title}}</span>				
							</el-header>
							<el-main>
								<!-- <div class="catalog" v-html = item.content> -->
								<div class="catalog">{{item.content | delHtmlTag}}
								</div>
							</el-main>					
							<el-footer>
								<span>更新时间：{{item.update_time}}</span> 
							</el-footer>
						</el-container>
					</el-main>

				</el-container>
				<div id="readmore" @click = "readmore()">阅读更多</div>
			</el-main>
			<el-aside width="200px">排行榜开发中</el-aside>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				total: 0,//默认数据总数
				pagesize: 7,//每页的数据条数
				currentPage: 1,//默认开始页面	
				articles: [],
				limit: 3
			}
		},
		created() {
			let content = {
				limit: 3
			}
			this.getArticles(undefined, content);
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
				let skip = (val-1) * 3;
				let content = {
					skip : skip,
					limit: this.limit
				}
				this.getArticles(undefined, content)

			},
			//获取文章
			getArticles(id, content) {
				this.$http({
					url: '/api/see/articles',
					method: 'post',
					data: content
				}).
					then((res) => {
						let _res = res.data;
						if (_res.cc === 0) {
							this.articles = _res.data;
							this.total = _res.data.length;
						} else {
							alert('获取文章失败！')
						}
					})
			},
			enterArticle(id) {
				let location = {
					path: `/home/article`,
					name: 'article',
					params: {
						id
					}
				}
				this.$router.push(location)
			},
			readmore() {
				let skip = 0;
				this.limit = this.limit + 3;
				let content = {
					skip : skip,
					limit: this.limit
				}
				this.getArticles(undefined, content)				
			}
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
		background-color: grey;
		width:100%;
		line-height: 50px;
		text-align: center;
	}
</style>