<template>
	<div id="app">
		<loading v-show="loading"></loading>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<Homefooter v-show="headerShow"></Homefooter>
		<div id="load">
			<load v-show="show"></load>
		</div>
	</div>
</template>
<script>
	import Homefooter from "./components/Footer.vue"
	// import FooterView from "./components/Footer.vue"

	import load from "./components/loading/Loading.vue"

	import { mapGetters, mapActionss } from 'vuex'




	export default {
		data() {
			return {
				appId: '',
				timestamp: "",
				nonceStr: "",
				signature: "",
				url: '',
				show:true
			}
		},
		computed: {
			...mapGetters([
				'headerShow',
				'loading'
			])
		},
		watch: {
			$route(to, from) {
				console.log(to.path);
				if(to.path == '/ExhibitionAll' || to.path == '/ExhibitionDetial' || to.path == '/NearbyAll') {
					this.$store.dispatch('hideHeader');
				} else {
					this.$store.dispatch('showHeader');
				}
			}
		},
		components: {
			Homefooter,
			load
		},
		beforeCreated() {
			
		},
		created() {
			this.url = window.location.href;
//			this.$store.setUrl(window.location.host);
//			this.$http.get(`${this.$store.state.mutations.getUrl}/api/wxJsAuth.do?url=${this.url.split("#")[0]}`).then((res) => {
			this.$http.get(`${this.$store.state.mutations.getUrl}/mip/wxJsAuth.do?url=${this.url.split("#")[0]}`).then((res) => {
				this.appId = res.data.appId;
				this.timestamp = res.data.timestamp;
				this.nonceStr = res.data.nonceStr;
				this.signature = res.data.signature;
				var _this = this;
				wx.config({
					debug: false,
					appId: _this.appId,
					timestamp: _this.timestamp,
					nonceStr: _this.nonceStr,
					signature: _this.signature,
					jsApiList: [
						// 所有要调用的 API 都要加到这个列表中
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone',
						'hideMenuItems',
						'showMenuItems',
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem',
						'translateVoice',
						'startRecord',
						'stopRecord',
						'onVoiceRecordEnd',
						'playVoice',
						'onVoicePlayEnd',
						'pauseVoice',
						'stopVoice',
						'uploadVoice',
						'downloadVoice',
						'chooseImage',
						'previewImage',
						'uploadImage',
						'downloadImage',
						'getNetworkType',
						'openLocation',
						'getLocation',
						'hideOptionMenu',
						'showOptionMenu',
						'closeWindow',
						'scanQRCode',
						'chooseWXPay',
						'openProductSpecificView',
						'addCard',
						'chooseCard',
						'openCard',
						'translateVoice'
					]
				});
				//获取地里定位。	
				
				wx.ready(function () {
					_this.show=false;
					wx.getLocation({
						success: function(res) {
							var obj = {
								latitude: res.longitude,
								longitude: res.latitude
							}
							_this.$store.dispatch('changeCityId', obj);

//							var obj = {
//								latitude: 126.5560290057,
//								longitude: 43.8434481618
//							}
							_this.$store.dispatch('changeCityId', obj);
							
							$.get(`${_this.$store.state.mutations.getUrl}/mip/mobile/mainPage/getNearMuseum.do?latitude=${obj.latitude}&longitude=${obj.longitude}`,function(data){				
								
								if(data.success==1 && _this.$route.fullPath=="/home" && window.location.href.indexOf("login")==-1){
									
									_this.$router.push({path:"museumDetail",query:{id:data.data.museumId}});
									
								}
									
							});
							
							_this.show=false;
							
						},
						cancel: function(res) {
							alert('用户拒绝授权获取地理位置');
							_this.show=false;
						}
					});
				});
				
				//	超时关闭
				setTimeout(e=>{_this.show=false;},3000);
				
			}).catch((err) => {
				
				this.show=false;

			})
			
//							
//			
			
			
			//	为定位后获取的城市id  默认586长春

			// 	调用cityID
			//	this.$store.state.mutations.cityId  

			//	实例
			//	省外=》北京
			//			var obj={
			//						latitude:116.3751473064,
			//						longitude:39.8772516730,
			//					}		

			//	省内=》白城市
			//			var cityData={
			//						latitude:122.8651461364,
			//						longitude:45.6219445560,
			//					}	

			//	省内=》长春
			//			var obj={
			//						latitude:125.440287,
			//						longitude:43.774199,
			//					}

			//	省内=》吉林
			//			var obj={
			//						cityId:597,
			//						latitude:126.5648390000,
			//						longitude:43.8744200000,						
			//					}

		},
		mounted() {

		}
	}
</script>
<style scoped="scoped">

	#load .zns-loading{
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 10000;
		width:100%;
		height:100%;
		background-color: rgba(255,255,255,0.8) !important;
	}

	@import 'static/css/reset.min.css';
</style>