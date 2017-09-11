<template>
	<div class="detail_coll-act">
		<p class="detail_coll-act_title">
			<span class="detail_exh-vir_borferLeft"></span>
			馆内精品
		</p>
		<div class="detail_coll-act_content detail_collection_content">
			
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        	
		        	<div class="swiper-slide" v-for="item in col.collections" v-on:click="goRouter('colDetail',item.id)">
		            	<img v-bind:src="item.pictureThumb" alt="" />
		            	<p v-text="item.name"></p>
		           </div>		       
		            
		        </div>
		    </div>	
		    
		</div>
		<span class="detail_coll-act_border"></span>
	</div>
</template>
<script>
	export default{
		props:["col"],
		data(){
			return {
				swiper:{}
			}
		},
		methods:{
			goRouter(str,col){
				switch(str)
				{
					//	跳转藏品详情页
					case "colDetail":
					this.$router.push({path:"scrollMode",query:{id:col}});
					break;
					
				}
			},

		    
		},
		updated(){
			
	    	if("a11y" in this.swiper){
				this.swiper.update(true)
				
			}else{

				this.swiper = new Swiper('.detail_collection_content .swiper-container', {
			        slidesPerView: "auto",
			       	spaceBetween: 15
		   	 	})
			}
		    
		},
		
	}
</script>
<style scoped="scoped">
	@import "../../static/css/museum_detail_coll-act_public.css"
</style>