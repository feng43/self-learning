<template>
	
	<div class="bwg_all">
		
		<!--搜索面板-->
		<transition name="search" appear>
			<div class="bwg_search" v-show="panel.search">
				<div>
					<form action="" onsubmit="return false;">
						<input class="searchInput" type="search" placeholder="请输入博物馆名称!"/>
					</form>
					<img v-on:click="searchMuseum" src="../../static/images/bowuguan_searchBtn2-1New.png" alt="博物馆搜索按钮" />
					<p v-on:click="togglePanel(false)">取消</p>
				</div>
				<div class="bwg_body_content searchContent" v-show="panel.searchContent">
					<div v-for="item in searchData.searchCity" v-on:click="goRouter('museum',item.id)">
						<img v-bind:src="item.picUrl" alt="" />
						<p v-text="item.name"></p>
						<div class="bwg_body_content_val">
							<h3 v-text="item.clickCounts"></h3>
						</div>
					</div>
					<img class="emptyImg" v-show="searchData.emptyImg" src="../../static/images/searchNone.png" alt="没有时显示这个图片" />
				</div>
			</div>
		</transition>
		
		<!--城市选择面板-->
		<transition name="city" appear>
			<div class="bwg_city" v-show="panel.city">
				<div class="bwg_city_select">
					<div>
						<p v-for="item in city" v-bind:class="{cityActive:cityActive==item.name}" v-on:click="selectCity(item,item.num)">{{item.name}}</p>
					</div>
				</div>
				<div class="bwg_city_content">
					<section v-on:click="goRouter('museum',item.id)" v-for="(item,index) in cityData.cityContent">
						<!-- 城市logo  -->
						<img v-bind:src="item.logo=item.logo||'src/static/images/bowuguan_detail_logo.png'" alt="" />
						<p v-text="item.name"></p>
					</section>
				</div>
			</div>
		</transition>		
		
		
		<!--博物馆start-->
		<div class="bwg_header">
			<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_backBtn.png" alt="博物馆回退按钮" />
			<img v-on:click="togglePanel(false)" src="../../static/images/bowuguan_searchBtn2-1New.png" alt="博物馆搜索按钮"/>
			<p v-on:click="togglePanel(true)" >
				
				<!--``````````````````````````2.1改版去除"/"````````````````````````````````-->
				<!--<span class="bwg_header_city">{{cityGps.cityName | cityAddress}}</span>-->
				<!--<span>{{panel.city?"收起":"切换"}}</span>-->
				
				
				<!--```````````````````````2.1改版``````````````````````````-->
				<span class="bwg_header_city" v-text="cityGps.cityName"></span>
				<span v-bind:class="{'bowuguan_cityPanelBtn_2-1New':panel.city}"></span>
				
			</p>
		</div>
		<div class="bwg_body">
			
			<div class="bwg_body_title bwg_body_hot" v-if="!near.length">
				<p>热门</p>
				
				<!--2.1修改-->
				<!--<p v-on:click="goRouter('hot')">更多</p>-->
			</div>
			
			<div class="bwg_body_hotContent bwg_body_content" v-if="!near.length">
				<div v-for="item in hot" v-on:click="goRouter('museum',item.id)">
					<img v-bind:src="item.picUrl" alt="" />
					<p v-text="item.name"></p>
					<div class="bwg_body_content_val">
						<h3 v-text="item.clickCounts"></h3>
					</div>
				</div>
			</div>
			
			
			<div class="bwg_body_title bwg_body_fujin" v-if="near.length">
				<p>附近</p>
				
				<!--2.1修改-->
				<!--<p v-on:click="goRouter('near')">更多</p>-->
			</div>
			<div class="bwg_body_fjContent bwg_body_content" v-if="near.length">
				<div v-for="item in near" v-on:click="goRouter('museum',item.id)">
					<img v-bind:src="item.picUrl" alt="" />
					<p v-text="item.name"></p>
					<div class="bwg_body_content_val">
						<h3>{{item.distance | dis}}</h3>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActionss} from 'vuex';
	export default{
		data(){
			return {
				cityActive:"长春",			//
				searchData:{
					searchCity:[],
					emptyImg:false,
					inputVal:""
				},
				showCity:"长春",
				city:[],
				panel:{
					city: false,
					search:false,
					searchContent:false
				},
				hot:[],						//热门
				near:[],					//附近
				cityData:{
					cityAll:[],
					cityContent:[],
				},
				cityGps:{
					cityId:0,
					cityName:"",
					latitude:0,
					longitude:0
				},
			}
		},
		activated(){
			//初始化

		},
		updated(){
					
			//底部面板隐藏
//			this.$store.dispatch('hideHeader');

		},
		mounted(){
			
			var cityData=this.$store.state.mutations.cityData;

			this.cityGps.latitude=cityData.latitude;
			
			this.cityGps.longitude=cityData.longitude;

			this.loadingCity("gps",{latitude:cityData.latitude,longitude:cityData.longitude});
			
			
			this.$nextTick(function(){

				var hei=new Array(2),
					iniHei=function(...arr){
					
						hei[1]=arr.reduce(function(iniVal,nowVal,index,arr){
							
							let val=iniVal-nowVal.outerHeight(true);
							
							!!!index && (val=-val) ||
							
							(!!!(index-2) && (hei[0]=val))
							
							return val;
							
						},0);

					};
				
				iniHei($(window),$(".bwg_header"),$("#Nav"),$(".bwg_city_select"));

				$(".bwg_city_content").height(hei[1]);
				
				$(".searchContent").height(hei[0]);

			});
			
			$(".searchInput").on("keydown",e=>{
				
				let keyNum=window.event ? e.keyCode : e.which;
				
				keyNum==13 && (this.searchMuseum())
				
			});
			
			
			
			
		},
		methods:{
			// 博物馆页面路由 控制
			goRouter(str,museum){
				switch(str)
				{
					//左上返回按钮
					case "back":
					this.$router.back();
					this.panel={city:false,search:false};
					break;
					
					
					//城市选择后博物馆
					case "museum":
					this.panel.city=false;
					this.$router.push({path:"museumDetail",query:{id:museum}});
					break;


					//热门更多按钮
					case "hot":
					this.$router.push({path:"hot",query:{cityId:this.cityGps.cityId}});
					break;
					
					
					//附近更多按钮
					case "near":
					this.$router.push({path:"near",query:{cityId:this.cityGps.cityId,latitude:this.cityGps.latitude,longitude:this.cityGps.longitude}});
					break;
				}
			},
			searchMuseum(str){
				var oThis=this,
					doSome={
						
						oInput:$(".searchInput"),
						
						searchVal:$(".searchInput").val(),
						
						reg:new RegExp("[\\u4E00-\\u9FFF]+","g"),
						
						change(oThis,_this){
							
							oThis.searchData.searchCity=[];
							
							oThis.loadingCity("search",{key:_this.searchVal});
							
							_this.oInput.attr("data-val",_this.searchVal);
							
							return 1;
							
						},
						
						ini(oThis){
							
							this.reg.test(this.searchVal) &&													 //检测汉子，没错就是汉子
							
							(this.oInput.attr("data-val")!==this.searchVal && this.change(oThis,this) || 1) || 	 //请求节流，相同搜索不在请求
							
							this.oInput.val("")																	 //非法字符时提示  请输入博物馆名称！
							
						}
					};
					
					
				doSome.ini(oThis);
					
				this.$nextTick(e=>{
					
					this.panel.searchContent=true;
					
				});

//				var oInput=$(".searchInput"),
//
//					searchVal=oInput.val(),
//
//					reg=new RegExp("[\\u4E00-\\u9FFF]+","g");	
//
//				if(reg.test(searchVal)){
//					
//					// 请求节流
//					if(oInput.attr("data-val")!==searchVal){
//						
//	                	this.searchData.searchCity=[];
//					
//						this.loadingCity("search",{key:searchVal});
//						
//						oInput.attr("data-val",searchVal);
//						
//					}
//					
//				}
//				else{
//					oInput.val("");
//				}

			},
			selectCity(item,index){
				
				//城市active
				this.cityActive=item.name;
				
				this.cityData.cityContent=this.cityData.cityAll[index].museum;

			},
			togglePanel(city){
				
				if(city){
					
					if(!this.panel.city){
						
						//第一次打开面板 --- 数据缓冲
						this.cityData.cityAll.length==0 && this.loadingCity("city")
						
						this.panel.city=true;
					}
					else{
						
						this.panel.city=false;
					}
					
				}else{
					
					this.panel={city:false,search:!this.panel.search,searchContent:false};
					
				}

			},
			loadingCity(str,obj){
				
				var _this=this;
				
				switch(str)
				{
					//城市选择面板数据操作
					case "city":
					this.$http.get(this.$store.state.mutations.getUrl+`/mip/mobile/museum/getCityMuseum.do`)
	                .then( (data) => {
	                   
	                   var cityData=data.data.data;
	                   
	                   this.cityData.cityAll=cityData;
	                   
	                   //第一次打开缓冲为  长春的博物馆数据
	                   this.cityData.cityContent=cityData[0].museum;
	                   
	                   //九个城市选项渲染
	                   for(let i=0;i<cityData.length;i++){
	                   	
		                   	this.city[i]={};
		                   	
		                   	this.city[i].name=cityData[i].name;
		                   	
							this.city[i].num=i;
	                   	
	                   }
	                   
	                   console.log(data);
	                   
	                })
	                .catch(function(error){
	                	
	                    alert("请求出错，请刷新页面!");
	                    
	           		})
	                break;
	                
					//搜索数据
					case "search":
					this.$http.get(this.$store.state.mutations.getUrl+`/mip/mobile/museum/getSesrchMuseums.do?key=${obj.key}&size=15&currentPage=1`)
	                .then( (data) => {
	                	
	                	!(!!data.data.data[0]) && (this.searchData.emptyImg=true) || (this.searchData.emptyImg=false)
	                	
	                	this.searchData.searchCity=data.data.data;
	                   
	                })
	                .catch(function(error){
	                	
	                    alert("请求出错，请刷新页面!");
	                    
	           		})
	                break;
	                
	                //定位数据
	                case "gps":
	                this.$http.get(this.$store.state.mutations.getUrl+`/mip/mobile/museum/getMuseumList.do?latitude=${obj.latitude}&longitude=${obj.longitude}`)
	                .then( (data) => {
	                	
	                	var gpsData=data.data.data;
	                	
	                	this.hot=gpsData.hotMuseums.slice(0,16);
	                	
	                	this.near=gpsData.nearMuseums.slice(0,16);
	                	
	                	this.cityGps.cityId=gpsData.cityId;
	                	
	                	this.cityGps.cityName=gpsData.cityName;
	                	
	                	console.log(data);
	                   
	                })
	                .catch(function(error){
	                	
	                    alert("请求出错，请刷新页面!");
	                    
	           		})
	                break;
					
				}
				
				
				
			}
		},
		filters:{
			dis(val){
				return (val/1000).toFixed(2)+" KM";
			},
			//2.1改版去除“/”
//			cityAddress(val){
//				return val+"/"
//			}
		}
	}
</script>
<style scoped="scoped">
	/*顶部活动CSS*/
	.cityActive{
		background-color: #F2F2F2 !important;
	}
	/*搜索弹出面板动画CSS*/
	.search-enter-active{
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translate3d(0,0,0);
	}
	.search-enter{
		transform: translate3d(100%,0,0);
	}
	.search-leave-active{
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translate3d(100%,0,0);
	}	
	/*城市选择面板动画CSS*/	
	.city-enter-active{
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translate3d(0,0,0);
	}
	.city-enter{
		transform: translate3d(0,-100%,0);
	}
	.city-leave-active{
		-webkit-transition: all 0.5s ease;
		transition: all 0.5s ease;
		transform: translate3d(0,-100%,0);
	}		
	
	
	/*城市选择的弹出层*/
	.bwg_city{
		background-color: white;
		top: 0.8rem;
		bottom: 0;
		left: 0;
		right: 0;
		position: fixed;
		z-index: 9;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.bwg_city_select{
		height: 2.65rem;
		width: 100%;
		padding: 0.08rem 0;
		border-bottom: 0.02rem solid #eee;
		
	}
	.bwg_city_select>div:nth-child(1){
		margin: 0 auto;
		width: 5.6rem;
	}
	.bwg_city_select>div:after{
		content: ".";
		height: 0;
		visibility: hidden;
		display: block;
		clear: both;
	}
	.bwg_city_select>div:nth-child(1) p{
		color: #333333;
		font-size: 0.24rem;
		line-height: 0.24rem;
		margin: 0.08rem 0.18rem;
		padding: 0.2rem 0;
		text-align: center;
		float: left;
		width: 1.48rem;
		border: 0.01rem solid #ddd;
		border-radius: 0.06rem;
	}
	.bwg_city_content{
		width: 100%;
		box-sizing: border-box;
		background-color: white;
		overflow: scroll;
		padding-bottom: 0.02rem;
	}
	.bwg_city_content>div{
		width: 100%;
	}
	.bwg_city_content h3{
		background-color: #F2F2F2;
		color: #999999;
		font-size: 0.25rem;
		line-height: 0.25rem;
		padding: 0.16rem 0 0.16rem 0.2rem;
	}
	.bwg_city_content section{
		width: 100%;
		padding: 0.16rem 0.2rem;
	}
	.bwg_city_content section:last-child{
		border-bottom: 0.25rem solid white;
	}
	
	.bwg_city_content section>img{
		display: block;
		float: left;
		height: 0.4rem;
		width: 0.4rem;
		margin-left: 0.35rem;
		border-radius:50% ;
	}
	.bwg_city_content section>p{
		color: #333333;	
		font-family: "微软雅黑";
		font-size: 0.24rem;
		line-height: 0.4rem;
		height: 0.4rem;
		margin-left: 0.85rem;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	
	

	.bwg_search{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		/*bottom: 0;*/
		right: 0;
		z-index: 20;
		background-color: #a92124;
	}

	.bwg_body_content{
		background-color: white !important;
	}
	.bwg_search>div>form{
		float: left;
	}
	input::-webkit-input-placeholder{
	    color: white;
	}
	
	/*.bwg_search>div input{
		display: block;
		float: left;
		border-radius: 0.05rem;
		height: 0.67rem;
		line-height: 0.67rem;
		width: 5.2rem;
		margin:0 0 0 0.2rem;
		padding: 0 0 0 0.45rem;
		background-color: #b74547;
		text-align: left;
		color: white;
		font-size: 0.22rem;
	}	
	.bwg_search>div:nth-child(1){
		padding: 0.12rem 0 0 0;
		height: 0.9rem;
	}	
	.bwg_search>div>p{
		margin-left: 5.4rem;
		color: white;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.67rem;
	}
	.bwg_search>div:nth-child(1)>img{
		display: block;
		width: 0.27rem;
		height: 0.26rem;
		position: absolute;
		top: 0.34rem;
		left: 0.32rem;
	}*/
	
	/*2.1版本修改*/
	.bwg_search>div input{
		display: block;
		float: left;
		border-radius: 0.05rem;
		height: 0.48rem;
		line-height: 0.48rem;
		width: 5.2rem;
		margin:0 0 0 0.2rem;
		padding: 0 0 0 0.5rem;
		background-color: #b74547;
		text-align: left;
		color: white;
		font-size: 0.22rem;
	}	
	.bwg_search>div:nth-child(1){
		padding: 0.17rem 0;
		height: 0.8rem;
	}
	.bwg_search>div>p{
		margin-left: 5.4rem;
		color: white;
		font-size: 0.26rem;
		text-align: center;
		line-height: 0.48rem;
	}
	.bwg_search>div:nth-child(1)>img{
		display: block;
		width: 0.27rem;
		height: 0.26rem;
		position: absolute;
		top: 0.3rem;
		left: 0.32rem;
	}	
	/*2.1版本修改结束*/
	
	
	

	.bwg_search>div>div{
		clear: both;
		background-color: white;
	}
	.searchContent{
		overflow-y: scroll;
		width: 100%;
		padding-top: 0 !important;
		padding-bottom: 1.8rem !important;
	}
	
	.searchContent>div:first-child{
		margin-top: 0.2rem;
	}
	.searchContent>div:last-child{
		margin-bottom: 0.35rem;
	}
	.emptyImg{
		display: block;
		width: 100% !important;
		height: auto !important;
		
	}	
	
	
	/*2.1修改之前*/
	/*.bwg_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		position: fixed;
		top: 0;
		background-color: #a92124;
		z-index: 10;
	}*/
	
	/*2.1修改*/
	.bwg_header{
		height: 0.8rem;
		width: 100%;
		padding-top: 0.24rem;
		position: fixed;
		top: 0;
		background-color: #a92124;
		z-index: 10;
	}
	/*2.1修改结束*/
	
	
	.bwg_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.19rem;
		height: 0.33rem;
	}
	.bwg_header>img:nth-child(2){
		float: right;
		display: block;
		margin-right: 0.2rem;
		width: 0.35rem;
		height: 0.33rem;
	}
	.bwg_header>p{
		width: 2rem;
		margin: 0 auto;
		line-height: 0.34rem;
		height: 0.34rem;
		padding: 0 0.5rem;
	}
	
	/*2.1版本*/
	.bwg_header>p>span:nth-child(2){
		float: right;
		display: block;
		width: 0.16rem;
		height: 0.34rem;
		background-image: url(../../static/images/bowuguan_cityPanelBtn_2-1New.png);
		background-repeat: no-repeat;
		background-position: center center; 
		background-size: 0.16rem 0.08rem;
		transition: transform 0.5s;
	}
	.bwg_header_city{
		font-size: 0.34rem;
		font-family: "微软雅黑";
		color: white;
		font-weight: 500;
	}
	.bowuguan_cityPanelBtn_2-1New{
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);	
	}
	/*2.1版本结束*/
	
	/*body*/
	.bwg_body{
		padding-bottom: 1.1rem;
	}
	/*hot*/
	.bwg_body_hot{
		height: 0.8rem;
		width: 100%;
		padding: 0.25rem 0.2rem 0;
		margin-top: 0.9rem;
	}
	.bwg_body_hot>p:nth-child(1){
		background-image: url(../../static/images/hotMuseum.png);
		background-size: 0.32rem 0.32rem;
		background-repeat: no-repeat;
		background-position: 0 center;
	}
	/*fujin*/
	.bwg_body_fujin{
		height: 0.8rem;
		width: 100%;
		padding: 0.25rem 0.2rem 0;
		margin-top: 0.9rem;
	}
	.bwg_body_fujin>p:nth-child(1){
		background-image: url(../../static/images/nearMuseum.png);
		background-size: 0.32rem 0.32rem;
		background-repeat: no-repeat;
		background-position: 0 center;
	}	
	
	/*共同CSS*/
	.bwg_body_title>p:nth-child(1){
		float: left;
		color: black;
		font-size: 0.26rem;
		margin-bottom: 0;
		padding-left: 0.4rem;
	}
	.bwg_body_title>p:nth-child(2){
		float: right;
		color: #999999;
		padding-right: 0.24rem;
		margin-bottom: 0;
		background-image: url(../../static/images/bowuguan_hot_more.png);
		background-position: right center; 
		background-repeat: no-repeat;
		background-size: 0.14rem 0.25rem;
	}

	/*附近-热度--内容部分共同CSS*/
	.bwg_body_content{
		padding: 0.1rem 0.2rem 0;
	}
	
	
	/*2.1版本修改前*/
	/*.bwg_body_content>div{
		position: relative;
		height: 4rem;
		width: 100%;
		-webkit-box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		box-shadow: 0rem 0.02rem 0.02rem #C0C0C0;
		margin-bottom: 0.25rem;
	}
	.bwg_body_content img{
		display: block;
		height: 3.3rem;
		width: 100%;
		margin: 0 auto;
	}
	.bwg_body_content p{
		font-family: "微软雅黑";
		font-size: 0.26rem;
		color: #333333;
		padding: 0.22rem 0 0 0;
		text-align: center;
	}
	.bwg_body_content_val{
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
	}*/
	
	/*2.1版本修改*/
	.bwg_body_content>div{
		position: relative;
		width: 100%;
		margin-bottom: 0.25rem;
		border-bottom: 0.01rem solid #dfdfdd;
	}
	.bwg_body_content img{
		display: block;
		height: 3.3rem;
		width: 100%;
		margin: 0 auto;
		border-radius: 0.05rem;
	}
	.bwg_body_content p{
		font-family: "微软雅黑";
		font-size: 0.26rem;
		line-height: 0.26rem;
		color: #333333;
		padding: 0.24rem 0;
		text-align: left;
	}
	.bwg_body_content_val{
		position: absolute;
		top: 0.2rem;
		right: 0.15rem;
		height: 0.4rem;
		width: 1.4rem;
		border-radius: 0.05rem;
		background-color: rgba(0,0,0,0.68);
		background-image: url(../../static/images/bowuguan_hot_reduzhi.png);
		background-repeat: no-repeat;
		background-size: 0.3rem 0.2rem;
		background-position: 0.13rem center;
		display: block;
	}
	/*2.1版本修改结束*/
	

	.bwg_body_content_val>h3{
		color: white;
		font-size: 0.22rem;
		padding-left: 0.5rem;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	
	/*附近内容不同CSS*/
	.bwg_body_fjContent>div>div{
		background-image: none !important;
	}
	.bwg_body_fjContent h3{
		padding: 0 !important;
	}
	
	
</style>