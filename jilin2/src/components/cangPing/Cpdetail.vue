<template>
	<div class="Cpdetail_Body">
		<div id="Title0" class="Cpdetail Title">
			<transition name="title">
				<h1 v-show="isTitle" id="addShouCang">
					<img @click="back" class="left" src="../../static/images/ExhibitionDetial_back.png" alt="" />
					{{ cpName | nameString}}
					<i class="addShouCang right" :class="{shoucang:shoucang}" @click="addShouCang()"></i>
				</h1>
			</transition>
		</div>
		<div class="detail_banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" :id="collection.id" :isCollected="collection.isCollected" :collectionType="collection.collectionType" v-for="(collection,index) in localData.dataList">
						<div class="Cpdetail">
							<div class="banner">
								<img @click="inScrollMode(collection.picture.urlStr)" :src="collection.picture.thumb1Str" alt="" />

							</div>
						</div>
						<p id="Title" :name="collection.name" :title="collection.isCollected">
							{{collection.name | nameString}}
							<i v-show="collection.threeDimensionalCollection">
										<a :href="collection.threeDimensionalCollection">
											<img src="../../static/images/Cpdetail_3D.png" alt="" />
										</a>
									</i>
						</p>
						<div id="summary" :class="{summary:true,padding45:padding45}">
							<h2><img src="../../static/images/bowuguan_detail_leftBorder_revolution.png" alt="" />基本信息</h2>
							<ul>
								<li><img src="../../static/images/jibie.png" alt="" />级别<span>{{collection.collectionsLevel}}</span></li>
								<li><img src="../../static/images/danwei.png" alt="" />单位
									<a @click="toBowuguan(collection.museumId)">
										<!--251-->
										{{collection.museumName |stringStr7}} >
									</a>
								</li>
								<li><img src="../../static/images/leibie.png" alt="" />类别<span>{{collection.collectionsCategory}}</span></li>
								<li><img src="../../static/images/niandai.png" alt="" />年代<span>{{collection.yearType | stringStr}}</span></li>
								<!--<li>年代：<span>200万年至公元前21...</span></li>-->
							</ul>
							<h2>
								<img src="../../static/images/bowuguan_detail_leftBorder_revolution.png" alt="" />简介
								<u @click="guanfang" id="guanfang" v-if="collection.audioUrl"></u>
								<audio :src="collection.audioUrl"></audio>
								<!--<u @click="guanfang" id="guanfang"></u>
								<audio src="http://test.tj720.com:8088/audio//201707\1499826429770.mp3"></audio>-->
							</h2>
							<p id="description" :class="{height:height}">
								{{collection.description | infoFilter}}
							</p>
							<!--<div class="showMore">
								<span @click="showMore">查看全部</span>
							</div>
							<div class="packUp">
								<span @click="packUp">
									<img src="../../static/images/packUp.png" alt="" />
									收起
								</span>
							</div>-->
						</div>
						<div class="hr">

						</div>
						<div class="Explanation">
							<h2><img src="../../static/images/bowuguan_detail_leftBorder_revolution.png" alt="" />讲解词</h2>
							<ul id="Explanationudios">
								{{collection.audios | audioFilter}}
								<li v-for="(itme,index) in collection.audios">
									<div @click="play(itme,index)" :id="'auo'+index" class="play">
										<!--<img class="avatarUrl" :src="itme.avatarUrl | defaultUrl" alt="" />-->
										<u>
											<img src="../../static/images/Cpdetail_paly1.png" alt="" />
										</u>
									</div>
									<div class="info">
										<div class="left">
											<h3><span>{{itme.userName}}</span> 的讲解词</h3>
										</div>
										<div class="right">
											<i :id="itme.id" @click="dainzan(itme.id)" :class="{Liked:Liked=itme.isLiked==1?true:false}"></i>
											<span>{{itme.likeCounts}}</span>
										</div>
									</div>
									<div class="info2">
										<img src="../../static/images/Cpdetail_audio.png" alt="" />
										<span>{{itme.duration | timeStr}}</span>
										<i>{{itme.publishTimeStr}}</i>
									</div>
									<audio :src="itme.url"></audio>
								</li>
							</ul>
							<p id="fuckAudio"><img @click="fuckSpeak" src="../../static/images/lunima.png" alt="" /></p>
							<span class="noAudio"></span>
							<!--<div @click="loadMore" v-show="isloadMore" class="loadMore">
								{{loadMoreData}}
							</div>-->
						</div>
					</div>
				</div>

			</div>
		</div>
		<!--<div class="Knowledge">
			<h2>知识拓展</h2>
			<ul>
				<li>
					<h2>红山文化</h2>
					<p>
						<span>编辑人</span>:
						<i>shanwn</i>
					</p>
					<p>
						<span>时间</span>:
						<i>2017-5-25</i>
					</p>
				</li>
				<li>
					<h2>玉器——远古石器的延续与创新</h2>
					<p>
						<span>编辑人</span>:
						<i>shanwn</i>
					</p>
					<p>
						<span>时间</span>:
						<i>2017-5-25</i>
					</p>
				</li>
			</ul>
		</div>-->
		<div @click="sound" v-show="isAudioSh" id="sound">
			<img v-show="sounder" src="../../static/images/Cpdetail_sound .png" alt="" />
			<img v-show="sounding" src="../../static/images/Cpdetail_sound01.gif" alt="" />
		</div>
		<transition name="soundlist">
			<div v-show="showSoundlist" class="soundlist">
				<img src="../../static/images/Cpdetail_banyuan.png" alt="" />
				<span @click="stop" class="stop">重录</span>
				<!--<span @click="start" class="bg">{{startSound}}</span>-->
				<span class="bg">{{startSound}}</span>
				<span @click="save" class="save">保存</span>
			</div>
		</transition>
		<transition name="shape">
			<!--<div v-show="shape" @click="closeShape()" class="shape"></div>-->
			<div v-show="shape" class="shape"></div>
		</transition>
		<transition name="fuckAudio2">
			<div v-show="fuckAudio2" class="fuckAudio2">
				<div v-show="fuckSpenkTwo">
					<h2>说出你要表达的讲解词</h2>
					<p>藏品特点</p>
					<p>藏品出处</p>
					<p>我对藏品的认知</p>
					<a class="submie" @click="fuckSpenkThree()" href="javascript:">按下说出你要说的讲解词</a>
				</div>
				<div class="audioLoding" v-show="!fuckSpenkTwo">
					<img src="../../static/images/audioLoding.gif" alt="" />
					<div>
						<h2>说出你要表达的讲解词</h2>
						<p>{{startSound}}</p>
						<a @click="repeatAudio()" class="quxiao" href="javascript:">取消</a>
						<a @click="save" class="submit" href="javascript:">提交</a>
					</div>
				</div>
			</div>
		</transition>
		<!--<pop-up @hideShapePop="hideShapePop" @repeatAudio="repeatAudio" v-show="popHide"></pop-up>-->
		<!--<pop-save @cancel="cancel" @upload="upload" v-show="popSave"></pop-save>-->
	</div>
