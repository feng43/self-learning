<template>
	<div class="header">
		<img src="./banner.png" alt="" class="header-img">
		<div class="header-bonus">
			<img src="./money.png" alt="" class="bonus-img">
			<p class="header-text">
				{{headerData.totalJackpot}}
				<span class="text">元</span>
			</p>
			<p class="header-msg">终极大奖按奖金池的一定比例设置发放</p>
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			headerData : Object
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.header
		width: 100%
		background: rgba(0,0,0,.5)
		position: relative
		.header-img
			width: 100%
			z-index: -2
		.header-bonus
			width: 100%
			text-align: center
			position: absolute
			bottom: 10%
			.bonus-img
				width: 50%
			.header-text
				width: 100%
				position: absolute
				top: 40%
				margin-top: -30px
				color: #F22511
				font-weight: bold
				font-size: 60px
				text-shadow: 0px 3px 5px #FF8F84
				.text
					font-size: 30px
					font-weight: bold
			.header-msg
				margin-top: 20px
				text-align: center
				color: #FFFFFF
				font-size: 24px
</style>
