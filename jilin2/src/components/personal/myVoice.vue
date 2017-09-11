<template>
    <div class="myVoiceContent">
        <div class="fixedTop">
            <div class="voiceHead">
                <div class="backWrap" @click="goBack()">
                    <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
                </div>
                <h2 class="title">我的讲解词</h2>
            </div>
            <div class="tabWrap">
                <div class="tab">
                    <div>{{totalVoice}}</div>
                    <div>音频总数</div>
                </div>
                <div class="tab">
                    <div>{{likeCounts}}</div>
                    <div>点赞总数</div>
                </div>
            </div>
        </div>
        <div class="listWrap">
            <ul class="myVoiceContent">
                <li v-for="(voiceArr,index) in myVoiceList">
                    <div class="introduce">
                        <div>
                            <div class="playImgWrap" :dataUrl="voiceArr.url" isPlaying="false" :class="{playingImg:playIndex == index}" @click="playVoice($event,index)">
                                <!--<img src="../../static/images/Cpdetail_user.png" alt="">-->
                            </div>
                            <p class="nickName" @click="goDetail(voiceArr.collectionId)">{{voiceArr.collectionName}}</p>
                            <p class="publishTime">{{voiceArr.publishTimeStr}}</p>
                        </div>
                        <div>
                            <div class="secondDiv">
                                <img src="../../static/images/Cpdetail_audio.png" alt="">
                                <span class="time">{{voiceArr.duration | timeStr}}</span>
                            </div>
                            <div class="secondDiv">
                                <img src="../../static/images/Cpdetail_zan.png" alt="">
                                <span class="time">{{voiceArr.likeCounts}}</span>
                            </div>
                            <div class="secondDiv delWrap" @click="delVideo(voiceArr.id)" v-show="voiceArr.status == 3">
                                删除
                            </div>
                            <div class="secondDiv delWrap" v-show="voiceArr.status == 1">
                                待审核
                            </div>
                        </div>
                    </div>
                </li>
                <div class="searchNone" v-show="searchNone">
                    <img src="../../static/images/searchNone.png" alt="" style="margin-top: 0.50rem;width: 100%;">
                </div>
                <div class="loading" v-show="isLoading">
                    <img src="../../static/images/login.gif" alt="">
                </div>
                <audio hidden id="audio" :src="src" controls="controls"></audio>
            </ul>
        </div>
        <transiton name="tipIn">
            <div class="errorTipMsg" v-show="showErrorTip">{{errorTip}}</div>
        </transiton>
        <transition name="fadeIn">
            <div class="cover" v-show="showCover">
                <div class="confirmDel">
                    <div class="title">提示</div>
                    <div class="content">
                        <p>确认删除吗？</p>
                        <input type="button" value="取消" @click="noConfirm()">
                        <input class="confirm" type="button" value="确认" @click="confirmCancel()">
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition:0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        opacity: 0;
    }
    .tipIn-enter-active,.tipIn-leave-active{
        transition:0.5s all ease;
        opacity: 1;
    }
    .tipIn-enter,.tipIn-leave-active{
        opacity: 0;
    }
    .cover{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.49);
        padding: 0.20rem;
        z-index: 1000;
    }
    .cover > .confirmDel{
        width: 92%;
        height: 3.00rem;
        border-radius: 0.05rem;
        background: #fff;
        position: absolute;
        left: 4%;
        top:50%;
        margin-top: -1.60rem;
    }
    .cover > .confirmDel > .title{
        height: 0.88rem;
        width: 100%;
        background-color: rgb(169, 33, 36);
        padding-left: 0.20rem;
        line-height: 0.88rem;
        color: #fff;
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
        text-align: left;
        font-size: 0.30rem;
        color: rgba(255, 255, 255, 0.902);
    }
    .cover > .confirmDel > .content > p{
        font-size: 0.30rem;
        color: rgb(51, 51, 51);
        padding: 0.20rem;
    }
    .cover > .confirmDel > .content > input{
        float: right;
        margin-right: 0.20rem;
        margin-top: 0.20rem;
    }
    .cover > .confirmDel > .content > .confirm{
        background-color: rgb(169, 33, 36);
        color: #fff;
    }

    .errorTipMsg{
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
    .fixedTop{
        width: 100%;
        height: 2.18rem;
        position: fixed;
        left: 0;
        top:0;
        z-index: 1000;
        box-sizing: border-box;
        border-bottom: 0.20rem solid #f2f2f2;
    }
    .voiceHead{
        width: 100%;
        height: 0.80rem;
        line-height: 0.80rem;
        border-bottom: 0.01rem solid #b03a3c;
        box-sizing: border-box;
        background: #a92124;
    }
    .voiceHead > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .voiceHead > .backWrap > .back{
        margin: 0.225rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .voiceHead > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.92rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        font-size: 0.30rem;
        font-weight: 600;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .tabWrap{
        width: 100%;
        height: 1.18rem;
        background: #a92124;
    }
    .tabWrap > .tab{
        width: 50%;
        float: left;
        height: 100%;
        text-align: center;
    }
    .tabWrap > .tab > div{
        width: 100%;
        height: 50%;
        box-sizing: border-box;
    }
    .tabWrap > .tab > div:nth-child(1){
        vertical-align: bottom;
        padding-top: 0.20rem;
        font-size: 0.36rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        font-weight: bold;
    }
    .tabWrap > .tab > div:nth-child(2){
        vertical-align: top;
        padding-top: 0.10rem;
        font-size: 0.22689rem;
        font-family: "PingFang";
        color: rgb(204, 204, 204);
        line-height: 0.619;
    }

    .listWrap{
        position: absolute;
        left: 0;
        right:0;
        top:2.18rem;
        bottom:0;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 0 0.20rem;
        box-sizing: border-box;
    }
    .listWrap > .myVoiceContent{
        width: 100%;
    }
    .listWrap .myVoiceContent > li{
        width: 100%;
        height: 1.06rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dfdfdd;
    }

    .listWrap > .myVoiceContent > li > .introduce{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .listWrap > .myVoiceContent > li  .introduce > div{
        height: 50%;
        width: 100%;
        float: left;
    }


    .listWrap > .myVoiceContent > li  .introduce > div > .playImgWrap{
        float: left;
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        margin-right: 0.10rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .playImgWrap > img{
        width: 100%;
        height: 100%;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .playImgWrap:after{
        display: block;
        position: absolute;
        left: 0;
        top:0;
        content: '';
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        background-image: url("../../static/images/myVoice_play.png");
        background-size: 0.28rem 0.28rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: rgba(0,0,0,0.49);
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .playingImg{
        float: left;
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .playingImg > img{
        width: 100%;
        height: 100%;
        animation:rotating linear 3s infinite;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .playingImg:after{
        display: block;
        position: absolute;
        left: 0;
        top:0;
        content: '';
        width: 0.28rem;
        height: 0.28rem;
        background-image: url("../../static/images/myVoice_stop.png");
        background-size: 0.28rem 0.28rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: rgba(0,0,0,0.49);
    }
    .listWrap > .myVoiceContent > li  .introduce > div:nth-child(1){
        padding-top: 0.22rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div:nth-child(2){

    }
    .listWrap > .myVoiceContent > li  .introduce > div > p{
        display: inline-block;
        width: 1.20rem;
        height: 0.50rem;
        float: left;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .nickName{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 3.00rem;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        line-height: 0.30rem;
        height: 0.30rem;
        padding-top: 0.02rem;
        box-sizing: border-box;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .publishTime{
        float: right;
        text-align: right;
        font-size: 0.20rem;
        color: rgb(153, 153, 153);
        font-family: "PingFang";
        color: rgb(153, 153, 153);
        line-height: 0.30rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .secondDiv{
        width: 1.15rem;
        float: left;
        margin-right: 0.20rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .secondDiv > .time{
        font-size: 0.22rem;
        color: rgb(153, 153, 153);
        line-height: 0.50rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .secondDiv > img{
        width: 0.22rem;
        height: 0.23rem;
        margin-top: 0.10rem;
    }
    .listWrap > .myVoiceContent > li  .introduce > div > .delWrap{
        float: right;
        text-align: right;
        font-family: "PingFang";
        color: rgb(171, 32, 37);
        font-size: 0.20rem;
        margin-right: 0;
    }
    .loading{
        width: 100%;
        text-align: center;
    }
    @keyframes rotating {
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
    }
</style>
<script>

    export default{
        data(){
            return {
                playIndex:-1,                          //第几个正在播放
                myVoiceList:[],                        //我的声音所有数据
                src:"",                                //audio的播放地址
                dataInfo:{
                    size:8,
                    currentPage:1
                },
                errorTip:'',                            //错误提示信息
                showErrorTip:false,                    //显示错误提示信息
                likeCounts:'',                          //点赞次数
                allowLoad:true,                        //是不是允许上拉加载
                searchNone:false,                      //什么都没有的话就显示
                isLoading:false,                       //正在加载
                scrollHeight:'',                        //被卷上去的高度+能看到的高度
                listHeight:'',                          //列表包裹层的高度
                totalVoice:0,                           //一共有多少条
                showCover:false,                        //显示遮罩层
                delId:'',                               //要删除的那个音频的id
                checking:false,                        //正在审核
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');         //需要隐藏底部的栏
            this.getData();                             //刚进来的时候请求一遍数据
        },
        methods:{
            goBack(){
                document.getElementById('audio').pause();
                document.getElementById('audio').currentTime = 0.0;
                $(".playImgWrap").attr("isPlaying","false");           //先把所有的属性改为没有播放
                this.playIndex = -1;                                  //把index还原
                this.$router.go(-1);
            },
            getData(){
                this.dataInfo.currentPage = 1;                        //请求第一页的数据
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/collection/myAudios.do`,
                    method:"get",
                    params:this.dataInfo,
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.myVoiceList = response.data.data.myAudios;
                        this.likeCounts = response.data.data.likeCounts;
                        this.totalVoice = response.data.page.allRow;
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                        if(this.myVoiceList.length == 0){
                            this.searchNone = true;
                        }else {
                            this.searchNone = false;
                        }
                    }else if(response.data.success == 0){
                        if(response.data.error.message == "null请先登录！"){
                            this.showErrorTip = true;
                            this.errorTip = "登录已过期，请重新登录";
                            let that = this;
                            setTimeout(function () {
                                that.showErrorTip = false;
                            },2000);
                            sessionStorage.clear();                                                     //清除session
                            localStorage.clear();                                                       //清除localStorage
                        }else {
                            this.showErrorTip = true;
                            this.errorTip = response.data.error.message;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorTip = false;
                            },2000);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            playVoice(e,index){
                let myAudio = document.getElementById('audio');
                let target = $(e.target);                       //点的那个
                let isPlay = target.attr("isPlaying");          //选中的那个是不是正在播放
                let that = this;
                this.playIndex = index;
                if(isPlay == "false"){                         //判断它是不是正在播放
                    //这个以前没有播放过
                    that.src = target.attr("dataUrl");          //将播放地址改成现在选中的这个
                    $(".playImgWrap").attr("isPlaying","false");//先把所有的属性改为没有播放
                    target.attr("isPlaying","true");            //将选中的这个属性改为生在播放
                    myAudio.currentTime = 0.0;                  //将音频播放器位置设为0
                    setTimeout(function () {
                        myAudio.play();
                    },1)
                }else {
                    if(myAudio.paused){
                        myAudio.play();
                        that.playIndex = index;
                    }else{
                        myAudio.pause();
                        that.playIndex = -1;
                    }
                }
            },
            //上拉加载更多
            loadMore(){
                this.scrollHeight = $(".listWrap")[0].scrollTop + $(".listWrap").innerHeight();         //被卷去的高度+能看到的高度
                this.listHeight = $(".myVoiceContent")[0].clientHeight-5;
                if((this.scrollHeight >= this.listHeight) && (this.allowLoad == true)){
                    this.dataInfo.currentPage++;
                    this.isLoading = true;
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/collection/myAudios.do`,
                        method:"get",
                        params:this.dataInfo,
                    }).then((response) => {
//                        console.log(response);
                        if(response.data.success == 1){
                            this.myVoiceList = this.myVoiceList.concat(response.data.data.myAudios);
                            if(response.data.page.currentPage < response.data.page.totalPage){
                                this.allowLoad = true;
                            }else {
                                this.allowLoad = false;
                            }
                            this.isLoading = false;
                        }else {
                            this.showErrorTip = true;
                            this.errorTip = response.data.error.message;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorTip = false;
                            },3000);
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //删除
            delVideo(id){
                this.delId = id;
                this.showCover = true;
            },
            //点击取消删除
            noConfirm(){
                this.showCover = false;
            },
            //点击确定删除
            confirmCancel(){
                this.$http({
                    url: `${this.$store.state.mutations.getUrl}/mip/mobile/collection/delAudio.do`,
                    method:"GET",
                    params:{
                        id:this.delId
                    }
                }).then((response) => {
//                    console.log(response);
                    this.showCover = false;
                    if(response.data.success == 0){
                        this.errorTip = response.data.error.message;
                        this.showErrorTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                        },3000);
                    }else if(response.data.success == 1){
                        this.errorTip = response.data.data;
                        this.showErrorTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                            that.getData();
                            document.getElementById('audio').pause();
                            document.getElementById('audio').currentTime = 0.0;
                            $(".playImgWrap").attr("isPlaying","false");           //先把所有的属性改为没有播放
                            that.playIndex = -1;                                   //把index还原
                        },1500);
                    }
                })
            },
            //播放完成之后移除gif转动
            removeGif(){
                document.getElementById('audio').pause();
                document.getElementById('audio').currentTime = 0.0;
                $(".playImgWrap").attr("isPlaying","false");           //先把所有的属性改为没有播放
                this.playIndex = -1;                                  //把index还原
            },
            //跳转到详情页
            goDetail(id){
                this.$router.push({path:"scrollMode",query:{id:id}});
            }

        },
        created(){

        },
        mounted(){
            if(!this.isLoading){
                $(".listWrap")[0].addEventListener('scroll',this.loadMore);
            };
            //监听语音是不是播放完了
            document.getElementById('audio').addEventListener("ended",this.removeGif);
        },
        filters :{
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
                theTime = parseInt(theTime)<10?'0'+theTime:theTime;
                theTime1 = parseInt(theTime1)<10?'0'+theTime1:theTime1;
                theTime2 = parseInt(theTime2)<10?'0'+theTime2:theTime2
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
    }
</script>