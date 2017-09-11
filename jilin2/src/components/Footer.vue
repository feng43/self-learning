<template>
	<div id="Nav">
		<div class="nav">
			<ul>
	    		<li @click="activeHome()">
					<div class="imgBg imgBgActive" id="home"></div>
					<p class="homeActive">首页</p>
	    		</li>
	    		<li @click="saoyisao">
					<div class="imgBg"></div>
					<p>扫一扫</p>
	    		</li>
	    		<li @click="activePerson()">
					<div class="imgBg" id="mine"></div>
					<p>我的</p>
	    		</li>
	    	</ul>
		</div>
		<!--<img src="../static/images/circle.png" alt="">-->
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			//微信扫一扫接口
			saoyisao(){
				var _this = this;
				wx.scanQRCode({
			      needResult: 1,
			      desc: 'scanQRCode desc',
			      success: function (res) {
//			        alert(JSON.stringify(res));
//			        window.location.href=res.resultStr;
					var str = res.resultStr;
//					alert(str);
					_this.$router.push({ path:str.split("#")[1].split("?")[0], query: { id: str.split("#")[1].split("=")[1]} });
			      }
			    });
			},
			//跳到首页
            activeHome(){
				$("#home").addClass('imgBgActive').next("p").addClass("homeActive");
				$("#mine").removeClass("imgPersonActive").next("p").removeClass("personActiveWord");
				this.$router.push({path:"home"});
			},
            activePerson(){
                $("#home").removeClass('imgBgActive').next("p").removeClass("homeActive");
                $("#mine").addClass("imgPersonActive").next("p").addClass("personActiveWord");
                this.$router.push({path:"Personal"});
			},
		},
		created(){
			
		}
	}
</script>
<style scoped>
	#Nav {
		width: 100%;
		height: 0.96rem;
		border-top: 0.01rem solid #cccccc;
		background: #f1f1f1;
		position: fixed;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		z-index: 999;
		padding-top: 0.16rem;
	}
	/*#Nav img{*/
		/*width: 0.86rem;*/
		/*height: 0.22rem;*/
		/*position: absolute;*/
		/*left: 50%;*/
		/*margin-left: -0.43rem;*/
		/*top:-0.22rem;*/
	/*}*/
	ul{
		width: 100%;
		height: 100%;
	}
	ul:after{
		content: '';
		display: block;
		clear: both;
	}
	ul li{
		float: left;
		width: 33.3333%;
		text-align: center;
	}
	ul li .imgBg{
		background: url("../static/images/sprite.png");
		margin: 0 auto;
		background-size: 1.20rem 0.98rem;
	}
	ul li p{
		font-size: 0.18rem;
		color: rgb(153, 153, 153);
		margin-top: -0.04rem;
	}
	ul li p.homeActive{
		color: rgb(169, 33, 36);
	}
	ul li:nth-child(1) .imgBg{
		width: 0.43rem;
		height: 0.48rem;
		background-position: 0 0;
		/*margin-top: 0.15rem;*/
	}
	ul li:nth-child(2) .imgBg{
		width: 0.40rem;
		height: 0.46rem;
		background-position: -0.43rem -0.04rem;
	}
	ul li:nth-child(3) .imgBg{
		width: 0.34rem;
		height: 0.46rem;
		background-position: -0.84rem -0.01rem;
	}
	ul li:nth-child(1)  .imgBgActive{
		background-position: 0 0.52rem;
	}
	ul li:nth-child(3)  .personActive{
		background-position: -0.84rem -0.47rem;
	}
	ul li:nth-child(3)  .imgPersonActive{
		background-position: -0.84rem -0.47rem;
	}
	ul li:nth-child(3) .personActiveWord{
		color: rgb(169, 33, 36);
	}
	/*.active .personActive{*/
		/*background-position: -0.80rem -0.47rem;*/
	/*}*/
</style>