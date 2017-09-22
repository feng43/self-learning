<template>
	<div class="bcf8 h100">
		<pub-header title="提现"></pub-header>
		<div class="pct90 auto bcf mt20 p20 bx tl panel">
			<span class="c0 f20 mb10">提现金额</span>
			<input type="text" class="db bn pct100 h30 bx mt10 mb10 f22" v-model="addMoney">
			<p class="c9 dib">可提金额<span class="ml5 mr5" v-text="bonus"></span>元</p>
			<button class="pct40 f16 db h45 auto mb20 cf bn br5 mt30" @click="applyCash()">提现</button>
		</div>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"
	import Store from "../assets/js/store";
	export default {
		components: {
			pubHeader
		},
		data () {
			return {
				bonus : "",
				showErrorMsgTip : false,
				errorMsg : "",
				addMoney : ""
			}
		},
		created () {
			/*if(!Store.fetch().personCode){
				alert("请重新登录");
				Store.save("");
				this.$router.push({path:"login"});
			};*/
		},
		activated () {
            this.getBonus();                         //获取数据
        },
		methods : {
			getBonus () {
				if(!Store.fetch().personCode){
					alert("请重新登录");
					Store.save("");
					this.$router.push({path:"login"});
				};
				this.$http.post('/huiyimember/web/integral/wallet',{personMobile:Store.fetch().mobile}).then((result) => {
					console.log(result);
					if(result.body.content.data.code == 200){
						var newData = JSON.parse(result.body.content.data.msg);
						console.log(newData);
						this.bonus = newData.data[0]?newData.data[0].bonusAccount:0;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				},(result) => {
					console.log("--err--");
					console.log(result);
				});
			},
			applyCash () {
				if(!this.addMoney){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入提现金额";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				}
				var applyData = {
					mobile : Store.fetch().mobile,
					passWord : 111111,
					addMoney : this.addMoney,
					personCode : Store.fetch().personCode,
				}
				this.$http.post('/huiyimember/web/integral/applyCash',applyData).then((result) => {
					console.log(result);
					if(result.body.content.data.code == 200){
						alert("提现成功");
						this.$router.push({path:"getCash"});
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.content.data.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				},(result) => {
					console.log(result);
				});
			}
		}
	}
</script>
<style scope>
	button{
    	color: #54ADF3;
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
	.panel{
		box-shadow: 0px 0 20px 5px rgba(102,168,255,.3);
	}
</style>