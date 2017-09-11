<template>
	<div class="detail_coll-act">
		<p class="detail_coll-act_title">
			<span class="detail_exh-vir_borferLeft"></span>
			活动
		</p>
		<div class="detail_coll-act_content detail_active_content">
			
			<div class="swiper-container">
		        <div class="swiper-wrapper">
		        	
		        	<div class="swiper-slide" v-for="item in act.activities" v-on:click="jumpDetail(item.id)">
		            	<img v-bind:src="item.picUrl" alt="" />
		            	<p v-text="item.name"></p>
		           </div>		       
		            
		        </div>
		    </div>	
		    
		</div>
	</div>
</template>
<script>
	export default{
		props:["act"],
		data(){
			return {
				swiper:{}
			}
		},
		mounted(){

		    
		},
		updated(){
			
	    	if("a11y" in this.swiper){
	    		
				this.swiper.update(true)
				
			}else{

				this.swiper = new Swiper('.detail_active_content .swiper-container', {
			        slidesPerView: "auto",
			       	spaceBetween: 15
		   	 	})
			}
		    
		},
		methods:{
			
			jumpDetail(id){
				
				this.$router.push({path:"ActivityDetail",query:{id:id}});	
				
			}
		}
		
	}



</script>
<style scoped="scoped">
	@import "../../static/css/museum_detail_coll-act_public.css"
</style>