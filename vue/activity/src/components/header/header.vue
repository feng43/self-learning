<template>
	<div class="header">
		<img src="" alt="" class="header-img">
		<div class="header-bonus"></div>
		<span class="header-rule">活动规则</span>
	</div>
</template>

<script>
    export default {}
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
		.header-bonus
			width: 90%
			height: 45px
			margin: 0 5%
			position: absolute
			bottom: 40px
			border: 1px solid #000
		& > .header-rule
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
