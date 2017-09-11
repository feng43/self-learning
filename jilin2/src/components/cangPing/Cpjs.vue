<template>
	<div class="cp-js">
		<div class="cp-wrapper">
			<!--导航-->
			<!--<nav class="nav">
				<span class="cp-back" @click="back()"></span>
				<span class="cp-city" @click="getCityMuseumInfo()">
                    <span v-show="lock" @click="hidden()"><strong>全省/</strong>选择单位</span>
					<strong v-show="!lock">{{cityName}}</strong>
				</span>
			</nav>-->
			<h1>
				<img @click="back" src="../../static/images/bowuguan_backBtn.png" alt="" />
				<strong class="cp-city" @click="getCityMuseumInfo()">
                    <strong @click="hidden()">{{cityName}}<span :class="{rotateActive:showMasking}"></span></strong>
					<!--<strong v-show="!lock">{{cityName}}<span :class="{rotateActive:!rotateActive}"></span></strong>-->
				</strong>
				<img class="search" @click="search" src="../../static/images/bowuguan_searchBtn2-1New.png"/>
			</h1>
			<!--二级分类-->
			<section id="topNav" class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide cur active"><span>热门</span></div>
					<!--<div class="swiper-slide on"><span>3D藏品</span></div>-->
					<div class="swiper-slide" v-if="index<showNum" v-for="(item,index) in reclassify"><strong style="display:none;">{{item.collectionsCategory}}</strong><span>{{item.name}}</span></div>
					<div class="swiper-slide" v-show="showNum <= 11"><span>更多...</span></div>
				</div>
			</section>

		</div>
		<!--上拉加载容器-->
		<!--瀑布流布局-->
		<div id="pubuliu">
			<!--三级时间分类-->
			<transition name="downNav">
				<section id="downNav" v-show="yearTime" class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="threeItem in threeLevel"><i></i><strong style="display:none;">{{threeItem.yearType}}</strong><span :id="'cao'+threeItem.yearType">{{threeItem.name}}</span><i></i></div>
					</div>
				</section>
			</transition>

			<transition name="totalCp">
				<p v-show="totalCp" class="cpjs-msg">共{{CpAll}}件藏品</p>
			</transition>
			<section id="pullrefresh" class="cp-pic">
				<div>
					<ul class="first">
						<li v-for="(evenItem,index) in evenHotPic" ref="aWdith" v-if="evenItem.picture.thumb2Str">
							<a @click="toCpdetail(evenItem.id,evenItem.collectionType,evenItem.isCollected)">
								<img v-lazy="evenItem.picture.thumb2Str" :height="evenItem.picture.thumb2Height*imgCut/evenItem.picture.thumb2Width" :width="imgCut" alt="">
								<p>{{evenItem.name.slice(0,7)}}</p>
							</a>
						</li>
					</ul>
					<ul>
						<li v-for="oddItem in oddHotPic" v-if="oddItem.picture.thumb2Str">
							<a @click="toCpdetail(oddItem.id,oddItem.collectionType,oddItem.isCollected)">
								<img v-lazy="oddItem.picture.thumb2Str" :height="oddItem.picture.thumb2Height*imgCut/oddItem.picture.thumb2Width" :width="imgCut" alt="">
								<p>{{oddItem.name.slice(0,7)}}</p>
							</a>
						</li>
					</ul>
				</div>
				<div v-if="loading" class="loading">
					<img src="../../static/images/login.gif" alt="" />
				</div>
			</section>
		</div>
		<!--城市博物馆列表-->
		<transition name="toggleMasking">
			<cp-mask v-show="showMasking" :oddHotPic="oddHotPic" @black="black" :mySwiperTwo="mySwiperTwo" :getDate="Cpcanshu" :showMasking="showMasking" @toggleCity="toggleCity" :cityMuseumList="cityMuseumList" @send="getData">
			</cp-mask>
		</transition>
	</div>

</template>

