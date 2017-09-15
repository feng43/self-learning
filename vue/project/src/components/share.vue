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
			<pub-header title="推广慧享卡"></pub-header>
	        <div class="swiper-wrapper">
	            <div class="swiper-slide rel">
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
	            <div class="swiper-slide rel">
	            	<img src="../assets/img/1-11.jpg" alt="" width="100%">
	            	<button @click="apply()">立即申请</button>
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
				bgShow : false
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
        created () {
        	wx.ready(function(){
	          //alert("准备好了");
	          wx.onMenuShareAppMessage({ // 分享给朋友

	            title: "这张卡火冲天了，速速抢购预约！", // 分享标题

	            desc: "五清慧享卡，尊享七大超级权益，抢到赚到！",   // 分享描述

	            link: 'http://dwgl.nor-land.com/hyys/#/share?id='+Store.fetch().id+'&mobile='+Store.fetch().mobile,   // 分享链接 默认以当前链接

	            imgUrl: "../assets/img/card.jpg",// 分享图标
	            success: function () {
	              alert('分享成功');
	            },
	            cancel: function () {
	              alert('分享到朋友取消');
	            }

	          })
	        });
        },
        methods:{
        	swiperInit () {
        		let swiper = new Swiper('.swiper-container', {
			        paginationClickable: false,
			        centeredSlides: true,
			        direction: 'vertical',
			        height: 700,
			    });
        	},
        	/*wxinit () {
        		wx.ready(function(){
		          //alert("准备好了");
		          wx.onMenuShareAppMessage({ // 分享给朋友

		            title: "标题", // 分享标题

		            desc: "描述",   // 分享描述

		            link: "http://dwgl.nor-land.com/hyys/share",   // 分享链接 默认以当前链接

		            imgUrl: "../assets/img/dot.png",// 分享图标
		            success: function () {
		              alert('分享成功');
		            },
		            cancel: function () {
		              alert('分享到朋友取消');
		            }

		          })
		        });
        	},*/
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
			bottom: 31% !important;
		}
	}
	button{
		width: 50%;
	    height: 40px;
	    position: absolute;
	    bottom: 13%;
	    left: 50%;
	    margin-left: -25%;
	    border: none;
	    background: #000;
	    color: #FFF;
	    font-size: 20px;
    	letter-spacing: 10px;
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
	/* @import "./assets/css/swiper.min.css"; */

</style>
