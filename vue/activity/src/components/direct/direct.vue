<template>
	<div class="direct">
		<div class="overflowhidden">
			<div class="direct-stage">
				<div class="stage-list">
					<!-- <div class="stage-item default arrow-none">
						<span class="text">第一阶段</span>
					</div>
					<div class="stage-item off">
						<span class="text">第一阶段</span>
						<i class="icon"></i>
					</div>
					<div class="stage-item on">
						<span class="text">第一阶段</span>
						<i class="icon"></i>
					</div> -->
					<div v-for="(stage, index) in stageList" class="stage-item" :class="[stage.type,index == 0?'arrow-none':'']" @click="getTop50Integral(index + 1, 'click')">
						<span class="text">{{stage.name}}</span>
						<i class="icon" v-if="index != 0"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="direct-search">
			<input type="text" class="search-input" placeholder="请输入您的手机号查询积分" v-model="mobile">
			<i class="close-icon" v-if="mobile" @click="getTop50Integral(currentStage)">×</i>
			<button class="search-btn" @click="getUmbrellaByMobile">查询积分</button>
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
			<div class="table-row" v-for="item in topIntegralList">
				<div class="table-cell">{{item.real_name}}</div>
				<div class="table-cell">{{item.rownum}}</div>
				<div class="table-cell">
					<p>{{item.stage_total}}</p>
					<p class="text">{{item.stage_update_time}}</p>
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
				newCurrentStage : "",
				topIntegralList : "",
				mobile : "",
				stageList : [
					{
						name: "第一阶段",
						type: "off",
						time: ""
					},{
						name: "第二阶段",
						type: "off",
						time: ""
					},{
						name: "第三阶段",
						type: "off",
						time: ""
					},{
						name: "第四阶段",
						type: "off",
						time: ""
					},{
						name: "第五阶段",
						type: "off",
						time: ""
					},{
						name: "第六阶段",
						type: "off",
						time: ""
					},{
						name: "第七阶段",
						type: "off",
						time: ""
					},

				]
			}
		},
		created() {
			this.getCurrentStageOfIntegral()
		},
		methods: {
			// 获取当前阶段
			getCurrentStageOfIntegral() {
				this.$axios.get('/hyysActivity/pub/getCurrentStageOfIntegral').then((response) => {
					if( response.data.status == ERR_OK ){
						this.currentStage = response.data.data;
						this.newCurrentStage = response.data.data;
						this.stageList[response.data.data - 1].type = "on";
						for(var i = 0; i < response.data.data - 1; i++){
							this.stageList[i].type = "default";
						};
						this.getTop50Integral(response.data.data);
					} else {
						alert(response.data.message);
					};
				}).catch( (error) => {
					alert("出错了,请稍后重试");
					console.log(error);
				});
			},
			getTop50Integral( id, type ) {
				if( id > this.currentStage){
					alert("当前阶段尚未开启");
					return false;
				};
				this.$axios.get('/hyysActivity/pub/getTop50Integral?stageNumber=' + id).then((response) => {
					if( response.data.status == ERR_OK ){
						this.topIntegralList = response.data.data;
						this.newCurrentStage = id;
						this.mobile = "";
						if( type == "click" ){
							for(var i = 0; i < this.currentStage; i++){
								this.stageList[i].type = "default";
							};
							this.stageList[id - 1].type = "on";
						};
						console.log(this.stageList);
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
				this.$axios.get('/hyysActivity/pub/getIntegralByMobile?stageNumber=' + this.newCurrentStage + '&mobile=' + this.mobile).then((response) => {
					console.log(response);
					if( response.data.status == ERR_OK ){
						this.topIntegralList = response.data.data;
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
	.direct
		width: 100%
		padding-top: 10px
		font-size: 0
		.overflowhidden
			height: 50px
		.direct-stage
			width: 95%
			height: 60px
			line-height: 60px
			margin: 0 auto
			padding-left: 4px
			overflow-x: scroll
			overflow-y: hidden
			.stage-list
				width: 620px
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
						font-size: 12px
</style>
