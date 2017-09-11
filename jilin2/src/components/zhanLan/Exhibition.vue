<template>
	<div class="Exhibition">
		<h1>
			<img @click="back" src="../../static/images/bowuguan_backBtn.png" alt="" />
			<strong @click="toggleCity">{{cityinfo}}<span :class="{rotateActive:cityList}"></span></strong>
		</h1>
		<div class="content">
			<p>
				<i></i>最新
				<a class="more" @click="toMore">更多 <img src="../../static/images/Exhibition_go.png" alt="" /></a>
			</p>
			<div class="hot">
				<ul>
					<li @click="toExhibitionDetal(item.id)" v-for="(item,index) in newList">
						<img v-lazy="item.picUrl" alt="" />
						<p>
							{{item.name | nameString}}
							<!--<span>10个讲解词</span>-->
						</p>
						<!--<h2>
							<img src="../../static/images/Exhibition_eye.png" alt="" />
							<span>2312</span>
						</h2>-->
					</li>
				</ul>
			</div>
		</div>
		<div id="heightLigh" v-if="nearSpreList.length==0?false:true">
			
		</div>
		<div class="content nearby" v-if="nearSpreList.length==0?false:true">
			<p>
				<i></i>附近
				<a class="more" @click="toMoreNearBy">更多 <img src="../../static/images/Exhibition_go.png" alt="" /></a>
			</p>
			<div class="hot">
				<img id="noGps" v-if="isGps" src="../../static/images/noGps404.png" alt="" />
				<ul>
					<li @click="toExhibitionDetal(item.id)" v-for="(item,index) in nearSpreList">
						<img v-lazy="item.picUrl" alt="" />
						<p>
							{{item.name | nameString}}
							<!--<span>10个讲解词</span>-->
						</p>
						<h2>
							<span>{{item.distance | stringKm}}KM</span>
						</h2>
					</li>
				</ul>
			</div>
		</div>
		<transition name="cityAction">
			<div id="cityChange" v-show="cityList">
				<div>
					<ul>
						<li :id="item.id" v-for="item in city" @click="getCityData(item)">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div id='shade' @click="shade" v-show="isShade"></div>
		</transition>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				cityList: false,
				isShade: false,
				active: false,
				cityinfo: '长春',
				city: [],
				newList:[],
				nearSpreList:[],
				latitude:"",//经度
				longitude:"",//纬度
				cityId:'',//城市ID
				isGps:false,
				nearCityId:"",
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			toggleCity() {
				this.cityList = !this.cityList;
				this.isShade = !this.isShade;
				this.active = false;
			},
			shade() {
				this.toggleCity();
			},
			//点击获取城市对应的数据
			getCityData(item) {
				//测试拿到数据
				this.cityId = item.id;
//				alert(this.cityId);
				this.newList=[];
				this.nearSpreList=[];
				this.getNewData();
				this.toggleCity();
//				this.cityinfo = item.name;
			},
			toExhibitionDetal(id){//去详情页面
				//alert(id);
				this.$router.push({ path: 'ExhibitionDetial', query: { id: id} });
			},
			toMore(){//去更多页面
				this.$router.push({ path: 'ExhibitionAll', query: { cityId: this.cityId}});
			},
			toMoreNearBy(){
				this.$router.push({ path: 'NearbyAll', query: { nearCityId: this.nearCityId,cityId:this.cityId}});
			},
			//获取城市列表
			getCityList(){
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/museum/getCityMuseum.do`).then((res)=>{
					this.city = res.data.data;
					this.getNewData();
				}).catch((err)=>{
					
				})
			},
			//获取最新数据
			getNewData(){
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/spreadtrum/getHotAndNearList.do?latitude=${this.$store.state.mutations.cityData.latitude}&longitude=${this.$store.state.mutations.cityData.longitude}&cityId=${this.cityId}&nearCityId=${this.nearCityId}`).then((res)=>{
						console.log(res)
						//获取最新的
						this.cityId = res.data.data.cityId;
						this.cityinfo = res.data.data.cityName;
						this.newList = res.data.data.recentSpreList;
						//获取附近的
						this.nearCityId = res.data.data.nearCityId;
						this.nearSpreList = res.data.data.nearSpreList;
						this.nearSpreList.length==0?this.isGps=true:this.isGps=false;
					}).catch((err)=>{
						
					})
			}
		},
		created(){
			//获取定位如果能拿到   默认长春 125.440287,43.774199
//			this.latitude =125.440287; //经度
//			this.longitude = 43.774199;//纬度
//			this.nearCityId= 586,
			this.getCityList();
		},
		filters:{
			stringKm(str){
				return (parseInt(str)/1000).toFixed(2)
			},
			nameString(val) {
				return val.length >= 19 ? val.substring(0, 19) + "..." : val;
			},
		},
	}
