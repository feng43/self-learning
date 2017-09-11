<template>
	<div class="popup">
		<p>
			{{title}}
		</p>
		<div class="content">
			<div>
				<!--<b>
					<img :class="{userLogo:userLogo}" src="../../static/images/Cpdetail_user01.png" alt="" />
					<u @click="playAudio">
					<img  v-show="paly" src="../../static/images/ExhibitionDetial_play.png" alt="" />
					<img  v-show="pause" src="../../static/images/ExhibitionDetial_pause.png" alt="" />
				</u>
				</b>-->
				<h3>
					{{content}}
				</h3>

			</div>

			<a class="cancel" @click="cancel">
				取消
			</a>
			<a @click="upload">
				<img src="../../static/images/Cpdetail_save.png" alt="" />
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "提示",
				content: "保存讲解词？",
				paly: true,
				pause: false,
				userLogo: false,
			}
		},
		methods: {
			cancel() {
				this.userLogo = false;
				this.paly=true;
				this.pause=false;
				this.$emit('cancel');
			},
			upload() {
				this.userLogo = false;
				this.paly=true;
				this.pause=false;
				this.$emit("upload");
			},
//			playAudio() {
//				this.paly = !this.paly;
//				this.pause = !this.pause;
//				this.userLogo = !this.userLogo;
//				this.$emit("playAudio");
//			}
		}

	}
</script>

<style scoped>
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 5.64rem;
		height: 2.4rem;
		margin-top: -1.2rem;
		margin-left: -2.82rem;
		/*border: 0.01rem solid #FF0000;*/
		background: #FFF;
		border-radius: 0.1rem;
		overflow: hidden;
		z-index: 101;
	}
	
	.popup p {
		background: #1DD2D2;
		height: 0.66rem;
		line-height: 0.66rem;
		color: #fff;
		padding-left: 0.25rem;
		font-size: 0.28rem;
		box-shadow: #96E7F3 0 0 0.03rem;
	}
	
	.popup .content h3 {
		text-align: left;
		font-size: 0.26rem;
		padding: 0.15rem 0;
		line-height: 0.44rem;
		color: #666666;
		font-size: 0.26rem;
	}
	
	.popup .content div {
		margin-top: 0.15rem;
		overflow: hidden;
	}
	
	.popup .content div b {
		float: left;
		width: 0.68rem;
		height: 0.68rem;
		margin-right: 0.25rem;
		border-radius: 50%;
		overflow: hidden;
		position: relative;
	}
	
	.popup .content div img {
		width: 0.68rem;
		height: 0.68rem;
		vertical-align: middle;
	}
	
	.popup .content div b u {
		position: absolute;
		top: 0;
		left: 0;
		width: 0.68rem;
		height: 0.68rem;
		background: rgba(0, 0, 0, .5);
	}
	
	.popup .content div u img {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.24rem;
		height: 0.28rem;
		margin-left: -0.12rem;
		margin-top: -0.14rem;
	}
	
	.popup .content {
		padding: 0 0.25rem;
		text-align: right;
	}
	
	.popup .content a img {
		width: 1.8rem;
		height: 0.67rem;
	}
	
	.popup .content>a.cancel {
		color: #C3C1C1;
		display: inline-block;
		padding: 0.08rem 0.32rem;
		/*background:#1DD2D2;*/
		border-radius: 0.1rem;
		font-size: 0.26rem;
	}
	
	@-webkit-keyframes userLogoRotate {
		0% {
			transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
		}
		25% {
			transform: rotate(90deg);
			-webkit-transform: rotate(90deg);
		}
		50% {
			transform: rotate(180deg);
			-webkit-transform: rotate(180deg);
		}
		75% {
			transform: rotate(270deg);
			-webkit-transform: rotate(270deg);
		}
		100% {
			transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
		}
	}
	
	.userLogo {
		/* Safari 和 Chrome */
		animation: userLogoRotate 2s linear infinite;
	}
</style>