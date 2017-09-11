<template>
	<div id="cpSearch">
		<h1>
			<div>
				<img src="../../static/images/bowuguan_searchBtn2-1New.png" alt="" />
				<form action="" id="museumSearchForm" onsubmit="return false;">
					<input type="search" placeholder="请输入藏品关键字" name="" id="searchName" v-model="searchvalue" />
				</form>
			</div>
			<img @click="toHome" src="../../static/images/home.png" alt="" />
		</h1>
		<!--搜索初始-->
		<div class="start" v-if="isStart">
			<h2>热门搜索</h2>
			<ul>
				<li @click="hotClick(item)" v-for="item in hotSearch">{{item}}</li>
			</ul>
		</div>
		<!--搜索结果-->
		<div class="end" v-if="!isStart">
			<h2>搜索结果</h2>
			<div class="content" id="pullrefresh">
				<div>
					<ul class="first">
						<li v-for="(evenItem,index) in evenHotPic" ref="aWdith" v-if="evenItem.picture.thumb2Str">
							<a @click="toCpdetail(evenItem.id)">
								<img v-lazy="evenItem.picture.thumb2Str" :height="evenItem.picture.thumb2Height*imgCut/evenItem.picture.thumb2Width" :width="imgCut" alt="">
								<p>{{evenItem.name.slice(0,7)}}</p>
							</a>                                    
							<i class="addShouCang right" :class="{shoucang:shoucang = evenItem.isCollected==1?true:false}" :id="evenItem.id" @click="addShouCang(evenItem.id,evenItem.collectionType)"></i>
						</li>
					</ul>
					<ul>
						<li v-for="oddItem in oddHotPic" v-if="oddItem.picture.thumb2Str">
							<a @click="toCpdetail(oddItem.id)">
								<img v-lazy="oddItem.picture.thumb2Str" :height="oddItem.picture.thumb2Height*imgCut/oddItem.picture.thumb2Width" :width="imgCut" alt="">
								<p>{{oddItem.name.slice(0,7)}}</p>
							</a>
							<i class="addShouCang right" :class="{shoucang:shoucang=oddItem.isCollected==1?true:false}" :id="oddItem.id" @click="addShouCang(oddItem.id,oddItem.collectionType)"></i>
							<!--<i class="addShouCang right" :class="{shoucang:shoucang=}" @click="addShouCang(collection.id)"></i>-->
						</li>
					</ul>
					<div class="searchNone" v-if="searchNone">
						<img src="../../static/images/searchNone.png" alt="" />
					</div>
				</div>
				<div v-if="loading" class="loading">
					<img src="../../static/images/login.gif" alt="" />
				</div>
			</div>
		</div>
		 <transition name="showError">
            <p class="errorTip" v-show="showErrorMsgTip">{{errorMsg}}</p>
        </transition>
	</div>
       
</template>

