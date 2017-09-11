<template>
	<div class="museum_addressMap">
		<div>
			<div class="museum_addressMap_header">
				<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_detail_back.png" alt="博物馆详情页面回退按钮"/>
			</div>
		</div>
	
		<div id="allmap">
			
		
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				gpsData:{
					latitude:125.4334400000,
					longitude:43.7689500000
				}

			}
		},
		methods:{
			
			showMap(latitude,longitude){
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(latitude,longitude);
				var marker = new BMap.Marker(point);  
				map.addOverlay(marker);              
				map.centerAndZoom(point, 14);
				map.enableScrollWheelZoom();
//				map.disableDragging(); 
			},
			goRouter(str,obj){
				switch(str)
				{
					case "back":
					this.$router.back();
					break;
				}
			},
		},
		beforeRouteEnter (to, from, next) {
			
			next(vm=>{
				
				var newGps=to.query;
				
				vm.gpsData=newGps;
				
				vm.showMap(vm.gpsData.latitude,vm.gpsData.longitude);
				
			});
		},
		activated(){
			this.$store.dispatch('hideHeader');
		}
	}
</script>
<style>
	body, html {width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
	#allmap{
		width:100%;
		height: 100%;
		min-height: 100%;
		min-width: 100%;
		position: fixed !important;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}	
	.museum_addressMap_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		position: fixed;
		top: 0;
		background-image: url(../../static/images/bowuguan_detail_headerBg.png);
		background-repeat:no-repeat;
		background-size: 100% 1rem;
		z-index: 10000;
		transition: 0.5s all ease;
	}
	.museum_addressMap_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.2rem;
		height: 0.35rem;
	}
</style>