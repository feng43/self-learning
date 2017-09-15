<template>
	<div class="bcf8 h100">
		<pub-header title="银行卡"></pub-header>
		<div class="bcf mt10">
			<div class="p10 btc bbc">
				<span class="mr10 f16">开户名</span>
				<input type="text">
			</div>
		</div>
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
				hasCard : false
			}
		}
	}
</script>
<style scoped>

</style>