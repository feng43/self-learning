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
		<span class="header-rule">活动规则</span>
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
		height: 208px
		background: rgba(0,0,0,.5)
		position: relative
		.header-img
			height: 100%
			width: 100%
			z-index: -2
		.header-bonus
			width: 90%
			height: 62px
			margin: 0 5%
			position: absolute
			bottom: 35px
			.bonus-img
				width: 100%
				height: 100%
			.header-text
				position: absolute
				top: 50%
				left: 70px
				margin-top: -15px
				color: #F22511
				font-weight: bold
				font-size: 30px
				text-shadow: 0px 3px 5px #FF8F84
				.text
					font-size: 20px
					font-weight: bold
			.header-msg
				margin-top: 6px
				text-align: center
				color: #FFFFFF
				font-size: 12px
		.header-rule
			display: inline-block
			width: 80px
			height: 25px
			line-height: 25px
			text-align: center
			border-radius: 35%/100%
			font-size: 14px
			position: absolute
			right: 7px
			top: 26px
			background: linear-gradient(#F17FFF, #A930E6)
			color: #FFFFFF
			box-shadow: 0px 0px 1px 1px rgba(88, 31, 147, 0.3)
</style>
