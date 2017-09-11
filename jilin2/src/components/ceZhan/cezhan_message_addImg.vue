<template>
	<div class="ceZhan_message_addImg">
		
		<div>
			<img v-on:click="showCollection(false)" class="ceZhan_message_addImg_upload" src="../../static/images/ceZhan_message_addImg.png" alt="" />
			<p v-show="!choseCeZhan[0]" class="ceZhan_message_addImg_prompt">为你的策展添加藏品</p>
			<div class="ceZhan_message_addImg_thumb">
				<div class="ceZhan_message_addImg_scroll">
					
					<div class="ceZhan_message_addImg_content" v-for="(item,index) in choseCeZhan">
						<img v-bind:src="item.pictureThumb"/>
						<p v-text="item.name"></p>
						<img v-on:click="deleteImg(index)" src="../../static/images/ceZhan_message_deleteImg.png" alt="" />
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="ceZhan_message_addImg_panel" v-show="!panel">
			<div v-on:click="showCollection(false)"></div>
			<div>
				<div class="ceZhan_message_addImg_panelTitle">
					<p>从“我的收藏”中添加藏品</p>
					<p v-on:click="showCollection(true)">完成</p>
				</div>
				<div class="ceZhan_message_addImg_panelContent">
					
					<!--读取藏品开始-->
					<div class="ceZhan_message_addImg_mode" v-for="(item,index) in showColl" v-on:click="chose(index)">
						<div >
							<img v-bind:src="item.pictureThumb">
							<div class="ceZhan_message_addImg_collPanel">
								<img src="../../static/images/ceZhan_message_paneChose.png" alt="" />
							</div>
						</div>
						<p v-text="item.name"></p>
					</div>
					<!--读取藏品结束-->
					<img v-show="!showColl" src="../../static/images/collectionNone.png" style="width: 100%;" alt="" />
				</div>
			</div>
		</div>
		
		<div class="ceZhan_message_addImg_alertAll" v-show="alert">
			<div class="ceZhan_message_addImg_alert" >
				<p>提示</p>
				<div class="ceZhan_message_addImg_chose">
					<p>是否删除</p>
					<div>
						<p v-on:click="alertImg(1)">确定</p>
						<p v-on:click="alertImg(0)">取消</p>
					</div>
				</div>
			</div>			
		</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				panel:true,
				alert:false,
				index:0,
				choseColl:[],
				choseCeZhan:[],
				showColl:[]
			}
		},
		methods:{
			showCollection(bl){
				
				let chosColl=$(".ceZhan_message_addImg_collPanel");
				
				bl && 
				
				(e=>{
					
					this.choseCeZhan=[];
					
					Array.from(chosColl).forEach((value,index)=>{
						
						$(value).css("display")=="block" && this.choseCeZhan.push(this.showColl[index]);
						
					})
					
					this.scrollWid();
					//传值
					this.$emit("monitorCollection",this.choseCeZhan)
					
					
				})() ||
				
				(e=>{
					
					chosColl.css("display","none");
					
					this.choseCeZhan.forEach((value,index)=>{
						
						let oIndex=this.showColl.findIndex((val)=>value.id==val.id);
						
						chosColl.eq(oIndex).css("display","block");
					});
					
				})()
				
				
				this.panel=!this.panel;
				
			},
			chose(index){
				
				$(`.ceZhan_message_addImg_collPanel:eq(${index})`).toggle(200);
				
			},
			deleteImg(index){
				
				this.alert=true;
				
				this.index=index;
			},
			alertImg(bl){
				
				bl && (e=>{
					
					this.choseCeZhan.splice(this.index,1);
					
					this.$emit("monitorCollection",this.choseCeZhan);
					
					this.scrollWid();
					
				})()
				
				this.alert=false;
			},
			scrollWid(){
				//	异步设置滚动宽度
				setTimeout(e=>{
					let scrollDiv=$(".ceZhan_message_addImg_scroll"),
						scrollChil=scrollDiv.children();
						
					scrollDiv.width(scrollChil.length*scrollChil.width());
				},0);
			}
		},
		mounted(){
			
			this.scrollWid();
			
		},
		activated(){
			
			this.choseCeZhan=[];
			
			//	获取 我的藏品 数据
			this.$http.get(`${this.$store.state.mutations.getUrl}/mip/front/Collected/myCollect.do`)
	            	
        	.then((response) => {
            	
                let colData=response.data.data;
                
                this.showColl=colData;
                
                
            }).catch((error) => {
            	
                console.log(error)
                
            });

			$("html,body").css({"overflow":"hidden","height":"100%"});
		},
		deactivated(){
			$("html,body").css({"overflow":"visible","height":"auto"});
		}
		
	}
