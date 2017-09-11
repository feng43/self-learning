<template>
	<div>
		<!--没登陆的时候显示的-->
		<div class="bgWrap" v-show="!isLogin">
			<div class="headImgWrap">
				<router-link to="Login">
					<img src="../../static/images/noLogin.png" alt="">
				</router-link>
			</div>
			<p class="nickName">
				<router-link to="Login">
					未登录
				</router-link>
			</p>
		</div>
		<!--登录的时候显示的-->
		<div class="bgWrap" v-show="isLogin">
			<div @click="setImgWh" class="headImgWrap img-container">
			<!--<div class="headImgWrap img-container">-->
				<!--<input id="photoBtn" type="button" onclick="" value="选择照片"> 可以增加自己的样式-->
				<!--<input id="inputImage" @change="upload()" type="file" accept="image/*" style="display: none;" />-->
				<input id="inputImage" @change="upload()" type="file" style="display: none;" />
				<img :src="headUrl" alt="" v-show="headUrl">
				<img src="../../static/images/moren.png" alt="" v-show="!headUrl">
			</div>
			<p class="nickName">
				{{userName}}
			</p>
		</div>
		<ul class="nav">
			<li :class="{active:tab == 1}" @click="isLoginLeap('PersonalInfo')">个人信息 <img src="../../static/images/enter.png" alt=""></li>   <!--@click="isLoginLeap('PersonalInfo')"-->
			<li :class="{active:tab == 2}" @click="isLoginLeap('MyVoice')">我的声音 <img src="../../static/images/enter.png" alt=""></li>
			<li :class="{active:tab == 3}" @click="isLoginLeap('MyCollection')">我的收藏 <img src="../../static/images/enter.png" alt=""></li>
			<li :class="{active:tab == 4}" @click="isLoginLeap('MyCuration')">我的策展 <img src="../../static/images/enter.png" alt=""></li>
			<li :class="{active:tab == 5}" @click="isLoginLeap('ChangePassword')" v-show="showTab">修改密码 <img src="../../static/images/enter.png" alt=""></li>
		</ul>
		<div class="quit" @click="quitLogin()" v-show="isLogin">退出登录</div>
		<!--<div @click="showLoginMsg()" style="width: 100%;height: 0.80rem;background: red">显示</div>-->
		<transition name="fadeIn">
			<div class="cover" v-show="showCover">
				<div class="msg_wrap">
					<div class="head">提示</div>
					<p>您还没有登录？是否登录</p>
					<div class="btn_wrap">
						<input type="button" value="取消" class="btnClick" @click="hideCover()">
						<input type="button" value="登录" class="loginBtn btnClick" @click="goLoginPage()">
					</div>
				</div>
			</div>
		</transition>
		<!--裁剪样式-->
		<div v-show="isImage" id="Image">
			<h1>
				<img @click="chexiao" src="../../static/images/ExhibitionDetial_back.png" alt="" />
				移动和缩放
				<button @click="okTrue" type="button" id="button">完成</button>
			</h1>
			<div class="container">
				<img id="image" :src="imgdefault" alt="Picture">
			</div>
			<!--<div id="result">
				<img :src="result" alt="" />
			</div>-->
		</div>
	</div>
