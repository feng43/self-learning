<template>
	<div class="ceZhan_message_all">
		<!--头部-->
		<div class="ceZhan_message_header">
			<img v-on:click="goRouter('back')" src="../../static/images/bowuguan_backBtn.png" alt="策展信息页面回退按钮" />
			<p>
				<span v-on:click="complete" v-bind:class="{ceZhan_message_complete:modifyComplete}">完成</span>
			</p>
			<p>
				<span>填写策展信息</span>
			</p>
		</div>
		
		<div class="ceZhan_message_cover">
			<a href="javascript:;" class="ceZhan_message_file" v-on:click="upLoadImg">
				<!--无图显示-->
			    <img v-show="!userData.cropperImg" src="../../static/images/ceZhan_message_upload.png" alt="" />
			    <p v-show="!userData.cropperImg">添加封面图片</p>
			    
			    <!--有图显示-->
			    <img  v-bind:src="userData.cropperImg" v-show="userData.cropperImg" alt="上传的图片" />
			    <p v-show="userData.cropperImg">更换封面</p>
			</a>
		</div>
		<div class="ceZhan_message_userTitle">
			<input v-model="userData.titleVal" type="text" placeholder="填写策展标题（15字以内）" maxlength="15"/>
		</div>
		<div class="ceZhan_message_userIntroduce">
			<textarea v-model="userData.contentVal" placeholder="填写策展简介" name="" rows="" cols=""></textarea>
		</div>
		<div class="ceZhan_message_cropper" v-show="userData.cropperBg">
			<img id="userImg" alt="" style=" max-width： 100%"/>
			<p>
				<img v-on:click="goRouter('cropperImg')" src="../../static/images/bowuguan_detail_back.png" alt="" />
				移动和缩放
				<button id="userDetermine" >完成</button>
			</p>

		</div>
		<input type="file" name="" id="ceZhan_Upload" style="display: none;">
		
		<cezhan_message_addimg v-on:monitorCollection="modifyCollection"></cezhan_message_addimg>
		
		<div class="ceZhan_message_addImg_alertAll" v-show="userData.alert">
			<div class="ceZhan_message_addImg_alert" >
				<p>策展提交成功</p>
				<div class="ceZhan_message_addImg_chose">
					<p>审核后你可以在策展列表看到发布的策展</p>
					<div>
						<p v-on:click="goRouter('back')">请耐心等待审核</p>
						<p>{{userData.jumpTime}}s后跳转首页</p>
					</div>
				</div>
			</div>			
		</div>
		
		
	</div>
