<template>
	<div>
		<pub-header title="注册我的伙伴"></pub-header>
		<div class="pct80 auto mt20 mb20">
			<span class="db f16 c9">伙伴姓名</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_real_name" @focus="cancelErrorTip()">
		</div>
		<!-- <div class="pct80 auto mb20">
			<span class="db f16 c9">成员编号</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.no">
		</div> -->
		<div class="pct80 auto mb20">
			<span class="db f16 c9">会员昵称</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_nick_name" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">推荐人手机号/编码</span>
			<input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.tphone" @focus="cancelErrorTip()">
		</div>
		<div class="pct80 auto mb20">
			<span class="db f16 c9">成员类型</span>
			<!-- <input type="text" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_person_type"> -->
			<select name="uw_person_type" class="pct100 bdc h30 bx p5 pl15" v-model="data.uw_person_type">
				<option value="1">公司投资人</option>
				<option value="5">省级投资人</option>
				<option value="6">市级投资人</option>
				<option value="7">区县投资人</option>
				<option value="8">囿文水晶卡</option>
			</select>
		</div>
		<button class="pct70 f16 db h45 auto mb20 cf bn br5 mt30" @click="gotoNext()">下一步</button>
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
				data : {},
				showErrorMsgTip : false,
				errorMsg : ""
			}
		},
		methods: {
			gotoNext () {
				if(!this.data.uw_real_name){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入真实姓名";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.data.tphone){
					this.showErrorMsgTip = true;
					this.errorMsg = "请输入推荐人手机号/编码";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				if(!this.data.uw_person_type){
					this.showErrorMsgTip = true;
					this.errorMsg = "请选择公司成员类型";
					return;
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				};
				registerStore.save(this.data);
				this.$router.push({path:"addPartnerSec"});
			},
			//输入框聚焦的时候隐藏提示框
            cancelErrorTip(){
                this.showErrorMsgTip = false;
            }
		}

	}
</script>
<style scope>
	button{
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