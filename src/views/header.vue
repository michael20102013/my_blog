<template>
	<div id="header">	
		<ul class="right">
			<li>
				<span class="writeText" @click="write">{{writeText}}</span>				
			</li>			
			<li v-show="no_login">
				<span class="login" @click="changeLoginStatus">{{loginUser}}</span>
			</li>
			<li><span v-if="no_login"></span><span v-else>用户</span></li>		
		</ul>
		<div class="logo">
			<span>iWangcx</span>
		</div>		
		<ul class="center">
			<li><router-link to="/article1">首页</router-link></li>
			<li><router-link to="/article2">技术</router-link></li>
			<li><router-link to="/article3">专题</router-link></li>
			<li><router-link to="/article4">作品</router-link></li>
			<li><router-link to="/article5">文章</router-link></li>			
			<li><router-link to="/article6">更多</router-link></li>			
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
				no_login:true,
				dialogFormVisible: false,
				formLabelWidth: '25%',
				loginUser:'登录',
				loginText:'登录',
				islogin:false,
				userName:'',
				password:'',
				activeIndex: '1',
				activeIndex2: '1',
				writeText:"写文章"			
			}
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
							alert('登出失败')
						}
						else if(_res.cc === 0){
							alert("登出成功");
							this.islogin = false;
							this.dialogFormVisible = false;	
							this.loginUser = '登录';
						}
						else{
							this.dialogFormVisible = false;	
							alert("登出失败");
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
						// window.sessionStorage.setItem('token', token);
						// console.log(window.sessionStorage.getItem('token'));
						if(_res.cc === 0){
							let token = _res.token;							
							let payload = jwt.verify(token, secret.sign);
							alert("登录成功");
							this.islogin = true;
							this.dialogFormVisible = false;	
							this.loginUser = _res.name;
							token = 'Bearer ' + token;
							this.addToken(token);	
						}
						else{
							this.dialogFormVisible = false;	
							alert("登录失败");
						}

					})
				}
			},
			//对话框关闭事件
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
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
			//在请求头上加上token
			addToken(token){
				this.$http.defaults.headers.common['Authorization'] = token;
			},
			//导航事件
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			//写文章
			write(){
				if(this.islogin === false){
					alert("请先登录")
				}else{
					console.log(this.$store.state.isContentShow)
					let location = '/article2'
					this.$router.push(location)
					this.$store.commit('hideContent');
					console.log(this.$store.state.isContentShow)
				}
			}			
		}
	}
</script>
<style lang="less" scoped>
	.router-link-active {
		text-decoration: none;
	}
	#header{
		line-height: 50px;
		font-family: Microsoft YaHei;
		background-color: #32373b;
		color: white;
		height: 50px;
		a{
			text-decoration: none;
			color:#fff; 
		}
		a:hover{
			color:#00C1DE;
		}		
		.right{
			float: right;
		}
		.center{
			margin:auto;
			width: 500px;
			position: relative;
			overflow: hidden;
			li{
				float: left;
				position: relative;
			}
		}
		ul{
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
</style>