</template>
<script>
	import cezhan_message_addImg from "./cezhan_message_addImg.vue"
	export default{
		data(){
			return{
				userData:{
					cropperImg:"",		// 裁剪之后预览图片URL+封面添加检测
					cdnImgUrl:"",		// 上传之后的远程图片地址
					titleVal:"",		// 标题输入检测
					contentVal:"",		// 简介输入检测
					collection:[],		// 策展藏品检测
					cropperBg:false,
					alert:false,
					jumpTime:5,
					intervalId:0
				}

			}
		},
		computed:{
			
			modifyComplete(){
				
				return !!this.userData.cropperImg && !!this.userData.titleVal && !!this.userData.contentVal && !!this.userData.collection.length;
			}
			
		},
		components:{
			"cezhan_message_addimg": cezhan_message_addImg,

		},
		methods:{
			goRouter(str){
				switch(str)
				{
					//左上返回按钮
					case "back":
					this.$router.back();
					break;
					
					//裁剪页面返回
					case "cropperImg":
					this.userData.cropperBg=false;
					$("#userImg").cropper("reset");
					break;			
					
				}
			},
			upLoadImg(){$("#ceZhan_Upload").click();},
			
			modifyCollection(collection){this.userData.collection=[...collection];},
			
			complete(){
				
				this.modifyComplete && 
				
				(e=>{
					
					this.userData.alert=true;
					
					this.uploadCeZhan();
					
					this.userData.intervalId=setInterval(e=>{
						
						!!this.userData.jumpTime &&
						
						this.userData.jumpTime-- ||
						
						(()=>{
							
							clearInterval(this.userData.intervalId);
							
							this.goRouter("back");
							
						})()
						
					},1000);
					
				})()
				
			},
			uploadCeZhan(){
				
				let userCeZhan={
					imgSrc:this.userData.cdnImgUrl,
					title:this.userData.titleVal,
					description:this.userData.contentVal,
					collectionIds:this.userData.collection.map(val=>val.id).join(",")
				}
				console.log(this.userData.cdnImgUrl);

				let	_this=this;
				
				$.ajax({
					type: "GET",
					url: `${_this.$store.state.mutations.getUrl}/mip/mobile/curation/saveCuration.do`,
					data:userCeZhan,
					success(data){
						
						console.log(`策展保存:${data.data}`);
						
					}
				});
				
			}
			
		},
		mounted(){
			function convertToData(url, canvasdata, cropdata, callback) {  
			    var cropw = cropdata.width; // 剪切的宽  
			    var croph = cropdata.height; // 剪切的宽  
			    var imgw = canvasdata.width; // 图片缩放或则放大后的高  
			    var imgh = canvasdata.height; // 图片缩放或则放大后的高  
			      
			    var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置  
			    var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置  
			      
			    var canvas = document.createElement("canvas");  
			    var ctx = canvas.getContext('2d');  
			      
			    canvas.width = cropw;  
			    canvas.height = croph;  
			     
			    var img = new Image();  
			    img.src = url;  
			      
			    img.onload = function() {  
			        this.width = imgw;  
			        this.height = imgh;  
			        ctx.drawImage(this, poleft, potop, this.width, this.height);  
			        var base64 = canvas.toDataURL('image/jpg', 1);  // 这里的“1”是指的是处理图片的清晰度（0-1）之间，当然越小图片越模糊，处理后的图片大小也就越小  
			        callback && callback(base64)      // 回调base64字符串  
			    }  
			}  
			
			$("#userImg").cropper({  
				aspectRatio: 466/291,
				viewMode: 1,
				dragMode : "move", 
				zoomOnWheel:false,
				cropBoxResizable:false,
				background:false,
				cropBoxMovable:false,
				dragCrop:false,
				center:false,
				guides :false,
				minCropBoxWidth:466,
				minCropBoxHeight:291,
				toggleDragModeOnDblclick:false,
		   });
			
			this.$nextTick(e=>{
				$("#ceZhan_Upload").on("change",e=>{
					
					let file=$("#ceZhan_Upload")[0].files[0],
						userImg=new FileReader(),
						_this=this;
	
					userImg.readAsDataURL(file);
					
					this.userData.cropperBg=true;

					userImg.onload=(e)=>{										//	读取本地图片完成
						
						$("#userImg").cropper("replace",userImg.result);		//	替换cropper图像为上传的图像
						
						$("#userDetermine").unbind().on("click",(e)=>{
							
							var src = userImg.result;
						    var canvasdata = $("#userImg").cropper("getCanvasData");  
						    var cropBoxData = $("#userImg").cropper('getCropBoxData');  
						      
						    convertToData(src, canvasdata, cropBoxData, (basechar)=>{  
						        // 回调后的函数处理  
								this.userData.cropperBg=false;
						         
								this.userData.cropperImg=basechar;
								
								$.ajax({
									url:`${_this.$store.state.mutations.getUrl}/upload/imgUpload/uploadImgStr`,
									data:{
										imgStr:basechar.split(",")[1],
										imgType:"curation"
									},
									method: "post",
									success(data){

										console.log(data);
										_this.userData.cdnImgUrl=data;
										
									},
									error(data){
										
										console.log("上传封面失败");
										
									}
								})

						    });  
						})
						
					}
				})
			});
			
		},
		deactivated(){
			
			//	清除跳转定时器
			clearInterval(this.userData.intervalId);
			
		},
		beforeRouteEnter (to, from, next) {

			next(vm=>{
				
				vm.$store.dispatch('hideHeader');
				
				Object.assign(vm.userData,vm.$options.data().userData);
				
			});
		},
		
		
		
		
		
	}
