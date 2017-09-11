<template>
	<div class="ExhibitionDetial">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<h2>
	            		<img @click="back" src="../../static/images/ExhibitionDetial_back.png" alt="" />
	            		简介：张博矩管
	            	</h2>
					<img src="../../static/images/ExhibitionDetial.png" alt="" />
				</div>
				<div class="swiper-slide">
					<h2>
	            		<img @click="back"  src="../../static/images/ExhibitionDetial_back.png" alt="" />
	            		简介：张博矩管
	            	</h2>
					<img src="../../static/images/ExhibitionDetial.png" alt="" />
				</div>
				<div class="swiper-slide">
					<h2>
	            		<img @click="back"  src="../../static/images/ExhibitionDetial_back.png" alt="" />
	            		简介：张博矩管
	            	</h2>
					<img src="../../static/images/ExhibitionDetial.png" alt="" />
				</div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
			<transtion name="introduce">
			<div class="introduce">
				<i>
					<img src="../../static/images/ExhibitionDetial_bottom.png" alt="" />
				</i>
				<p>
					张伯驹先生是集收藏家、鉴赏家、书画家、诗词学家、京剧艺术家于一身的文化奇人，其收藏之富，被誉为“天下第一藏”。先生与我院有着一段特殊的机缘，曾担任吉林省博物馆副馆长，为我院发展做出过重大贡献，并将个人收藏的大量历代书画作品捐献给我院。
				</p>
			</div>
		</transtion>
		</div>
		<div class="audio">
			<i>
				<img src="../../static/images/ExhibitionDetial_top.png" alt="" />
			</i>
			<div @click="play" class="audio-play">
				<img :class="{userLogo:userLogo}" src="../../static/images/ExhibitionDetial_user.png" alt="" />
				<u>
					<img :src="toggleBtn" alt="" />
				</u>
			</div>
			<div class="audio-info">
				<p>
					简介:张博矩管
					<span>吉林省博物馆</span>
				</p>
				<div class="audio-range">
					<input type="range" min='0' max='100' class='range' value='0'><span class='max'></span>
					<h6>{{time}}</h6>
					<audio id="ao" src="./src/static/1.mp3"></audio>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				time: '00:00',//初始化时间
				isPlay: false,//是否在播放
				toggleBtn:'./src/static/images/ExhibitionDetial_play.png',//切换播放按钮
				userLogo:false,//音频头像旋转。
			}
		},
		mounted() {
			this.swiper();
		},
		methods: {
			swiper() {
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					spaceBetween: 0,
					autoplay:2000,
					loop:true,
				});
			},
			back() {
				this.$router.go(-1);
			},
			//播放音频
			play() {
				var _this = this;
				_this.isPlay = !_this.isPlay;
				_this.userLogo = !_this.userLogo;
				_this.isPlay?_this.toggleBtn='./src/static/images/ExhibitionDetial_pause.png':_this.toggleBtn='./src/static/images/ExhibitionDetial_play.png';
				var audio = document.getElementById('ao');
				audio.play();
				var timer = setInterval(function() {
					var t = parseInt(audio.currentTime);
//					alert(t);
					var totle = audio.duration;
					if(_this.isPlay) {
						$(".range").attr({ 'max': totle });
						$(".range").val(t);
						_this.time = _this.timeToStr(t);
					}else{
						audio.pause();
					}
				}, 1000);
				if(audio.ended) {
					clearInterval(timer);
					$(".range").attr({ 'max': 0 });
				}
			},
			//时间转换格式
			timeToStr(time) {
				var m = 0,
					s = 0,
					_m = '00',
					_s = '00';
				time = Math.floor(time % 3600);
				m = Math.floor(time / 60);
				s = Math.floor(time % 60);
				_s = s < 10 ? '0' + s : s + '';
				_m = m < 10 ? '0' + m : m + '';
				return _m + ":" + _s;
			}
		}
	}
</script>
<style>
	.ExhibitionDetial .swiper-pagination-bullet {
		background: #fff!important;
		opacity: 1.0!important;
	}
	
	.ExhibitionDetial .swiper-pagination-bullet-active {
		background: #00c5e2!important;
	}
	
	.ExhibitionDetial .swiper-container-horizontal>.swiper-pagination-bullets,
	.swiper-pagination-custom,
	.swiper-pagination-fraction {
		bottom: 1.9rem!important;
	}
