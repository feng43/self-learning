<template>
	<div class="bcf rel">
		<pub-header title="修改密码"></pub-header>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="pr10 brc">旧密码</span>
			<input type="password" placeholder="请输入旧密码" class="ml10 bn on pct50" v-model="data.oldPassWord" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto f18 mt20 p10 bbc">
			<span class="dib pr10 brc">新密码</span>
			<input type="password" placeholder="请输入新密码" class="ml10 bn on pct50" v-model="data.passWord" @focus="cancelErrorTip()">
		</div>
		<button class="forgetBtn pct70 f16 db h45 auto mb20 cf bn br5 mt30" @click="forPwd()">确认</button>
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
				data : {
					mobile : 13363037174
				},
				showErrorMsgTip : false,
				errorMsg : ""
			}
		},		
		components: {
			pubHeader
		},
		methods:{
			forPwd () {
				//this.$http.get("/share/shareRegister?openId=oDpeOv7h38_h6yZHoBsgDcFBelvA&shareKey=deca27296d56132a8e5b27b005098f09&source=201708100917d586187707b29").then( (result) => {
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
				this.$http.post("/huiyimember/web/hyperson/upPassWord",this.data).then( (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "result.content.data.msg";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
					/*if(result.content.data.code == 200 || result.content.data.code == "200"){
						this.showErrorMsgTip = true;
						this.errorMsg = "result.content.data.msg";
						return;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "result.content.data.msg";
						return;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}*/
				}, (result) => {
					console.log(result);
				})
			},
			//输入框聚焦的时候隐藏提示框
            cancelErrorTip(){
                this.showErrorMsgTip = false;
            }
		}
	}
</script>
<style scoped>
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
</style>