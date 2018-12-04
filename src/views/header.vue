<template>
	<div id="header">
		<div class="nav-limit">
			<div class="logo">
				<span>iWangcx</span>
			</div>			
			<a href="#" class="right">
				<span class="login" @click="changeLoginStatus">{{loginUser}}</span>
				<span class="writeText" @click="write">{{writeText}}</span>	
			</a>	
			<div id="menu">
				<ul class="center">
					<li v-for = "(item, index) in navs" :class="{active:dealLink(item.link) === selectIndex, 'menu-hover': true}" @click="setIndex(index, item.link)">{{item.name}}</li>
					<li class="search">
						<el-autocomplete
						v-model="keyword"
						:fetch-suggestions="querySearchAsync"
						placeholder="请输入内容"
						@select="handleSelect"
						:trigger-on-focus="false"
						class=""
						id="search"
						></el-autocomplete>
						<a href="#" @click="showSearchResults">
							<i class="search-icon fa fa-search"></i>
						</a>
					</li>
				</ul>						
			</div>
		</div>
		<!-- 对话框组件-start -->
		<el-row>
				<el-col :span="12">
						<el-dialog title="" :visible.sync="dialogFormVisible" width="20%" :center = 'true'>
								<el-form>
								  <el-form-item label="用户名" :label-width="formLabelWidth">
									<el-input auto-complete="off" v-model = "userName"></el-input>
								  </el-form-item>
								  <el-form-item label="密码" :label-width="formLabelWidth">
										<el-input auto-complete="off" v-model = "password" type="password"></el-input>
									  </el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
								  <el-button type="primary" @click="dologin(userName, password)" size="medium">{{loginText}}</el-button>
								</div>
						</el-dialog>
				</el-col>
		</el-row>
		<!-- 对话框组件-end -->		
	</div>
</template>
<script>
	import Qs from 'qs';
	import jwt from 'jsonwebtoken';
	export default{
		data() {
			return{
				dialogFormVisible: false,
				formLabelWidth: '25%',
				loginUser:this.$store.state.username,
				loginText:this.$store.state.islogin ? '登出' : '登录',
				islogin:this.$store.state.islogin,
				password:'',
				userName:'',	
				writeText:"写文章",
				isActive:true,
				selectIndex: '/home/articles',
				keyword: '',
				targetArr: [],
				articles: [],
				navs:[{
					name:'首页',
					link:'/article1'
				}, {
					name:'工具',
					link:'/article2'
				}, {
					name:'专题',
					link:'/home/subject'
				}, {
					name:'项目',
					link:'/article4'
				}, {
					name:'文章',
					link:'/home/articles'
				}, {
					name:'技能体系',
					link:'/home/knowledge_topo'
				}]
			}
		},
		created() {
			this.selectIndex = location.href.split('#')[1] === '/home/article' ? '/home/articles' : location.href.split('#')[1];
			this.getArticles();			
		},
		computed: {
			watchIsLogin() {
				return this.$store.state.islogin;
			},
			watchUserName() {
				return this.$store.state.username;
			}
		},
		watch: {
			watchIsLogin(curVal, oldVal) {
				this.islogin = curVal;
			}, 
			watchUserName(curVal, oldVal) {
				this.loginUser = curVal;
			}
		},
		mounted() {

		},
		methods: {
			dologin() {
				let _data = {};
				if(this.islogin){
					this.$http({
							url:'/api/login_out',
							method:'POST',
							data:Qs.stringify(_data)
						}).
						then((res)=>{
						let _res = res.data
						if(res.cc === 401){
							this.islogin = false;
							setTimeout(() => {
								this.$message({
									message: '登出失败!',
									type: 'error',
									duration: 1000
								});
							}, 200)
						}
						else if(_res.cc === 0){
							setTimeout(() => {
								this.$message({
									message: '登出成功!',
									type: 'success',
									duration: 1000
								});
							}, 200)
							this.islogin = false;
							this.$store.commit('changeTologout');
							this.dialogFormVisible = false;	
							// this.userName = '登录';
							this.loginUser = '登陆';
							window.localStorage.removeItem('token_name');
						}
						else{
							this.dialogFormVisible = false;	
							setTimeout(() => {
								this.$message({
									message: '登出失败!',
									type: 'error',
									duration: 1000
								});
							}, 200)
							this.islogin = false;
						}

					})
				}else{
					this.loginText = '登录中'
					let _data = {
						name:this.userName,
						password:this.password
					};
					this.$http({
							url:'/api/login',
							method:'POST',
							data:Qs.stringify(_data)
						}).
						then((res)=>{
						let _res = res.data;
						if(_res.cc === 0){
							let token = _res.token;
							setTimeout(() => {
								this.$message({
									message: '登录成功!',
									type: 'success',
									duration: 1000
								});
							}, 200)						
							this.islogin = true;
							this.$store.commit('changeTologin');
							this.dialogFormVisible = false;	
							this.loginUser = _res.name;
							token = 'Bearer ' + token;
							this.addToken(token);
							window.localStorage.setItem('token_name', JSON.stringify({token:token,name:this.userName}));
							this.$http.defaults.headers.common['Authorization'] = token;
							this.$store.commit('changeName', this.loginUser)
						}
						else{
							this.dialogFormVisible = false;	
							this.$message({
                                message: '登录失败!',
                                type: 'error',
                                duration: 2000
                            });
						}

					})
				}
			},
			//改变登录状态
			changeLoginStatus() {
				this.dialogFormVisible  = true;
				if(this.$store.state.islogin){
					this.loginText = '登出'
				}else{
					this.loginText = '登录'
				}
			},
			//写文章
			write() {
				if(this.islogin === false){
					this.$message({
						message: '请先登录!',
						type: 'warning',
						duration: 2000
					});					
				}else{
					let location = '/write'
					this.$router.push(location)
				}
			},
			addToken(token) {
				this.$http.defaults.headers.common['Authorization'] = token;
			},
			setIndex(num, link) {
				this.selectIndex = link;
				let location = link;
				this.$router.push(location);
				if(link === '/home/articles') {
					this.$store.commit('hideSearch');
				}
			},
			dealLink(link) {
				if(link === '/home/article') {
					return '/home/articles'
				}else{
					return link;
				}
			},
			//查询搜索提示
			querySearchAsync(queryString, cb) {
				let articles = this.articles;
				let results = queryString ? articles.filter(this.createFilter(queryString)) : articles;
				let finalResults = [];
				results.forEach((item, index) => {
					let obj = {
						value: item.title
					}
					Object.assign(item, obj);
					finalResults.push(item)
				});
				//限制显示长度
				let limit = finalResults.length < 5 ? finalResults.length : 5;
				this.targetArr = [];
				for(let i = 0; i < limit; i++) {
					this.targetArr.push(finalResults[i])
				}
				// 调用 callback 返回建议列表的数据
				cb(this.targetArr);
			},
			//文章关键字过滤
			createFilter(queryString) {
				return (article) => {
					//内容或者标题匹配就返回
					return (article.title.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 || article.html_content.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 );
				};				
			},
			//选中提示搜索
			handleSelect(item) {
				this.showSearchResults()
			},
			//获取文章
			getArticles() {
				this.loading = true;
				this.$http({
					url: '/api/see/articles',
					method: 'post',
					Authorization: '',
					data: {}
				}).
					then((res) => {
						let _res = res.data;
						if (_res.cc === 0) {
							this.articles = _res.data;
						}else if(_res.cc === 2) {
							window.localStorage.setItem('token_name','');
							this.$store.commit('changeTologout');
							this.$http.defaults.headers.common['Authorization'] = '';
						}
						else {
							this.$message({
                                message: '获取文章失败！!',
                                type: 'error',
                                duration: 2000
                            });							
						}
					})
			},
			//显示搜索结果
			showSearchResults() {
				this.$store.commit('showSearch');
				this.$store.commit('showSearchArticles', this.targetArr);
				this.selectIndex = '/home/articles';
				let location = '/home/articles';
				this.$router.push('/home/articles');
			}			
		}
	}
