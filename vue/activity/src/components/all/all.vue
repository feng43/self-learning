<template>
	<div class="add">
		<div class="add-search">
			<input type="text" class="search-input" placeholder="请输入您的手机号查询积分" v-model="mobile">
			<i class="close-icon" v-if="mobile" @click="getTop50Umbrella(currentStage)">×</i>
			<button class="search-btn" @click="getUmbrellaByMobile">查询积分</button>
		</div>
		<div class="add-table-header">
			<div class="item">姓名</div>
			<div class="item">排名</div>
			<div class="item">积分</div>
		</div>
		<div class="add-table">
			<div class="table-row" v-for="item in umbrellaList">
				<div class="table-cell">{{item.real_name}}</div>
				<div class="table-cell">{{item.rownum}}</div>
				<div class="table-cell">
					<p>{{item.umbrella_total}}</p>
					<p class="text">{{item.umbrella_update_time}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//请求ok的状态码
	const ERR_OK = 1;
    export default {
		data () {
			return {
				currentStage : "",
				umbrellaList : "",
				mobile : ""
			}
		},
		created() {
			this.getTop50Umbrella()
		},
		methods: {
			getTop50Umbrella() {
				this.$axios.get('/hyysActivity/pub/getTop50Umbrella').then((response) => {
					console.log(response);
					if( response.data.status == ERR_OK ){
						this.umbrellaList = response.data.data;
						this.mobile = "";
					} else {
						alert(response.data.message);
					};
				}).catch( (error) => {
					alert("出错了,请稍后重试");
					console.log(error);
				});
			},
			getUmbrellaByMobile() {
				var reg = /^1[0-9]{10}$/;
				if(!reg.test(this.mobile)){
					alert("请输入11位手机号");
					return false;
				};
				this.$axios.get('/hyysActivity/pub/getUmbrellaByMobile?mobile=' + this.mobile).then((response) => {
					console.log(response);
					if( response.data.status == ERR_OK ){
						this.umbrellaList = response.data.data;
					} else {
						alert(response.data.message);
					};
				}).catch( (error) => {
					alert("出错了,请稍后重试");
					console.log(error);
				});
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/index.styl"
	.add
		width: 100%
		padding-top: 10px
		font-size: 0
		.add-search
			width: 95%
			height: 60px
			margin: 0 auto
			padding: 15px 0px
			box-sizing: border-box
			position: relative
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
			.close-icon
				height: 16px
				width: 16px
				display: inline-block
				position: absolute
				top: 50%
				right: 115px
				margin: -8px 0
				color: #000
				z-index: 9
				font-size: 14px
				text-align: center
				line-height: 16px
				border-radius: 50%
				background: rgba(0,0,0,.2)
			.search-btn
				width: 25%
				height: 30px
				line-height: 30px
				background: #840FDA
				color: #FFFFFF
				border: none
				border-radius: 5px
		.add-table-header
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
		.add-table
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
						font-size: 12px
</style>
