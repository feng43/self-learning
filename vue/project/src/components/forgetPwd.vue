<template>
	<div class="bcf rel">
		<pub-header title="找回密码"></pub-header>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">手机号</span>
			<input type="text" placeholder="请输入手机号" class="ml10 bn on pct50">
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">新密码</span>
			<input type="text" placeholder="请输入新密码" class="ml10 bn on pct50">
		</div>
		<div class="pct60 f18 mt20 p10 bbc bx dib rel panel">
			<span class="dib pr10 brc">验证码</span>
			<input type="text" placeholder="请输入验证码" class="ml10 bn on pct50">
			<button class="abs h30 bcf br5">获取验证码</button>
		</div>
		<button class="loginBtn pct70 f16 db h45 auto mb20 cf bn br5 mt30">确认</button>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"

	export default {
		components: {
			pubHeader
		}
	}
</script>
<style>
	.panel{
		margin-left: 7%;
	}
	button{
		bottom: 20%;
    	right: -40%;
    	color: #54ADF3;
    	border: 1px solid #54ADF3;
	    outline: none;
	}
	.loginBtn{
		background: #54ADF3;
	}
</style>