<script>
	import swiper from "../../static/js/swiper.min.js";
	import $ from "../../static/js/jquery-1.11.3.js";
	import masking from "./masking.vue";
	import { mapState, mapMutations, mapGetters } from "vuex";
	import vuex from "vuex";

	export default {
		data() {
			return {
				isClickmesuem: false, //是否选择了博物馆藏品，为了控制页数定义的变量。解决博物馆详情页分页问题。
				CpAll: 0, //藏品总数量。
				totalCp: true, //共多少件藏品，默认显示
				loading: false, //loading是否显示
				pullrefresh: null, //藏品滚动条dom
				scroll: 0, //当前的滚动坐标
				hotPic: [], //当前请求的瀑布流图片数组
				currentPage: 1, //当前瀑布流图片的页码
				//              categoryId:'',     //当前分类id
				oddHotPic: [], // 瀑布流奇数的图片数组
				evenHotPic: [], // 瀑布流偶数的图片数组
				topLeft: 0,
				topRight: 0,
				cityMuseumList: [], //弹出层的城市列表
				reclassify: [], //二级分类列表数组
				showNum: 11, // 二级分类显示的数量11条
				threeLevel: [], //三级年代的数据
				//              yearTime:false,//年代是否显示
				showMasking: false,
				cityName: "全省",
				lock: true, //判断显示哪个城市
				data: {},
				localStr: "", //存放到浏览器本地存储的字符串。				
				Cpcanshu: { //请求参数+上数据列表
					museumId: "",
					year: "", //默认多的年代
					categoryId: "",
					totalPage: 0, //当数据前页 做滚动加载判断
					totalPageGundong: 0, //总页数
					dataList: [], //存放数据给详情页
				},
				mySwiper: {}, //三级分类年代swiper对象插件
				mySwiperTwo: {}, //二级分类swiper插件对象
				imgCut: 0, //图片进率
			}
		},
		methods: {
			//去搜索
			search(){
				this.$router.push({ path: 'cpSearch'})
			},
			back() {
				this.$router.go(-1);
				this.showMasking = false;
				this.hidden();
			},
			black() {
				this.showMasking= false;
			},
			initSeting() { //初始化设置项
				this.oddHotPic = [],
					this.evenHotPic = [],
					this.currentPage = 2,
					this.topLeft = 0;
				this.topRight = 0;
				this.scroll = this.pullrefresh.scrollTop = 1;
			},
			getInitHotAll() { //初始化全省热门分类数据的API方法
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?currentPage=1`)
					.then((response) => {
						this.hotPic = response.data.data;
						this.CpAll = response.data.page.allRow;
						this.getPicTop();
						this.Cpcanshu.totalPage = response.data.page.currentPage;
						this.Cpcanshu.totalPageGundong = response.data.page.totalPage;
						this.Cpcanshu.dataList = response.data.data;
						//将数据放入浏览器本地存储
						this.localStr = JSON.stringify(this.Cpcanshu);
						sessionStorage.localStr = this.localStr;
					})
					.then(() => {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection//getConditions.do`)
							.then((res) => {
								//计算图片宽的进率
								this.imgCut = this.$refs.aWdith[0].offsetWidth;
								this.reclassify = res.data.data.categorieList;
							})
							.catch(function(error) {
								console.info(error)
							})
					})
					.catch(function(error) {
						console.info(error)
					});
			},
			//          getMesuemHotAll(){
			//          	 axios.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${this.museumId}&currentPage=${this.currentPage++}`)
			//                  .then( (response) => {
			//                      this.hotPic = response.data.data;
			//                      this.getPicTop();
			//                      console.log(":++getHotAll+++"+response);
			//                      this.CpAll = response.data.page.allRow;
			//                  })
			//                  .catch(function(error){
			////                      console.info(error)
			//                  })
			//          },
			//          getHotAll(museumId){ //滚动加载热门分类数据的API方法
			////          	alert(1);
			//              axios.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${museumId}&currentPage=${this.currentPage++}`)
			//                  .then( (response) => {
			//                      this.hotPic = response.data.data;
			//                      this.getPicTop();
			//                      console.log(":++getHotAll+++"+response);
			//                      this.CpAll = response.data.page.allRow;
			//                  })
			//                  .catch(function(error){
			////                      console.info(error)
			//                  })
			//          },
			getOtherCategory(museumId, categoryId, currentPage, year) { //滚动加载其他分类数据的API方法
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${museumId}&categoryId=${categoryId}&currentPage=${currentPage}&size=20&yearType=${year}`)
					.then((response) => {
						this.hotPic = response.data.data;
						console.log(response);
						console.log(":+++getOtherCategory++" + response);
						this.CpAll = response.data.page.allRow;
						this.getPicTop();
						this.loading = false;
						this.Cpcanshu.totalPage = response.data.page.currentPage;
						this.Cpcanshu.totalPageGundong = response.data.page.totalPage;
						this.Cpcanshu.dataList = this.Cpcanshu.dataList.concat(response.data.data);
						//将数据放入浏览器本地存储
						this.localStr = JSON.stringify(this.Cpcanshu);
						sessionStorage.localStr = this.localStr;
					})
					.catch(function(error) {
						//                      console.info(error)
					})
			},
			whatch(e) {
				this.scroll = pullrefresh.scrollTop;

				var paddingBottom = parseInt($(this.pullrefresh).css('padding-bottom'));

				this.scroll <= 5 ? this.totalCp = true : this.totalCp = false;

				if(this.scroll > 0 && this.scroll + $(this.pullrefresh).height() + paddingBottom + 3 >= this.pullrefresh.scrollHeight) {
					this.loading = true;
					//解决更换博物馆之后默认是热门数据，滚动之后 也拿的是热门数据
					if(this.Cpcanshu.museumId && $("#topNav .cur").hasClass('active')) {

						this.Cpcanshu.categoryId = "";
						this.Cpcanshu.year = "";
					};
					if(this.Cpcanshu.museumId == "" && this.Cpcanshu.categoryId == "" && !this.isClickmesuem) {
						this.currentPage++;
						this.isClickmesuem = true;
					}
					//alert(this.Cpcanshu.totalPage+","+this.Cpcanshu.totalPageGundong);
					if(this.Cpcanshu.totalPage >= this.Cpcanshu.totalPageGundong) {
						return this.loading = false;
					} else {
						this.getOtherCategory(this.Cpcanshu.museumId, this.Cpcanshu.categoryId, this.currentPage++, this.Cpcanshu.year);
					}

				}

			},
			getCityMuseumInfo() {
				this.showMasking = !this.showMasking;
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection//getConditions.do`)
					.then((res) => {
						this.cityMuseumList = res.data.data.cityMuseList;
						this.$nextTick(function() {
							$("#scrollwrapper ul li:first").click();
						})

					})
					.catch((error) => {
						console.info(error);
					})
			},
			getData(data) { // 获取到cityList组件的数据
				this.Cpcanshu.museumId = data.museumId;
				this.cityName = data.museumItem.name; // masking头部的名字
				this.hotPic = data.museumAllPic; //当前页面加载的瀑布流数据，只是临时的
				this.CpAll = data.meseumCpAll;
				this.initSeting(); //初始化数据
				this.getPicTop(); //展示数据到页面
				console.info(this.hotPic);
				this.reclassify = data.secCategory.categorieList; //二级分类列表的动态获取
				// console.info( this.reclassify)
				this.showMasking = !this.showMasking; //城市列表的弹出层
			},
			hidden() { //隐藏城市列表头方法
				this.lock = !this.lock;
//				alert(1);
			},
			toggleCity() { // 切换城市方法
				this.cityName = "吉林省全省";
				this.showMasking = !this.showMasking;
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getConditions.do`)
					.then((res) => {
						this.reclassify = res.data.data.categorieList;
						this.initSeting();
						this.Cpcanshu.museumId = "";
						this.Cpcanshu.categoryId = "",
							$("#topNav .active").removeClass('active');
						$("#topNav .cur").addClass('active');
						this.$store.dispatch('hideYearTime'); //热门隐藏年代
						$(".cp-pic").animate({ top: "0" });
						$("#pubuliu .cpjs-msg").animate({ top: "0" });
						//二级分类滑动 动画
						var swiperWidth = this.mySwiperTwo.container[0].clientWidth,
							nowTlanslate; //
						var maxTranslate = -($("#topNav .cur").parent()[0].scrollWidth - swiperWidth);
						var maxWidth = -maxTranslate + swiperWidth / 2;

						var slide = $("#topNav .cur").parent()[0];
						var slideLeft = slide.offsetLeft;
						var slideWidth = slide.clientWidth;

						var slideCenter = slideLeft + slideWidth / 2;
						this.mySwiperTwo.setWrapperTransition(300);
						console.log(slideWidth);
						if(slideCenter <= swiperWidth / 2) {
							this.mySwiperTwo.setWrapperTranslate(0);
						} else if(slideCenter > maxWidth) {
							this.mySwiperTwo.setWrapperTranslate(maxTranslate);
						} else {
							nowTlanslate = slideCenter - swiperWidth / 2;
							this.mySwiperTwo.setWrapperTranslate(-nowTlanslate);
						}

						this.getInitHotAll();
					})
					.catch(function(error) {
						console.info(error)
					})
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
			//          getCategoryPic(){ //获取分类图片
			//              axios.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${museumId}&categoryId=${this.categoryId}`)
			//                  .then((res)=>{
			//                      // console.info(res)
			//                      this.initSeting(); 
			//                      this.hotPic = res.data.data;
			//                      this.CpAll = res.data.page.allRow;
			//                      this.getPicTop();
			//                  })
			//                  .catch((error)=>{
			//                  	
			//                  })
			//          },
			toCpdetail(id, collectionType, isCollected) {
				//          	alert(1);
				this.$router.push({ path: 'Cpdetail', query: { id: id, collectionType: collectionType, isCollected: isCollected } })
			},
			getYearTileData() {
				$("#downNav .active").removeClass('active');
				this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getConditions.do?museumId=${this.Cpcanshu.museumId}&categoryId=${this.Cpcanshu.categoryId}`).then((data) => {
					console.log(data);
					this.Cpcanshu.year = data.data.data.maxYearId;
					this.threeLevel = data.data.data.yearTypeList;
					this.$nextTick(() => {
						$("#cao" + this.Cpcanshu.year).parent().addClass("swiper-slide");
						$("#cao" + this.Cpcanshu.year).parent().addClass("swiper-slide-next");
						$("#cao" + this.Cpcanshu.year).parent().addClass("active");
						var swiperWidth = this.mySwiper.container[0].clientWidth,
							nowTlanslate; //
						var maxTranslate = -($("#cao" + this.Cpcanshu.year).parent().parent()[0].scrollWidth - swiperWidth);
						var maxWidth = -maxTranslate + swiperWidth / 2;

						var slide = $("#cao" + this.Cpcanshu.year).parent()[0];
						var slideLeft = slide.offsetLeft;
						var slideWidth = slide.clientWidth;

						var slideCenter = slideLeft + slideWidth / 2;
						this.mySwiper.setWrapperTransition(300);
						console.log(slideWidth);
						if(slideCenter <= swiperWidth / 2) {
							this.mySwiper.setWrapperTranslate(0);
						} else if(slideCenter > maxWidth) {
							this.mySwiper.setWrapperTranslate(maxTranslate);
						} else {
							nowTlanslate = slideCenter - swiperWidth / 2;
							this.mySwiper.setWrapperTranslate(-nowTlanslate);
						}
					})
					this.getOtherCategory(this.Cpcanshu.museumId, this.Cpcanshu.categoryId, 1, this.Cpcanshu.year);
				}).catch((err) => {

				})
			}
		},
		computed: {
			...mapGetters([
				'yearTime',
			])
			// getOddHotPic(){
			//     this.evenHotPic = this.evenHotPic.concat(this.hotPic.filter((item,index)=>index%2==0))
			//     return this.evenHotPic;
			// },
			// getEvenHotPic(){
			//      this.oddHotPic = this.oddHotPic.concat( this.hotPic.filter((item,index)=>index%2!==0) );
			//     return this.oddHotPic;
			// }
		},
		components: {
			"cp-mask": masking
		},
		created() {
			//         this.getOtherCategory(this.museumId,this.categoryId,this.year)
			this.getInitHotAll();
			//console.log(this.Cpcanshu)
//			$("body").on('touchmove', function(event) { event.preventDefault();}, false);
		},
		activated() {
			
			this.pullrefresh = document.getElementById("pullrefresh");
			this.pullrefresh.addEventListener('scroll', this.whatch);
//			$("body").on('touchmove', function(event) { event.preventDefault();}, false);
		},
		updated(){
			if(this.showMasking){
					$(".black").on(' touchstart', function() { 
						$(".black").on('touchmove', function(event) { event.preventDefault();}, false);
					});
			}else{
					$(".black").on(' touchend', function() { $(".black").unbind('touchmove'); });
			}
		},
		mounted() {
			var _this = this;
			this.$nextTick(function() {
				_this.mySwiperTwo = new Swiper('#topNav', {
					freeMode: true,
					freeModeMomentumRatio: 0.5,
					slidesPerView: 'auto',
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					// observeParents:true,//修改swiper的父元素时，自动初始化swiper
				});
				//  mySwiper.init();
				var swiperWidth = _this.mySwiperTwo.container[0].clientWidth,
					nowTlanslate;
				var maxTranslate = _this.mySwiperTwo.maxTranslate();
				var maxWidth = -maxTranslate + swiperWidth / 2;
				$(".swiper-container").on('touchstart', function(event) {
					event.preventDefault()
				})
				_this.mySwiperTwo.on('tap', function(swiper, event) {
					var swiperWidth = _this.mySwiperTwo.container[0].clientWidth,
						nowTlanslate; //
					var maxTranslate = _this.mySwiperTwo.maxTranslate();
					var maxWidth = -maxTranslate + swiperWidth / 2;

					var slide = swiper.slides[swiper.clickedIndex];
					var slideLeft = slide.offsetLeft;
					var slideWidth = slide.clientWidth;

					var slideCenter = slideLeft + slideWidth / 2;
					_this.mySwiperTwo.setWrapperTransition(300);
					console.log(slideWidth);
					if(slideCenter <= swiperWidth / 2) {
						_this.mySwiperTwo.setWrapperTranslate(0);
					} else if(slideCenter > maxWidth) {
						_this.mySwiperTwo.setWrapperTranslate(maxTranslate);
					} else {
						nowTlanslate = slideCenter - swiperWidth / 2;
						_this.mySwiperTwo.setWrapperTranslate(-nowTlanslate);
					}
					if(event.target.innerText == "热门") {
						_this.initSeting();
						_this.Cpcanshu.categoryId = "";
						_this.Cpcanshu.year = "";
						//						_this.yearTime = false;//热门隐藏年代
						_this.$store.dispatch('hideYearTime'); //热门隐藏年代
						$(".cp-pic").animate({ top: "0" });
						$("#pubuliu .cpjs-msg").animate({ top: "0" });
						_this.getOtherCategory(_this.Cpcanshu.museumId, _this.Cpcanshu.categoryId, 1, _this.Cpcanshu.year);
						$("#topNav .active").removeClass('active');
						$("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active'); //将索引值替换swiper.clickedIndex,即可
					} else if(event.target.innerText == "更多...") {
						_this.showNum = 10000;
						//						alert(3);
					} else {
						//						_this.yearTime = true;
						_this.$store.dispatch('showYearTime') //显示年代
						$(".cp-pic").animate({ top: "0.89rem" });
						$("#pubuliu .cpjs-msg").animate({ top: "0.89rem" });
						_this.Cpcanshu.categoryId = swiper.clickedSlide.children[0].innerText;
						//初始化详情页滑动数据
						_this.Cpcanshu.dataList = [];
						_this.localStr = JSON.stringify(_this.Cpcanshu);
						sessionStorage.localStr = _this.localStr;

						_this.getYearTileData();
						_this.initSeting();
						$("#topNav .active").removeClass('active');
						$("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active'); //将索引值替换swiper.clickedIndex,即可
					}

				});
			});
			this.$nextTick(function() {
				var _this = this;
				_this.mySwiper = new Swiper('#downNav', {
					freeMode: true,
					freeModeMomentumRatio: 0.5,
					slidesPerView: 'auto',
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
				});

				$(".swiper-container").on('touchstart', function(e) {
					e.preventDefault()
				});
				_this.mySwiper.on('tap', function(swiper, event) {
					var swiperWidth = _this.mySwiper.container[0].clientWidth,
						nowTlanslate; //
					var maxTranslate = _this.mySwiper.maxTranslate();
					var maxWidth = -maxTranslate + swiperWidth / 2;

					var slide = swiper.slides[swiper.clickedIndex];
					var slideLeft = slide.offsetLeft;
					var slideWidth = slide.clientWidth;

					var slideCenter = slideLeft + slideWidth / 2;
					_this.mySwiper.setWrapperTransition(300);
					console.log(slideWidth);
					if(slideCenter <= swiperWidth / 2) {
						_this.mySwiper.setWrapperTranslate(0);
					} else if(slideCenter > maxWidth) {
						_this.mySwiper.setWrapperTranslate(maxTranslate);
					} else {
						nowTlanslate = slideCenter - swiperWidth / 2;
						_this.mySwiper.setWrapperTranslate(-nowTlanslate);
					}
					$("#downNav .active").removeClass('active');
					$("#downNav .swiper-slide").eq(swiper.clickedIndex).addClass('active'); //将索引值替换swiper.clickedIndex,即可
					//选择年代加载对应的数据

					_this.Cpcanshu.dataList = [];
					_this.localStr = JSON.stringify(_this.Cpcanshu);
					sessionStorage.localStr = _this.localStr;

					if(event.target.innerText) {
						_this.Cpcanshu.year = $(slide).find("strong")[0].innerText;

						//初始化详情页滑动数据

						_this.getOtherCategory(_this.Cpcanshu.museumId, _this.Cpcanshu.categoryId, 1, _this.Cpcanshu.year);
						_this.initSeting();
					}

				});
			});
		},
	}
</script>

<style>
	.cp-js .mui-pull-top-pocket {
		top: 2.4rem!important;
		font-size: 0.22rem;
	}
</style>
<style scoped>
	@import "../../static/css/swiper.min.css";
	.toggleMasking-enter-active,
	.toggleMasking-leave-active {
		transition: all .5s;
	}
	
	.toggleMasking-leave-active,
	.toggleMasking-enter {
		transform: translateY(-100%);
	}
	
	.totalCp-enter-active,
	.totalCp-leave-active {
		transition: all .5s;
	}
	
	.totalCp-leave-active,
	.totalCp-enter {
		transform: translateY(-100%);
	}
	
	.downNav-enter-active,
	.downNav-leave-active {
		transition: all .5s;
	}
	
	.downNav-leave-active,
	.downNav-enter {
		transform: translateY(-100%);
	}
	
	.cp-js {
		background: #eee;
	}
	
	.cp-js .cp-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		/*z-index: 99;*/
		background: #ececec;
		height: 2.47rem;
	}
	
	.place {
		height: 2.47rem;
	}
	
	.cpjs-msg {
		height: 0.60rem;
		line-height: 0.60rem;
		text-align: center;
		background-color: rgba(0, 0, 0, .5);
		font-size: 0.24rem;
		color: #fff;
	}
	
	#topNav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0.8rem;
		z-index: 99;
		height: 0.8rem;
		width: 100%;
		overflow: hidden;
		/*font: 16px/32px hiragino sans gb, microsoft yahei, simsun;*/
		font-size: 0.22rem;
		font-family: "Microsoft YaHei";
		color: rgb(153, 153, 153);
		/*border-top: 0.1rem solid #ececec;
		border-bottom: 1px solid #f8f8f8;*/
		background: #fff;
	}
	
	#topNav .swiper-slide {
		letter-spacing: 2px;
		width: auto;
		padding: 0 0.2rem;
		height: 0.8rem;
		font-weight: normal;
		text-align: center;
	}
	
	#topNav .swiper-slide span {
		transition: all .3s ease;
		display: block;
		width: 1.25rem;
		height: 0.8rem;
		line-height: 0.8rem;
		box-sizing: border-box;
		font-size: 0.24rem;
		color: #000000;
		border-bottom: 0.05rem solid transparent;
	}
	
	#topNav .active span:nth-of-type(1) {
		color: #A92124;
		border-bottom-color: #A92124;
		/*background:url(../../static/images/cpjs-hot1.png) no-repeat 0.4rem 0.25rem;
        background-size: 0.18rem 0.21rem;*/
	}
	
	#topNav .cur>span {
		background: url(../../static/images/cpjs-hot1.png) no-repeat 0.05rem 0.25rem;
		background-size: 0.20rem 0.23rem;
	}
	
	#topNav .cur.active>span {
		background: url(../../static/images/cpjs-hot2.png) no-repeat 0.05rem 0.25rem;
		background-size: 0.20rem 0.23rem;
	}
	
	#topNav .on span:nth-of-type(1) {
		background: url(../../static/images/cpjs-3d1.png) no-repeat 0.2rem 0.25rem;
		background-size: 0.18rem 0.21rem;
	}
	
	#topNav .on.active span:nth-of-type(1) {
		background: url(../../static/images/cpjs-3d2.png) no-repeat 0.2rem 0.25rem;
		background-size: 0.18rem 0.21rem;
	}
	
	#downNav {
		position: fixed;
		left: 0;
		right: 0;
		top: 1.58rem;
		z-index: 99;
		background: #fff;
		margin-top: 0.02rem;
		width: 100%;
		height: 0.89rem;
		overflow: hidden;
		font-size: 0.22rem;
		border-bottom: 1px solid #f8f8f8;
		color: rgb(153, 153, 153);
	}
	
	#downNav .swiper-slide {
		padding: 0 0.05rem;
		letter-spacing: 0.02rem;
		width: 2rem;
		text-align: center;
		position: relative;
		font-size: 0.22rem;
	}
	
	#downNav .swiper-slide>i:nth-of-type(1) {
		border-bottom: 1px solid #e0e0e0;
		display: inline-block;
		width: 0.5rem;
		position: absolute;
		left: -0.55rem;
		top: 50%;
		margin-top: -0.1rem;
	}
	
	#downNav .swiper-slide>i:nth-of-type(2) {
		border-bottom: 1px solid #e0e0e0;
		display: inline-block;
		width: 0.5rem;
		position: absolute;
		left: -0.05rem;
		top: 50%;
		margin-top: -0.1rem;
	}
	
	#downNav .swiper-slide span {
		position: relative;
		transition: all .3s ease;
		display: block;
		/*width:auto;*/
		height: 0.71rem;
		line-height: 0.71rem;
		box-sizing: border-box;
		color: #000000;
		font-size: 0.18rem;
	}
	
	#downNav .swiper-slide span::after {
		content: "";
		position: absolute;
		left: 0.83rem;
		bottom: -0.10rem;
		height: 0;
		width: 0;
		border: 0.1rem solid transparent;
	}
	
	#downNav .active span {
		color: #A92124;
	}
	
	#downNav .swiper-slide.active span::after {
		border-bottom-color: #A92124;
	}
	/*导航*/
	
	.nav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 99;
		height: 0.87rem;
		justify-content: space-between;
		background: #fff;
		font-size: 0.34rem;
		font-family: "Microsoft YaHei";
		color: rgb(51, 51, 51);
		padding: 0 0.2rem;
	}
	/*.nav>span {*/
	/*flex: 1;*/
	/*}*/
	
	.nav>.cp-back {
		display: block;
		width: 0.87rem;
		box-sizing: border-box;
		height: 100%;
		line-height: 0.87rem;
		background: url("../../static/images/bowuguan_backBtn.png") left center no-repeat;
		background-size: 0.19rem 0.35rem;
		float: left;
	}
	
	.nav>.cp-city {
		width: 85%;
		height: 100%;
		min-width: 2.5rem;
		line-height: 0.87rem;
		text-align: center;
		font-size: 0.24rem;
		color: rgb(153, 153, 153);
		float: left;
	}
	
	.nav>.cp-city strong {
		font-weight: 700;
		font-size: 0.34rem;
		color: rgb(51, 51, 51);
	}
	
	.cp-category-one {
		font-size: 0.18rem;
		font-family: "Microsoft YaHei";
		color: rgb(153, 153, 153);
		height: 0.73rem;
		display: flex;
		justify-content: space-around;
	}
	
	.mui-scroll {
		margin-top: 2.47rem;
	}
	
	.mui-pull-top-pocket {
		padding-top: 20px;
	}
	/*瀑布流*/
	
	.cp-pic {
		/*display:flex;*/
		padding: 0 0.2rem;
		box-sizing: border-box;
		background-color: #f0f0f0;
		overflow: hidden;
		overflow-y: scroll;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		padding-bottom: 1rem;
	}
	
	.cp-pic>div {
		/*padding-bottom: 0.8rem;*/
		background-color: #f0f0f0;
		overflow: hidden;
	}
	
	.cp-pic div>ul {
		width: 2.9rem;
		float: left;
	}
	
	.cp-pic div>ul.first {
		margin-right: 0.20rem;
	}
	
	.cp-pic div>ul>li {
		/*margin-top:0.18rem;*/
		/*margin:0.15rem 0.1rem;*/
		/*transform: scale(0.95);*/
		margin-bottom: 0.20rem;
	}
	
	.cp-pic div>ul>li>a {
		display: block;
		height: 100%;
		border-radius: 0.08rem;
    	overflow: hidden;
	}
	
	.cp-pic div>ul>li p {
		max-width: 100%;
		background-color: #fff;
		text-align: left;
		box-sizing: border-box;
		/*border-bottom-right-radius: 0.08rem;
		border-bottom-left-radius: 0.08rem;*/
		box-shadow: 0.02rem 0.02rem 0.03rem #e2e2e2;
		color: rgb(51, 51, 51);
		font-size: 0.22rem;
		padding-left: 0.14rem;
		color: #000000;
		height: 40px;
		line-height: 40px;
	}
	
	.cp-pic div>ul>li img {
		max-width: 100%;
		vertical-align: middle;
	}
	
	#pubuliu {
		position: absolute;
		top: 1.6rem;
		right: 0;
		left: 0;
		bottom: 0;
		 overflow-y:auto;
 		-webkit-overflow-scrolling : touch; 
	}
	
	#pubuliu #downNav {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 50;
	}
	
	#pubuliu .cpjs-msg {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	.loading {
		text-align: center;
	}
	
	.loading img {
		width: 0.76rem;
		height: 0.76rem;
	}
	/*修改样式*/
	
	.cp-wrapper h1 {
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
	
	.cp-wrapper h1 strong {
		color: #FFFFFF;
		font-size: 0.3rem;
	}
	
	.cp-wrapper h1 img {
		width: 0.19rem;
		height: 0.33rem;
		float: left;
		margin-top: 0.235rem;
	}
	.cp-wrapper h1 img.search{
		width: 0.32rem;
		height: 0.33rem;
		float: right;
		margin-top: 0.235rem;
	}
	.cp-wrapper h1 span {
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
	.cp-wrapper h1 span.rotateActive{
        transform:rotate(180deg);
    }
	img[lazy=loading] {
		/*your style here*/
		background: url(../../static/images/login.gif) no-repeat center center;
	}
	
	img[lazy=error] {
		/*your style here*/
		background: url(../../static/images/login.gif) no-repeat center center;
	}
	
	,
	img[lazy=loaded] {
		/*your style here*/
	}
</style>