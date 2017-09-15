<template>
	<div class="bcf8 h100">
		<pub-header :title="title" toLinkText="注册伙伴" toLink="/addPartner"></pub-header>
		<div class="bcf pl10 pr10 partnerPanel">
			<div class="rel f18 bbc">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">艾文昌</span>
			</div>

			<div class="rel f18 bbc">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">艾文昌</span>
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
				title : "艾文昌"
			}
		}
	}
</script>
<style scoped>
	.infoPanel div{
		height: 75px;
		margin-left: 2%;
		box-shadow: 0 0 8px #66A8FF;
	}
	.infoPanel p{
		top: 50%;
		transform: translate(0, -50%);
	}
	.partnerPanel > div{
		height: 50px;
	}
	.partnerPanel span{
		height: 100%;
	}
	.partnerPanel > div div{
		top: 50%;
		right: 0;
	    margin-top: -10px;
	}
</style>