<script>
	export default {
		data() {
			return {
				searchNone:false,
				isStart:true,//是否搜索
				hotPic: [], //当前请求的瀑布流图片数组
				currentPage: 1, //当前瀑布流图片的页码
				totalPage:0,//总页数
				//              categoryId:'',     //当前分类id
				oddHotPic: [], // 瀑布流奇数的图片数组
				evenHotPic: [], // 瀑布流偶数的图片数组
				topLeft: 0,
				topRight: 0,
				loading: false, //loading是否显示
				imgCut:0, //图片进率
				id:"",
				shoucang: false,
				searchName:"",//搜索字段
				searchvalue:"",//搜索字段
				userInfo: "", //登陆信息。判断是否登陆
				scroll:0,
				errorMsg:"已收藏",
				showErrorMsgTip:false, //提示弹窗
				hotSearch:[
					'朝鲜族',
					'满族',
					'青花瓷',
					'山水',
					'草书',
					'唐三彩',
					'溥仪',
					'杨靖宇',
					'雍正',
					'伪满',
					'抗日战争'
				],
			}
		},
		mounted(){
			$("#museumSearchForm").on("submit",e=>{
				if(this.searchvalue=="")return;
				this.isStart = false;
				this.searchNone = false;
				this.currentPage = 1;
				this.searchName =  this.searchvalue;
				
				this.getInitHotAll(this.searchName,this.currentPage);
			});
		},
		methods: {
			//测试
//			test(){
//				alert(this.searchvalue)
//				if(this.searchvalue=="")return;
//				this.isStart = false;
//				this.searchNone = false;
//				this.currentPage = 1;
//				this.searchName =  this.searchvalue;
//				this.getInitHotAll(this.searchName,this.currentPage);
//			},
			//去详情页
			toCpdetail(id) {
				//          	alert(1);
				this.isStart = false;
				this.$router.push({path:"scrollMode",query:{id:id}});
			},
			//去首页
			toHome() {
				this.isStart = true;
				this.searchName = "";
				this.searchvalue="";
				this.hotPic=[], //当前请求的瀑布流图片数组
				this.currentPage=1, //当前瀑布流图片的页码
				this.totalPage=0,//总页数
				this.oddHotPic=[], // 瀑布流奇数的图片数组
				this.evenHotPic=[], // 瀑布流偶数的图片数组
				this.$router.push({
					path: 'Home'
				})
			},
			//点击热门搜索
			hotClick(name){
				this.isStart = false;
				this.searchName = name;
				this.getInitHotAll(this.searchName,this.currentPage);
			},
			//添加收藏
			addShouCang(id,collectionType) { //添加收藏
				if(this.userInfo) {
					if(!$("#"+id).hasClass("shoucang")) {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collect/collectCollection.do?id=${id}&collectionType=${collectionType}`).then((res) => {
							$("#"+id).addClass("shoucang");
							this.showErrorMsgTip = true;
                    		this.errorMsg = "已收藏";
		                    setTimeout(()=>{
		                        this.showErrorMsgTip = false;
		                    },2000);
//							this.getCpdetailData(this.id);
						}).catch((err) => {

						})
					} else {
						$("#"+id).attr("src", "src/static/images/Cpdetail_shoucang.png");
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collect/notCollectCollection.do?id=${id}&collectionType=${collectionType}`).then((res) => {
							console.log(res)
							$("#"+id).removeClass("shoucang");
							this.showErrorMsgTip = true;
                    		this.errorMsg = "已取消收藏";
		                    setTimeout(()=> {
		                        this.showErrorMsgTip = false;
		                    },2000);
//							this.getCpdetailData(this.id);
						}).catch((err) => {

						})
					}
				} else {
					this.$router.push({ path: 'Login' });
				}
			},
			getInitHotAll(searchName,currentPage) { //初始化全省热门分类数据的API方法
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getCollectionsByName.do?key=${searchName}&currentPage=${currentPage}`)
					.then((response) => {
						this.hotPic = response.data.data;
						if(response.data.data.length == 0){
							this.searchNone = true;
							this.hotPic=[];//当前请求的瀑布流图片数组
							this.currentPage=1; //当前瀑布流图片的页码
							this.totalPage=0;//总页数
							this.oddHotPic=[]; // 瀑布流奇数的图片数组
							this.evenHotPic=[]; // 瀑布流偶数的图片数组
						}else{
							this.searchNone = false;
						}
						this.totalPage = response.data.page.totalPage;
						this.getPicTop();
						this.searchvalue = "";
						console.log(response)
					})
					.then(() => {
							//计算图片宽的进率
							this.imgCut = this.$refs.aWdith[0].offsetWidth;
							
					})
					.catch(function(error) {
						console.info(error)
					});
			},
			getPicTop() { //瀑布流方法
				for(var i = 0; i < this.hotPic.length; i++) {
					// console.info(this.topLeft,this.hotPic[i].picture.thumb2Height);
					if(this.topLeft <= this.topRight) {
						this.topLeft += parseInt(278 * this.hotPic[i].picture.thumb2Height / this.hotPic[i].picture.thumb2Width) + 40;
						// this.hotPic[i].name=this.topLeft;
						this.oddHotPic.push(this.hotPic[i])
					} else {
						this.topRight += parseInt(278 * this.hotPic[i].picture.thumb2Height / this.hotPic[i].picture.thumb2Width) + 40;
						//  this.hotPic[i].name=this.topRight;
						this.evenHotPic.push(this.hotPic[i])
					}
				}
			},
			whatch(e) {
				this.scroll = pullrefresh.scrollTop;

				var paddingBottom = parseInt($(this.pullrefresh).css('padding-bottom'));

				if(this.scroll > 0 && (this.scroll + $(this.pullrefresh).height() + paddingBottom + 3) >= this.pullrefresh.scrollHeight) {
					this.loading = true;
					//解决更换博物馆之后默认是热门数据，滚动之后 也拿的是热门数据
					console.log(this.currentPage)
					console.log(this.totalPage)
					if(this.currentPage >= this.totalPage) {
						return this.loading = false;
					} else {
						this.getInitHotAll(this.searchName,++this.currentPage);
					}

				}

			},
		},
		updated(){
			if(!this.isStart){
				this.pullrefresh = document.getElementById("pullrefresh");
				this.pullrefresh.addEventListener('scroll', this.whatch);
			}
		},
		activated() {
			this.$store.dispatch('hideHeader');
			if(localStorage.user) {
				this.userInfo = JSON.parse(localStorage.user); //登陆信息
			}
		},
		created() {
//			this.getInitHotAll(this.searchName,this.currentPage);
		},
		filters: {

		},
	}
</script>

<style scoped>
	.showError-enter-active,.showError-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .showError-enter,.showError-leave-active{
        opacity: 0;
    }
	#cpSearch h1 {
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
		padding: 0 0.2rem;
	}
	
	#cpSearch h1>img {
		float: right;
		width: 0.4rem;
		height: 0.42rem;
		margin-top: 0.19rem;
	}
	
	#cpSearch h1 div {
		width: 5.32rem;
		height: 0.5rem;
		/*border: 0.01rem solid #DDDDDD;*/
		background-color: rgba(183, 69, 71, 0.5);
		float: left;
		margin-top: 0.15rem;
		border-radius: 0.08rem;
	}
	
	#cpSearch h1 div>img {
		float: left;
		width: 0.32rem;
		height: 0.31rem;
		margin-top: 0.1rem;
		margin-left: 0.12rem;
		margin-right: 0.04rem;
	}
	
	#cpSearch h1 div input {
		float: left;
		outline: none;
		height: 0.5rem;
		width: 4.8rem;
		border: none;
		line-height: 0.5rem;
		font-size: 0.22rem;
		background: transparent;
		text-align: left;
		color: #FFFFFF;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #FFFFFF;
		opacity: 1;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #FFFFFF;
		opacity: 1;
	}
	
	input:-ms-input-placeholder {
		color: #FFFFFF;
		opacity: 1;
	}
	
	input::-webkit-input-placeholder {
		color: #FFFFFF;
		opacity: 1;
	}
	
	.end,.start{
		position: absolute;
		top: 0.8rem;
		right: 0;
		left: 0;
		bottom: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.end h2 {
		height: 0.8rem;
		line-height: 0.8rem;
		padding: 0 0.2rem;
		color: #666666;
		font-size: 0.28rem;
	}
	
	.end .content {
		padding: 0 0.2rem;
		box-sizing: border-box;
		background-color: #f2f2f2;
		overflow: hidden;
		overflow-y: scroll;
		position: absolute;
		top: 0.8rem;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.end .content>div{
		overflow: hidden;
	}
	.end .content div>ul.first{
    	margin-right: 0.20rem;
	}
	.end .content div>ul{
	    width: 2.9rem;
	    float: left;
	}
	.end .content div>ul>li{
	    margin-bottom: 0.20rem;
	    position: relative;
	}
	.end .content div>ul>li>a {
	    display: block;
	    height: 100%;
	    border-radius: 0.08rem;
	    overflow: hidden;
	}
	.end .content div>ul>li p {
	    max-width: 100%;
	    background-color: #fff;
	    text-align: left;
	    box-sizing: border-box;
	    box-shadow: 0.02rem 0.02rem 0.03rem #e2e2e2;
	    color: rgb(51, 51, 51);
	    font-size: 0.22rem;
	    padding-left: 0.14rem;
	    color: #000000;
	    height: 40px;
	    line-height: 40px;
	}
	.end .content div>ul>li i{
		position: absolute;
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		top:0.24rem;
		right: 0.24rem;
		background:url(../../static/images/searchSc.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.end .content div>ul>li i.shoucang {
		background: url(../../static/images/searchSc1.png)no-repeat center center;
		background-size: 100% 100%;
	}
	#pullrefresh{
		padding-bottom: 1rem;
	}
	.loading {
		text-align: center;
	}
	
	.loading img {
		width: 0.76rem;
		height: 0.76rem;
	}
	.start h2 {
		height: 0.8rem;
		line-height: 0.8rem;
		margin: 0 0.2rem;
		color: #666666;
		font-size: 0.28rem;
		border-bottom: 0.01rem solid #DFDFDD;
	}
	.start ul{
		margin-top: 0.24rem;
		padding: 0 0.2rem;
		overflow: hidden;
	}
	.start ul li{
		float: left;
		margin-right: 0.32rem;
		padding: 0.1rem 0.15rem;
		background: #F2F2F2;
		border-radius: 0.08rem;
		margin-bottom: 0.15rem;
		font-size: 0.22rem;
		color: #000000;
	}
	.searchNone img{
		width: 100%;
	}
	.errorTip{
        border-radius: 0.05rem;
        background-color: rgba(102, 102, 102, 0.9);
        position: absolute;
        width: 2.88rem;
        height: 0.66rem;
        top:50%;
        left: 50%;
        margin: -0.33rem 0 0 -1.44rem;
        font-size: 0.26rem;
        color: rgb(255, 255, 255);
        line-height: 0.66rem;
        text-align: center;
    }
</style>