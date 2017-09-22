<template>
	<div>
		<div class="shareBg bg" v-show="bgShow">
			<img src="../assets/img/arrow.png" alt="" class="">
			<div class="f18 cf">
				点击右上角“
				<img src="../assets/img/dot.png" alt="" class="">
				”进行分享
			</div>
		</div>	
		<div class="swiper-container">
			<pub-header title="推广慧享卡" v-show="titleShow" class="fixed"></pub-header>
	        <div class="swiper-wrapper">
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-01.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-02.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-03.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-04.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-05.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-06.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-07.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-08.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-09.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-10.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-11.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-12.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-13.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-14.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide">
	            	<img src="../assets/img/1-15.jpg" alt="" width="100%">
	            </div>
	            <div class="swiper-slide rel">
	            	<img src="../assets/img/1-16.jpg" alt="" width="100%">
	            	<div @click="apply()" class="pct100 abs clickPanel"></div>
	            </div>				
	        </div>
        </div>
	</div>
</template>
<script>
	import pubHeader from "./header.vue";
	import Store from "../assets/js/store";
	export default {
		data () {
			return {
				bgShow : false,
				titleShow : true,
				imgUrl : "data:image/jpeg;base64,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"
			}
		},
		components: {
			pubHeader
		},
		mounted(){
            //进来的时候初始化swiper
            this.swiperInit();
            //this.wxinit();
        },
    	created() {
			this.$http.get("/huiyimember/wxconf?url=" + window.location.href).then((res) => {
				console.log(JSON.parse(res.body.content.data.json));
				var configData = JSON.parse(res.body.content.data.json);
				this.appId = res.body.content.data.appId;
				this.timestamp = configData.timestamp;
				this.nonceStr = configData.noncestr;
				this.signature = configData.signature;
				var _this = this;
				if(!Store.fetch().personCode){
	        		_this.titleShow = false;
	        	}
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
				    'onMenuShareQZone'
				  ]
				});
				wx.ready(function(){
					//alert("准备好了");
					wx.onMenuShareAppMessage({ // 分享给朋友
						title: "拥有它，健康不再惧危机四伏！", // 分享标题
						desc: "一张神秘卡片，开售几分钟内一抢而空，首销火爆，让我们一探究竟......",   // 分享描述
						link: 'http://dwgl.nor-land.com/hyys/?#/share?id='+Store.fetch().id+'&mobile='+Store.fetch().mobile,   // 分享链接 默认以当前链接
						imgUrl: _this.imgUrl,// 分享图标
						success: function () {
							alert('分享成功');
						},
						cancel: function () {
							alert('分享到朋友取消');
						}
					});

					wx.onMenuShareTimeline({  //分享到朋友圈
						title: "拥有它，健康不再惧危机四伏！", // 分享标题
						desc: "一张神秘卡片，开售几分钟内一抢而空，首销火爆，让我们一探究竟......",   // 分享描述
						link: 'http://dwgl.nor-land.com/hyys/?#/share?id='+Store.fetch().id+'&mobile='+Store.fetch().mobile, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: _this.imgUrl, // 分享图标
						success: function (res) {
						// 用户确认分享后执行的回调函数
							alert('分享成功');
						},
						cancel: function () {
							alert('分享到朋友圈取消');
						}
					});
		        }); 
				wx.error(function(res){
				    console.log(res)
				});

			//  超时关闭
			/*setTimeout(e=>{console.log(e);},3000);*/

			}).catch((err) => {
				console.log("--err--");
				console.log(err);

			})
        },
        methods:{
        	swiperInit () {
        		let swiper = new Swiper('.swiper-container', {
			        paginationClickable: false,
			        centeredSlides: true,
			        direction: 'vertical',
			        height: window.screen.height,
			    });
        	},
        	wxinit () {
        		wx.ready(function(){
					wx.onMenuShareTimeline({  //分享到朋友圈
						title: "拥有它，健康不再惧危机四伏！", // 分享标题
						desc: "一张神秘卡片，开售几分钟内一抢而空，首销火爆，让我们一探究竟......",   // 分享描述
						link: 'http://dwgl.nor-land.com/hyys/?#/share?id='+Store.fetch().id+'&mobile='+Store.fetch().mobile, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.imgUrl, // 分享图标
						success: function (res) {
						// 用户确认分享后执行的回调函数
							alert('分享成功');
						},
						cancel: function () {
							alert('分享到朋友圈取消');
						}
					});
					alert("准备好了666");
					wx.onMenuShareAppMessage({ // 分享给朋友
						title: "拥有它，健康不再惧危机四伏！", // 分享标题
						desc: "一张神秘卡片，开售几分钟内一抢而空，首销火爆，让我们一探究竟......",   // 分享描述
						link: 'http://dwgl.nor-land.com/hyys/?#/share?id='+Store.fetch().id+'&mobile='+Store.fetch().mobile,   // 分享链接 默认以当前链接
						imgUrl: this.imgUrl,// 分享图标
						success: function () {
							alert('分享成功');
						},
						cancel: function () {
							alert('分享到朋友取消');
						}
					});
		        });
        	},
        	apply () {
        		if(Store.fetch().personCode){
        			this.bgShow = true;
				} else {
					this.$router.push({path:"register?mobile="+this.$route.query.mobile+"&id="+this.$route.query.id});
				};
        	}
        }
	}
</script>
<style scoped>
    .swiper-container {
        width: 100%;
    }
    .swiper-slide {
        width: 100%;
        overflow: hidden;
    }
    .swiper-slide img{
		overflow:hidden;
		position: relative;
    }
    .audioPanel{
    	position: absolute;
	    top: 5%;
	    right: 5%;
	    z-index: 99;
    }
    @media screen and (max-width: 320px) {
		button{
			bottom: 22% !important;
		}
	}
	.clickPanel{
	    height: 100px;
    	bottom: 10%;
	}
	.shareBg{
		z-index: 105;
	}
	.shareBg > img{
		position: absolute;
	    top: 15px;
	    right: 10%;
	}
	.shareBg div{
		position: absolute;
	    top: 250px;
	    right: 35%;
	}
	.shareBg div img{
		position: relative;
	}
	.bg{
	    height: 100%;
	    width: 100%;
	    height: 100vh;
	    width: 100vw;
	    background-color: rgba(0,0,0,.5);
	    z-index: 102;
	    position: fixed;
	    top: 0;
	    left: 0;
	}
	.fixed{
		position: fixed;
		top: 0;
		left: 0;
	}
	/* .swiper-slide img{
		margin-top: 50px;
	} */
	/* @import "./assets/css/swiper.min.css"; */

</style>
