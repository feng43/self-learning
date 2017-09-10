<template>
	<div>
		<pub-header title="我的伙伴" toLinkText="注册伙伴" toLink="/addPartner"></pub-header>
		<div class="bcf8 p20 ovh infoPanel">
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<span class="db b f22">114</span>
				<span class="f14 c9">发起人</span>
				</p>
			</div>
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<span class="db b f22">114</span>
				<span class="f14 c9">发起人</span>
				</p>
			</div>
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<span class="db b f22">114</span>
				<span class="f14 c9">发起人</span>
				</p>
			</div>
		</div>
		<div class="bcf pt20 pl10 pr10 partnerPanel">
			<p class="f20 b mb10">一级伙伴</p>
			<div class="rel f18 bbc pt10 pb10">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">艾文昌</span>
				<div class="dib abs mr10 c9">
					<span>12</span>
					<img src="../assets/img/right_arrow.png" alt="" class="h10 ml5">
				</div>
			</div>

			<div class="rel f18 bbc pt10 pb10">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">艾文昌</span>
				<div class="dib abs mr10 c9">
					<span>12</span>
					<img src="../assets/img/right_arrow.png" alt="" class="h10 ml5">
				</div>
			</div>
		</div>
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