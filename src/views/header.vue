<template>
	<div id="header">
		<ul>
			<li>博客数</li>			
			<li v-show="no_login">
				<el-button type="text" @click="changeLoginStatus">
					<span id="login">{{loginUser}}</span>
				</el-button>				
			</li>
			<li><span v-if="no_login"></span><span v-else>用户</span></li>
			<li class="logo">
					<span>iWangcx</span>
			</li>			
		</ul>
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
				password:''
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
							let token = _res.bean.token;							
							let payload = jwt.verify(token, secret.sign);
							alert("登录成功");
							this.islogin = true;
							this.dialogFormVisible = false;	
							this.loginUser = _res.name;
							this.addToken(token);					
						}
						else{
							this.dialogFormVisible = false;	
							alert("登录失败");
						}

					})
				}
			},
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
				this.$http.interceptors.request.use(
					config =>{
						if(token){
							config.headers.token = `${token}`;
						}else{}
						return config
					},
					err =>{
						return Promise.reject(err);
					}
				)				
			}			
		}
	}
</script>
<style lang="less" scoped>
	#header{
		line-height: 50px;
		font-family: Microsoft YaHei;
		background-color: #32373b;
		color: white;
		height: 50px;
		ul{
			overflow: hidden;
			li{
				float: right;
				margin-right: 50px;
				list-style: none;
			}
		}
		#login{
			color:#fff;
			font-size: 14px;
			&:hover{
				color:#00C1DE
			}			
		}
	}
	.logo{
		font-family: yahei;
		font-weight: bold;
		font-size: 16px;
		line-height: 50px;
		margin-left: 50px;
		float: left !important;
	}
</style>