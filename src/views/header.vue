<template>
	<div id="header">
		<ul>
			<li>博客数</li>
			<li>注册</li>
			<li>登录</li>
			<li>用户</li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style lang="less" scoped>
	#header{
		line-height: 50px;
		font-family: Microsoft YaHei;
		background-color: #32373b;
		height: 50px;
		ul{
			li{
				color: white;
				float: right;
				margin-right: 50px;
				list-style: none;
			}
		}
	}
</style>