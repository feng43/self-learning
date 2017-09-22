<template>
	<div>
		<pub-header title="注册我的合伙人"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">会员推荐人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.cus_tj_num" @blur="viliTj()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">会员安置人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.cus_az_num" @blur="viliAz()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">所属店铺代码</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.shop_num" @blur="viliShop()">
		</div>
		<div class="pct80 auto mb10">
			<span class="db f16 c9">支付方式</span>
			<select name="pay_type" class="pct100 bdc h30 bx p5 pl15" v-model="data.pay_type" @change="showPwdFun()">
				<option value="0">线下支付</option>
				<option value="1">只用钱包支付</option>
			</select>
		</div>
		<div class="pct80 auto mb20" v-show="showPwd">
			<span class="db f16 c9">支付密码</span>
			<input type="password" class="pct100 bdc h30 bx p5 pl15" v-model="pay_password">
		</div>
		<div class="pct80 auto c9">
			<p class="mb5">账户名<span class="ml20">{{mobile}}</span></p>
			<p>可用余额<span class="ml20">{{bonus}}</span>元</p>
		</div>
		<button class="gotoNext pct70 f16 db h45 auto mb20 cf bn br5 mt10" @click="gotoNext()">提交</button>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"
	import registerStore from "../assets/js/register";
	import Store from "../assets/js/store";

	export default {
		components: {
			pubHeader
		},
		data () {
			return {
				data : registerStore.fetch(),
				showPwd : false,
				pay_password : "",
				mobile : "",
				bonus : "",
				showErrorMsgTip : false,
				errorMsg : "",
				vilivateShop : false,
				vilivateTj : false,
				vilivateAz : false
			}
		},
		created() {
			this.mobile = Store.fetch().mobile;
		},
		activated(){
			this.getBonus();
		},
		methods: {
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
			gotoNext () {
				console.log(this.data);
			},
			viliShop () {
				console.log(this.data.shop_num);
				if(!this.data.shop_num){
					return;
				}
				this.$http.get("/huiyimember/web/shop/queryShop?shopCode=" + this.data.shop_num).then( (result) => {
					console.log(result);
					if(result.body.content.data.code !== 200){
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.content.data.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
	                    this.vilivateShop = false;
					} else {
						this.vilivateShop = true;
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
			viliTj () {
				console.log(this.data.cus_tj_num);
				if(!this.data.cus_tj_num){
					return;
				}
				this.$http.get("/huiyimember/web/hyperson/checkIntroducer?introducerCode=" + this.data.cus_tj_num).then( (result) => {
					console.log(result);
					if(result.body.code != 200){
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
	                    this.vilivateTj = false;
					} else {
						this.vilivateTj = true;
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
			viliAz () {
				console.log(this.data.cus_az_num);
				if(!this.data.cus_az_num){
					return;
				}
				this.$http.get("/huiyimember/web/hyperson/checkParent?parentCode=" + this.data.cus_az_num + "&introducerCode=" + this.data.cus_az_num).then( (result) => {
					console.log(result);
					if(result.body.code != 200){
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
	                    this.vilivateAz = false;
					} else {
						this.vilivateAz = true;
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
			showPwdFun(){
				if(this.data.pay_type == 1){
					this.showPwd = true;
				} else {
					this.showPwd = false;
				}
			},
			gotoNext () {
				if(!this.vilivateShop){
					return;
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入正确的店铺编号";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.vilivateTj){
					return;
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入正确的推荐人";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.vilivateAz){
					return;
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入正确的安置人";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.data.pay_type){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择支付方式";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				console.log(this.data);
				this.data.us_country_id = 1;
				if(this.data.pay_type == 1){
					this.data.pay_password = this.pay_password;
				};
				this.$http.post("/huiyimember/web/hyperson/pebblePerson", {data : JSON.stringify(this.data), smsCode : this.$route.query.smsCode}).then( (result) => {
					console.log(result);
					var newData = JSON.parse(result.body.content.data.msg);
					if(result.body.content.data.code == 200 && newData.status == 1){
						alert("店铺:"+newData.shopCode+",会员:"+newData.personCode+","+newData.message);
						this.$router.push({path:"myPartner"});
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = newData.message;
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
			}
		}

	}
</script>
<style scoped>
	.gotoNext{
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
	.errorTip{
        background-color: rgba(102, 102, 102, 0.9);
        line-height: 30px;
        top:50%;
        left: 50%;
        margin: 0 0 0 -25%;
    }
    .showError-enter-active,.showError-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .showError-enter,.showError-leave-active{
        opacity: 0;
    }
</style>