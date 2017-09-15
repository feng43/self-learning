<template>
		<div class="container bcf8 h100 pct100 p0">
			<div class="tab-wrapper bcf rel tc pct100">
			<img src="../assets/img/left_arrow.png" alt="" class="mt20 w10 abs" @click="gotoBack()">
			<!--tab section 1-->
				<input type="radio" name="tab-radio" class="tab-radio dn" id="tab-radio-1" checked>
				<label for="tab-radio-1" class="tab-handler tab-handler-1 rel dib pl30 pr30 f16">收入明细</label>
				<div class="tab-content tab-content-1">
					<div class="pct90 auto bcf mt20 p15 bx br5" v-for="bonus in bonusList">
						<div class="c0 f18 mb10">
							<span>慧享卡</span>
							<span class="fr">+{{bonus.uw_clac_bonus + bonus.uw_real_bonus + bonus.uw_reconsume + bonus.uw_tax}}</span>
						</div>
						<div class="c9 f16 mb10">
							<span>时间</span>
							<span class="fr">{{bonus.uw_pay_time}}</span>
						</div>
						<div class="c9 f16 mb10">
							<span>金额</span>
							<span class="fr">{{bonus.uw_clac_bonus}}</span>
						</div>
						<div class="c9 f16 mb10">
							<span>税费</span>
							<span class="fr">{{bonus.uw_tax}}</span>
						</div>
						<div class="c9 f16 mb10">
							<span>重消</span>
							<span class="fr">{{bonus.uw_reconsume}}</span>
						</div>
					</div>
				</div>
			<!--tab section 2-->
				<input type="radio" name="tab-radio" class="tab-radio dn" id="tab-radio-2">
				<label for="tab-radio-2" class="tab-handler tab-handler-2 rel dib pl30 pr30 f16">支出明细</label>
				<div class="tab-content tab-content-2">
					
				</div>
			</div>
		</div>
</template>
<script>
	import pubHeader from "./header.vue"

	export default {
		components: {
			pubHeader
		},
		data () {
			return {
				bonusList : []
			}
		},
		activated () {
            this.getDetail();
        },
		methods : {
			getDetail() {
				this.$http.post('/huiyimember/web/integral/detail',{personCode:"HSHP00000157"}).then((result) => {
					console.log(result);
					if(result.body.content.data.code == 200){
						var newData = JSON.parse(result.body.content.data.msg);
						console.log(newData);
						this.bonusList = newData.data;
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
			gotoBack () {
				this.$router.go(-1)
			}
		},
		// 在组件创建完成时，执行的钩子函数  
		created (){
			// 在main.js里导入并使用vue-resource之后，就可以通过this.$http来使用vue-resource了，这里我们用到了get方法  
			/*this.$http.get('/huiyimember/web/integral/wallet',{personMobile:13698852320}).then((result) => {
				console.log(result);
			},(result) => {
				console.log("--err--");
				console.log(result);
			});*/
		}
	}
</script>
<style scope>
	img{
		left: 10px;
	}
	.container{
	    box-shadow: 0 1px 3px rgba(0,0,0,.1);
	    padding: 0;
	}
	.tab-wrapper{
	    height: 60px;
	}
	.tab-handler{
	    z-index: 2;
	    height: 60px;
	    color: #333;
	    line-height: 60px;
	    transition: .3s;
	    transform: scale(.9);
	}
	.tab-radio:checked + .tab-handler{
	    transform: scale(1);
	    border-bottom: 5px solid #4090E5;
	}
	.tab-radio:checked + .tab-handler + .tab-content{
	    visibility: visible;
	    opacity: 1;
	    transform: scale(1);
	}
	.tab-wrapper .tab-content{
	    visibility: hidden;
	    position: absolute;
	    top: 60px;
	    left: 0;
	    width: 100%;
	    color: #999;
	    font-size: 14px;
	    line-height: 1.618em;
	    text-align: left;
	    opacity: 0;
	    transition: transform .5s, opacity .7s;
	    transform: translateY(20px);
	}
</style>