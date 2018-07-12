<template>
	<div id="header">
		<ul>
			<li>博客数</li>			
			<li v-show="no_login">
				<el-button type="text" @click="dialogFormVisible  = true">
					<span id="login">登录</span>
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
									<el-input auto-complete="off"></el-input>
								  </el-form-item>
								  <el-form-item label="密码" :label-width="formLabelWidth">
										<el-input auto-complete="off"></el-input>
									  </el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
								  <el-button type="primary" @click="dologin" size="medium">登录</el-button>
								</div>
						</el-dialog>
				</el-col>
		</el-row>				
	</div>
</template>
<script>
	export default{
		data(){
			return{
				no_login:true,
				dialogFormVisible: false,
				formLabelWidth: '25%'
			}
		},
		methods: {
			dologin(){
				let data = {
					name:'wcx',
					password:123456
				};
				this.$http({
						url:'/api/login',
						methods:'POST',
						headerS:{

						},
						data:
					data
					}).
					then((res)=>{
				// axios.post('http://localhost:9527/api/login',data).then((res)=>{					
					if(res.cc === 0){
						alert("登录成功");
						this.dialogFormVisible = true;						
					}
					else{
						this.dialogFormVisible = true;	
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