</script>
<style scoped>
	#heightLigh{
		width: 100%;
		height: 0.2rem;
		background: #F2F2F2;
	}
	.cityAction-enter-active,
	.cityAction-leaver-active {
		transition: 1s all;
	}
	/*.cityAction-leaver-active,.cityAction-enter{
		transform: translateY(-100%);
	}*/
	
	.cityAction-enter-active {
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translateY(0);
	}
	
	.cityAction-enter {
		transform: translateY(-100%);
	}
	
	.cityAction-leave-active {
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translateY(-100%);
	}
	
	.Exhibition {
		padding-bottom: 0.96rem;
	}
	
	.Exhibition h1 {
		height: 0.8rem;
		width: 100%;
		border-bottom: 0.01rem solid #EEEEEE;
		text-align: center;
		font-size: 0.34rem;
		line-height: 0.8rem;
		font-weight: bold;
		position: fixed;
		top: 0;
		z-index: 99;
		background: #A92124;
	}
	
	.Exhibition h1 strong {
		color: #FFFFFF;
		font-size: 0.3rem;
	}
	
	.Exhibition h1 img {
		width: 0.19rem;
		height: 0.33rem;
		position: absolute;
		top: 0.235rem;
		left: 0.2rem;
	}
		
	.Exhibition h1 span {
		display: inline-block;
		position: relative;
		top:-0.04rem;
		left: 0.12rem;
		width: 0.16rem;
		height: 0.08rem;
		background: url(../../static/images/bowuguan_cityPanelBtn_2-1New.png)no-repeat center center;
		background-size: 100% 100%;
		transition: all 0.5s;
        transform: rotate(0deg);
	}
	.Exhibition h1 span.rotateActive{
        transform:rotate(180deg);
    }
	.Exhibition .content {
		padding: 0 0.2rem;
		margin-top: 1.1rem;
	}
	
	.Exhibition .nearby {
		margin-top: 0.2rem;
	}
	
	.Exhibition .content>p {
		height: 0.32rem;
		line-height: 0.32rem;
		font-size: 0.28rem;
		color: #333333;
	}
	
	.Exhibition .content>p i {
		display: block;
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		background: url(../../static/images/NEW.png)no-repeat center center;
		margin-right: 0.05rem;
		border-radius: 0.05rem;
		background-size: 100% 100%;
		/*margin-top: -0.02rem;*/
		overflow: hidden;
	}
	.Exhibition .nearby>p i{
		background: url(../../static/images/FUJIN.png)no-repeat center center;
		background-size: 100% 100%;
	}
	.Exhibition .content>p .more {
		float: right;
		font-size: 0.23rem;
		color: #999999;
	}
	
	.Exhibition .content p .more img {
		width: 0.11rem;
		height: 0.21rem;
		margin-top: 0.055rem;
	}
	.Exhibition .content .hot{
		text-align: center;
	}
	.Exhibition .content .hot ul {
		width: 100%;
		padding: 0 0.12rem;
		margin-top: 0.20rem;
	}
	.Exhibition .content .hot ul li{
		
		overflow: hidden;
	}
	.Exhibition .content .hot ul li:nth-of-type(1) {
		margin-bottom: 0.22rem;
		border-bottom-left-radius:0;
		border-bottom-right-radius: 0;
		overflow: hidden;
	}
	
	.Exhibition .content .hot ul li>img {
		width: 5.75rem;
		height: 3.32rem;
		border-radius: 0.08rem;
		overflow: hidden;
	}
	
	.Exhibition .content .hot ul li p {
		width: 5.78rem;
		height: 0.7rem;
		line-height: 0.7rem;
		border-top: none;
		font-size: 0.22rem;
		color: #333333;
		text-align: left;
	
	}
	.Exhibition .content .hot ul li:nth-child(1){
			border-bottom: 0.01rem solid #DFDFDD;
	}
	.Exhibition .content .hot ul li p span {
		float: right;
		margin-right: 0.24rem;
		color: #999999;
	}
	
	.Exhibition .content .hot ul li h2 {
		height: 0.42rem;
		line-height: 0.42rem;
		font-size: 0.22rem;
		padding: 0 0.26rem;
		color: #fff;
		position: absolute;
		top: 0.2rem;
		right: 0.1rem;
		background-color: rgba(0, 0, 0, .5);
		border-radius: 0.25rem;
	}
	
	.Exhibition .content .hot ul li h2 img {
		width: 0.3rem;
		height: 0.18rem;
		margin-top: 0.12rem;
	}
	
	#cityChange {
		position: fixed;
		top: 0.8rem;
		left: 0;
		background: #F2F2F2;
		height: 3.4rem;
		z-index: 97;
	}
	
	#cityChange div {
		padding: 0.25rem 0.35rem;
		background: #fff;
		overflow: hidden;
	}
	
	#cityChange div ul li {
		float: left;
		width: 1.7rem;
		height: 0.72rem;
		border: 0.01rem solid #DDDDDD;
		text-align: center;
		line-height: 0.72rem;
		font-size: 0.28rem;
		border-radius: 0.05rem;
	}
	
	#cityChange div ul li:hover {
		background: #F2F2F2;
	}
	
	#cityChange ul li:nth-of-type(4),
	#cityChange ul li:nth-of-type(5),
	#cityChange ul li:nth-of-type(6) {
		margin: 0.22rem 0;
	}
	
	#cityChange ul li:nth-of-type(2),
	#cityChange ul li:nth-of-type(5),
	#cityChange ul li:nth-of-type(8) {
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}
	
	#shade {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 96;
	}
	 .fade-enter-active,.fade-leave-active{
        transition: all .5s;
    }
    .fade-leave-active,.fade-enter{
        transform: translateY(100%);
        opacity: 0;
    }
    #noGps{
    	width: 3.42rem;
    	height: 3.14rem;
    	/*position: absolute;
    	left: 50%;
    	margin-left: -1.71rem;
    	margin-bottom: 0.9rem;*/
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