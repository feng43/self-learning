<template>
	<div class="detail_all" v-bind:id="type[mumInfo.thinId]">
	<!--<div class="detail_all" id="history-3">-->
		<div>
			<div class="detail_header">
				<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_detail_back.png" alt="博物馆详情页面回退按钮"/>
				<p>
					<span v-on:click="goRouter('home')">首页</span>
				</p>
			</div>
		</div>
		
		<!--轮播-->
		<div class="detail_banner">
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        	<div class="swiper-slide" v-for="item in mumInfo.carouselList.slice(0,11)" >
		        		<img v-bind:src="item.backUrl"/>
		            </div>
		        </div>
		        <!-- Add Pagination -->
		        <div class="detail_banner_btn swiper-pagination" v-show="!!mumInfo.carouselList[1]"></div>
		    </div>
		</div>
		
		<!--信息-->
		<div class="detail_info">
			<div class="detail_info_text">
				<div>
					<img v-bind:src="mumInfo.logo || 'src/static/images/bowuguan_detail_logo_2-1New.png.png'" alt="" />
					<p v-text="mumInfo.museumName"></p>
				</div>
				<p v-on:click="goRouter('map',{lat:mumInfo.latitude,lng:mumInfo.longitude})" v-text="mumInfo.museumAddress"></p>
				<p v-text="mumInfo.openingHours"></p>
			</div>

			<div class="detail_audio_bg">
				
				<!--2.1去除背景层-->
				<!--<img v-bind:class="{detail_audio_rotate:audioData.play}" v-bind:src="mumInfo.logo || 'src/static/images/museum_home.png'" alt="" />-->
				
				<div v-on:click="audioPlay" v-bind:class="{detail_audio_btn:audioData.play}"></div>
				
				<!--<audio class="detail_audio" src="src/static/museum.mp3" style="height: 0;opacity: 0;">-->
				<audio class="detail_audio" v-bind:src="mumInfo.audio" style="height: 0;opacity: 0;">
					
					您的浏览器不支持音频播放
				</audio>
			</div>
			<!--信息展示5个图标-->
			
			<div class="detail_info_content">
				<!--<div 
					v-bind:class="{
						'detail_introduce':'场馆介绍'==item.name,
						'detail_history':'历史沿革'==item.name,
						'detail_exhibition':'展览概况'==item.name,
						'detail_visitNotes':'参观指南'==item.name,
						'detail_colletion':'藏品总说'==item.name,
						'detail_food':'附近餐饮'==item.name,
						'detail_buyTick':'如何买票'==item.name,
						'detail_serviceInformation':'服务信息'==item.name
					}"  
					class="detail_default"
					v-on:click="popInfo('detail',item.name,item.description)" 
					v-for="item in mumInfo.museumSubjects"
				>-->
				<div v-bind:class="detailColumn[item.name] || 'detail_default'" v-on:click="popInfo('detail',item.name,item.description)"  v-for="item in mumInfo.museumSubjects">
					
					<span v-text='item.name'></span>
					
				</div>
				
				<!--<div class="detail_introduce" v-on:click="popInfo('introduce','场馆介绍')">
					<span>场馆介绍</span>
				</div>
				<div class="detail_history" v-on:click="popInfo('buyTicket','历史沿革')">
					<span>历史沿革</span>
				</div>
				<div class="detail_nearby" v-on:click="popInfo('nearby','展览概况')">
					<span>展览概况</span>
				</div>
				<div class="detail_colletion" v-on:click="popInfo('visitNotes','藏品总说')">
					<span>藏品总说</span>
				</div>
				<div class="detail_visitNotes" v-on:click="popInfo('serviceInformation','参观指南')">
					<span>参观指南</span>
				</div>-->
				
			</div>
			

			
			<!--内容样式背景-->
			<div class="detail_content_bg"></div>
		</div>
 		<!--展迅-->
 		<exhibition-html v-bind:exh="museumData.museumAjax" v-show="museumData.museumAjax.spreadtrums[0]"></exhibition-html>
 		
 		<!--馆藏精品-->
 		<collection-html v-bind:col="museumData.museumAjax" v-show="museumData.museumAjax.collections[0]"></collection-html>
		
		<!--虚拟展厅-->
		<virtual-html v-bind:vir="museumData.museumAjax" v-show="museumData.museumAjax.virtuals[0]"></virtual-html>
		
		<!--活动-->
		<active-html v-bind:act="museumData.museumAjax" v-show="museumData.museumAjax.activities[0]"></active-html>
		
	
		<!--五个信息展示弹出层-->
		<div class="detail_info_message" v-show="museumData.museumInfo.show" v-on:click="popInfo('message','')">
			<div>
				<p class="detail_info_message_title">
					<img v-bind:src="museumData.museumInfo.icon" alt="" />
					<span v-text="museumData.museumInfo.title"></span>
					<span v-text="mumInfo.museumName"></span>
				</p>
				<p class="detail_info_message_content" v-html="museumData.museumInfo.content"></p>
			</div>
		</div>
	</div>
