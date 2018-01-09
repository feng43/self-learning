<template>
	<div class="add">
		<div class="add-search">
			<input type="text" class="search-input" placeholder="请输入您的手机号查询积分" v-model="mobile">
			<i class="close-icon" v-if="mobile" @click="getTop50Umbrella(currentStage)">×</i>
			<button class="search-btn" @click="getUmbrellaByMobile">查询积分</button>
		</div>
		<div class="add-table">
			<el-table
				v-if="umbrellaList"
				:data="umbrellaList"
				style="width: 98%;margin: 0 auto;"
				height="500"
				border>
					<el-table-column
						prop="rownum"
						label="排名">
					</el-table-column>
					<el-table-column
						prop="real_name"
						label="会员">
					</el-table-column>
					<el-table-column
						prop="mobile"
						label="手机">
					</el-table-column>
					<el-table-column
						prop="umbrella_total"
						label="分数">
					</el-table-column>
					<el-table-column
						prop="umbrella_update_time"
						label="日期">
					</el-table-column>
			</el-table>
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
			width: 98%
			height: 70px
			margin: 0 auto
			padding: 15px 0px
			box-sizing: border-box
			position: relative
			text-align: left
			.search-input
				height: 40px
				line-height: 40px
				width: 280px
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
				left: 250px
				margin: -8px 0
				color: #000
				z-index: 9
				font-size: 14px
				text-align: center
				line-height: 16px
				border-radius: 50%
				background: rgba(0,0,0,.2)
			.search-btn
				width: 115px
				height: 40px
				line-height: 40px
				background: #840FDA
				color: #FFFFFF
				border: none
				border-radius: 5px
		.add-table
			padding-bottom: 150px
</style>
