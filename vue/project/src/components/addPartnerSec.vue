<template>
	<div>
		<pub-header title="注册我的伙伴"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">手机</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="nextData.uw_mobile">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">验证码</span>
			<input type="text" class="pct60 bdc h30 bx p5 pl15" v-model="nextData.smsCode">
			<button class="bd0 bcf h30 pct30 fr" @click="sendCode()" v-text="codeText"></button>
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9" v-model="nextData.uw_qq">QQ</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="nextData.smsCode">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9" v-model="nextData.uw_weixin">微信</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9" v-model="nextData.uw_email">邮箱</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9" v-model="nextData.uw_id_card">身份证号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15">
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
		data () {
			return {
				data : registerStore.fetch(),
				nextData : {},
				showErrorMsgTip : false,
				errorMsg : "",
				codeText : "获取验证码",
				num : 60
			}
		},
		methods: {
			gotoNext () {
				console.log(Object.assign(this.data, this.nextData));

			},
			sendCode () {
				let that = this;
				console.log(this.nextData.uw_mobile);
				if(this.num != 60){
					return;
				}
				var url = "/huiyimember/web/hyperson/sendMsgCode?mobile=" + this.nextData.uw_mobile;
				if(!this.nextData.uw_mobile){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入手机号";
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
					console.log("--err--")
					console.log(result);
				});
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