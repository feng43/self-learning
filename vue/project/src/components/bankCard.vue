<template>
	<div class="bcf8 h100">
		<pub-header title="银行卡" toLinkText="修改卡" toLink="/editCard"></pub-header>
		<div class="pct90 auto rel cardPanel">
			<p class="dib abs f18 cf" v-text="acctNo">
				<!-- <span class="mr20">****</span>
				<span class="mr20">****</span>
				<span class="mr20">****</span>
				<span>5425</span> -->
			</p>
		</div>

		<div v-show="hasCard" class="noCard tc pct100 bcf8">
			<img src="../assets/img/bank_n.png" alt="" class="pct50">
			<span class="db">没有绑定银行卡</span>
			<button class="bcf8 pct30 mt50" @click="gotoEditCard()">＋ 绑定银行卡</button>
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
				hasCard : true,
				acctNo : ""
			}
		},
		activated(){
			this.getBankCard();
		},
		methods : {
			getBankCard () {
				this.$http.post("/huiyimember/web/integral/queryBank").then( (result) => {
					console.log(result);
					if(result.body.content && result.body.content.data.acctNo){
						this.hasCard = false;
						this.acctNo = result.body.content.data.acctNo;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取省出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				})
			},
			gotoEditCard () {
				this.$router.push({path:"editCard"});
			}
		}
	}
</script>
<style scoped>
	.cardPanel{
		background: url(../assets/img/bank_bbc.png) no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
		height: 170px;
	}
	.cardPanel p{
		top: 50%;
    	left: 15%;
	}
	.noCard{
		z-index: 10;
		position: fixed;
	    top: 50px;
	    left: 0;
	    box-sizing: border-box;
	    padding-top: 100px;
	}
	button{
    	color: #54ADF3;
    	border: 1px solid #54ADF3;
	    outline: none;
	}
</style>