</template>
<script>
	
	import exhibition from "./museumDetail_exhibition.vue"
	import collection from "./museumDetail_collection.vue"
	import virtual from "./museumDetail_virtual.vue"
	import active from "./museumDetail_active.vue"
	import loading from "../loading/Loading.vue"
	
	/*艺术*/
	import '../../static/css/museum_detail_type_art.css'
	/*自然*/
	import '../../static/css/museum_detail_type_natural.css'	
	/*纪念*/
	import '../../static/css/museum_detail_type_remember.css'
	/*革命*/
	import '../../static/css/museum_detail_type_revolution.css'
	/*民俗*/
	import '../../static/css/museum_detail_type_nationalities.css'
	/*历史-1*/
	import '../../static/css/museum_detail_type_history-1.css'
	/*历史-2*/
	import '../../static/css/museum_detail_type_history-2.css'
	/*历史-3*/
	import '../../static/css/museum_detail_type_history-3.css'	
	
	export default{
		
		data(){
			return {
				detailColumn:{
					'场馆介绍':'detail_introduce',
					'历史沿革':'detail_history',
					'展览概况':'detail_exhibition',
					'参观指南':'detail_visitNotes',
					'藏品总说':'detail_colletion',
					'附近餐饮':'detail_food',
					'如何买票':'detail_buyTick',
					'服务信息':'detail_serviceInformation'
				},
				id:0,
				swiper:{},
				audioData:{
					play:false,
				},
				museumData:{							// 博物馆信息绑定响应数据
					museumAjax:{
						museumInfo:{carouselList:[],museumSubjects:[]},
						activities:[],
						spreadtrums:[],
						virtuals:[],
						collections:[]
					},
					museumInfo:{						// 弹出层响应数据
						title:"",
						content:"",
						show:false,
						icon:"",
					}
				},
				ajaxData:{},
				type:["","revolution","remember","history-1","history-2","history-3","nationalities","art","natural"],
			}
		},
		computed:{
			mumInfo(){
				//	dom 使用变量
				return this.museumData.museumAjax.museumInfo;;
			}
		},
		activated(){
			
			//进入重载
			$(".detail_audio")[0].load();

			//默认播放+播放完毕，停止转动
			$(".detail_audio").unbind().on("playing ended canplaythrough",e=>{
				
				switch(e.type)
				{
					case "playing":
					this.audioData.play=true;
					break;
					
					case "ended":
					this.audioData.play=false;
					break;
					
					case "canplaythrough":
					$(".detail_audio")[0].play();
					break;
					
				}
				
			});
			
		},
		deactivated(){
			//退出后清楚默认缓存
			this.audioData.play=false;
			
			this.museumData=this.$options.data().museumData;
			
			//	面高度解锁=>弹出框滚动穿透解决方案
			$("html,body").css({"overflow":"visible","height":"auto"});
		},
		updated(){
			
			if("a11y" in this.swiper){
				this.swiper.update(true)
				
			}else{

				this.swiper = new Swiper('.detail_banner .swiper-container', {
			        pagination: '.swiper-pagination',
			        paginationClickable: true,
			        autoplay:2000
		   	 	})
			}
			
		},
		mounted:function(){	   
					
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~博物馆详情页");
			
			
//			博物馆详情页滚动导航栏消失			
//			var	topToggle=function(){
//					var topHei=$(window).scrollTop(),
//						aniClas="";
//					
//					topHei>=50 && (aniClas="detail_headerToggle") || (aniClas="")
//					
//					$(".detail_header").parent().attr("class",aniClas);
//					
//				};
//		   
//			this.$store.state.mutations.scrollWin(topToggle,this);

		},
		beforeRouteEnter (to, from, next) {
			
			next(vm=>{
				
				let upDate={

					getDate(vm){
						
				        vm.$http.get(`${vm.$store.state.mutations.getUrl}/mip/mobile/museum/detail.do?id=${to.query.id}`)
		                .then( (data) => {
		                   
		                   	console.log(data)
		                   
							vm.museumData.museumAjax=data.data.data;
													
							vm.ajaxData[vm.$route.query.id]=data.data.data;		                   
		                   
		                })
		                .catch(function(error){
		                	
		                    alert("请求出错，请刷新页面!!");
		                    
		           		})	
							
					},
					ini(vm){
						
						(to.query.id in vm.ajaxData) &&
						
						(vm.museumData.museumAjax=vm.ajaxData[to.query.id]) ||
						
						this.getDate(vm)
											
						//博物馆点击次数加一
						$.get(`${vm.$store.state.mutations.getUrl}/mip/mobile/museum/addClickCounts.do?id=${to.query.id}`);
						
					}
				};
				
				//	博物馆详情页数据缓冲
				upDate.ini(vm);
				
				vm.$store.dispatch('hideHeader');
				
	        
	        });
		 	
	    },
		methods:{
			goRouter(str,obj){
				switch(str)
				{
					case "back":
					this.$router.back();
					break;
					
					case "home":
					this.$router.push("home");
					break;
					
					case "map":
					this.$router.push({path:"addressMap",query:{latitude:obj.lat,longitude:obj.lng}});
					break;
				}
			},
			audioPlay(){
				
				var audioControl={
					
					oAudio:$(".detail_audio")[0],
					
					doSome(oThis){
						
						var auData=oThis.audioData;
						
						auData.play=!auData.play;
					
						auData.play && 
						
						this.oAudio.play() || 
						
						this.oAudio.pause()
					},
					
					ini(oThis){
						
						// networkState=>网络状态
						var auState=this.oAudio.networkState;
						
						!!(auState>0 && auState<3) && this.doSome(oThis)
						
					}
				}

				audioControl.ini(this);
				
			},
			popInfo(type,title,content){
				
				let doSome={
					openMessage(_this,title,type){
						
						_this.museumData.museumInfo={
							
							title,
							
							content,
							
							show:true,
							
							icon:`src/static/images/${_this.detailColumn[title] || "detail_default"}.png`
							
						}
						
						$("html,body").css({"overflow":"hidden","height":"100%"});

						return "museum可变栏目模块";
						
					},
					closeMessage(_this){
						
						$("html,body").css({"overflow":"visible","height":"auto"});

						_this.museumData.museumInfo.show=false;
						
					},
					ini(_this,type,title){
						
						type!="message" && 
						
						this.openMessage(_this,title,type) || 
						
						this.closeMessage(_this)
						
					}
				};
				
				doSome.ini(this,type,title);
							
			}
		},
		components: {
			"exhibition-html": exhibition,
			"collection-html": collection,
			"virtual-html": virtual,
			"active-html": active,
		},
		
	}
