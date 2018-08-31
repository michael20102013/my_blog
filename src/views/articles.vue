<template>
	<div class="mainWrapper">
		<el-container>
			<el-main>
				<el-container v-for="(item, index) in articles">
					<el-aside width="100px">
						<div class="el-aside-time">
							{{item.update_time}}
						</div>
					</el-aside>
					<el-main>
						<el-container class="article-container">
							<el-header>
								<span class="hover font-orange" @click ="enterArticle(item._id)">{{item.title}}</span>				
							</el-header>
							<el-main>
								<div class="catalog">
									{{item.content|delHtmlTag}}
								</div>
							</el-main>
						</el-container>
					</el-main>
				</el-container>
				<!-- <el-container>
					<el-footer height=''>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 20, 30, 40]"
								:page-size="3" layout="total, prev, pager, next, jumper" :total="total">
							</el-pagination>
					</el-footer>
				</el-container> -->
				<div id="readmore" @click = "readmore()">阅读更多</div>
			</el-main>
			<el-aside width="200px">排行榜开发中</el-aside>
		</el-container>
		<!-- <el-container v-for="(item, index) in articles">
			<el-header>
				<h1>item.title</h1>
			</el-header>
			<el-main>
				item.content
			</el-main>
			<el-footer></el-footer>
		</el-container> -->
		<!-- <div class="block">
			<span class="demonstration">完整功能</span>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]"
			 :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div> -->
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
			// this.$http.get('http://localhost:3000/api/login').then((res)=>{
			//     this.navs = res.data;
			//     if(res.cc === 0){
			//     	alert("登录成功");
			//     }
			//     else{
			//     	alert("登录失败");
			//     }

			// })
			// .catch((err)=>{
			//     console.log(err);
			// })
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
	.el-header {
		text-align: center;
		line-height: 60px;
	}
	.article-container {
		border-top: 1px #F4F4F4 solid;
		border-bottom: 1px #F4F4F4 solid;
	}
	.catalog {	
		/* white-space: nowrap; */
		/* text-overflow: ellipsis; */
		overflow: hidden;
		width:580px;
		height: 80px;
		line-height: 25px;
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
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
		line-height: 60px;
		font-size: 30px;
		font-family: "microsoft yahei"
	}
    .el-footer {
        background-color: #F5F5D5;
        color: #333;
        text-align: center;
        line-height: 60px;
    }	

    .el-main {
        /* background-color: #E9EEF3; */
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 160px;
	}
	#readmore {
		cursor: pointer;
		background-color: grey;
		width:100%;
		line-height: 50px;
	}
</style>