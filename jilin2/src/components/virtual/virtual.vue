<template>
    <div>
        <div class="header">
            <div class="back" @click="goRouter('back')">
                <img src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h3 class="title">
                <span>虚拟展厅</span>
            </h3>
        </div>
        <ul class="tab">
            <li :class="{active:hotNewTog-1}" v-on:click="change(2)">最热 <div class="line_gray"></div></li>
            <li :class="{active:!(hotNewTog-1)}" v-on:click="change(1)">最新</li>
        </ul>
        <div class="listWrap">
            <div class="list" v-for="item in showList" v-on:click="goRouter('virUrl',{url:item.viMoveUrl,id:item.id})">
                <!--<img :src="item.viAddress" alt="">-->
                <div class="imgWrap">
                    <img v-lazy="item.viAddress" alt="" />
                </div>
                <p>{{item.viName}}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .line_gray{
        width: 0.02rem;
        height:0.44rem;
        background: #dfdfdd;
        float: right;
        margin-top: 0.18rem;
    }
	img[lazy=loading] {
    /*your style here*/
   		background: url(../../static/images/login.gif) no-repeat center center;
	}
	img[lazy=error] {
	    /*your style here*/
	}
	img[lazy=loaded] {
	    /*your style here*/
	}

    .header{
        height: 0.90rem;
        width: 100%;
        box-sizing: border-box;
        background-color: #a92124;
        position: fixed;
        top: 0;
        left: 0;
    }
    .header > .back{
        width: 0.60rem;
        height: 100%;
        float: left;
        padding: 0.225rem 0 0 0.20rem;
    }
    .header > .back > img{
        width: 0.19rem;
        height: 0.35rem;
        vertical-align: middle;
    }
    .header > .title{
        font-size: 0.30rem;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 0.88rem;
    }
    .header > .title > span{
        margin-left: -0.60rem;
    }
    .tab{
        width: 100%;
        height: 0.80rem;
        margin-top: 0.9rem;
    }
    .tab > li{
        width: 50%;
        float: left;
        height: 100%;
        line-height:0.80rem;
        text-align: center;
        font-size: 0.26rem;
        color: rgb(51, 51, 51);
    }
    .tab > li:nth-child(1){
        padding-left: 0.60rem;
    }
    .tab > li:nth-child(2){
        padding-right: 0.60rem;
    }
    .tab > li.active{
        color: #a92123;
    }
    /*列表*/
    .listWrap{
        width: 100%;
        padding: 0 0.31rem;
        margin-bottom: 0.95rem;
    }
    .listWrap > .list{
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0 0.04rem 0 rgba(102, 102, 102, 0.4);
        width: 100%;
        border-radius: 0.04rem;
        overflow: hidden;
        margin-top: 0.22rem;
        height: 3.97rem;
    }
    .listWrap > .list:nth-child(1){
        margin-top: 0;
    }
    .listWrap > .list > .imgWrap{
        width: 100%;
        height: 3.31rem;
        background: #f2f2f2;
    }
    .listWrap > .list > .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .listWrap > .list > p{
        width: 100%;
        height: 0.66rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 0.66rem;
        text-align: center;
        padding: 0 0.20rem;
    }
</style>
<script>
    export default{
        data(){
            return {
	            hotNewTog:2,                		//  2-》最热   1 -》最新
	            showList:[],						//  显示dom
	            allList:[[],[]],					//  allList[0]=>newList allList[1]=>hotList
	            allPage:[2,2],						//	allPage[0]=>newPage allPage[1]=>hotPage
	            toggleData:[true,true],
            }
        },
        created(){

			//	初始数据获取			
            this.getData(1,4,2).then(data=>{
            	
            	this.showList=this.allList[1];
            	
            	this.getData(1,4,1);
            	
            });
            
            //	滚动加载
            var loadData=function(_this){
            	
            	var scrollTop=$(window).scrollTop(),
            		documentHei=$(document).height(),
            		windowHei=$(window).height(),
            		num=_this.hotNewTog;
            		
            	(documentHei-scrollTop==(windowHei) && _this.toggleData[num-1]) &&
            	
          		_this.getData(_this.allPage[num-1]++,4,num).then(data=>{
        	
        			_this.showList=_this.allList[num-1];
        			
        			$('html,body').animate({scrollTop:scrollTop+100},200); 
        			
	            });
            	
            }
            
            this.$store.state.mutations.scrollWin(loadData,this);
            
        },
        methods:{
        	change(num){
        		
				this.hotNewTog=num;
				
				this.showList=this.allList[num-1];        		
        		
        	},
            goRouter(str,obj){
				switch(str)
				{
					case "back":
					this.$router.back();
					break;
					
					case "virUrl":
					this.getAdd(obj);
					break;
					
				}
			},
            
       		//获取数据列表 flag   1==最新   2==最热
            getData(page,size,flag){
            	
            	$('html,body').css("overflow","hidden");
            	
            	var dataPromise=new Promise((resolve,reject)=>{
            		
	            	this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/virtual/getVirtuals.do?currentPage=${page}&size=${size}&flag=${flag}`)
	            	.then((response) => {
	                	
	                    let list=flag-1,
	                    	data=response.data;
	                    
	                	console.log(data);
	                    
	                    this.allList[list]=this.allList[list].concat(data.data);
	                    
	                    this.toggleData[list]=!!(page<data.page.totalPage);
	                    
	                    $('html,body').css("overflow","scroll");
	                    
	                    resolve(data);
	                    
	                }).catch((error) => {
	                	
	                	reject(error);
	                	
	                    console.log(error)
	                });
            		
            	});
            	
				return dataPromise;
            },
            
            //+1
            getAdd(obj){
            	
            	this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/virtual/addClickCount.do?id=${obj.id}`)
            	.then((response) => {
            		
                	window.location.href=obj.url;
                	
                	console.log(`点击之后次数加一:${response}`)
                    
                }).catch((error) => {
                	        	
                    console.log(error)
                });
            }
            
            
        },
        components: {

        }
    }
</script>