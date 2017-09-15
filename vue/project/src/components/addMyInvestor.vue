v<template>
	<div>
		<pub-header title="注册我的投资人"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">会员推荐人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">会员安置人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">所属店铺代码</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb10">
			<span class="db f16 c9">支付方式</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto c9">
			<p class="mb5">账户名<span class="ml20">18632003456</span></p>
			<p>可用余额<span class="ml20">3500</span>元</p>
		</div>
		<button class="gotoNext pct70 f16 db h45 auto mb20 cf bn br5 mt10" @click="gotoNext(data)">提交</button>
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
<style scoped>
	.gotoNext{
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
</style>