</template>
<script>
	import "../../static/js/cropper.js";
	export default {
		data() {
			return {
				tab: 1, //第一个nav有active样式
				isLogin: false, //没有登录   true为已经登录
				showCover: false, //显示提示登录遮罩
				userName: '', //用户名
				headUrl: '', //头像的路径
				userInfo: {}, //登陆信息
				isImage:false,//是否显示裁剪
				cropper:'',//裁剪组件对象
				croppable:false,
				result:'',
				imgdefault:"",
				showTab:false
			}
		},
		activated() {
			this.checkLogin();
		},
		methods: {
			//进来判断是不是登录了，登录之后显示头像和用户名
			checkLogin() {
				//                console.log(sessionStorage.userStr);
				if(localStorage.user) {
					this.userInfo = JSON.parse(localStorage.user);
					this.isLogin = true;
					if(this.userInfo.isWxLogin){
					    this.showTab = false;
					}else {
                        this.showTab = true;
					}
				} else {
					this.isLogin = false;
				}
				if(this.isLogin) {
					this.userName = this.userInfo.sessionAdminName; //昵称
					this.headUrl = this.userInfo.headimgurl; //头像的路径
				} else {
					this.userName = {};
				}
			},
			//点击跳转的时候先判断是不是登录了
			isLoginLeap(route) {
				//                console.log(sessionStorage.userStr);
				if(localStorage.user) {
					this.userInfo = JSON.parse(localStorage.user);
					this.isLogin = true;
				} else {
					this.isLogin = false;
				}
				if(this.isLogin) {
					this.userName = this.userInfo.sessionAdminName; //昵称
					this.headUrl = this.userInfo.headimgurl; //头像的路径
					this.$router.push({ path: route }); //登录了的话就跳转到相应的页面
				} else {
					this.userName = {};
					this.showCover = true; //提示还没有登录是不是登录
				}
			},
			//隐藏遮罩
			hideCover() {
				this.showCover = false;
			},
			showLoginMsg() {
				this.showCover = true;
			},
			//跳到登录页面
			goLoginPage() {
				this.$router.push({ path: 'Login' });
				this.showCover = false;
			},
			//退出登录
			quitLogin() {
				this.$http({
					url: `${this.$store.state.mutations.getUrl}/mip/front/loginOut.do`,
					method: "GET",
					params: ''
				}).then((response) => {
					//                     console.log(response);
					this.isLogin = false; //显示没有登录的那个div
					this.$store.state.mutations.userInfo = {}; //将根路径保存的个人信息的内容删掉
					this.userInfo = '';
					this.userName = ''; //昵称
					this.headUrl = ''; //头像的路径
					sessionStorage.clear(); //清除session
					localStorage.clear(); //清除localStorage
					//                     window.location.href="/mip/jilin2/index.html?login=true";
					window.location.href = "/mip/jilin2/index.html#/Personal";
				}).catch((error) => {
					console.log(error);
				})
			},
			setImgWh() {
				//弹出div
				document.getElementById('inputImage').click();
			},
			upload(){
				var f= document.getElementById("inputImage").files;
				console.log(document.getElementById("inputImage").files);
			    var str = "";
			    var _this = this; 
			    _this.imgdefault = "";
			    for(var i=0;i<f.length;i++){
			        var reader = new FileReader();
			        reader.readAsDataURL(f[i]);
			        reader.onload = function(e){
//			            str+="<img src='"+e.target.result+"'/>";
//			            $$("dd").innerHTML = str;
						_this.imgdefault = e.target.result;
			            console.log(_this.imgdefault);
			            _this.cropper.replace(_this.imgdefault)
			        }
			    }
			},
			getRoundedCanvas(sourceCanvas) {
				console.log(sourceCanvas);
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var width = sourceCanvas.width;
				var height = sourceCanvas.height;

				canvas.width = width;
				canvas.height = height;

				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, width, height);
				context.globalCompositeOperation = 'destination-in';
				context.beginPath();
				context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
				context.fill();
				return canvas;
			},
			okTrue() {//裁剪之后确定
				var croppedCanvas;
				var roundedCanvas;
				
				var roundedImage;

//				if(!this.croppable) {
//					return;
//				}
				console.log(this.cropper);
				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas();

				// Round
				roundedCanvas = this.getRoundedCanvas(croppedCanvas);
				//裁剪之后的图片base64的图src
				this.result=roundedCanvas.toDataURL();
				//上传src去后台。
				console.log(this.result);
//				this.$http({
//					url:`${this.$store.state.mutations.getUrl}/upload/imgUpload/uploadImgStr`,
////					header: {"Content-Type":"application/json"},
////					headers: {'X-Requested-With':'XMLHttpRequest'},
//					method: "post",
//					data: {
//						imgStr:this.result.split(",")[1],
//						imgType:"avatar",
//					}
//				}).then((response) => {
//					console.log(response);
//					
//				}).catch((error) => {
//					console.log(error);
//				})
				var _this = this;
				$.ajax({
					url:`${_this.$store.state.mutations.getUrl}/upload/imgUpload/uploadImgStr`,
					method: "post",
					data: {
						imgStr:this.result.split(",")[1],
						imgType:"avatar",
					},
					success:function(res){
						console.log(res);
						$.ajax({
							url:`${_this.$store.state.mutations.getUrl}/mip/mobile/user/updateAvatar.do`,
							method: "get",
							data: {
								avatar:res,
							},
							success:function(data){
								console.log(data);
								//修改头像到本地存储数据。
								_this.userInfo.headimgurl = data.data;
								localStorage.user = JSON.stringify(_this.userInfo);
								//前台头像回显
								_this.headUrl=_this.result;
								_this.imgdefault="";
								_this.isImage = false;
							}
						})
					}
				})
			},
			chexiao(){//取消上传图片
				alert(1);
				this.imgdefault="";
				this.isImage = false;
			}
		},
		components: {
			
		},
		created() {
			 
		},
		mounted(){
			$("#home").removeClass('imgBgActive').next("p").removeClass("homeActive");
             $("#mine").addClass("imgPersonActive").next("p").addClass("personActiveWord");
             var _this = this;
			_this.cropper = new Cropper(image, {
	          aspectRatio: 1,
	          viewMode: 1,
	          dragMode : "move", 
	          aspectRatio:300/300,
	          zoomOnWheel:false,
	          cropBoxResizable:false,
	          background:false,
	          cropBoxMovable:false,
	          dragCrop:false,
	          center:false,
	          guides :false,//裁剪框虚线 默认true有  
	          minCropBoxWidth:300,
	          minCropBoxHeight:300,
	          toggleDragModeOnDblclick:false,
	          ready: function () {
	            _this.croppable = true;
	          }
	        });
		},
		updated(){
			var _this = this;
			
	        if(_this.imgdefault){
			    	 _this.isImage = true;
	        
			}
		}
	}
