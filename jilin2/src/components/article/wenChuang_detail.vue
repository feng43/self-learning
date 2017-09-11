<template>
	<div class="wc_detail_all">
		<div class="wc_detail_header">
			<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_backBtn.png" alt="文创详情页回退按钮" />
			<p>
				<span v-text="wcTitle"></span>
			</p>
		</div>
		
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	        	
	            <div class="swiper-slide" v-for="item in wcData">
	            	<div class="wc_detail_banner">
	            		<img v-bind:src="item.pictureUrl" alt="" />
	            		<!--<img src="../../static/images/bg.png" alt="" />-->
	            	</div>
	            	<div class="wc_detail_title">
	            		<p v-text="item.productName"></p>
	            		<p>￥{{item.productPrice}}</p>
	            	</div>
	            	<div class="wc_detail_info">
	            		<p class="wc_detail_model_title">
	            			<span></span>
	            			<span>基本信息</span>
	            		</p>
	            		<div>
	            			<p>
	            				<span>类别</span>
	            				<span v-text="item.categoryName"></span>
	            			</p>
	            			<p>
	            				<span>单位</span>
	            				<span v-on:click="goRouter('museum',item.orgId)">{{item.orgName}} > </span>
	            			</p>
	            			<p>
	            				<span>设计元素</span>
	            				<span v-text="item.designElements"></span> 
	            			</p>
	            		</div>
	            	</div>
	            	<div class="wc_detail_description">
	            		<p class="wc_detail_model_title">
	            			<span></span>
	            			<span>简介</span>
	            		</p>
	            		<p v-html="item.content" class="wc_detail_description_content"></p>
	            	</div>
	            </div>
	            
	        </div>
	    </div>		
		
	</div>
</template>
<script>
import {mapGetters,mapActionss} from 'vuex';

