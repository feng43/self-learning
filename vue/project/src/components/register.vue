<template>
	<div class="bcf rel">
		<pub-header title="注册"></pub-header>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">推荐人手机号</span>
			<p class="dib ml10 bn on pct40">{{mobile}}</p>
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">手机号</span>
			<input type="text" placeholder="请输入手机号" class="ml10 bn on pct50" v-model="data.mobile" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">姓名</span>
			<input type="text" placeholder="请输入姓名" class="ml10 bn on pct50" v-model="data.realName" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">新密码</span>
			<input type="password" placeholder="请输入新密码" class="ml10 bn on pct50" v-model="data.passWord" @focus="cancelErrorTip()">
		</div>
		<div class="pct60 f18 mt20 p10 bbc bx dib rel registerPanel">
			<span class="dib pr10 brc">验证码</span>
			<input type="text" placeholder="请输入验证码" class="ml10 bn on pct50" v-model="data.smsCode" @focus="cancelErrorTip()">
			<button class="abs h30 bcf br5" @click="sendCode()" v-text="codeText"></button>
		</div>
		<div class="pct80 auto f18 mt20 tc">
			<div class="pct30 bx dib tl">
				<span class="db f16">省份</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.provinceId" @change="getCity()">
					<option v-for="province in provinceList" :value="province.region_id">{{province.region_name}}</option>
				</select>
			</div>
			
			<div class="pct30 bx dib tl">
				<span class="db f16">城市</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.cityId" @change="getDistrict()">
					<option v-for="city in cityList" :value="city.region_id">{{city.region_name}}</option>
				</select>
			</div>

			<div class="pct30 bx dib tl">
				<span class="db f16">区域</span>
				<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="data.districtId">
					<option v-for="district in districtList" :value="district.region_id">{{district.region_name}}</option>
				</select>
			</div>
		</div>
		<div class="pct80 auto f18 p10 bbc">
			<span class="dib pr10 brc">收货地址</span>
			<input type="text" placeholder="请输入收货地址" class="ml10 bn on pct50" v-model="data.address" @focus="cancelErrorTip()">
		</div>
		<button class="forgetBtn pct40 f16 db h45 auto mb20 cf bn br5 mt30" @click="forPwd()">下一步</button>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"
	import payStore from "../assets/js/payStore"

	export default {
		data () {
			return {
				data : {},
				showErrorMsgTip : false,
				errorMsg : "",
				codeText : "获取验证码",
				num : 60,
				mobile : "",
				provinceList : "",
				cityList : "",
				districtList : ""
			}
		},		
		components: {
			pubHeader
		},
		created () {
			var arr = this.$route.query.mobile.split("");
			arr[2] = "*";
			arr[3] = "*";
			arr[4] = "*";
			arr[5] = "*";
			arr[6] = "*";
			this.mobile = arr.join("");
			this.data.introducerId = this.$route.query.id;
			//console.log(this.$route);
			//this.$router.push({path:"register"});
		},
		activated(){
			this.getProvinceId();
		},
		methods:{
			forPwd () {
				if(!this.data.mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入11位手机号";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.passWord){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入新密码";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.smsCode){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入验证码";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.realName){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入姓名";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.provinceId){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择省份";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.cityId){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择城市";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.districtId){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择区域";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.data.address){
					this.showErrorMsgTip = true;
					this.errorMsg = "请填写地址";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				this.data.id = this.id;
				this.$http.post("/huiyimember/pub/registPerson",this.data).then( (result) => {
					console.log(result);
					if(result && result.body.content.data.code == 200){
						//this.$router.push({path:"home"});
						payStore.save(result.body.content.data.orderId);
						//alert("成功了");
						setTimeout(function () {
							//window.location.href = "http://dwgl.nor-land.com/hyys/?#/pay";
							window.location.href = "http://dwgl.nor-land.com/huiyimember/wxcode";
						},1000);
					} else {
						this.showErrorMsgTip = true;
						if(result.body.content.data.msg){
							this.errorMsg = result.body.content.data.msg;
						} else {
							this.errorMsg = "出错了";
						};
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
				})
			},
			//输入框聚焦的时候隐藏提示框
            cancelErrorTip(){
                this.showErrorMsgTip = false;
            },
			sendCode () {
				let that = this;
				console.log(this.data.mobile);
				if(this.num != 60){
					return;
				}
				var url = "/huiyimember/pub/sendRegisterMsgCode?mobile=" + this.data.mobile;
				if(!this.data.mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入11位手机号";
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
					console.log("--err--");
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
				console.log(this.provinceId);
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.provinceId).then( (result) => {
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
				console.log(this.provinceId);
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.data.cityId).then( (result) => {
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
<style scoped>
	.registerPanel{
		margin-left: 7%;
	}
	button{
		bottom: 20%;
    	right: -40%;
    	color: #54ADF3;
    	border: 1px solid #54ADF3;
	    outline: none;
	}
	.forgetBtn{
		background: #54ADF3;
		color: #FFF;
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
    div div button{
    	width: 43%;
    }
</style>