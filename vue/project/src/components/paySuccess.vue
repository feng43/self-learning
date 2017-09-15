<template>
	<div class="bcf8 rel h100">
		<div class="abs pct100 confirmPayPanel">
			<div class="bx pt20 pb30 pct80 auto box-shadow tc br5 bcf">
				<h2 class="mt10">恭喜您注册成功</h2>
				<img src="../assets/img/barCode.png" alt="" class="">
				<p class="mt5">长按关注慧益一生服务号</p>
				<p class="mt20">我们将为您提供更好的健康美丽咨询服务</p>
			</div>
		</div>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				data : {},
				showErrorMsgTip : false,
				errorMsg : "",
				codeText : "获取验证码",
				num : 60,
				appId: '',
				timeStamp: "",
				nonceStr: "",
				signType: "",
				package:"",
				paySign:""
			}
		},		
		components: {

		},
		activated(){
		},
		methods:{
		}
	}
</script>
<style scoped>
	button{
    	color: #FFF;
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #66A8FF;
	    box-sizing: content-box;
	}
	.confirmPayPanel {
	    top: 10%;
	}
	.box-shadow{
		box-shadow: 0px 0px 10px 3px rgba(0,0,0,.5);
	}
</style>