</script>
<style scoped="scoped">\
	/*组件*/
	.ceZhan_message_addImg{
		margin: 0 0 0 0.24rem;
		padding-top: 0.4rem;
	}
	.ceZhan_message_addImg:after{
		content: ".";
		visibility: hidden;
		height: 0;
		display: block;
		clear: both;	
	}
	
	.ceZhan_message_addImg_upload{
		display: block;
		float: left;
		width: 1.2rem;
		height: 1.2rem;
		margin-top: 0.24rem;
		margin-left: 0.26rem;
	}
	.ceZhan_message_addImg_prompt{
		color: #333333;
		font-size: 0.26rem;
		line-height: 1.2rem;
		padding-left: 1.68rem;
		padding-top: 0.24rem;
	}
	
	
	/*面板*/
	.ceZhan_message_addImg_panel{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;

	}
	.ceZhan_message_addImg_panel>div:nth-child(1){
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-color: rgba(0,0,0,0.68);
		
	}
	.ceZhan_message_addImg_panel>div:nth-child(2){
		height: 7.3rem;
		width: 100%;
		background-color: white;
		border-top-left-radius: 0.05rem;
		border-top-right-radius: 0.05rem;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.ceZhan_message_addImg_panelTitle{
		padding: 0.17rem 0.23rem;
		border-bottom: 0.04rem solid #dfdfdd;
		background-color: white;
		position: fixed;
		width: 100%;
		bottom: 6.41rem;
		left: 0;
		z-index: 50;
	}
	.ceZhan_message_addImg_panelTitle:after{
		content: ".";
		visibility: hidden;
		height: 0;
		display: block;
		clear: both;	
	}
	.ceZhan_message_addImg_panelTitle>p:nth-child(1){
		font-size: 0.28rem;
		color: #333333;
		line-height: 0.52rem;
		float: left;
		padding-left: 0.55rem;
		background-image: url(../../static/images/ceZhan_message_panelTitle.png);
		background-repeat: no-repeat;
		background-size: 0.35rem 0.36rem;
		background-position: left center;
	}
	.ceZhan_message_addImg_panelTitle>p:nth-child(2){
		float: right;
		font-size: 0.22rem;
		line-height: 0.22rem;
		color: white;
		padding: 0.15rem 0.22rem;
		background-color: #a92123;
		border-radius: 0.05rem;
	}
	.ceZhan_message_addImg_panelContent{
		padding: 0.1rem;
		margin-top: 0.86rem;
		overflow-y: scroll;
		height: 7.3rem;
	}
	.ceZhan_message_addImg_panelContent:after{
		content: ".";
		visibility: hidden;
		height: 0;
		display: block;
		clear: both;		
	}
	

	.ceZhan_message_addImg_mode{
		margin: 0.1rem;
		width: 2.9rem;
		float: left;
	}
	.ceZhan_message_addImg_mode:last-of-type{
		margin-bottom: 0.6rem;
	}
	.ceZhan_message_addImg_mode>div{
		position: relative;
	}
	.ceZhan_message_addImg_mode>div>img{
		display: block;
		width: 100%;
		height: 1.94rem;
		border-radius:0.05rem;
	}
	.ceZhan_message_addImg_mode p{
		width: 100%;
		color: #333333;
		font-size: 0.26rem;
		line-height: 0.26rem;
		font-family: "微软雅黑";
		margin: 0.2rem 0;
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	/*蒙版*/
	.ceZhan_message_addImg_mode>div>div{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255,255,255,0.6);
		display: none;
	}
	.ceZhan_message_addImg_mode>div>div>img{
		display: block;
		position: absolute;
		bottom: 0.14rem;
		right: 0.14rem;
		width: 0.4rem;
		height: 0.4rem;
	}

	/*缩略图*/
	.ceZhan_message_addImg_thumb{
		float: right;
		width: 4.85rem;
		height: 1.94rem;
		padding-top: 0.24rem;
		overflow-x:scroll;
	}
	.ceZhan_message_addImg_scroll{
		height: 1.7rem;
	}
	.ceZhan_message_addImg_content{
		float: left;
		width: 2.2rem;
		position: relative;
	}
	.ceZhan_message_addImg_content>p{
		width: 1.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ceZhan_message_addImg_content>img:nth-child(1){
		width: 1.8rem;
		height: 1.2rem;
		border-radius: 0.05rem;
		margin-right: 0.22rem;
		display: block;
		float: left;
	}
	.ceZhan_message_addImg_content>img:nth-child(3){
		display: block;
		position: absolute;
		right: 0.16rem;
		top: -0.24rem;
		width: 0.48rem;
		height: 0.48rem;
	}
	
	
	/*弹窗*/
	.ceZhan_message_addImg_alertAll{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
	}
	.ceZhan_message_addImg_alert{
		width: 5.22rem;
		height: 2.68rem;
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
		padding: 0.26rem 0.24rem;
		background-color: #a92123;
	}
	.ceZhan_message_addImg_chose{
		height: 1.9rem;
		background-color: white;
		position: relative;
	}
	.ceZhan_message_addImg_chose>p{
		color: #010000;
		font-size: 0.26rem;
		line-height: 0.26rem;
		padding: 0.34rem 0.24rem;
	}
	.ceZhan_message_addImg_chose>div>p:nth-child(1){
		font-size: 0.22rem;
		line-height: 0.24rem;
		position: absolute;
		color: white;
		background-color: #a92123;
		padding: 0.12rem 0.22rem;
		border-radius: 0.05rem;
		top: 1.04rem;
		left: 2.38rem;
	}
	.ceZhan_message_addImg_chose>div>p:nth-child(2){
		font-size: 0.22rem;
		line-height: 0.24rem;
		position: absolute;
		color: black;
		padding: 0.12rem 0.22rem;
		border-radius: 0.05rem;
		border: 0.01rem solid #dfdfdd;
		top: 1.04rem;
		left: 3.65rem;
	}	
</style>