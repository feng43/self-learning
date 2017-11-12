<template>
	<div class="h100 bcf8">
	    <aside class="profile-nav auto pct90">
	        <router-link to="/userCenter" class="panel rel db">
	            <div class="user-heading bcf c0 p15 bn br5">
	                <img alt="" src="../assets/img/home_user.png" class="mr15 dib p10 br5">
	                <div class="dib vt">
		                <p class="f18 mt10 mb10">{{personCode}}</p>
		                <p class="f18">{{shopId}}</p>
	                </div>
	                <img src="../assets/img/right_arrow.png" alt="" class="abs mt-10">
	            </div>
	        </router-link>
	    </aside>
	    <div class="choosePanel bcf pct100 mt20 ovh">
	        <div class="subTitle f18 mt20 c0">我的店铺</div>
	        <div class="newPanel">
	            <router-link to="/integralCard" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs">
	                    <img src="../assets/img/home_vip.png" alt="message" height="45px">
	                    <span class="mt10 db f16">积分卡</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link to="/home" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs">
	                    <img src="../assets/img/home_coupon_d.png" alt="message" height="45px">
	                    <span class="mt10 db f16">优惠卷</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link to="/bankCard" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs">
	                    <img src="../assets/img/home_bank.png" alt="message" height="45px">
	                    <span class="mt10 db f16">银行卡</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link to="/myPartner" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_partner.png" alt="message" height="45px">
	                    <span class="mt10 db f16">我的伙伴</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link to="/home" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_list_d.png" alt="message" height="45px">
	                    <span class="mt10 db f16">店铺消费清单</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link to="/home" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_dash_d.png" alt="message" height="45px">
	                    <span class="mt10 db f16">运营仪表盘</span>
	                </span>
	            </router-link>
	        </div>
	    </div>
	    <div class="choosePanel bcf pct100 mt20 ovh">
	        <div class="subTitle f18 mt20 c0">我的专属</div>
	        <!-- <div class="newPanel">
	            <router-link to="noticeList.html" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_QR.png" alt="message" height="45px">
	                    <span class="mt10 db f16">签到二维码</span>
	                </span>
	            </router-link>
	        </div> -->
	        <div class="newPanel">
	            <router-link to="/home" class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_shop_d.png" alt="message" height="45px">
	                    <span class="mt10 db f16">专属店铺</span>
	                </span>
	            </router-link>
	        </div>
	        <div class="newPanel">
	            <router-link :to='shareUrl' class="pct33 dib fl tc rel tdn c0">
	                <span class="abs pct100">
	                    <img src="../assets/img/home_huixiang.png" alt="message" height="45px">
	                    <span class="mt10 db f16">推广慧享卡</span>
	                </span>
	            </router-link>
	        </div>
	    </div>
    </div>
</template>
<script>
	import Store from "../assets/js/store";
	export default {
		data () {
			return {
				personCode : Store.fetch().personCode,
				shopId : Store.fetch().shopId,
				shareUrl : '/share'
			}
		},
		created () {
			if(!Store.fetch().personCode){
				alert("请重新登录");
				Store.save("");
				this.$router.push({path:"login"});
			};
		}
	}
</script>
<style scoped>
	.user-heading{
		box-shadow: 0px 0 20px 5px rgba(102,168,255,.3);
	}
	.user-heading img:first-child{
		height: 70px;
		box-shadow: 0 0 15px #66A8FF;
	}
	.user-heading img:last-child{
		top: 50%;
		right: 10%;
	}
	.profile-nav{
		padding-top: 5%;
	}

	.choosePanel a{
	    height: 122px;
	}

	.newPanel span:first-child{
	    left: 50%;
	    top: 37%;
	    margin-top: -20%;
	    margin-left: -25%;
	}

	@supports (transform: translate(0,0)){
	    .newPanel span:first-child{
	        margin-top: 18px;
	        margin-left: 0;
	        transform: translate(-50%,-50%);
	    }
	}
	.subTitle{
	    margin-left: 5%;
	}
</style>