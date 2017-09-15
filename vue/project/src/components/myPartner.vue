<template>
	<div>
		<pub-header title="我的伙伴" toLinkText="注册伙伴" toLink="/addPartner"></pub-header>
		<div class="bcf8 p20 ovh infoPanel">
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<!-- <span class="db b f22">{{newData.data.uw_investor_num}}</span> -->
				<span class="db b f22">0</span>
				<span class="f14 c9">发起人</span>
				</p>
			</div>
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<!-- <span class="db b f22">{{newData.data.uw_partner_num}}</span> -->
				<span class="db b f22">2</span>
				<span class="f14 c9">合伙人</span>
				</p>
			</div>
			<div class="tc bcf pct30 dib vm rel br5">
				<p class="rel">
				<!-- <span class="db b f22">{{newData.data.uw_card_num}}</span> -->
				<span class="db b f22">0</span>
				<span class="f14 c9">慧享卡</span>
				</p>
			</div>
		</div>
		<div class="bcf pt20 pl10 pr10 partnerPanel">
			<p class="f20 b mb10">一级伙伴</p>
			<!-- <div class="rel f18 bbc pt10 pb10" v-for="partner in partnerList">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">{{partner.uw_partner_name}}</span>
				<div class="dib abs mr10 c9">
					<span>{{partner.uw_twolevel_num}}</span>
					<img src="../assets/img/right_arrow.png" alt="" class="h10 ml5">
				</div>
			</div> -->

			<div class="rel f18 bbc pt10 pb10">
				<img src="../assets/img/one.png" alt="" class="pct10 mt5 mr10">
				<span class="vm dib">艾文昌</span>
				<div class="dib abs mr10 c9">
					<span>12</span>
					<img src="../assets/img/right_arrow.png" alt="" class="h10 ml5">
				</div>
			</div>
		</div>
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
			return{
				partnerList : [],
				newData : {}
			}
		},
		activated () {
            this.getPartner();
        },
        methods : {
        	getPartner () {
        		if(!Store.fetch().personCode){
					alert("请重新登录");
					Store.save("");
					this.$router.push({path:"login"});
				};
        		this.$http.post('/huiyimember/web/hyperson/myPartner',{personCode:/*Store.fetch().personCode*/"HSHP0000157",level:1}).then((result) => {
					console.log(result);
					if(result.body.content.data.code == 200){
						this.newData = JSON.parse(result.body.content.data.msg);
						console.log(this.newData);
						//this.partnerList = this.newData.data.partnerInfo;
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
        	}
        }
	}
</script>
<style scoped>
	.infoPanel div{
		height: 75px;
		margin-left: 2%;
		box-shadow: 0 0 8px #66A8FF;
	}
	.infoPanel p{
		top: 50%;
		transform: translate(0, -50%);
	}
	.partnerPanel > div{
		height: 50px;
	}
	.partnerPanel span{
		height: 100%;
	}
	.partnerPanel > div div{
		top: 50%;
		right: 0;
	    margin-top: -10px;
	}
	
</style>