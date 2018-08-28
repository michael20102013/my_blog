<template>
	<div id="article1">
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
								{{item.title}}
							</el-header>
							<el-main>
								<div class="catalog">
									{{item.content|delHtmlTag}}
								</div>
							</el-main>
						</el-container>
					</el-main>
				</el-container>
				<el-container>
					<el-footer>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
								:page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
							</el-pagination>
						</div>
					</el-footer>
				</el-container>
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
				articles: []
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
			this.getArticles();
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			},
			//获取文章
			getArticles() {
				this.$http({
					url: '/api/see/articles',
					methods: 'GET'
				}).
					then((res) => {
						let _res = res.data;
						if (_res.cc === 0) {
							this.articles = _res.data;
						} else {
							alert('获取文章失败！')
						}
					})
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
<style lang="less">
	#article1 {
		width: 1000px;
		margin: 0 auto;
		height: 1000px;
		
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
		height: 80px;;

	}
</style>