</script>

<style>
	/*可更换样式   轮播图点颜色*/
	.detail_banner_btn .swiper-pagination-bullet-active{
		
		background-color: #a92124 !important;
		width: 16px !important;
		border-radius: 4px !important;
		
	}
	
	.detail_banner_btn .swiper-pagination-bullet{
		
		background-color: #CCCCCC;
		opacity: 1 !important;
		
	}
	
</style>
<style scoped="scoped">

	.detail_headerToggle{
		-webkit-transform: translateY(-100%);
		transform: translateY(-100%);
	}
	.detail_all>div:nth-child(1){
		-webkit-transition:all 0.5s ease;
		transition:all 0.5s ease;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10000;
	}

	.detail_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		position: fixed;
		top: 0;
		
		background-image: url(../../static/images/bowuguan_detail_headerBg.png);
		background-repeat:no-repeat;
		background-size: 100% 0.9rem;		
		z-index: 10;
		transition: 0.5s all ease;
	}
	.detail_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.2rem;
		height: 0.35rem;
	}
	.detail_header>p{
		width: 100%;
		text-align: right;
		line-height: 0.34rem;
		padding-right: 0.2rem;
	}
	.detail_header span{
		font-size: 0.30rem;
		font-family: "微软雅黑";
		color: #000000;
		font-weight: 500;
		color: white;
	}

	
	.swiper-container {
        width: 100%;
        height: 3.6rem;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
		
	.detail_banner{
		/*padding-top: 0.9rem;*/
	}
	.detail_banner img{
		width: 100%;
		height: 3.6rem;
	}
	.detail_banner_btn{
		bottom: 0.15rem !important;
		text-align: right;
		padding-right: 0.15rem;
	}
	
	
	/*info*/
	.detail_info{
		width: 100%;
		position: relative;
		border-bottom: 0.2rem solid #f2f2f2;
		padding-top: 0.2rem;
	}
	
	.detail_info_text{
		width:5.8rem;
		padding-bottom: 0.34rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #f2f2f2;
	}
	.detail_info_text>div{
		height: 0.5rem;
		width: 100%;
		margin-top: 0.24rem;
	}
	
	/*2.1改版前数据*/
	/*.detail_info_text>div:nth-child(1)>img{
		display: block;
		height: 0.4rem;
		width: 0.4rem;
		float: left;
		border-radius: 50%;
		margin-top: 0.05rem;
	}*/


	/*2.1改版开始*/		
	.detail_info_text>div:nth-child(1)>img{
		display: block;
		height: 0.25rem;
		width: 0.26rem;
		float: left;
		margin-top: 0.15rem;
	}
	/*2.1改版结束*/
	
	
	.detail_info_text>div:nth-child(1)>p{
		width: 4.5rem;
		height: 0.5rem;
		line-height: 0.5rem;
		padding-left: 0.1rem;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
		font-size: 0.3rem;	
		font-family:"微软雅黑";	
		color: black;
	}
	
	.detail_info_text>p:nth-child(2){
		color: #a92124;
		padding-left: 0.3rem;
		font-size: 0.22rem;
		text-decoration: underline;	
		background-image: url(../../static/images/bowuguan_detail_nearbyIcon.png);	
		background-position: left center;
		background-size: 0.22rem 0.27rem;
		background-repeat: no-repeat;
		margin-bottom: 0.1rem;
		margin-top: 0.1rem;
		
		width: 5rem;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	.detail_info_text>p:nth-child(3){
		display: flex;
		overflow: scroll;
		/*overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;*/
		
		color: #666666;
		max-height: 0.6rem;
		min-height: 0.3rem;
		font-size: 0.22rem;
		line-height: 0.3rem;
		padding-left: 0.3rem;
		background-image: url(../../static/images/bowuguan_detail_time.png);
		background-position: left 0.02rem;
		background-size: 0.25rem 0.26rem;
		background-repeat: no-repeat;
	}
	
	/*2.0版本居中显示*/
	/*.detail_audio_bg{
		width: 1rem;
		height: 1rem;
		position: absolute;
		background-color: rgba(0,0,0,0);
		border-radius:50%;
		top: -0.5rem;
		left: 50%;
		-webkit-transform: translateX(-0.5rem);
		transform: translateX(-0.5rem);
		z-index: 10;
	}
	.detail_audio_bg>img:nth-child(1){
		height: 0.95rem;
		width: 0.95rem;
		border-radius: 50%;
		position: absolute;
		top: 0.025rem;
		left: 0.025rem;
	}
	
	.detail_audio_bg>div:nth-child(2){
		height: 0.95rem;
		width: 0.95rem;
		border: 1px solid white;
		border-radius: 50%;
		position: absolute;
		top: 0.025rem;
		left: 0.025rem;
		background-color: rgba(0,0,0,0.6);
		background-image: url(../../static/images/bowuguan_detail_play.png);
		background-position: center center;
		background-size: 0.3rem 0.35rem;
		background-repeat: no-repeat;
	}
	.detail_audio_btn{
		background-image:url(../../static/images/bowuguan_detail_timeOut.png) !important;
	}
	.detail_audio_rotate{
		-webkit-transition: all 30000s linear;
		-webkit-transform: rotate(3600000deg);
		transition: all 30000s linear;
		transform: rotate(3600000deg);
	}
	*/
	
	/*2.1版本修改*/
	.detail_audio_bg{
		width: 0.61rem;
		height: 0.61rem;
		position: absolute;
		background-color: rgba(0,0,0,0);
		border-radius:50%;
		top: -1.22rem;
		right: 0.27rem;
		z-index: 10;
	}	
	
	.detail_audio_bg>div:nth-child(1){
		height: 0.61rem;
		width: 0.61rem;
		border-radius: 50%;
		position: absolute;
		top: 0.025rem;
		left: 0.025rem;
		background-image: url(../../static/images/bowuguan_detail_play_2.1New.png);
		background-position: center center;
		background-size: 0.61rem 0.61rem;
		background-repeat: no-repeat;
	}
	.detail_audio_btn{
		background-image:url(../../static/images/bowuguan_detail_timeOut_2.1New.png) !important;
		-webkit-transition: transform 30000s linear;
		-webkit-transform: rotate(3600000deg);
		transition: transform 30000s linear;
		transform: rotate(3600000deg);
	}
	/*2.1修改结束*/
	
	.detail_info_content{
		width: 6rem;
		margin: 0 auto;
	}
	.detail_info_content:after{
		content: ".";
		display: block;
		visibility: hidden;
		height: 0;
		clear: both;
	}
	
	.detail_info_content>div{
		float: left;
		height: 1.25rem;
		width: 1rem;
		padding-top: 0.8rem;
		text-align: center;
		margin: 0 0.1rem 0.4rem;
		font-size: 0.2rem;
	}
	.detail_info_content>div>span{
		margin-top: 0.22rem;
		display: block;
	}
	
	
	.detail_introduce{
		/*background-image:url(../../static/images/bowuguan_detail_introduce_normal.png);*/
		background-image:url(../../static/images/bowuguan_detail_introduce_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	.detail_history{
		/*background-image:url(../../static/images/bowuguan_detail_buyTicket_normal.png);*/
		background-image:url(../../static/images/bowuguan_detail_history_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	.detail_exhibition{
		/*background-image:url(../../static/images/bowuguan_detail_exhibition_normal.png);*/
		background-image:url(../../static/images/bowuguan_detail_exhibition_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}	
	.detail_colletion{
		/*background-image:url(../../static/images/bowuguan_detail_visitNotes_normal.png);*/
		background-image:url(../../static/images/bowuguan_detail_colletion_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	.detail_visitNotes{
		/*background-image:url(../../static/images/bowuguan_detail_visitNotes_normal.png);*/
		background-image:url(../../static/images/bowuguan_detail_visitNotes_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	.detail_serviceInformation{
		background-image:url(../../static/images/bowuguan_detail_serviceInformation_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}	
	.detail_food{
		background-image:url(../../static/images/bowuguan_detail_food_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	.detail_buyTick{
		background-image:url(../../static/images/bowuguan_detail_buyTick_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}	
	.detail_default{
		background-image:url(../../static/images/bowuguan_detail_default_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.68rem 0.68rem;
	}
	
	
	/*信息弹出窗口*/			
	.detail_info_message{
		
		/*display: none;*/
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 10000;
		touch-action: none;
	}
	.detail_info_message>div:nth-child(1){
		display: block;
		width: 5.76rem;
		height: 9.16rem;
		border-radius: 0.05rem;
		margin: auto;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color:white;
		z-index: 10000;
	}
	.detail_info_message_title{
		height: 0.88rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.24rem 0.2rem;
		background-color: #a92124;
	}
	.detail_info_message_title>img{
		display: block;
		float: left;
		margin-right:0.12rem;
		height: 100%;
		/*width: 0.4rem;*/
	}
	.detail_info_message_title>span:nth-child(2){
		display: block;
		float: left;
		color: white;
		font-size: 0.3rem;
		line-height: 0.4rem;
		font-family: "微软雅黑";
	}
	.detail_info_message_title>span:nth-child(3){
		display: block;
		float: right;
		color: white;
		font-size: 0.3rem;
		line-height: 0.4rem;
		font-family: "微软雅黑";
		width: 3rem;
		text-align: right;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}	
	
	.detail_info_message_content{
		height: 7.6rem;
		display: block;
		padding: 0rem 0.2rem;
		margin-top: 0.3rem;
		overflow-y: scroll;
	}
	.detail_info_message_content p{
		color: #333333;
	}
	
	.detail_content_bg{
		display: block;
		width: 100%;
		height: 0.75rem;
		position: absolute;
		bottom: -0.90rem;
		
		margin-top: 0;
		border-top: 0;
	}
	
</style>