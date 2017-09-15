<template>
	<div class="bcf8 h100">
		<pub-header title="积分卡"></pub-header>
		<div class="pct90 auto bcf mt20 p20 bx tc panel">
			<div class="f18 tl">
				<span class="c9">余额</span>
				<span class="fr" @click="gotoDetail()">查看明细&nbsp;></span>
			</div>
			<p class="f24 mt30 b h30" v-text="bonus"></p>
			<button class="pct40 f16 db h45 auto mb20 cf bn br5 mt30" @click="gotoCash()">提现申请</button>
		</div>
		<transition name="showError">
            <p class="abs pct50 h30 f18 cf tc errorTip" v-show="showErrorMsgTip" v-text="errorMsg"></p>
        </transition>
	</div>
</template>
<script>
	import pubHeader from "./header.vue";
	import Store from "../assets/js/store";
	export default {
		components: {
			pubHeader
		},
		data () {
			return {
				bonus : "",
				showErrorMsgTip : false,
				errorMsg : ""
			}
		},
		/*created () {
			if(!Store.fetch().personCode){
				alert("请重新登录");
				Store.save("");
				this.$router.push({path:"login"});
			};
		}*/
		activated () {
            this.getBonus();                         //获取数据
        },
		methods : {
			getBonus () {
				if(!Store.fetch().personCode){
					alert("请重新登录");
					Store.save("");
					this.$router.push({path:"login"});
				};
				this.$http.post('/huiyimember/web/integral/wallet',{personMobile:Store.fetch().mobile}).then((result) => {
					console.log(result);
					if(result.body.content.data.code == 200){
						var newData = JSON.parse(result.body.content.data.msg);
						console.log(newData);
						this.bonus = newData.data[0]?newData.data[0].bonusAccount:0;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				},(result) => {
					console.log("--err--");
					console.log(result);
				});
			},
			gotoCash () {
				this.$router.push({path:"getCash"});
			},
			gotoDetail () {
				this.$router.push({path:"integralDetail"});	
			}
		},
		// 在组件创建完成时，执行的钩子函数  
		created (){
			// 在main.js里导入并使用vue-resource之后，就可以通过this.$http来使用vue-resource了，这里我们用到了get方法  
			/*this.$http.post('/huiyimember/web/integral/wallet',{personMobile:13698852320}).then((result) => {
				console.log(result);
				if(result.body.content.data.code == 200){
					var newData = JSON.parse(result.body.content.data.msg);
					console.log(newData);
					this.bonus = newData.bonusAccount;
				} else {
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				}
			},(result) => {
				console.log("--err--");
				console.log(result);
			});*/
		}
	}
</script>
<style scope>
	button{
    	color: #54ADF3;
    	border: 1px solid #54ADF3;
	    outline: none;
	    background: #54ADF3;
	}
	.panel{
		box-shadow: 0px 0 20px 5px rgba(102,168,255,.3);
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