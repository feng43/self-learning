<template>
	<div>
		<pub-header title="注册我的伙伴"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">手机</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">验证码</span>
			<input type="text" class="pct60 bdc h30 bx p5 pl15">
			<button class="bd0 bcf h30 pct30 fr">获取验证码</button>
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">QQ</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">微信</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">邮箱</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">身份证号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<button class="gotoNext pct70 f16 db h45 auto mb20 cf bn br5 mt30" @click="gotoNext(data)">下一步</button>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"

	export default {
		components: {
			pubHeader
		},
		data () {
			return {
				data : {}
			}
		},
		methods: {
			gotoNext (data) {
				console.log(data);
			}
		}

	}
</script>
<style>
	.gotoNext{
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
</style>