<template>
	<div>
		<div class="rm_header">
			<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_backBtn.png" alt="热门页面回退按钮" />
			<p>
				<span class="rm_header_city">热门</span>
			</p>
		</div>
		<div class="rm_body_content">
			<div v-for="item in hotMuseum" v-on:click="goRouter('museum',item.id)">
				<img v-bind:src="item.picUrl" alt="" />
				<p v-text="item.name"></p>
				<div class="rm_body_content_val">
					<h3 v-text="item.clickCounts"></h3>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return {
				hotMuseum:[]
			}
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
					break;
					
				}
				
			}
		},
		beforeRouteEnter (to, from, next){
			
			let cityId;
			
			next(vm=>{
				
				let cityId=to.query.cityId;
				
				//	缓冲数据如果没有数据就加载
				!!vm.hotMuseum.length==0 && 
				
		        vm.$http.get(`${vm.$store.state.mutations.getUrl}/mip/mobile/museum/getHotMuseumsFromCity.do?cityId=${cityId}`)
                .then( (data) => {
                   
					let hotData=data.data.data.slice(0,10);
					
					vm.hotMuseum=hotData;                  
                   
                })
                .catch(function(error){
                	
                    alert("请求出错，请刷新页面!");
                    
           		})	
				
			})
			
	 					
		},
		
	}
</script>
<style>
	.rm_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		border-bottom: 0.02rem solid #eee;
		position: fixed;
		top: 0;
		background-color: white;
		z-index: 10;
	}
	.rm_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.2rem;
		height: 0.35rem;
	}
	.rm_header>p{
		width: 2rem;
		margin: 0 auto;
		text-align: center;
		line-height: 0.34rem;
	}
	.rm_header_city{
		font-size: 0.34rem;
		font-family: "微软雅黑";
		color: #000000;
		font-weight: 500;
	}
	
	
	/*热门内容CSS*/
	.rm_body_content{
		padding: 1.1rem 0.28rem 1.2rem;
	}
	.rm_body_content>div{
		position: relative;
		height: 4rem;
		width: 100%;
		-webkit-box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		margin-bottom: 0.2rem;
	}
	.rm_body_content img{
		display: block;
		height: 3.3rem;
		width: 100%;
		margin: 0 auto;
	}
	.rm_body_content p{
		font-family: "微软雅黑";
		font-size: 0.26rem;
		color: #333333;
		padding: 0.22rem 0 0 0;
		text-align: center;
	}
	.rm_body_content_val{
		position: absolute;
		top: 0.2rem;
		right: 0.15rem;
		height: 0.4rem;
		width: 1.4rem;
		border-radius: 0.2rem;
		background-color: rgba(0,0,0,0.4);
		background-image: url(../../static/images/bowuguan_hot_reduzhi.png);
		background-repeat: no-repeat;
		background-size: 0.3rem 0.2rem;
		background-position: 0.25rem center;
		display: block;
	}
	.rm_body_content_val>h3{
		color: white;
		font-size: 0.22rem;
		padding-left: 0.5rem;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
	}	
</style>