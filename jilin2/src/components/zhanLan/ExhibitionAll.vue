<template>
	<div class="ExhibitionAll">
		<h1>
			<img @click="back" src="../../static/images/bowuguan_backBtn.png" alt="" />
			最新
		</h1>
		<div class="content">
			<div class="hot">
				<ul>
					<li @click="toExhibitionDetal(item.id)" v-for="(item,index) in moreAll">
						<img v-lazy="item.picUrl" alt="" />
						<p>
							{{item.name}}
							<!--<span>10个讲解词</span>-->
						</p>
						<!--<h2>
							<img src="../../static/images/Exhibition_eye.png" alt="" />
							<span>2312</span>
						</h2>-->
					</li>
				</ul>
			</div>
			<div v-if="loading" class="loading">
					<img src="../../static/images/login.gif" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				cityId:"",//城市id
				currentPage:1,//当前页
				totalPage:1,//总页数
				moreAll:[],
				loading: false, //loading是否显示
			}
		},
		methods:{
			back(){
				this.moreAll=[];
				this.currentPage = 1;
				this.$router.go(-1);
			},
			getMoerZhanxun(id){
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/spreadtrum/getHotList.do?cityId=${id}&size=3&currentPage=${this.currentPage}`)
					.then((res)=>{
						console.log(res);
						this.moreAll = this.moreAll.concat(res.data.data);
						this.loading=false;
						this.currentPage = res.data.page.currentPage;
						this.totalPage = res.data.page.totalPage;
					}).catch((err)=>{
						
					})
			},
			toExhibitionDetal(id){//去详情页面
				//alert(id);
				this.$router.push({ path: 'ExhibitionDetial', query: { id: id} });
			},
		},
		mounted(){
			
		},
		created(){
			this.cityId = this.$route.query.cityId;
		},
		activated(){
			this.$store.dispatch('hideHeader');
			this.cityId = this.$route.query.cityId;
			var _this = this;
			if(this.moreAll.length==0){
				this.getMoerZhanxun(this.cityId);
			}
			var	ExhibitionAll=function(){
				console.log(_this.currentPage)
				console.log(_this.totalPage)
				if(_this.currentPage < _this.totalPage){
					var paddingBottom = parseInt($(".content").css('padding-bottom'));
					if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
						_this.loading=true;
				    	_this.currentPage++;
				    	_this.getMoerZhanxun(_this.cityId);
					}
				}
				
			};
			this.$store.state.mutations.scrollWin(ExhibitionAll,this);
		}
	}
</script>

<style scoped>
	.ExhibitionAll{
		padding-bottom: 0.96rem;
	}
	.ExhibitionAll h1{
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
	.ExhibitionAll h1 img{
		width:0.19rem;
		height: 0.35rem;
		position: absolute;
		top:0.225rem;
		left: 0.2rem;
	}
	.ExhibitionAll .content{
		padding: 0 0.2rem;
		margin-top: 1.1rem;
	}
	.ExhibitionAll .nearby{
		margin-top: 0.2rem;
	}
	.ExhibitionAll .content>p{
		height: 0.38rem;
		line-height: 0.38rem;
		font-size: 0.26rem;
		color: #00C5E2;
	}
	.ExhibitionAll .content>p i{
		display: block;
		float: left;
		width: 0.05rem;
		height: 0.38rem;
		background: #00C5E2;
		margin-right: 0.2rem;
	}
	.ExhibitionAll .content>p .more{
		float: right;
		font-size: 0.23rem;
		color: #999999;
	}
	.ExhibitionAll .content p .more img{
		width: 0.11rem;
		height: 0.21rem;
		margin-top: 0.07rem;
	}
	.ExhibitionAll .content .hot{
		margin-bottom: 0.2rem;
	}
	.ExhibitionAll .content .hot ul{
		width: 100%;
		padding: 0 0.12rem;
	}
	.ExhibitionAll .content .hot ul li{
		position:relative;
		margin-top:0.20rem;
		/*box-shadow: 0rem 0.01rem 0.02rem #C0C0C0;*/
	}
	.ExhibitionAll .content .hot ul li>img{
		width:5.78rem;
		height:3.32rem;
		border-radius: 0.08rem;
    	overflow: hidden;
	}
	.ExhibitionAll .content .hot ul li p{
		width:5.78rem;
		height:0.7rem;
		line-height: 0.7rem;
		border-bottom: 0.01rem solid #E8E8E8;
		border-top: none;
		font-size: 0.26rem;
		color: #333333;
		/*padding-left: 0.3rem;*/
	}
	.ExhibitionAll .content .hot ul li p span{
		float: right;
		margin-right: 0.24rem;
		color: #999999;
	}
	.ExhibitionAll .content .hot ul li h2{
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
	.ExhibitionAll .content .hot ul li h2 img{
		width:0.3rem;
		height: 0.18rem;
		margin-top: 0.12rem;
	}
	.loading {
		text-align: center;
	}
	
	.loading img {
		width: 0.76rem;
		height: 0.76rem;
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