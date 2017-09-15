<template>
	<div class="bcf8 rel h100">
		<div class="abs pct100 confirmPayPanel">
			<div class="bx pt50 pb30 pct60 auto box-shadow tc br5 bcf">
				<img src="../assets/img/succee.png" alt="" class="">
				<p class="mt10">恭喜您提交成功</p>
				<p class="mt5">请在30分钟内支付</p>
				<h2 class="mt20">支付金额: ￥299</h2>
			</div>
			<div class="pct100 bcf bx pt10 pb10 pl20 pr20 mt20 bbc">
				<img src="../assets/img/weixin.png" alt="" class="vm h30">
				<p class="dib f18 ml10 b">使用微信支付</p>
				<span class="vm fr mt10 dib chooseCart active"></span>
			</div>
			<div class="pct100 bcf bx pt10 pb10 pl20 pr20 bbc">
				<img src="../assets/img/zhfubao_d.png" alt="" class="vm h30">
				<p class="dib f18 ml10 b">使用支付宝</p>
				<span class="vm fr mt10 dib chooseCart"></span>
			</div>
			<div class="pct100 bcf bx pt10 pb10 pl20 pr20">
				<img src="../assets/img/money-d.png" alt="" class="vm h30">
				<p class="dib f18 ml10 b">使用电子钱包支付</p>
				<span class="vm fr mt10 dib chooseCart"></span>
			</div>
			<div class="pct100 tc">
				<button class="pct50 mt30 bn f18 h30 indexBtn p10" @click="pay()">确认支付</button>
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
			this.getOpenId()
			//this.readyPay()
		},
		methods:{
			getOpenId () {
				this.$http.get("/huiyimember/wxcode").then( (result) => {
					console.log(result);
					var newUrl = result.body.message;
					alert("wxcode--->"+newUrl);
					this.$http.get(newUrl).then( (res) => {
						console.log(res);
						alert("getOpenId");
						alert(res);
					})
				}, (result) => {
					console.log(result);
				})
			},
			/*readyPay () {
				this.$http.get("/huiyimember/readywxpay?orderId="+this.$route.query.orderId).then( (result) => {
					console.log(result);
					var configData = JSON.parse(result.body.content.data.json);
			        this.appId = configData.appId;
			        this.timeStamp = configData.timeStamp;
			        this.nonceStr = configData.nonceStr;
			        this.signType = configData.signType;
			        this.package = configData.package;
			        this.paySign = configData.paySign;
				}, (result) => {
					console.log(result);
				})
			},*/
			pay () {
				var _this = this;
				this.$http.get("/huiyimember/readywxpay?orderId="+this.$route.query.orderId).then( (result) => {
						console.log(result);
						var configData = JSON.parse(result.body.content.data.json);
				        this.appId = configData.appId;
				        this.timeStamp = configData.timeStamp;
				        this.nonceStr = configData.nonceStr;
				        this.signType = configData.signType;
				        this.package = configData.package;
				        this.paySign = configData.paySign;

				        
				        WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId":_this.appId,     //公众号名称，由商户传入     
								"timeStamp":_this.timeStamp,         //时间戳，自1970年以来的秒数     
								"nonceStr":_this.nonceStr, //随机串     
								"package":_this.package,     
								"signType":_this.signType,         //微信签名方式：     
								"paySign":_this.paySign //微信签名 
							},
							function(res){
								if(res.err_msg == "get_brand_wcpay_request:ok" ) {
									alert(res);
									console.log(res);
								}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
							}
						);
					}, (result) => {
						console.log(result);
					})
				/*WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId":_this.appId,     //公众号名称，由商户传入     
						"timeStamp":_this.timeStamp,         //时间戳，自1970年以来的秒数     
						"nonceStr":_this.nonceStr, //随机串     
						"package":_this.package,     
						"signType":_this.signType,         //微信签名方式：     
						"paySign":_this.paySign //微信签名 
					},
					function(res){
						if(res.err_msg == "get_brand_wcpay_request:ok" ) {
							alert(res);
							console.log(res);
						}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					}
				); */
			}
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