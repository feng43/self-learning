<template>
	<div class="rel h100 ovh loginPanel">
		<div class="subLoginPanel pct30 tc pb20 bcf8 br5 bx pt30 pb30">
			<h1 class="mb30">慧益一生</h1>
			<div class="userIcon rel">
				<input type="text" placeholder="请输入手机号" class="loginInput h45 pct70 f16 cf pl40 mb20 bx br5 bn rel" v-model="loginData.mobile">
			</div>
			<div class="passwordIcon rel">
				<input type="password" placeholder="请输入密码" class="loginInput h45 pct70 f16 cf pl40 mb20 bx br5 bn rel" v-model="loginData.passWord">
			</div>
			<div class="passwordIcon imgCodePnael rel pct100 auto tl">
				<input type="text" placeholder="请输入验证码" class="loginInput h45 pct40 f16 cf pl40 mb20 bx br5 bn rel vt" v-model="loginData.imgCode" @blur="checkImgCode()">
				<img :src="imgUrl" alt="" class="pct30 h45" @click="getImgCode()">
			</div>
			<button class="loginBtn pct70 f16 db h45 auto mb20 cf bn br5" @click="login()">登录</button>
			<div class="tr pct70 auto">
				<span class="f16" @click="gotoForget()">忘记密码</span>
			</div>
		</div>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import Store from "../assets/js/store";
	import payStore from "../assets/js/payStore"
	export default{
		data () {
			return {
				loginData : {},      //登录信息
				showErrorMsgTip : false,
				errorMsg : "",
				imgCode : false,
				imgUrl : ""
			}
		},
		activated(){
			this.getImgCode();
		},
		methods : {
			getImgCode () {
				this.$http.get("/huiyimember/syn/createImgCode").then( (result) => {
					console.log(result);
					if(!result.body){
						this.showErrorMsgTip = true;
						this.errorMsg = "出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					} else {
						this.imgUrl = "data:image/jpeg;base64," + result.body;
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
			checkImgCode () {
				if(!this.loginData.imgCode){
					return;
				}
				this.$http.get("/huiyimember/syn/checkImgCode?imgCode=" + this.loginData.imgCode).then( (result) => {
					console.log(result);
					if(result.body.code != 200){
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
	                    this.imgCode = false;
					} else {
						this.imgCode = true;
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
			login () {
				console.log(this.loginData);
				//this.$router.push({path:"Login"});
				if(!this.loginData.mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入手机号";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				if(!this.loginData.passWord){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入密码";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					return;
				};
				this.$http.post("/huiyimember/pub/checkLogin",this.loginData).then( (result) => {
					console.log(result);
					if(result && result.body.content){
						if(result.body.content.data.code == 405 && result.body.content.data.orderId){
							payStore.save(result.body.content.data.orderId);
							this.showErrorMsgTip = true;
							this.errorMsg = '此账号尚未激活';
							let that = this;
							setTimeout(function () {
								window.location.href = "http://dwgl.nor-land.com/huiyimember/wxcode";
							},2000);
							return;
						}
						var saveData = {
							id : result.body.content.data.personId,
							mobile : result.body.content.data.mobile,
							personCode : result.body.content.data.personCode,
							shopId : result.body.content.data.shopId
						};
						Store.save(saveData);
						this.$router.push({path:"home"});
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.message;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
				})
			},

			gotoForget () {
				this.$router.push({path:"forgetPwd"});
			}
		}
	}
</script>
<style scoped>
	@media screen and (max-width: 1000px) {
		.subLoginPanel{
			width: 80% !important;
			margin: 30% auto 0 !important;
		}
	}
	h1, span{
		color: #54ADF3;
	}
	.loginPanel{
	    background: url(../assets/img/login-bg.png) no-repeat;
	    /* background: url(./img/login-bg.png) no-repeat; */
	    background-size: 100% 100%;
	}
	.subLoginPanel{
	    margin: 10% auto 0;
        box-shadow: 0 0 20px rgba(0,0,0,.3);
	}
	.loginInput{
	    background-color: #54ADF3;
	    box-shadow: inset 0px 1px 2px rgba(0,0,0,.5);
	}
	.loginInput::-webkit-input-placeholder { /* WebKit browsers */ 
		color: #FFF; 
	} 
	.loginInput:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		color: #FFF; 
	} 
	.loginInput::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		color: #FFF; 
	} 
	.loginInput:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		color: #FFF; 
	}
	.userIcon:before{
		content: " ";
	    height: 15px;
	    width: 14px;
	    display: inline-block;
	    background: url(../assets/img/user.png) no-repeat;
	    background-size: 100% 100%;
	    position: absolute;
	    top: 20%;
	    left: 19%;
	    z-index: 99;
	}
	.passwordIcon:before{
		content: " ";
	    height: 15px;
	    width: 12px;
	    display: inline-block;
	    background: url(../assets/img/password.png) no-repeat;
	    background-size: 100% 100%;
	    position: absolute;
	    top: 20%;
	    left: 19%;
	    z-index: 99;
	}
	.loginBtn{
		background: #54ADF3;
	}
	.imgCodePnael{
		padding-left: 15%;
	}
	.imgCodePnael:before{
		left: 17%;
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