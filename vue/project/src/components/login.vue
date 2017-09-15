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
	export default{
		data () {
			return {
				loginData : {},      //登录信息
				showErrorMsgTip : false,
				errorMsg : ""
			}
		},
		methods : {
			login () {
				console.log(this.loginData);
				//this.$router.push({path:"Login"});
				if(!this.loginData.mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入手机号";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.loginData.passWord){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入密码";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				this.$http.post("/huiyimember/pub/checkLogin",this.loginData).then( (result) => {
					console.log(result);
					if(result && result.body.content.data.id){
						var saveData = {
							id : result.body.content.data.id,
							mobile : result.body.content.data.mobile,
							personCode : result.body.content.data.personCode,
							shopId : result.body.content.data.shopId
						};
						Store.save(saveData);
						this.$router.push({path:"home"});
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = result.message;
						return;
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