<template>
	<div class="bcf rel">
		<pub-header title="注册"></pub-header>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">推荐人姓名</span>
			<p class="dib ml10 bn on pct50">{{mobile}}</p>
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">手机号</span>
			<input type="text" placeholder="请输入手机号" class="ml10 bn on pct50" v-model="data.mobile" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">新密码</span>
			<input type="password" placeholder="请输入新密码" class="ml10 bn on pct50" v-model="data.passWord" @focus="cancelErrorTip()">
		</div>
		<div class="pct60 f18 mt20 p10 bbc bx dib rel panel">
			<span class="dib pr10 brc">验证码</span>
			<input type="text" placeholder="请输入验证码" class="ml10 bn on pct50" v-model="data.smsCode" @focus="cancelErrorTip()">
			<button class="abs h30 bcf br5" @click="sendCode()" v-text="codeText"></button>
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
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

	export default {
		data () {
			return {
				data : {},
				showErrorMsgTip : false,
				errorMsg : "",
				codeText : "获取验证码",
				num : 60,
				mobile : "",
				id : ""
			}
		},		
		components: {
			pubHeader
		},
		created () {
			this.mobile = this.$route.query.mobile;
			this.id = this.$route.query.id;
			//console.log(this.$route);
			//this.$router.push({path:"register"});
		},
		methods:{
			forPwd () {
				if(!this.data.mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入11位手机号";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.data.passWord){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入新密码";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				/*if(!this.data.smsCode){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入验证码";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};*/
				this.data.id = this.id;
				this.$http.post("/huiyimember/pub/registPerson",this.data).then( (result) => {
					console.log(result);
					if(result && result.body.content.data.code == 200){
						//this.$router.push({path:"home"});
						window.location.href = "http://dwgl.nor-land.com/hyys/?#/pay?orderId="+result.body.content.data.orderId;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.content.data.msg;
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
					return;
					//let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
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
			}
		}
	}
</script>
<style scoped>
	.panel{
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