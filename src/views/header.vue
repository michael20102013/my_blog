<template>
	<div id="header">	
		<ul class="right">
			<li>
				<span class="writeText" @click="write">{{writeText}}</span>				
			</li>			
			<li>
				<span class="login" @click="changeLoginStatus">{{loginUser}}</span>
			</li>
		</ul>
		<div class="logo">
			<span>iWangcx</span>
		</div>		
		<ul class="center">
			<li v-for = "(item, index) in navs" :class="{active:dealLink(item.link) === selectIndex}" @click="setIndex(index, item.link)">{{item.name}}</li>		
		</ul>			
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
	const secret = require('../../server/config/secret.json');
	export default{
		data(){
			return{
				dialogFormVisible: false,
				formLabelWidth: '25%',
				loginUser:window.localStorage.getItem('token_name') ? JSON.parse(window.localStorage.getItem('token_name')).name : '登陆',
				loginText:'登录',
				islogin:this.$store.state.islogin,
				password:'',
				userName:'',	
				writeText:"写文章",
				isActive:true,
				selectIndex: '/home/articles',
				navs:[{
					name:'首页',
					link:'/article1'
				}, {
					name:'技术',
					link:'/article2'
				}, {
					name:'专题',
					link:'/home/subject'
				}, {
					name:'作品',
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
		created(){
			this.loginUser = this.islogin ? this.loginUser : '登陆';
			this.selectIndex = location.href.split('#')[1] === '/home/article' ? '/home/articles' : location.href.split('#')[1];
		},
		methods: {
			dologin(){
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
							alert('登出失败')
						}
						else if(_res.cc === 0){
							alert("登出成功");
							this.islogin = false;
							this.$store.commit('changeTologout');
							this.dialogFormVisible = false;	
							// this.userName = '登录';
							this.loginUser = '登陆';
							window.localStorage.removeItem('token_name');
						}
						else{
							this.dialogFormVisible = false;	
							alert("登出失败");
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
							let payload = jwt.verify(token, secret.sign);
							alert("登录成功");
							this.islogin = true;
							this.$store.commit('changeTologin');
							this.dialogFormVisible = false;	
							this.loginUser = _res.name;
							token = 'Bearer ' + token;
							this.addToken(token);
							window.localStorage.setItem('token_name', JSON.stringify({token:token,name:this.userName}));
						}
						else{
							this.dialogFormVisible = false;	
							alert("登录失败");
						}

					})
				}
			},
			//改变登录状态
			changeLoginStatus(){
				this.dialogFormVisible  = true;
				if(this.islogin){
					this.loginText = '登出'
				}else{
					this.loginText = '登录'
				}
			},
			//写文章
			write(){
				if(this.islogin === false){
					alert("请先登录")
				}else{
					let location = '/write'
					this.$router.push(location)
				}
			},
			addToken(token){
				this.$http.defaults.headers.common['Authorization'] = token;
			},
			setIndex(num, link) {
				this.selectIndex = link;
				let location = link;
				this.$router.push(location);
			},
			dealLink(link) {
				if(link === '/home/article') {
					return '/home/articles'
				}else{
					return link;
				}
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
		overflow: hidden;
		line-height: 50px;
		font-family: Microsoft YaHei;
		background-color: #32373b;
		color: white;
		height: 50px;		
		.center {
			margin:auto;
			width: 500px;
			position: relative;
			overflow: hidden;
			li{
				float: left;
				position: relative;
				/* margin-right: 20px; */
				list-style: none;
				width: 80px;
				text-align: center;
			}
			li:hover {
				cursor: pointer;
				background-color: #fff;
				color: black;
			}
		}
		.right{
			float: right;
			width: 200px;
			overflow: hidden;
			li{
				float: right;
				margin-right: 50px;
				list-style: none;
			}
		}
		.login{
			color:#fff;
			font-size: 14px;
			&:hover{
				color:#00C1DE;
				cursor: pointer;
			}			
		}
		.writeText{
			color:#fff;
			font-size: 14px;
			&:hover{
				color:#00C1DE;
				cursor: pointer;
			}			
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
		margin-left: 50px;
		float: left;
	}
	.active {
		background-color: #fff;
		color:black;
	} 
</style>