<template>
	<div class="NearbyAll">
		<h1>
			<img @click="back" src="../../static/images/bowuguan_backBtn.png" alt="" />
			附近
		</h1>
		<div class="content">
			<div class="hot">
				<ul>
					<li @click="toExhibitionDetal(item.id)" v-for="item in nearByList">
						<img v-lazy="item.picUrl" alt="" />
						<p>
							{{item.name}}
							<!--<span>10个讲解词</span>-->
						</p>
						<h2>
							<span>{{item.distance |stringKm}}KM</span>
						</h2>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				cityId:'',
				nearCityId:"",
				nearByList:[],
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			getMoerNearBy(id){
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/spreadtrum/getNearList.do?latitude=${this.$store.state.mutations.cityData.latitude}&longitude=${this.$store.state.mutations.cityData.longitude}&size=10&cityId=${this.nearCityId}`)
					.then((res)=>{
						console.log(res);
						this.nearByList = res.data.data;
					}).catch((err)=>{
						
					})
			},
			toExhibitionDetal(id){//去详情页面
				//alert(id);
				this.$router.push({ path: 'ExhibitionDetial', query: { id: id} });
			},
		},
		activated(){
			this.$store.dispatch('hideHeader');
			this.nearCityId = this.$route.query.nearCityId;
			this.cityId = this.$route.query.cityId;
			this.getMoerNearBy(this.nearCityId);
		},
		filters:{
			stringKm(str){
				return (parseInt(str)/1000).toFixed(2)
			},
		},
	}
</script>

<style scoped>
	.NearbyAll{
		padding-bottom: 0.96rem;
	}
	.NearbyAll h1{
		height: 0.8rem;
		width: 100%;
		border-bottom: 0.01rem solid #EEEEEE;
		text-align: center;
		font-size: 0.34rem;
		line-height: 0.8rem;
		color: #FFFFFF;
		position: fixed;
		top: 0;
		z-index: 99;
		background: #A92124;
	}
	.NearbyAll h1 img{
		width:0.19rem;
		height: 0.35rem;
		position: absolute;
		top:0.225rem;
		left: 0.2rem;
	}
	.NearbyAll .content{
		padding: 0 0.2rem;
		margin-top: 1.1rem;
	}
	.NearbyAll .nearby{
		margin-top: 0.2rem;
	}
	.NearbyAll .content>p{
		height: 0.38rem;
		line-height: 0.38rem;
		font-size: 0.26rem;
		color: #00C5E2;
	}
	.NearbyAll .content>p i{
		display: block;
		float: left;
		width: 0.05rem;
		height: 0.38rem;
		background: #00C5E2;
		margin-right: 0.2rem;
	}
	.NearbyAll .content>p .more{
		float: right;
		font-size: 0.23rem;
		color: #999999;
	}
	.NearbyAll .content p .more img{
		width: 0.11rem;
		height: 0.21rem;
		margin-top: 0.07rem;
	}
	.NearbyAll .content .hot ul{
		width: 100%;
		padding: 0 0.12rem;
	}
	.NearbyAll .content .hot ul li{
		position:relative;
		margin-top:0.20rem;
		/*box-shadow: 0rem 0.01rem 0.02rem #C0C0C0;*/
	}
	.NearbyAll .content .hot ul li>img{
		width:5.78rem;
		height:3.32rem;
		border-radius: 0.08rem;
    	overflow: hidden;
	}
	.NearbyAll .content .hot ul li p{
		width:5.78rem;
		height:0.7rem;
		line-height: 0.7rem;
		border-bottom: 0.01rem solid #E8E8E8;
		border-top: none;
		font-size: 0.26rem;
		color: #333333;
		/*padding-left: 0.3rem;*/
	}
	.NearbyAll .content .hot ul li p span{
		float: right;
		margin-right: 0.24rem;
		color: #999999;
	}
	.NearbyAll .content .hot ul li h2{
		height: 0.42rem;
		line-height: 0.42rem;
		font-size:0.22rem ;
		padding: 0 0.26rem;
		color: #fff;
		position: absolute;
		top:0.2rem;
		right: 0.1rem;
		background-color:rgba(0,0,0,.5);
		border-radius:0.25rem;
	}
	.NearbyAll .content .hot ul li h2 img{
		width:0.3rem;
		height: 0.18rem;
		margin-top: 0.12rem;
	}
	img[lazy=loading] {
    /*your style here*/
   		background: url(../../static/images/login.gif) no-repeat center center;
	  }
	  img[lazy=error] {
	    /*your style here*/
	   background: url(../../static/images/login.gif) no-repeat center center;
	  },
	  img[lazy=loaded] {
	    /*your style here*/
	  }
</style>