</template>

<script>
	import { mapGetters, mapActionss } from 'vuex'
	import popUp from '../cangPing/popUp.vue'
	import popSave from '../cangPing/popSave.vue'
	export default {
		data() {
			return {
				//				noShouCang: "src/static/images/Cpdetail_shoucang.png", //没有收藏
				//				isShouCang: "src/static/images/shoucangActive.png", //有收藏
				cpName: "",
				shoucang: false,
				isIno: false, //是否显示暂无简介
				is3D: true, //判断是否是3D藏品
				height: true, //简介是否显示更多
				//				isShowMore: true, //查看全部
				isloadMore: true, //显示更多
				//				ispackUp: false, //收起，默认关闭
				padding45: true, //查看全部底部pading
				//				isPlay: true, //讲解词默认播放按钮
				//				isPause: false, //讲解词暂停按钮
				starting: false, //是否在录制
				startSound: '00:00',
				shape: false, //遮罩
				fuckAudio2: false, //录音第二部
				fuckSpenkTwo: true, //第三步要隐藏
				popHide: false, //录音弹窗
				popSave: false, //保存弹窗
				timer: null, //录制时间的定时器
				isTitle: true, //详情页顶部收藏后退单行是否显示，默认显示
				id: "", //藏品ID
				collectionType: "", //藏品类型
				collection: [], //藏品详情页的简介数据
				isCollected: "", //是否收藏
				audios: [], //藏品详情页的音频数据
				pageIndex: 1, //audio分页
				audiosAllRow: 0, //audio总页数
				noAudio: false, //暂无讲解词的提示。默认不显示
				loadMoreData: "显示更多",
				audioUrl: "src/static/1.mp3", //音频默认为空
				localData: {}, //存放区本地存储的数据
				swiper: {},
				SlidePageIndex: 0,
				did: "", //每次滑动记录当前藏品的Id，
				isSound: true, //解决bug是否修改了data数据
				isTop: true, //解决bug是否滚动条到顶部
				audioAll: [], //存放录音音频id数组
				serverAll: [], //存放服务器端数组
				playIndex: 0, //录音序号
				voice: { //智能接口
					localId: 0,
					serverId: 0,
				},
				userInfo: "", //登陆信息。判断是否登陆
				obj: {}, //音频回显
				currentPage: 1, //滑动分页
				isClick: true, //防止连续点击多次。
				isAudioSh: false, //录音功能禁用
			}
		},
		computed: {
			...mapGetters([
				'showSoundlist',
				'sounder',
				'sounding'
			])
		},
		components: {
			'pop-up': popUp,
			'pop-save': popSave
		},
		methods: {
			//			closeShape(){//音频2.1遮罩关闭
			//				this.shape = false;
			//				this.fuckAudio2 = false;
			//			},
			fuckSpenkThree() { //音频2.1第三步说
				this.fuckSpenkTwo = !this.fuckSpenkTwo;
				this.startLuyin();
			},
			fuckSpeak() { //录音2.1版本
				if(this.isClick) {
					this.isClick = false;
					setTimeout(function() {
						this.isClick = true;
					}, 2000)
					if(this.userInfo) {
						this.shape = true;
						this.fuckAudio2 = true;
					} else {
						this.$router.push({
							path: 'Login'
						});
					}
				}
			},
			addShouCang() { //添加收藏
				if(this.userInfo) {
					this.isSound = false;
					//					if($(".swiper-slide-active #Title").attr.("title")==0) {
					if(!this.shoucang) {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collect/collectCollection.do?id=${this.id}&collectionType=${this.collectionType}`).then((res) => {
							this.shoucang = true;
							for(let i = 0; i < this.localData.dataList.length; i++) {
								if(this.id == this.localData.dataList[i].id) {
									this.localData.dataList[i].isCollected = 1;
									sessionStorage.localStr = JSON.stringify(this.localData);
									break;
								}
							}
						}).catch((err) => {

						})
					} else {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collect/notCollectCollection.do?id=${this.id}&collectionType=${this.collectionType}`).then((res) => {
							this.shoucang = false;
							for(let i = 0; i < this.localData.dataList.length; i++) {
								if(this.id == this.localData.dataList[i].id) {
									this.localData.dataList[i].isCollected = 0;
									sessionStorage.localStr = JSON.stringify(this.localData);
									break;
								}
							}
						}).catch((err) => {

						})
					}
				} else {
					this.$router.push({
						path: 'Login'
					});
				}
			},
			dainzan(obj) { //点赞
				var count = parseInt($("#" + obj).next().html());
				if(this.userInfo) {
					if(!$("#" + obj).hasClass("Liked")) {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/audioLike.do?id=${obj}`).then((res) => {
							this.isSound = false;
							$("#" + obj).addClass("Liked");
							count += 1;
							$("#" + obj).next().html(count);

						}).catch((err) => {

						})
					} else {
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/audioNotLike.do?id=${obj}`).then((res) => {
							this.isSound = false;
							$("#" + obj).removeClass("Liked");
							count -= 1;
							$("#" + obj).next().html(count)
						}).catch((err) => {

						})
					}
				} else {
					this.$router.push({
						path: 'Login'
					});
				}
			},
			back() {
				this.isSound = true;
				this.$router.go(-1);
				//				var _this = this;
				//				wx.ready(function() {
				//					wx.stopRecord({
				//						success: function(res) {
				//							$(".swiper-slide-active").removeClass("swiper-no-swiping");
				//							//							_this.shape = true;
				//							//							_this.popHide = true;
				//							clearInterval(_this.timer);
				//							_this.startSound = "00:00";
				//							//							_this.starting = false;
				//						},
				//						fail: function(res) {
				//							//alert(JSON.stringify(res));
				//						}
				//					});
				//				})
			},
			play(item, index) {
				//清除官方讲解词播放状态及样式
				if($(".swiper-slide-active #guanfang").length > 0) {
					$(".swiper-slide-active #guanfang").removeClass("gif");
					$(".swiper-slide-active #guanfang").next()[0].pause();
					$(".swiper-slide-active #guanfang").next()[0].currentTime = 0.0;
				}
				//拿到当前点击的dom
				var div = $(".swiper-slide-active .Explanation #auo" + index);
				console.log(div);
				//做音频播放切换

				if(div.find("u img").hasClass("userLogo")) {
					div.find("u img").removeClass("userLogo");
					div.find("u img").parent().parent().parent().find("audio")[0].pause();
					div.find("u img").attr("src", "src/static/images/Cpdetail_paly1.png");
				} else {
					div.find("u img").addClass("userLogo").parent().parent().parent()
						.siblings().find(".userLogo").removeClass("userLogo");

					for(let i = 0; i < $("audio").length; i++) {
						$("audio")[i].pause();
						$("audio")[i].currentTime = 0.0;
					}

					div.find("u img").addClass("userLogo")
					div.find("u img").attr("src", "src/static/images/Cpdetail_pause1.png")
						.parent().parent().parent().siblings().find("u>img")
						.attr("src", "src/static/images/Cpdetail_paly1.png");

					div.find("u img").parent().parent().parent().find("audio")[0].play();
					div.find("u img").parent().parent().parent().find("audio")[0].addEventListener('ended', function() {
						div.find("u img").removeClass("userLogo");
						div.find("u img").attr("src", "src/static/images/Cpdetail_paly1.png");
					}, false);
				}
			},
			sound() { //开启录音功
				//alert(this.id)
				if(this.isClick) {
					this.isClick = false;
					setTimeout(function() {
						this.isClick = true;
					}, 2000)
					if(this.userInfo) {
						this.startLuyin();
					} else {
						this.$router.push({
							path: 'Login'
						});
					}
				}
			},
			startLuyin() {
				//录音中不能滑动。
				this.isSound = false;
				for(let i = 0; i < $("audio").length; i++) {
					$("audio")[i].pause();
					$("audio")[i].currentTime = 0.0;
				}
				$(".Explanation ul li .play u>img").attr("src", "src/static/images/Cpdetail_paly1.png");
				$("#Explanationudios div u img").removeClass("userLogo");

				$(".swiper-slide-active").addClass("swiper-no-swiping");
				this.startSound = "00:00";
				var t = 0;
				this.WXaudiostarting();
				var _this = this;
				_this.timer = setInterval(function() {
					t += 1;
					_this.startSound = _this.timeToStr(t);
				}, 1000);
//				this.$store.dispatch('showSoundlist');
//				this.$store.dispatch('sounder');
//				this.$store.dispatch('sounding');
			},
			WXaudiostarting() {
				this.voice.localId = "";
				this.audioAll = [];
				this.serverAll = [];
				wx.startRecord({
					cancel: function() {
						alert('用户拒绝授权录音');
					}
				});
			},
			stop() { //重新录制弹窗
				this.shape = true;
				this.popHide = true;
			},
			save() {
				var _this = this;
				clearInterval(_this.timer);
				_this.isClick = true;
				wx.ready(function() {
					wx.stopRecord({
						success: function(res) {
							_this.voice.localId = res.localId;
							_this.audioAll.push(_this.voice.localId);
							setTimeout(function() {
								_this.uploadVoice(0);
							}, 500);
						},
						fail: function(res) {
							//alert(JSON.stringify(res));
						}
					});
				})
			},
			hideShapePop() {
				this.shape = false;
				this.popHide = false;
			},
			//重新录制
			repeatAudio() {
				this.audioAll = [];
				this.serverAll = [];
				this.isClick = true;
				clearInterval(this.timer);
				this.startSound = "00:00";
				$(".swiper-slide-active").removeClass("swiper-no-swiping");
				wx.ready(function() {
					wx.stopRecord({
						success: function(res) {},
						fail: function(res) {
							//alert(JSON.stringify(res));
						}
					});
				})
				//关闭遮罩
				this.shape = false;
				this.fuckAudio2 = false;
				this.fuckSpenkTwo = !this.fuckSpenkTwo;
				//				this.hideShapePop();
				//				this.$store.dispatch('hideSoundlist');
				//				this.$store.dispatch('hidesounder');
				//				this.$store.dispatch('hidesounding');
			},
			//			cancel() { //保存里面的取消
			//				this.shape = false;
			//				this.popSave = false;
			//				this.audioAll = [];
			//				this.serverAll = [];
			//			},
			//			upload() { //保存里面的保存
			//				var _this = this;
			//				_this.shape = false;
			//				_this.popSave = false;
			//				setTimeout(function() { _this.uploadVoice(0); }, 500);
			//			},
			uploadVoice(i) {
				var _this = this;
				var localId = _this.audioAll[i++];
				//alert("localId" + localId);
				wx.uploadVoice({
					localId: localId, //voice.localId,
					isShowProgressTips: 1,
					success: function(res) {
						//alert(voice.localId);
						//alert('上传语音成功，serverId 为' + res.serverId);
						//voice.serverId = res.serverId;
						_this.serverAll.push(res.serverId);
						if(i < _this.audioAll.length) {
							setTimeout(function() {
								_this.uploadVoice(i);
							}, 500);
						} else {
							//录音结束，上传服务器后台合成
							//							_this.$http.get(`${_this.$store.state.mutations.getUrl}/api/audioCompose.do?collectionId=${_this.id}&ids=${_this.serverAll}`).then((res) => {
							_this.$http.get(`${_this.$store.state.mutations.getUrl}/mip/audioCompose.do?collectionId=${_this.id}&ids=${_this.serverAll}`).then((res) => {
								_this.audioAll = [];
								_this.serverAll = [];
								_this.hideShapePop();
								_this.startSound = "00:00";
								_this.shape = false;
								_this.fuckAudio2 = false;
								_this.fuckSpenkTwo = !this.fuckSpenkTwo;
								$(".swiper-slide-active").removeClass("swiper-no-swiping");
								console.log(res);
								//成功之后回显讲解词
//								_this.obj = {
//									avatarUrl: res.data.data.avatarUrl,
//									collectionId: res.data.data.collectionId,
//									duration: res.data.data.duration,
//									isOfficial: res.data.data.isOfficial,
//									likeCounts: res.data.data.likeCounts,
//									publishTime: res.data.data.publishTime,
//									publishTimeStr: res.data.data.publishTimeStr,
//									url: res.data.data.url,
//									userId: res.data.data.userId,
//									userName: res.data.data.userName,
//									id: res.data.data.id,
//									isLiked: 0,
//								};
//								for(let i = 0; i < _this.localData.dataList.length; i++) {
//									if(_this.id == _this.localData.dataList[i].id) {
//										_this.localData.dataList[i].audios.unshift(_this.obj);
//										sessionStorage.localStr = JSON.stringify(_this.localData);
//										//										location.reload();
//										break;
//									}
//								}
							}).catch((err) => {

							})
						}
					}
				});
			},
			timeToStr(time) {
				var m = 0,
					s = 0,
					_m = '00',
					_s = '00';
				time = Math.floor(time % 3600);
				m = Math.floor(time / 60);
				s = Math.floor(time % 60);
				_s = s < 10 ? '0' + s : s + '';
				_m = m < 10 ? '0' + m : m + '';
				return _m + ":" + _s;
			},
			whatch() {
				//				var scroll = document.body.scrollTop;
				//				 if(scroll==0){
				//				 	this.isTitle=true;
				//				 }else{
				//				 	this.isTitle=false;
				//				 }
			},
			inScrollMode(url) {
				//				console.log(this.$route.query.go);
				this.previewImage(url);
				//this.$router.push({path:"scrollMode",query:{id:this.id}});

			},
			silderPage(index) {
				//做分页请求
				if(this.localData.totalPage < this.localData.totalPageGundong) {
					//alert(this.localData.dataList.length-3);
					if(index == this.localData.dataList.length - 3) {
						this.currentPage++;
						//alert(this.currentPage);
						this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${this.localData.museumId}&categoryId=${this.localData.categoryId}&currentPage=${this.currentPage}&size=20&yearType=${this.localData.year}`).then((res) => {
							this.isSound = false;
							console.log(res);
							this.localData.totalPage = res.data.page.currentPage;
							this.localData.totalPageGundong = res.data.page.totalPage;
							for(var i = 0; i < res.data.data.length; i++) {
								this.localData.dataList.push(res.data.data[i]);
							}
							console.log(this.localData.dataList);
						}).catch((err) => {

						})
					}
				}

			},
			//微信图片放大
			previewImage(url) {
				wx.previewImage({
					current: url,
					urls: [
						url,
					]
				});
			},
			//点击次数接口
			addCount(id) {
				$.ajax({
					type: "get",
					url: `${this.$store.state.mutations.getUrl}/mip/mobile/collection/addClickCount.do?id=${id}`,
					dataType: "json",
					success: function(data) {
						console.log(data);
					}
				});
			},
			//去博物馆详情页
			toBowuguan(id) {
				this.$router.push({
					path: "museumDetail",
					query: {
						id: id
					}
				});
			},
			//播放官方讲解词
			guanfang() {
				if($(".swiper-slide-active #guanfang").hasClass("gif")) {
					$(".swiper-slide-active #guanfang").removeClass("gif");
					$(".swiper-slide-active #guanfang").next()[0].pause();
					$(".swiper-slide-active #guanfang").next()[0].currentTime = 0.0;
				} else {
					$(".swiper-slide-active #guanfang").addClass("gif");
					//关掉所有的音频
					for(let i = 0; i < $("audio").length; i++) {
						$("audio")[i].pause();
						$("audio")[i].currentTime = 0.0;
					}

					$(".swiper-slide-active #guanfang").next()[0].play();
					$(".swiper-slide-active .Explanation ul li .play u>img").attr("src", "src/static/images/Cpdetail_paly1.png");
					$(".swiper-slide-active .Explanation ul li .play u>img").removeClass("userLogo");

					$(".swiper-slide-active #guanfang").next()[0].addEventListener('ended', function() {
						$(".swiper-slide-active #guanfang").removeClass("gif");
					}, false);

				}
			}
		},
		created() {

			//			var Cpdetail_Body = $(".Cpdetail_Body")[0];
			//			 window.addEventListener('scroll', this.whatch);

		},
		deactivated() {
			var _this = this;
			wx.ready(function() {
				wx.stopRecord({
					success: function(res) {
						$(".swiper-slide-active").removeClass("swiper-no-swiping");
						//							_this.shape = true;
						//							_this.popHide = true;
						clearInterval(_this.timer);
						_this.startSound = "00:00";
						//							_this.starting = false;
					},
					fail: function(res) {
						//alert(JSON.stringify(res));
					}
				});
			});
			this.repeatAudio();
		},
		filters: {
			stringStr(val) {
				return val.length >= 11 ? val.substring(0, 11) + "..." : val;
			},
			stringStr7(val) {
				return val.length >= 7 ? val.substring(0, 7) + "..." : val;
			},
			infoFilter(str) {
				if(str) {
					return str;
				} else {
					return "暂无简介";
				}
			},
			nameString(val) {
				return val.length >= 15 ? val.substring(0, 15) + "..." : val;
			},
			audioFilter(audio) {
				if(audio == 0) {
					return "暂无讲解词"
				}
			},
			defaultUrl(val) {
				return val == "" ? 'src/static/images/moren.png' : val;
			},
			timeStr(time) {
				var theTime = parseInt(time); // 秒
				var theTime1 = 0; // 分
				var theTime2 = 0; // 小时
				if(theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if(theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
					}
				}
				theTime = parseInt(theTime) < 10 ? '0' + theTime : theTime;
				theTime1 = parseInt(theTime1) < 10 ? '0' + theTime1 : theTime1;
				theTime2 = parseInt(theTime2) < 10 ? '0' + theTime2 : theTime2
				var result = "00:" + theTime;
				if(theTime1 > 0) {
					result = theTime1 + ":" + theTime;
				}
				if(theTime2 > 0) {
					result = theTime2 + ":" + theTime1 + ":" + theTime;
				}
				return result;
			}
		},
		activated() {
			this.id = this.$route.query.id;
			this.cpName = this.$route.query.cpName;
			this.collectionType = this.$route.query.collectionType;
			this.isCollected = this.$route.query.isCollected;
			this.$store.dispatch('hideHeader');
			this.localData = JSON.parse(sessionStorage.localStr);
			this.currentPage = this.localData.totalPage;
			console.log(this.currentPage);
			if(localStorage.user) {
				this.userInfo = JSON.parse(localStorage.user); //登陆信息
			}
			for(let i = 0; i < this.localData.dataList.length; i++) {
				if(this.id == this.localData.dataList[i].id) {
					console.log(this.localData.dataList[i]);
					this.cpName = this.localData.dataList[i].name;
					this.shoucang = this.localData.dataList[i].isCollected == 1 ? true : false;
					this.SlidePageIndex = [i];
					break;
				}
			}
			this.activated = this.localData.dataList[this.SlidePageIndex];
			console.log("	this.activated+++" + this.activated);
			console.log("	this.SlidePageIndex+++" + this.SlidePageIndex);
		},
		mounted() {

		},
		updated() {
			var _this = this;
			//监听录音自动停止
			wx.onVoiceRecordEnd({
				complete: function(res) {
					_this.voice.localId = res.localId;
					_this.audioAll.push(_this.voice.localId);
					//alert('录音时间已超过一分钟');
					wx.startRecord({
						cancel: function() {
							alert('用户拒绝授权录音');
						}

					});
				}
			});
			if(!_this.swiper.width) {
				_this.swiper = new Swiper('.swiper-container', {
					runCallbacksOnInit: true,
					updateTranslate: true,
					observer: true,
					deleteInstance: false,
					initialSlide: _this.SlidePageIndex,
					autoHeight: true,
					//初始化回调
					onInit: function(swiper) {
						//请求分页
						var index = swiper.activeIndex;
						console.log('藏品id' + _this.id);
						console.log('藏品类型' + _this.collectionType);
						console.log('藏品是否收藏' + _this.isCollected);

						_this.silderPage(index);
						_this.isSound = false;
						_this.cpName = $(".swiper-slide-active #Title").attr("name");
						_this.shoucang = $(".swiper-slide-active #Title").attr("title") == 1 ? true : false;
					},
					//滑动开始时候触发的事件
					onTouchStart: function(swiper, even) {
						// alert('事件触发了;');
						//获取滑动当前页在数组里面的位置
						var index = swiper.activeIndex;
						_this.silderPage(index);

					},
					//滑动移动时候触发的事件
					onTouchMove: function(swiper) {
						//你的事件
						//			      alert(1);
					}, //滑动是否事件
					onSlideChangeEnd: function(swiper) {
						//解决滑动数据更新后自动还原 activited
						_this.isSound = false;
						//获取滑动当前id去上传录音 以及点赞功能
						_this.id = $(".swiper-slide-active").attr("id");
						_this.collectionType = $(".swiper-slide-active").attr("collectionType");
						_this.isCollected = $(".swiper-slide-active").attr("isCollected");
						_this.addCount(_this.id);
						console.log('藏品id' + _this.id);
						console.log('藏品类型' + _this.collectionType);
						console.log('藏品是否收藏' + _this.isCollected);

						//实现滑动标题收藏
						_this.cpName = $(".swiper-slide-active #Title").attr("name");
						_this.shoucang = $(".swiper-slide-active #Title").attr("title") == 1 ? true : false;
						//当右滑事件发生后，关掉上一个音频
						for(let i = 0; i < $(".swiper-slide-prev audio").length; i++) {
							$(".swiper-slide-prev audio")[i].pause();
							$(".swiper-slide-prev audio")[i].currentTime = 0.0;
						}
						//当左滑事件发生后，关掉上一个音频
						for(let i = 0; i < $(".swiper-slide-next audio").length; i++) {
							$(".swiper-slide-next audio")[i].pause();
							$(".swiper-slide-next audio")[i].currentTime = 0.0;
						}
						$(".swiper-slide-prev .avatarUrl").removeClass("userLogo");
						$(".swiper-slide-prev .play u>img").attr("src", "src/static/images/Cpdetail_paly1.png");

						//滑动的时候清除官方讲解词的播放状态。
						if($(".swiper-slide-prev #guanfang").length > 0) {
							$(".swiper-slide-prev #guanfang").removeClass("gif");
							$(".swiper-slide-prev #guanfang").next()[0].pause();
							$(".swiper-slide-prev #guanfang").next()[0].currentTime = 0.0;
						}
						if($(".swiper-slide-next #guanfang").length > 0) {
							$(".swiper-slide-next #guanfang").removeClass("gif");
							$(".swiper-slide-next #guanfang").next()[0].pause();
							$(".swiper-slide-next #guanfang").next()[0].currentTime = 0.0;
						}

						//简介处理方法
						var description = $("#" + _this.id + " #description").text();
						if(description) {
							description.length >= 90 ? $(".showMore").css("display", "block") : $(".showMore").css("display", "none");
						}

					}
				});
			} else {
				_this.swiper.update(true);
				if(this.isSound) {
					_this.swiper.slideTo(_this.SlidePageIndex, 0, false);
				}
			}
		}

	}
</script>

<style scoped>
	#Title {
		height: 0.8rem;
		line-height: 0.8rem;
		color: #000000;
		border-bottom: 0.01rem solid #F0F0EF;
		padding: 0 0.2rem;
		font-size: 0.3rem;
	}
	
	#Title i {
		/*display: inline-block;*/
		width: 0.57rem;
		height: 0.35rem;
		margin-top: 0.225rem;
		float: right;
	}
	
	#Title i img {
		width: 0.57rem;
		height: 0.35rem;
	}
	
	.Cpdetail_Body {
		/*background: #F3F3F3;*/
	}
	
	.Cpdetail {
		position: relative;
	}
	
	.Cpdetail h1 {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size: 0.3rem;
		color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(169, 33, 36, 0.5);
		/*background: url("../../static/images/bowuguan_detail_headerBg.png") no-repeat;*/
		/*background-size: 100% 0.9rem;*/
		padding-left: 0.3rem;
		padding-right: 0.20rem;
	}
	
	.Cpdetail h1 img.left {
		float: left;
		width: 0.19rem;
		height: 0.35rem;
		margin-top: 0.225rem;
	}
	
	.banner p img.right {
		float: right;
		width: 0.34rem;
		height: 0.32rem;
		margin-top: 0.34rem;
	}
	
	#addShouCang .addShouCang {
		float: right;
		width: 0.34rem;
		height: 0.32rem;
		margin-top: 0.24rem;
		background: url(../../static/images/Cpdetail_shoucang.png)no-repeat center center;
		background-size: 100% 100%;
	}
	
	#addShouCang .addShouCang.shoucang {
		background: url(../../static/images/shoucangActive.png)no-repeat center center;
		background-size: 100% 100%;
	}
	
	.Cpdetail .banner>img {
		width: 6.4rem;
		height: 4.24rem;
	}
	
	.Cpdetail .banner p {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .5);
		height: 1rem;
		line-height: 1rem;
		color: #fff;
		font-size: 0.24rem;
		padding: 0 0.2rem;
	}
	
	.summary,
	.Explanation,
	.Knowledge {
		/*margin-bottom: 0.1rem;*/
		background: #FFF;
	}
	
	.summary,
	.Explanation,
	.Knowledge {
		padding: 0 0.2rem;
		padding-top: 0.24rem;
		position: relative;
	}
	
	.padding45 {
		padding-bottom: 0.45rem;
	}
	
	.summary h2,
	.Explanation h2,
	.Knowledge h2 {
		position: relative;
		font-size: 0.28rem;
		line-height: 0.28rem;
		margin-bottom: 0.26rem;
	}
	
	.summary h2 img,
	.Explanation h2 img,
	.Knowledge h2 img {
		display: inline-block;
		position: relative;
		width: 0.06rem;
		height: 0.25rem;
		background: #A92124;
		top: 0.015rem;
		margin-right: 0.08rem;
		border-radius: 0.08rem;
	}
	
	.summary ul {
		width: 5.96rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid #E5E5E5;
		overflow: hidden;
		margin-bottom: 0.25rem;
	}
	
	.summary ul li {
		float: left;
		font-size: 0.22rem;
		height: 0.26rem;
		line-height: 0.26rem;
		color: #858585;
		margin-bottom: 0.18rem;
	}
	
	.summary ul li img {
		width: 0.2rem;
		height: 0.26rem;
		margin-right: 0.1rem;
	}
	
	.summary ul li a {
		color: #A92124;
	}
	
	.summary ul li:nth-of-type(2) img {
		width: 0.26rem;
		height: 0.22rem;
		margin-top: 0.02rem;
	}
	
	.summary ul li:nth-of-type(3) img {
		width: 0.22rem;
		height: 0.22rem;
		margin-top: 0.02rem;
	}
	
	.summary ul li:nth-of-type(4) img {
		width: 0.21rem;
		height: 0.22rem;
		margin-top: 0.02rem;
	}
	
	.summary ul li:nth-of-type(1),
	.summary ul li:nth-of-type(3) {
		width: 2.88rem;
	}
	
	.summary ul li:nth-of-type(2),
	.summary ul li:nth-of-type(4) {
		width: 3.08rem;
	}
	/*.summary i {
		position: absolute;
		top: 0;
		right: 0;
		width: 1.42rem;
		height: 0.72rem;
	}
	
	.summary i img {
		width: 1.42rem;
		height: 0.72rem;
	}*/
	
	.summary ul li span {
		color: #333333;
		margin-left: 0.12rem;
	}
	
	.summary p {
		color: #000000;
		font-size: 0.26rem;
		line-height: 0.4rem;
		text-align: justify;
	}
	
	.summary p.height {
		/*max-height: 1.2rem;*/
		overflow: hidden;
	}
	
	.summary .showMore {
		width: 100%;
		height: 0.82rem;
		position: absolute;
		bottom: 0;
		left: 0;
		background: rgba(255, 255, 255, .7);
		text-align: center;
		display: none;
	}
	
	.summary .packUp {
		text-align: center;
		line-height: 0.5rem;
		height: 0.5rem;
		display: none;
	}
	
	.summary .packUp span {
		font-size: 0.22rem;
	}
	
	.summary .packUp img {
		width: 0.24rem;
		height: 0.14rem;
		margin-top: 0.18rem;
	}
	
	.summary .showMore span {
		font-size: 0.22rem;
		color: #666666;
		position: absolute;
		bottom: 0.10rem;
		left: 50%;
		margin-left: -0.50rem;
	}
	
	.Explanation ul li {
		/*height: 1.42rem;*/
		overflow: hidden;
		position: relative;
		border-bottom: 0.01rem solid #DFDFDD;
		/*margin-bottom: 0.12rem;*/
		margin-top: 0.26rem;
	}
	
	.Explanation ul li:last-child {
		border-bottom: none;
	}
	
	.Explanation ul li .play {
		/*float: left;*/
		width: 0.28rem;
		height: 0.28rem;
		/*overflow: hidden;*/
		/*border-radius: 50%;*/
		/*background: rgba(0,0,0,.5);*/
		position: absolute;
		top: 0.01rem;
		left: 0;
		/*margin-top: 0.28rem;
		margin-right: 0.15rem;*/
	}
	
	.Explanation ul li .play>img {
		width: 0.28rem;
		height: 0.28rem;
	}
	/*.Explanation ul li .play u {
		position: absolute;
		top: 0;
		left: 0;
		width: 0.28rem;
		height: 0.28rem;
		border-radius: 50%;
		overflow: hidden;
		background: rgba(0, 0, 0, .5);
	}*/
	
	.Explanation ul li .play u>img {
		width: 0.28rem;
		height: 0.28rem;
		/*position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -0.145rem;
		margin-top: -0.175rem;*/
	}
	
	.Explanation ul li .info {
		overflow: hidden;
		height: 0.3rem;
		margin-bottom: 0.12rem;
	}
	
	.Explanation ul li .info .left {
		float: left;
		padding-left: 0.37rem;
	}
	
	.Explanation ul li .info .left h3 {
		height: 0.3rem;
		font-size: 0.26rem;
		line-height: 0.3rem;
		color: #666666;
	}
	
	.Explanation ul li .info .left p {
		line-height: 0.42rem;
	}
	
	.Explanation ul li .info .left p img {
		width: 0.22rem;
		height: 0.23rem;
		margin-right: 0.1rem;
		margin-top: 0.1rem;
	}
	
	.Explanation ul li .info .left p span {
		font-size: 0.22rem;
		color: #999;
		margin-right: 0.23rem;
	}
	
	.Explanation ul li .info .left p i {
		font-style: normal;
		font-size: 0.22rem;
		color: #999;
	}
	
	.Explanation ul li .info .left span {
		font-size: 0.26rem;
		color: #000000;
	}
	
	.Explanation ul li .info .right {
		float: right;
		/*margin-top: -0.04rem;*/
	}
	
	.Explanation ul li .info .right i {
		display: inline-block;
		width: 0.20rem;
		height: 0.19rem;
		position: relative;
		top: -0.04rem;
		background: url(../../static/images/Cpdetail_zan.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.Explanation ul li .info .right i.Liked {
		background: url(../../static/images/Cpdetail_zanle.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.Explanation ul li .info .right span {
		font-size: 0.18rem;
		color: #333;
		position: relative;
		width: 0.3rem;
		top: -0.05rem;
	}
	
	.Explanation ul li .info2 {
		margin-bottom: 0.22rem;
		height: 0.2rem;
		line-height: 0.2rem;
		font-size: 0.18rem;
		color: #A7A7A7;
	}
	
	.Explanation ul li .info2 img {
		width: 0.11rem;
		height: 0.12rem;
		margin-top: 0.04rem;
	}
	
	.Explanation ul li .info2 span {
		margin-right: 0.2rem;
	}
	
	.Explanation ul li .info2 i {
		font-style: normal;
	}
	
	.Explanation .loadMore {
		text-align: center;
		height: 0.56rem;
		line-height: 0.56rem;
		margin-top: 0.14rem;
		font-size: 0.22rem;
		color: #666;
	}
	
	.Explanation {
		padding-bottom: 0.6rem;
	}
	
	.Knowledge {
		padding-bottom: 1rem;
	}
	
	.Knowledge ul li {
		border: 0.01rem solid #E8E8E8;
		border-radius: 0.05rem;
		margin-bottom: 0.1rem;
		padding: 0.1rem 0.1rem;
		box-shadow: #E8E8E8 0 0.02rem 0.02rem;
	}
	
	.Knowledge ul li h2 {
		margin-bottom: 0.12rem;
	}
	
	.Knowledge ul li p span {
		display: inline-block;
		width: 0.8rem;
	}
	
	#sound {
		position: fixed;
		bottom: 0;
		left: 50%;
		margin-left: -0.61rem;
		z-index: 4;
	}
	
	#sound>img,
	.sounding>img {
		width: 1.22rem;
		height: 0.84rem;
	}
	
	.soundlist {
		position: fixed;
		left: 50%;
		bottom: 0;
		margin-left: -1.39rem;
		z-index: 5;
	}
	
	.Explanation .noAudio {
		display: block;
		/*text-align: center;*/
		font-size: 0.22rem;
		color: #666666;
	}
	
	.soundlist>img {
		width: 2.78rem;
		height: 1.63rem;
	}
	
	.soundlist span {
		position: absolute;
		/*top: 0;*/
		font-size: 0.1835rem;
		color: #fff;
		/*border: 0.01rem solid #000;*/
	}
	
	.soundlist span.stop {
		width: 0.6rem;
		height: 0.69rem;
		left: 0.15rem;
		bottom: 0;
		text-align: center;
		line-height: 0.69rem;
	}
	
	.soundlist span.save {
		width: 0.6rem;
		height: 0.69rem;
		right: 0.15rem;
		bottom: 0;
		text-align: center;
		line-height: 0.69rem;
	}
	
	.soundlist span.bg {
		width: 1.12rem;
		height: 0.55rem;
		top: 0.17rem;
		left: 0.81rem;
		text-align: center;
		line-height: 0.55rem;
	}
	
	.fuckAudio2 {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3.4rem;
		background: #FFFFFF;
		z-index: 101;
	}
	
	.fuckAudio2 h2 {
		margin-top: 0.4rem;
		text-align: center;
		font-size: 0.32rem;
		margin-bottom: 0.15rem;
		color: #000000;
	}
	
	.fuckAudio2 a.submie {
		display: block;
		position: absolute;
		left: 0.2rem;
		bottom: 0.15rem;
		width: 6rem;
		height: 0.8rem;
		line-height: 0.8rem;
		color: #FFFFFF;
		text-align: center;
		background: #A92124;
	}
	
	.fuckAudio2 .audioLoding {
		position: relative;
		width: 6.4rem;
		height: 3.4rem;
	}
	
	.fuckAudio2 .audioLoding img {
		width: 6.4rem;
		height: 3.4rem;
	}
	
	.fuckAudio2 .audioLoding>div {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 6.4rem;
		height: 3.4rem;
	}
	
	.fuckAudio2 .audioLoding>div h2 {
		text-align: center;
	}
	
	.fuckAudio2 .audioLoding>div p {
		margin-top: 1.1rem;
	}
	
	.fuckAudio2 .audioLoding>div a {
		width: 2.9rem;
		height: 0.8rem;
		line-height: 0.8rem;
		/*background: #A92124;*/
		border-radius: 0.05rem;
		border: 0.01rem solid #D38889;
		color: #BA4A4C;
		text-align: center;
	}
	
	.fuckAudio2 .audioLoding>div a.quxiao {
		position: absolute;
		left: 0.2rem;
		bottom: 0.15rem;
	}
	
	.fuckAudio2 .audioLoding>div a.submit {
		background: #A92124;
		color: #FFFFFF;
		position: absolute;
		right: 0.2rem;
		bottom: 0.15rem;
		border: none;
	}
	
	.fuckAudio2 p {
		text-align: center;
		font-size: 0.28rem;
		/*line-height: 0.4rem;*/
		padding: 0.05rem 0;
	}
	
	.fuckAudio2-enter-active,
	.fuckAudio2-leave-active {
		transition: all 0.2s ease;
	}
	
	.fuckAudio2-enter,
	.fuckAudio2-leave-active {
		transform: translateY(100%);
	}
	
	.soundlist-enter-active,
	.soundlist-leave-active {
		transition: all 0.5s ease;
	}
	
	.soundlist-enter,
	.soundlist-leave-active {
		transform: translateY(100%);
	}
	
	.shape {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	
	.shape-enter-active,
	.shape-leave-active {
		transition: all .3s;
	}
	
	.shape-leave-active,
	.shape-enter {
		transform: translateY(100%);
		opacity: 0;
	}
	
	.title-enter-active,
	.title-leave-active {
		transition: all 1s;
	}
	
	.title-leave-active,
	.title-enter {
		transform: translateY(-100%);
		opacity: 0;
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
	
	.banner img {
		object-fit: contain;
	}
	
	.Title {
		z-index: 1000000;
	}
	
	.hr {
		height: 0.12rem;
		background: #f3f3f3;
	}
	
	.iSinfo {
		text-align: center;
		font-size: 0.22rem;
	}
	
	#Explanationudios {
		font-size: 0.26rem;
		color: #333;
	}
	
	#guanfang {
		display:block;
		width: 0.35rem;
		height: 0.35rem;
		position: absolute;
		top:-0.02rem;
		left:0.8rem;
		margin-left: 0.1rem;
		background: url(../../static/images/guanfang.png)no-repeat center center;
		background-size: 100% 100%;
	}
	
	#guanfang.gif {
		background: url(../../static/images/guanfang.gif)no-repeat center center;
		background-size: 100% 100%;
	}
	
	#fuckAudio {
		text-align: center;
	}
	
	#fuckAudio img {
		height: 0.41rem;
		width: 1.37rem;
		border-radius: 0.05rem;
		text-align: center;
	}
</style>