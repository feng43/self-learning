<template>
	<div class="h100 pt20">
		<div class="pct90 auto pt30 pl20 pr20 bcf tc panel">
			<img alt="" src="../assets/img/home_user.png" class="dib p5">

			<div class="tl f16 mt20">
				<span>会员编号</span>
				<span class="fr">{{personCode}}</span>
			</div>
			<div class="tl f16 mt20">
				<span>店铺编号</span>
				<span class="fr">{{shopId}}</span>
			</div>
			<router-link to="/editPwd" class="tl f16 mt20 db tdn c0">
				<span>修改密码</span>
				<img src="../assets/img/right_arrow.png" alt="" class="fr">
			</router-link>

			<button class="mt30 mb30 pct40 bcf f18 h30 logoutBtn" @click="logout()">退出登录</button>
		</div>
	    
    </div>
</template>
<script>
	import Store from "../assets/js/store";
	export default{
		data () {
			return {
				personCode : Store.fetch().personCode,
				shopId : Store.fetch().shopId
			}
		},
		methods : {
			logout () {
				Store.save("");
				this.$router.push({path:"login"});
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
	.panel, .panel img:first-child{
		box-shadow: 0px 0 20px 5px rgba(102,168,255,.3);
	}
	.panel img:first-child{
		border-radius: 50%;
    	width: 70px;
	}
	.logoutBtn{
		color: #6FADFF;
	    border: 1px solid #6FADFF;
	}
</style>