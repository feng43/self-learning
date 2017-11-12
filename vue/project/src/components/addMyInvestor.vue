v<template>
	<div>
		<pub-header title="注册我的投资人"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">会员推荐人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.cus_tj_num" @blur="viliTj()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">会员安置人编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.cus_az_num" @blur="viliAz()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">店铺联系方式</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.shop_phone">
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
		<div class="pct80 auto f18 tc">
			<div class="pct30 bx dib tl">
				<span class="db f16">省份</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.us_province_id" @change="getCity()">
					<option v-for="province in provinceList" :value="province.region_id">{{province.region_name}}</option>
				</select>
			</div>
			
			<div class="pct30 bx dib tl">
				<span class="db f16">城市</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.us_city_id" @change="getDistrict()">
					<option v-for="city in cityList" :value="city.region_id">{{city.region_name}}</option>
				</select>
			</div>

			<div class="pct30 bx dib tl">
				<span class="db f16">区域</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.us_district_id">
					<option v-for="district in districtList" :value="district.region_id">{{district.region_name}}</option>
				</select>
			</div>
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
		activated(){
			this.getBonus();
			this.getProvinceId();
		},
		data () {
			return {
				data : registerStore.fetch(),
				provinceList : "",
				cityList : "",
				districtList : "",
				showPwd : false,
				pay_password : "",
				mobile : "",
				bonus : "",
				showErrorMsgTip : false,
				errorMsg : "",
				vilivateTj : false,
				vilivateAz : false
			}
		},
		created() {
			this.mobile = Store.fetch().mobile;
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
						alert(result.body.code);
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
			gotoNext () {
				console.log(this.data);
				if(!this.vilivateTj){
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入正确的推荐人";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.vilivateAz){
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入正确的安置人";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.shop_phone){
					this.showErrorMsgTip = true;
					this.errorMsg = "请填写店铺电话";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
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
				this.data.us_country_id = 1;
				if(this.data.pay_type == 1){
					this.data.pay_password = this.pay_password;
				};
				this.$http.post("/huiyimember/web/hyperson/pebblePerson", {data : JSON.stringify(this.data), smsCode : this.$route.query.smsCode}).then( (result) => {
					console.log(result);
					var newData = JSON.parse(result.body.content.data.msg) || {};
					if(result.body.content.data.code == 200 && newData.status == 1){
						alert("店铺:"+newData.shopCode+",会员:"+newData.personCode+","+newData.message);
						this.$router.push({path:"myPartner"});
					} else {
						var newData = JSON.parse(result.body.content.data.msg);
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
			},

			getProvinceId () {
				this.$http.get("/huiyimember/syn/cityLevel?level=1").then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.provinceList = result.body.data;
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
			getCity () {
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.us_province_id).then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.cityList = result.body.data;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取城市出错了";
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
			getDistrict () {
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.us_city_id).then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.districtList = result.body.data;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取区出错了";
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
			showPwdFun(){
				if(this.data.pay_type == 1){
					this.showPwd = true;
				} else {
					this.showPwd = false;
				}
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