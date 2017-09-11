<template>
	<div>
		<div class="fj_header">
			<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_backBtn.png" alt="热门页面回退按钮" />
			<p>
				<span class="fj_header_city">附近</span>
			</p>
		</div>
		<div class="fj_body_content">
			<div v-for="item in near" v-on:click="goRouter('museum',item.id)">
				<img v-bind:src="item.picUrl" alt="" />
				<p v-text="item.name"></p>
				<div class="fj_body_content_val">
					<h3>{{item.distance | dis}}</h3>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex'
	
	export default{
		data(){
			return {
				near:[]
			}
		},
		beforeRouteEnter (to, from, next){
			
			
			next(vm=>{
				
				let cityData=to.query;
				
				!!vm.near.length==0 && 
				
		        vm.$http.get(`${vm.$store.state.mutations.getUrl}/mip/mobile/museum/getAllNearMuseumsFromCity.do?cityId=${cityData.cityId}&latitude=${cityData.latitude}&longitude=${cityData.longitude}`)
                .then( (data) => {
                   
                   	vm.near=data.data.data;
                   
					console.log(vm.near);                
                   
                })
                .catch(function(error){
                	
                    alert("请求出错，请刷新页面!");
                    
           		})	
				
			})
	 					
		},
		methods:{
			goRouter(str,obj){
				switch(str)
				{
					case "back":
					this.$router.back();
					break;
					
					case "museum":
					this.$router.push({path:"museumDetail",query:{id:obj}});
					
				}
				
				
			}
		},
		filters:{
			dis(val){
				return (val/1000).toFixed(2)+" KM";
			}
		}
		
	}
</script>
<style>
	.fj_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		border-bottom: 0.02rem solid #eee;
		position: fixed;
		top: 0;
		background-color: white;
		z-index: 10;
	}
	.fj_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.2rem;
		height: 0.35rem;
	}
	.fj_header>p{
		width: 2rem;
		margin: 0 auto;
		text-align: center;
		line-height: 0.34rem;
	}
	.fj_header_city{
		font-size: 0.34rem;
		font-family: "微软雅黑";
		color: #000000;
		font-weight: 500;
	}
	
	
	/*热门内容CSS*/
	.fj_body_content{
		padding: 1.1rem 0.28rem 1.2rem;
	}
	.fj_body_content>div{
		position: relative;
		height: 4rem;
		width: 100%;
		-webkit-box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		margin-bottom: 0.2rem;
	}
	.fj_body_content img{
		display: block;
		height: 3.3rem;
		width: 100%;
		margin: 0 auto;
	}
	.fj_body_content p{
		font-family: "微软雅黑";
		font-size: 0.26rem;
		color: #333333;
		padding: 0.22rem 0 0 0;
		text-align: center;
	}
	.fj_body_content_val{
		position: absolute;
		top: 0.2rem;
		right: 0.15rem;
		height: 0.4rem;
		width: 1.4rem;
		border-radius: 0.2rem;
		background-color: rgba(0,0,0,0.4);
		display: block;
	}
	.fj_body_content_val>h3{
		color: white;
		font-size: 0.22rem;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
	}	
</style>