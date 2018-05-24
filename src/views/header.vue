<template>
	<div id="header">
		<ul>
			<li>博客数</li>
			<li v-show="no_login">登录</li>
			<li><span v-if="no_login"></span><span v-else>用户</span></li>
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
				no_login:true
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
	}
	.logo{
		font-family: yahei;
		font-weight: bold;
		font-size: 16px;
		line-height: 50px;
		margin-left: 50px;
	}
</style>