</script>
<style scoped>
	.fadeIn-enter-active,
	.fadeIn-leave-active {
		transition: 0.5s all ease;
		opacity: 1;
	}
	
	.fadeIn-enter,
	.fadeIn-leave-active {
		transition: 0.5s all ease;
		opacity: 0;
	}
	
	.cover {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.49);
		z-index: 1000;
	}
	
	.cover>.msg_wrap {
		width: 90%;
		margin: 4.00rem auto;
		height: 3.00rem;
		background: #fff;
		border-radius: 0.05rem;
		overflow: hidden;
	}
	
	.cover>.msg_wrap>.head {
		width: 100%;
		height: 0.80rem;
		background: #a92123;
		line-height: 0.80rem;
		padding-left: 0.20rem;
		font-size: 0.28rem;
		color: rgba(255, 255, 255, 0.902);
	}
	
	.btnClick {
		font-size: 0.22rem;
	}
	
	.loginBtn {
		background-color: rgb(169, 33, 35);
		color: rgb(255, 255, 255);
	}
	
	.cover>.msg_wrap>p {
		padding: 0.50rem 0.20rem;
	}
	/*.cover > .msg_wrap > .btn_wrap{*/
	/*padding-right: 0.20rem;*/
	/*}*/
	
	.cover>.msg_wrap>.btn_wrap>input {
		float: right;
		margin-right: 0.20rem;
	}
	
	.bgWrap {
		width: 100%;
		position: relative;
		height: 2.93rem;
		background: url("../../static/images/bg.png") no-repeat center;
		background-size: cover;
	}
	
	.bgWrap>.headImgWrap {
		width: 1.36rem;
		height: 1.36rem;
		border: 0.04rem solid #fff;
		border-radius: 50%;
		overflow: hidden;
		box-sizing: border-box;
		position: absolute;
		top: 0.35rem;
		left: 50%;
		margin-left: -0.68rem;
	}
	
	.bgWrap>.headImgWrap img {
		width: 100%;
		height: 100%;
	}
	
	.bgWrap>.nickName {
		width: 100%;
		height: 0.50rem;
		text-align: center;
		line-height: 0.50rem;
		color: #fff;
		padding: 0 0.20rem;
		position: absolute;
		top: 2.05rem;
		font-size: 0.26rem;
	}
	
	.bgWrap>.nickName a {
		color: #ffffff;
		font-size: 0.26rem;
	}
	
	.nav {
		width: 100%;
		margin-top: 0.52rem;
	}
	
	.nav>li {
		background: #fff;
		height: 0.81rem;
		padding: 0 0.30rem;
		line-height: 0.81rem;
		font-size: 0.26rem;
		color: rgb(51, 51, 51);
	}
	
	.nav>li.active {
		background-color: rgb(247, 247, 247);
	}
	
	.nav>li>img {
		width: 0.14rem;
		height: 0.24rem;
		float: right;
		margin-top: 0.29rem;
	}
	
	.quit {
		background-color: rgb(255, 255, 255);
		width: 100%;
		height: 1.13rem;
		border-top: 0.16rem solid #f7f7f7;
		border-bottom: 0.16rem solid #f7f7f7;
		position: absolute;
		bottom: 1.2rem;
		color: rgb(230, 74, 74);
		font-size: 0.26rem;
		line-height: 0.85rem;
		text-align: center;
	}
	
	#Image {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 100000;
	}
	#Image h1{
		color: #FFF;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
	}
	#Image img {
      max-width: 100%;
    }
    #Image .container{
    	width: 100%;
    	height: 9.6rem;
    }
    #Image p{
    	text-align: right;
    	padding-right: 0.2rem;
    }
    #Image h1 img{
    	float: left;
    	width: 0.19rem;
    	height: 0.35rem;
    	margin-left: 0.2rem;
    	margin-top:0.25rem ;
    }
    #Image h1 button{
    	height: 0.6rem;
    	float: right;
    	/*margin-right: 0.2rem;*/
    	position: relative;
    	right: 0.2rem;
    	top: 0.16rem;
    	line-height: 0.6rem;
    	padding: 0 0.2rem;
    }
</style>
<style>
    #Image .cropper-view-box,
    #Image .cropper-face {
      border-radius: 50%;
    }
</style>