export default{
	data(){
		return {
			wcTitle:"文创藏品",
			wcData:[],
			scrollSwiper:{}
		}
		
	},
	activated(){
		
		//	关闭底部导航
		this.$store.dispatch('hideHeader');
		
		$("body,html").scrollTop(0);
		
	},
	methods:{
		
		goRouter(str,obj){
			switch(str)
			{
				//左上返回按钮
				case "back":
				this.$router.back();
				break;
				
				
				//跳转博物馆
				case "museum":
				this.$router.push({path:"museumDetail",query:{id:obj}});
				break;

			}
		},
		
	},
	beforeRouteEnter(to,from,next){
		
		next(vm=>{
			
			let discoverData,data=vm.$store.state.mutations.articleDetailList;
			
			console.log("````````文创详情 data```````")
			console.log(data);
			
			discoverData=new Promise((resolve,reject)=>{
				
				if(!!data.dataList.length){
					
					vm.wcData=data.dataList;
					
					resolve(vm.wcData.findIndex((item,index)=>item.id==data.id));
					
				}else{
					
					vm.$http.get(`${vm.$store.state.mutations.getUrl}/mip/mobile/wenchang/getDetail.do?id=${to.query.id}`)
	            	.then((response) => {
	                    
	                    vm.wcData=[response.data.data];
						
						resolve(0);
	                    
	                }).catch((error) => {
	                	
	                    console.log(error)
	                });
					
				}
			});
			
			discoverData.then(value=>{
				
				//	第一次打开标题显示
				vm.wcTitle=vm.wcData[value].productName;
				
				vm.$nextTick(e=>{
				
					//	避免swiper多次实例化
					"destroy" in vm.scrollSwiper && 
					
					(e=>{
						
						vm.scrollSwiper.updateSlidesSize();
						
						vm.scrollSwiper.slideTo(value, 0, false);
							
						return "swiper重置";
						
					})() ||
					
					(e=>{
							
						vm.scrollSwiper = new Swiper('.swiper-container', {
						
							//打开时显示对应位置
							initialSlide:value,
							
							autoHeight:true,
							updateOnImagesReady:true,
							lazyLoadingOnTransitionStart:true,
							onSlideChangeEnd(swiper){
								
								vm.wcTitle=vm.wcData[swiper.activeIndex].productName;
								
						      	$("body,html").animate({scrollTop:0},50);
						      	
						    }
						});
						
						//第一次打开显示不全BUG解决办法
						$(".swiper-wrapper").css("height","auto");
						
					})()
				
				});
				
			});
			
		});
		
	}
	
	
}
	
	
</script>
<style >
	.wc_detail_header{
		height: 0.8rem;
		width: 100%;
		padding-top: 0.24rem;
		position: fixed;
		top: 0;
		background-color: rgba(169,33,36,0.68);
		z-index: 10;
	}	
	.wc_detail_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.19rem;
		height: 0.33rem;
	}
	.wc_detail_header>p{
		text-align: center;
		margin: 0 auto;
		line-height: 0.34rem;
		height: 0.34rem;
		padding: 0 0.5rem;
	}
	.wc_detail_header span{
		font-size: 0.3rem;
		font-family: "微软雅黑";
		color: white;
		font-weight: 400;
	}
	.wc_detail_all .swiper-container,.swiper-wrapper,.swiper-slide {
        width: 100% !important;
    }
    .wc_detail_banner{
    	width: 100%;
    	height: 4.27rem;
    }
    .wc_detail_banner>img{
    	display: block;
    	width: 100%;
    	height: 4.27rem;
    	max-height: 4.27rem;
    }
    .wc_detail_title{
    	padding: 0.3rem 0.2rem;
    	border-bottom: 0.01rem solid #dfdfdd;
    }
    .wc_detail_title>p:nth-child(1){
    	font-size:0.3rem;
    	line-height: 0.3rem;
    	font-weight: bold;
    	margin-bottom: 0.16rem;
    	color: black;
    }
    .wc_detail_title>p:nth-child(2){
    	font-size:0.22rem;
    	line-height: 0.22rem;
    	font-weight: bold;
    	color: #a92124;
    }
    .wc_detail_info{
    	padding: 0.3rem 0.2rem;
    	border-bottom: 0.01rem solid #dfdfdd;
    }
    .wc_detail_model_title{
    	margin-bottom: 0.26rem;
    }
    .wc_detail_model_title>span:nth-child(1){
    	display: block;
    	float: left;
    	width: 0.06rem;
    	height: 0.25rem;
    	border-radius: 0.03rem;
    	background-color: #a92124;
    }
    .wc_detail_model_title>span:nth-child(2){
    	display: block;
    	font-size: 0.28rem;
    	line-height: 0.25rem;
    	padding-left: 0.14rem;
    	color: black;
    }
	.wc_detail_info>div>p{
		display: block;
		float: left;
		padding-left: 0.32rem;
		margin-bottom: 0.22rem;
		font-size: 0.22rem;
		line-height: 0.23rem;
		color: #999999;
	}
	.wc_detail_info>div>p>span:nth-child(2){
		color: black;
	}
	.wc_detail_info>div>p:nth-child(2)>span:nth-child(2){
		color: #a92124;
	}
	
	
	.wc_detail_info>div:after{
		content: ".";
		height: 0;
		visibility: hidden;
		display: block;
		clear: both;
	}
	.wc_detail_info>div>p:nth-child(1){
		width: 2.65rem;
		max-width: 3rem;
		background-image: url(../../static/images/wc_detail_type.png);
		background-repeat: no-repeat;
		background-size: 0.22rem 0.22rem;
		background-position: 0 center;
	}
	.wc_detail_info>div>p:nth-child(2){
		width: 3rem;
		background-image: url(../../static/images/wc_detail_museum.png);
		background-repeat: no-repeat;
		background-size: 0.22rem 0.22rem;
		background-position: 0 center;
	}
	.wc_detail_info>div>p:nth-child(3){
		width: 100%;
		margin: 0;
		background-image: url(../../static/images/wc_detail_element.png);
		background-repeat: no-repeat;
		background-size: 0.22rem 0.22rem;
		background-position: 0 center;
	}
	.wc_detail_info>div>p:nth-child(3)>span:nth-child(2){
		line-height: 0.3rem;
	}
	
	
	.wc_detail_description{
		padding: 0.3rem 0.2rem 0.4rem;
	}
	.wc_detail_description_content{
		font-size: 0.26rem !important;
		color: black !important;
		text-indent: 0.52rem;
	}
	.wc_detail_description_content>p{
		font-size: 0.26rem !important;
		color: black !important;
		text-indent: 0.52rem;
		margin-bottom: 0.15rem;
	}
</style>