</script>
<style lang="less" scoped>
	.router-link-active {
		text-decoration: none;
	}
	a{
		text-decoration: none;
		color:#fff; 
	}	
	#header{
		position: relative;
		overflow: hidden;
		/* line-height: 50px; */
		font-family: Microsoft YaHei;
		background-color: #fff;
		color: #303133;
		height: 50px;
		border-bottom: 1px #F4F4F4 solid;
		min-width: 1280px;
		#menu {
			overflow: hidden;
			width:1000px;
			margin: 0 auto;
		}	
		.center {
			float:left;
			width: 800px;
			position: relative;
			overflow: hidden;
			padding-left: 20px;
			li{
				float: left;
				position: relative;
				list-style: none;
				width: 80px;
				text-align: center;
				list-style: none;
				line-height:50px;
			}
		}
		.right{
			float: right;
			width:100px;
			line-height: 50px;
		}
		.login{
			color:#303133;
			font-size: 14px;
			margin-right: 15px;
			&:hover{
				color:#00C1DE;
				cursor: pointer;
			}			
		}
		.writeText{
			color:#333;
			font-size: 14px;
			&:hover{
				color:#00C1DE;
				cursor: pointer;
			}		
		}
		.nav-limit {
			max-width: 1440px;
			min-width: 768px;
			margin: 0 auto;
			overflow: hidden;
		}
	}
	.nav{
		width: 800px;
		min-width: 300px;;
	}
	.logo{
		font-family: yahei;
		font-weight: bold;
		font-size: 16px;
		line-height: 50px;
		float: left;
		color:#E6A23C;
		width: 100px;
	}
	.active {
		background-color: #F5F5F5;
		color:black;
	}
	.menu-hover:hover{
		color:rgb(8, 8, 8);
		cursor: pointer;
		background-color:#F5F5F5;
	}
	.search {
		float:right !important;
		width: 260px !important;
		line-height: 50px;
		a {
			position: absolute;
			top: 9px;
			right: 37px;
			line-height: normal!important;
			padding: 0!important;
			color: #969696!important;
			text-align: center;
		}	
	}
	.search-input {
		font-size: 14px;
		border: 1px solid #eee;
		border-radius: 40px;
		background: #eee;
		width: 240px;
		line-height: 30px;
		box-sizing: border-box;
		padding-left: 15px;
		outline: none;
		color:#909399;
		position: relative;
		&::-webkit-input-placeholder {
			color:#909399;
		}
	}
	.search-icon {
		margin-top: 8px;
		margin-left: -7px;
		&:before {
			opacity: 1;
		}
	}
</style>