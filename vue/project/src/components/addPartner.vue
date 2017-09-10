<template>
	<div>
		<pub-header title="注册我的伙伴"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">伙伴姓名</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.name">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">成员编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.no">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">会员昵称</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.nick">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">推荐人手机号/编码</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.tel">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">成员类型</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.type">
		</div>
		<button class="pct70 f16 db h45 auto mb20 cf bn br5 mt30" @click="gotoNext(data)">下一步</button>
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
	button{
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
</style>