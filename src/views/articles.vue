<template>
	<div id="article1">
		<el-container v-for="(item, index) in articles">
			<el-header>
				
			</el-header>
			<el-main>2</el-main>
			<el-footer>3</el-footer>
		</el-container>
		<div class="block">
				<span class="demonstration">完整功能</span>
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
				</el-pagination>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                total:0,//默认数据总数
                pagesize:7,//每页的数据条数
                currentPage:1//默认开始页面				
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
		},
		methods:{
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			}			
		}
	}
</script>
<style lang="less">
</style>