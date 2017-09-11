<template>
	<div class="detail_exh-vir">
		<p class="detail_exh-vir_title">
			<span class="detail_exh-vir_borferLeft"></span>
			虚拟展厅</p>
		<div class="detail_exh-vir_content detail_virtual_content">
			
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        	
		        	<div class="swiper-slide" v-for="item in vir.virtuals" v-on:click="jumpDetail(item.viMoveUrl)">
		            	<img v-bind:src="item.thumb1" alt="" />
		            	<p v-text="item.viName"></p>
		           </div>		       
		            
		        </div>
		    </div>	
		    
		</div>
		<span class="detail_exh-vir_border"></span>
	</div>
</template>
<script>
	export default{
		props:["vir"],
		data(){
			return {
				swiper:{}
			}
		},
		mounted(){
			

		    
		},
		updated(){
			
//	    	"a11y" in this.swiper && 
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

				this.swiper = new Swiper('.detail_virtual_content .swiper-container', {
			        slidesPerView: "auto",
			       	spaceBetween: 15
		   	 	})
			}
			
		    
		},
		methods:{
			
			jumpDetail(str){
				
				window.location.href=str;
				
			}
			
			
		}
		
	}



</script>
<style scoped="scoped">
	@import "../../static/css/museum_detail_ex-vir_public.css";
</style>