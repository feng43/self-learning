<template>
	<div class="popup">
		<p>
			{{title}}
		</p>
		<div class="content">
			<h3>{{content}}</h3>
			<a class="cancel" @click="sure">
				取消
			</a>
			<a @click="repeatAudio">
				<img src="../../static/images/Cpdetail_sure.png" alt="" />
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title:"提示",
				content:"重新录制讲解词"
			}
		},
		methods:{
			sure(){
				this.$emit('hideShapePop');	
			},
			repeatAudio(){
				this.$emit('repeatAudio');	
			}
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
</style>