<template>
	<div class="detail_exh-vir detail_exhibition_content">
		<p class="detail_exh-vir_title">
			<span class="detail_exh-vir_borferLeft"></span>
			展讯
		</p>
		<div class="detail_exh-vir_content ">
			
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        	
		        	<div class="swiper-slide" v-for="item in exh.spreadtrums" v-on:click="goRouter('exhDetail',item.id)">
		            	<img v-bind:src="item.picUrl" alt="" />
		            	<p v-text="item.name"></p>
		           </div>		       
		            
		        </div>
		    </div>	
		    
		</div>
		<span class="detail_exh-vir_border"></span>
	</div>
</template>
<script>
	export default{
		props:["exh"],
		data(){
			return{
				swiper:{}
			}
		},
		methods:{
			goRouter(str,exh){
				switch(str)
				{
					//	跳转展览详情页
					case "exhDetail":
					this.$router.push({path:"ExhibitionDetial",query:{id:exh}});
					break;
					
				}
			},
		},
		mounted(){
		    console.log(this.exh);
		},
		updated(){
			
			// bug修复=>第一个打开博物馆展览为空
			// this.swiper.hasOwnProperty(a11y)
//			"a11y" in this.swiper && 
//			
//			this.swiper.update(true) ||
//			
//			(this.swiper = new Swiper('.detail_exh-vir_content .swiper-container', {
//		        slidesPerView: "auto",
//	        	spaceBetween: 15
//	   	 	}))
			
			
			if("a11y" in this.swiper){
				
				this.swiper.update(true)
				
			}else{

				this.swiper = new Swiper('.detail_exhibition_content .swiper-container', {
			        slidesPerView: "auto",
			       	spaceBetween: 15
		   	 	})
			}
		    
		},
		
	}


</script>
<style scoped="scoped">

	@import "../../static/css/museum_detail_ex-vir_public.css";

</style>