</style>
<style scoped>
	.ExhibitionDetial{
		position: relative;
	}
	.ExhibitionDetial .swiper-wrapper img {
		width: 6.4rem;
		height: 7.36rem;
	}
	
	.ExhibitionDetial .swiper-wrapper {
		position: relative;
	}
	
	.ExhibitionDetial .swiper-wrapper h2 {
		width: 100%;
		position: absolute;
		top: 0;
		height: 0.9rem;
		line-height: 0.9rem;
		background-color: rgba(0, 0, 0, .5);
		font-size: 0.34rem;
		color: #FFF;
		text-align: center;
		padding-left: 0.2rem;
	}
	
	.ExhibitionDetial .swiper-wrapper h2 img {
		width: 0.19rem;
		height: 0.35rem;
		float: left;
		margin-top: 0.225rem;
	}
	
	.ExhibitionDetial .audio {
		width: 6.02rem;
		height: 1.12rem;
		background: #FFFFFF;
		position: absolute;
		border: 0.01rem solid #F4F4F4;
		border-radius: 0.06rem;
		top: 5.9rem;
		left: 0.2rem;
		z-index: 1;
		box-shadow: 0rem 0.01rem 0.02rem #C0C0C0;
	}
	
	.ExhibitionDetial .audio i {
		position: absolute;
		width: 0.9rem;
		height: 0.9rem;
		background: #fff;
		top: -0.38rem;
		left: 50%;
		margin-left: -0.45rem;
		border-radius: 50%;
		z-index: -1;
	}
	
	.ExhibitionDetial .audio i img {
		width: 0.33rem;
		height: 0.19rem;
		position: absolute;
		top: 0.15rem;
		left: 0.28rem;
	}
	
	.ExhibitionDetial .audio .audio-play {
		float: left;
		width: 0.70rem;
		height: 0.70rem;
		border-radius: 50%;
		overflow: hidden;
		border: 0.04rem solid #00C5E2;
		margin-left: 0.25rem;
		margin-top: 0.14rem;
		position: relative;
	}
	
	.ExhibitionDetial .audio .audio-play>img {
		width: 0.70rem;
		height: 0.70rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.35rem;
		margin-left: -0.35rem;
	}
	
	.ExhibitionDetial .audio .audio-play u {
		width: 0.74rem;
		height: 0.74rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.35rem;
		margin-left: -0.35rem;
		background: rgba(0,0,0,.5);
	}
	
	.ExhibitionDetial .audio .audio-play u img {
		width: 0.23rem;
		height: 0.29rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.145rem;
		margin-left: -0.115rem;
	}
	
	.ExhibitionDetial .audio .audio-info {
		float: left;
		width: 4.7rem;
		margin-left: 0.1rem;
		margin-top: 0.2rem;
	}
	
	.ExhibitionDetial .audio .audio-info p {
		font-size: 0.22rem;
		width: 100%;
		color: #333333;
	}
	
	.ExhibitionDetial .audio .audio-info p span {
		float: right;
		color: #999999;
	}
	/*进度条样式*/
	
	.range {
		width: 3.98rem;
		height: 0.06rem;
		background: #E5E5E5;
		border-radius: 0.25rem;
		-webkit-appearance: none !important;
	}
	/* 进度滑块 */
	
	.range::-webkit-slider-thumb {
		width: 0.16rem;
		height: 0.16rem;
		background: #4CC3D4;
		border: 0.01rem solid #4CC3D4;
		cursor: pointer;
		border-radius: 0.25rem;
		-webkit-appearance: none !important;
	}
	
	.audio-range h6 {
		margin-top: 0.14rem;
		float: right;
		font-size: 0.22rem;
		color: #999999;
	}
@-webkit-keyframes userLogoRotate{
	0%{
		transform:rotate(0deg);
		-webkit-transform:rotate(0deg); 
	}
	25%{
		transform:rotate(90deg);
		-webkit-transform:rotate(90deg); 
	}
	50%{
		transform:rotate(180deg);
		-webkit-transform:rotate(180deg); 
	}
	75%{
		transform:rotate(270deg);
		-webkit-transform:rotate(270deg); 
	}
	100%{
		transform:rotate(360deg);
		-webkit-transform:rotate(360deg); 
	}
}
.userLogo{
/* Safari 和 Chrome */
	animation: userLogoRotate 2s linear infinite;
}
.ExhibitionDetial .introduce {
	background: #FFFFFF;
	width: 100%;
	position: absolute;
	left:0;
	bottom: 0rem;
	z-index: 100;
}
.ExhibitionDetial .introduce i {
		position: absolute;
		width: 0.9rem;
		height: 0.9rem;
		background: #fff;
		top: -0.38rem;
		left: 50%;
		margin-left: -0.45rem;
		border-radius: 50%;
		z-index: 1;
	}
.ExhibitionDetial .introduce p{
	line-height: 0.4rem;
	padding-bottom: 2rem;
	position: relative;
	z-index: 2;
	padding: 0 0.2rem;
	padding-top: 0.2rem;
	
}
	.ExhibitionDetial .introduce i img {
		width: 0.33rem;
		height: 0.19rem;
		position: absolute;
		top: 0.15rem;
		left: 0.28rem;
	}
</style>