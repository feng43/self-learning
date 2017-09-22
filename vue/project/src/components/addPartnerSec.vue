<template>
	<div>
		<pub-header title="注册我的伙伴"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">手机</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_mobile">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">验证码</span>
			<input type="text" class="pct60 bdc h30 bx p5 pl15" v-model="smsCode">
			<button class="bd0 bcf h30 pct30 fr" @click="sendCode()" v-text="codeText"></button>
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">QQ</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_qq">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">微信</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_weixin">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">邮箱</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_email">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">身份证号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_id_card">
		</div>

		<div class="pct80 auto f18 tc">
			<div class="pct30 bx dib tl">
				<span class="db f16">省份</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.uw_province_id" @change="getCity()">
					<option v-for="province in provinceList" :value="province.region_id">{{province.region_name}}</option>
				</select>
			</div>
			
			<div class="pct30 bx dib tl">
				<span class="db f16">城市</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.uw_city_id" @change="getDistrict()">
					<option v-for="city in cityList" :value="city.region_id">{{city.region_name}}</option>
				</select>
			</div>

			<div class="pct30 bx dib tl">
				<span class="db f16">区域</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.uw_district_id">
					<option v-for="district in districtList" :value="district.region_id">{{district.region_name}}</option>
				</select>
			</div>
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">收货地址</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_address">
		</div>
		<button class="gotoNext pct70 f16 db h45 auto mb20 cf bn br5 mt30" @click="gotoNext()">下一步</button>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import pubHeader from "./header.vue";
	import registerStore from "../assets/js/register";

	export default {
		components: {
			pubHeader
		},
		activated(){
			this.getProvinceId();
		},
		data () {
			return {
				data : registerStore.fetch(),
				showErrorMsgTip : false,
				errorMsg : "",
				codeText : "获取验证码",
				num : 60,
				provinceList : "",
				cityList : "",
				districtList : "",
				smsCode : ""
			}
		},
		methods: {
			gotoNext () {
				//console.log(Object.assign(this.data, this.data));
				if(!this.data.uw_mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入手机";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.smsCode){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入验证码";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_qq){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入QQ";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_weixin){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入微信";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_email){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入E-Mail";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_id_card){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入身份证号";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_province_id){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择省";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_city_id){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择市";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_district_id){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择区";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.uw_address){
					this.showErrorMsgTip = true;
					this.errorMsg = "请填写地址";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				console.log(this.data);
				this.data.uw_country_id = 1;
				registerStore.save(this.data);
				if(this.data.uw_person_type == 3){
					this.$router.push({path:"addMyPartner?smsCode=" + this.smsCode});
				} else {
					this.$router.push({path:"addMyInvestor?smsCode=" + this.smsCode});
				}
			},
			sendCode () {
				let that = this;
				console.log(this.data.uw_mobile);
				if(this.num != 60){
					return;
				}
				var url = "/huiyimember/pub/sendRegisterMsgCode?mobile=" + this.data.uw_mobile;
				if(!this.data.uw_mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入手机号";
					//let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				}
				this.codeText = "60s";
				var changeText = setInterval ( () => {
					if(that.num == "0"){
						that.codeText = "获取验证码";
						that.num = 60;
						window.clearInterval(changeText);
					} else {
						that.num--;
						that.codeText = that.num + "s";
					}
				},1000);
				this.$http.get(url).then( (result) => {
					console.log(result);
				}, (result) => {
					console.log("--err--")
					console.log(result);
				});
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
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.uw_province_id).then( (result) => {
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
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.uw_city_id).then( (result) => {
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
			}
		}

	}
</script>
<style scope>
	.gotoNext{
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
</style>