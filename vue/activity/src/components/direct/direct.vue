<template>
	<div class="direct">
		<div class="direct-stage">
			<div class="stage-item default arrow-none">
				<span class="text">第一阶段</span>
			</div>
			<div class="stage-item off">
				<span class="text">第一阶段</span>
				<i class="icon"></i>
			</div>
			<div class="stage-item on">
				<span class="text">第一阶段</span>
				<i class="icon"></i>
			</div>
		</div>
		<div class="direct-search">
			<input type="text" class="search-input">
			<button class="search-btn">查询积分</button>
		</div>
		<div class="direct-msg">
			<h2 class="title">TOP50排名</h2>
			<p class="text">2017-12-01--2017-12-15</p>
		</div>
		<div class="direct-table-header">
			<div class="item">姓名</div>
			<div class="item">排名</div>
			<div class="item">积分</div>
		</div>
		<div class="direct-table">
			<div class="table-row">
				<div class="table-cell">张苏</div>
				<div class="table-cell">1</div>
				<div class="table-cell">
					<p>120</p>
					<p class="text">2017-12-01</p>
				</div>
			</div>
			<div class="table-row">
				<div class="table-cell">张苏</div>
				<div class="table-cell">1</div>
				<div class="table-cell">
					<p>120</p>
					<p class="text">2017-12-01</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.direct
		width: 100%
		padding-top: 10px
		font-size: 0
		.direct-stage
			width: 95%
			margin: 0 auto
			padding-left: 4px
			.stage-item
				display: inline-block
				width: 88px
				height: 40px
				line-height: 40px
				position: relative
				.text
					display: inline-block
					width: 58px
					height: 100%
					position: relative
					// left: 24px
					font-size: 14px
				&.default
					top-border(#EACDFF, #CA97EE)
					.text
						center-border(#EACDFF, #CA97EE)
						background: #EACDFF
						outline: 2px solid #CA97EE
						color: #840FDA
					.icon
						bottom-border(#EACDFF, #CA97EE)
					&.arrow-none
						&:before, &:after
							display: none
				&.off
					top-border(#F0F0F0, #E6E6E6)
					.text
						center-border(#F0F0F0, #E6E6E6)
						background: #F0F0F0
						outline: 2px solid #E6E6E6
						color: #999999
					.icon
						bottom-border(#F0F0F0, #E6E6E6)
					&.arrow-none
						&:before, &:after
							display: none
				&.on
					top-border(#840FDA, #840FDA)
					.text
						center-border(#840FDA, #840FDA)
						background: #840FDA
						outline: 2px solid #840FDA
						color: #FFFFFF
					.icon
						bottom-border(#840FDA, #840FDA)
					&.arrow-none
						&:before, &:after
							display: none
		.direct-search
			width: 95%
			height: 60px
			margin: 0 auto
			padding: 15px 0px
			box-sizing: border-box
			.search-input
				height: 30px
				line-height: 30px
				width: 70%
				padding: 10px 8px
				margin-right: 7px
				border: 1px solid #E5E5E5
				font-size: 14px
				box-sizing: border-box
				border-radius: 5px
			.search-btn
				width: 25%
				height: 30px
				line-height: 30px
				background: #840FDA
				color: #FFFFFF
				border: none
				border-radius: 5px
		.direct-msg
			width: 100%
			height: 40px
			text-align: center
			padding: 12px 0
			.title
				font-size: 18px;
				color: #FF8401;
				margin-bottom: 6px
			.text
				font-size: 12px
				color: #999999
		.direct-table-header
			display: flex
			width: 90%
			height: 30px
			line-height: 30px
			margin: 0 auto
			border-bottom: 1px solid #840FDA
			.item
				flex: 1
				font-size: 16px
				color: #333333
				text-align: center
				&:first-child
					text-align: left
				&:last-child
					text-align: right
		.direct-table
			width: 90%
			height: 50px
			padding-top: 10px
			box-sizing: border-box
			margin: 0 auto
			.table-row
				display: flex
				margin-bottom: 20px
				.table-cell
					flex: 1
					font-size: 15px
					color: #333333
					text-align: center
					&:first-child
						text-align: left
					&:last-child
						text-align: right
					.text
						color: #999999
</style>