</script>
<style scoped="scoped">
	/*全部填写完成字体变色*/
	.ceZhan_message_complete{
		color: #891c1c !important;
	}

	/*头部*/
	.ceZhan_message_header{
		height: 0.9rem;
		width: 100%;
		padding-top: 0.28rem;
		border-bottom: 0.02rem solid #eee;
		position: fixed;
		top: 0;
		background-color: white;
		z-index: 102;
	}
	.ceZhan_message_header>img:nth-child(1){
		float: left;
		display: block;
		margin: 0 0 0 0.2rem;
		width: 0.2rem;
		height: 0.35rem;
	}
	.ceZhan_message_header>p:nth-child(2){
		float: right;
		width: 1rem;
		line-height: 0.34rem;
		font-size: 0.34rem;
		color: #999999;
	}
	.ceZhan_message_header>p:nth-child(3){
		width: 2.5rem;
		margin: 0 auto;
		text-align: center;
		line-height: 0.34rem;
	}
	.ceZhan_message_header>p:nth-child(3)>span{
		font-size: 0.34rem;
		font-family: "微软雅黑";
		color: #333333;
		font-weight: 500;
	}

	/*封面*/
	.ceZhan_message_cover{
		margin-top: 0.9rem;
		overflow: hidden;
		
	}
	.ceZhan_message_file {
	    position: relative;
	    display: block;
	    background: #f2f2f2;
	    border-radius: 0.05rem;
	    overflow: hidden;
	    color: #1E88C7;
	    text-decoration: none;
	    text-indent: 0;
	    line-height: 20px;
	    width: 4.66rem;
	    height: 2.91rem;
	    margin: 0.28rem auto;
	}
	/*无图时显示*/
	.ceZhan_message_file>img:nth-child(1){
		display: block;
		width: 0.57rem;
		height: 0.47rem;
		margin: 1.22rem auto 0;
	}
	.ceZhan_message_file>p:nth-child(2){
		font-size: 0.26rem;
		text-align: center;
		margin-top: 0.24rem;
		
	}
	/*有图时显示*/
	.ceZhan_message_file>img:nth-child(3){
		width: 4.66rem;
	    height: 2.91rem;
		display: block;
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		
	}	
	.ceZhan_message_file>p:nth-child(4){
		width: 2.02rem;
		height: 0.74rem;
		background-color: rgba(0,0,0,0.68);
		color: white;
		font-size: 0.26rem;
		line-height: 0.26rem;
		border-radius: 0.05rem;
		padding: 0.24rem 0; 
		text-align: center;
		position: absolute;
		z-index: 101;
		top: 50%;
		left: 50%;
		transform: translate(-1.01rem,-0.37rem);
		
	}
	
	/*策展标题*/
	.ceZhan_message_userTitle{
		margin: 0 0.24rem;
	}
	.ceZhan_message_userTitle input{
		font-size: 0.26rem;
		font-family: "微软雅黑";
		height: 0.9rem;
		width: 100%;
		background-color: #F2F2F2;
		border: none;
		outline: none;
		padding: 0.3rem 0.24rem;
		margin-bottom: 0.2rem;
		border-radius: 0.05rem;
	}
	
	/*策展内容*/
	.ceZhan_message_userIntroduce{
		margin: 0 0.24rem 0rem;
	}
	.ceZhan_message_userIntroduce textarea{
		border: none;
		outline: none;
		height: 1.84rem;
		font-size: 0.26rem;
		font-family: "微软雅黑";
		padding: 0.3rem 0.24rem;
		background-color: #F2F2F2;
	}
	
	/*cropper 剪切*/
	.ceZhan_message_cropper{
		display: block;
		position: fixed;
		background-color: black;
		z-index: 500;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.ceZhan_message_cropper>p{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		text-align: center;
		margin-top: 0.24rem;
		color: white;
		font-size: 0.26rem;
		line-height: 0.35rem;
		height: 0.35rem;
	}
	.ceZhan_message_cropper>p>img{
		display: block;
		width: 0.2rem;
		height: 0.35rem;
		position: absolute;
		top: 0;
		left: 0.2rem;
	}
	.ceZhan_message_cropper>p>button{
		display: block;
		position: absolute;
		top: 0;
		right: 0.2rem;
		
	}
	
	/*完成弹窗*/
	.ceZhan_message_addImg_alertAll{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		background-color: rgba(0,0,0,0.68);
	}
	.ceZhan_message_addImg_alert{
		width: 5.22rem;
		height: 3.33rem;
		border-radius: 0.05rem;
		overflow: hidden;
		position: fixed;
		z-index: 200;
		top: 50%;
		left: 50%;
		transform: translate(-2.61rem,-1.34rem);
		-webkit-transform: translate(-2.61rem,-1.34rem);
	}
	.ceZhan_message_addImg_alert>p{
		font-size: 0.28rem;
		line-height: 0.28rem;
		color: white;
		padding: 0.26rem 0rem 0.26rem 0.72rem;
		background-color: #a92123;
		background-image: url(../../static/images/ceZhan_message_complete.png);
		background-repeat: no-repeat;
		background-size: 0.32rem 0.32rem;
		background-position: 0.2rem 0.25rem;
	}
	.ceZhan_message_addImg_chose{
		height: 2.55rem;
		background-color: white;
	}
	.ceZhan_message_addImg_chose>p{
		color: #010000;
		font-size: 0.26rem;
		line-height: 0.26rem;
		padding: 0.55rem 0.24rem 0.6rem;
		text-align: center;
	}
	.ceZhan_message_addImg_chose>div>p:nth-child(1){
		font-size: 0.22rem;
		line-height: 0.24rem;
		color: white;
		background-color: #a92123;
		padding: 0.12rem 0.22rem;
		border-radius: 0.05rem;
		box-sizing: content-box;
		width: 1.8rem;
		height: 0.24rem;
		margin: 0 auto;
		text-align: center;
	}
	.ceZhan_message_addImg_chose>div>p:nth-child(2){
		font-size: 0.22rem;
		line-height: 0.24rem;
		color: black;
		padding: 0.19rem 0.22rem 0;
		border-radius: 0.05rem;
		text-align: center;
	}	
</style>