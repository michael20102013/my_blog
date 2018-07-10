<template>
	<div id="header">
		<ul>
			<li>博客数</li>			
			<li v-show="no_login" @click="login" class="loginBtn">
				<el-button type="text" @click="dialogVisible = true">登录</el-button>				
			</li>
			<li><span v-if="no_login"></span><span v-else>用户</span></li>

			<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
			</el-dialog>			
		</ul>
		<div class="logo">
			<span>iWangcx</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				no_login:true,
				dialogVisible: false
			}
		},
		methods: {
			login(){
				this.$http.post('http://localhost:9527/api/login').then((res)=>{
					if(res.cc === 0){
						alert("登录成功");
					}
					else{
						alert("登录失败");
					}

				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
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
			li{
				float: right;
				margin-right: 50px;
				list-style: none;
			}
		}
		.loginBtn{
			span{
				color:#fff !important;
			}
			cursor:pointer;
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
	}
</style>