<template>
	<div class="zhanxun">
		<h1>
			<img @click="back" class="left" src="../../static/images/ExhibitionDetial_back.png" alt="" />
			<img class="right" v-if="detail.fAudio" src="../../static/images/zhanxunAudio.png" alt="" />
			{{detail.headline | nameString}}
		</h1>
		<div class="banner">
			<img class="bannerImg" v-lazy="detail.picUrl" alt="" />
			<img v-if="detail.fAudio" @click="play()" class="zhanxunbofang" src="../../static/images/zhanxunbofang.png" alt="" />
			<!--<audio id="audio" src="src/static/1.mp3"></audio>-->
			<audio id="audio" :src="detail.fAudio"></audio>
		</div>
		<h2 class="banner_h2">
			{{detail.headline | nameString}}
		</h2>
		<h2 class="banner_h2 time">
			<img src="../../static/images/TIME.png" alt="" />
			{{time| isTime}}
		</h2>
		<h2 class="banner_h2 time address">
			<img src="../../static/images/ADRESS.png" alt="" />
			<span>
				{{detail.address}}
			</span>
			<img class="right" @click="toMap(detail.latitude,detail.longitude)" src="../../static/images/MAP.png" alt="" />
		</h2>
		<h2 @click="toBowuguan(detail.orgId)" class="banner_h2 time BOWUGUAN">
				<img class="logo" src="../../static/images/BOWUGUAN.png" alt="" />
				<span>{{detail.musExhibition}}</span>
				<img class="right" src="../../static/images/zhanxunGo.png" alt="" />
			</h2>
		<div class="hr">
		</div>
		<div v-html="detail.content" class="container">
			<!--{{detail.content}}-->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:"",//展讯id
				detail:{},//详情数据
				time:"",//
			}
		},
		mounted() {
			
		},
		methods: {
			play(){
				if($(".zhanxunbofang").hasClass("userLogo")){
					$(".zhanxunbofang").removeClass("userLogo");
					$("#audio")[0].pause();
				}else{
					$(".zhanxunbofang").addClass("userLogo");
					$("#audio")[0].play();
				}
			},
			back(){
				this.$router.go(-1);
			},
			getzxDetail(id){
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/spreadtrum/getOneSpreadtrum.do?type=2&id=${id}`).then((res)=>{
					console.log(res);
					this.detail = res.data.data;
					this.time=this.detail.staTime+' - '+this.detail.overTime;
				}).catch((err)=>{
					
				})
			},
			toMap(latitude,longitude){
				this.$router.push({ path: 'addressMap', query: { latitude: latitude,longitude:longitude} });
			},
			//去博物馆详情页
			toBowuguan(id) {
				this.$router.push({ path: "museumDetail", query: { id: id } });
			}
		},
		activated(){
			this.$store.dispatch('hideHeader');
			this.id = this.$route.query.id;
			this.getzxDetail(this.id);
			document.body.scrollTop=0; 
			$("#audio")[0].currentTime = 0.0;
			$(".zhanxunbofang").removeClass("userLogo");
		},
		updated(){
			$(".container img").css("width","100%");
			$(".container img").css("height","auto");
		},
		filters:{
			isTime(time){
				if(time==" - "){
					return "常设展讯"
				}else{
					return time
				}
			},
			nameString(val) {
				return val.length >= 19 ? val.substring(0, 19) + "..." : val;
			}
		}
	}
</script>

<style scoped>
	@-webkit-keyframes userLogoRotate {
		0% {
			transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
		}
		25% {
			transform: rotate(90deg);
			-webkit-transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
			-webkit-transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
			-webkit-transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
		}
	}
	.userLogo {
		/* Safari 和 Chrome */
		animation: userLogoRotate 2s linear infinite;
	}
	.zhanxun h1 {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size: 0.3rem;
		color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(169,33,36,0.5);
		/*background: url("../../static/images/bowuguan_detail_headerBg.png") no-repeat;*/
		/*background-size: 100% 0.9rem;*/
		padding-left: 0.3rem;
		padding-right: 0.20rem;
		z-index: 100;
	}
	
	.zhanxun h1 img.left {
		float: left;
		width: 0.19rem;
		height: 0.35rem;
		margin-top: 0.225rem;
	}
	
	.zhanxun h1 img.right {
		float: right;
		width: 0.51rem;
		height: 0.51rem;
		margin-top: 0.185rem;
	}
	.banner{
		position: relative;
		width: 6.4rem;
		height: 3.6rem;
	}
	.banner .bannerImg{
		width: 6.4rem;
		height: 3.6rem;
	}
	.banner .zhanxunbofang{
		width:0.61rem;
		height: 0.61rem;
		position: fixed;
		top:1.1rem;
		right:0.32rem;
	}
	.banner_h2{
		width: 100%;
		padding: 0 0.2rem;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.24rem;
		color: #000;
		font-size: 0.3rem;
		border-bottom: 0.01rem solid #EFEFEE;
	}
	.time{
		color: #666666;
		font-size: 0.24rem;
	}
	.time img:nth-of-type(1){
		width: 0.26rem;
		height: 0.26rem;
		margin-top: 0.27rem;
		margin-right: 0.2rem;
	}
	.address img{
		width: 0.22rem;
		height: 0.29rem;
		margin-top: 0.255rem;
	}
	.address img.right{
		float: right;
		width: 0.41rem;
		height: 0.41rem;
		margin-top: 0.185rem;
	}
	.address span{
		display: inline-block;
		width: 4.5rem;
		line-height: normal;
		margin-top: 0.08rem;
	}
	.BOWUGUAN{
		color: #000000;
		border-bottom: none;
	}
	.BOWUGUAN img.logo{
		width: 0.26rem;
		height: 0.25rem;
		margin-top: 0.245rem;
	}
	.BOWUGUAN img.right{
		float: right;
		width: 0.14rem;
		height: 0.24rem;
		margin-top: 0.23rem;
	}
	.info{
		padding: 0 0.2rem;
	}
	.info>div{
		overflow: hidden;
		position: relative;
		border-bottom: 0.03rem solid #F2F2F2;
	}
	.info>div .left{
		float:left;
		padding: 0.26rem 0 0.2rem 0;
		color: #999999;
	}
	.info>div .left p{
		line-height: 0.48rem;
		font-size: 0.24rem;
		width: 5.7rem;
	}
	.info>div img{
		float:right;
		width: 0.25rem;
		height: 0.39rem;
		position: absolute;
		top:50%;
		right: 0;
		margin-top: -0.195rem;
	}
	.info h3{
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.24rem;
	}
	.info h3 img{
		float: right;
		width: 0.14rem;
		height: 0.24rem;
		margin-top: 0.23rem;
	}
	.hr{
		height:0.12rem;
		background: #F2F2F2;
	}
	.container{
		padding: 0.3rem 0.2rem;
		font-size: 0.26rem;
		text-indent:0.5rem;
	}
	.container img{
		width: 100%;
    height: auto;
	}
	img[lazy=loading] {
    /*your style here*/
   		background: url(../../static/images/login.gif) no-repeat center center;
	  }
	  img[lazy=error] {
	    /*your style here*/
	   background: url(../../static/images/login.gif) no-repeat center center;
	  },
	  img[lazy=loaded] {
	    /*your style here*/
	  }
</style>