<template>
    <div>
        <div class="detailWrap">
            <!--轮播图-->
            <div class="swiper-container  gallery-top">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in arrList">
                        <div class="contentWrap">
                            <div class="imgWrap">
                                <img :src="item.picUrl" alt="">
                            </div>
                            <div class="simpleIntroduceWrap">
                                <div class="newSimpleIntroduce">
                                    <div class="playImgContent" v-if="item.aduioUrl">
                                        <img src="../../static/images/play_end.png" isPlaying="false" class="clickPlay" alt="" @click="playAudio($event,item.aduioUrl)">
                                        <img src="../../static/images/playing.png" alt="" class="hideImg clickStop" @click="stopAudio($event)">
                                    </div>
                                    <div class="newDescribe">
                                        <div class="firstLine">
                                            <div class="guanfang" v-show="isGuanfang" v-if="item.audioIsOfficial">官方</div>
                                            <div class="collectName" style="padding-left: 0">{{item.name}}</div>
                                            <div class="collectionDetail" @click="leap(item.id)">详情 <img src="../../static/images/curationArrow.png" alt=""></div>
                                        </div>
                                        <div class="secondLine" v-show="hasExplanation">
                                            来自 :
                                            <span v-if="item.audioUserName">{{item.audioUserName}}</span>
                                            <span v-if="!item.audioUserName">暂无讲解词，点击详情开始录制</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="introduceWord">
                                <p v-if="item.description">{{item.description}}</p>
                                <p v-if="!item.description">暂无藏品介绍</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!--下边的轮播-->
            <div class="swiper-container gallery-thumbs">
                <div class="swiper-wrapper">
                    <div class="swiper-slide newSlide" data="index" v-for="(item,index) in arrList" @click="changeBigImg(index)">
                        <!---->
                        <div class="imgWrap">
                            <img :src="item.picUrl" alt="">
                        </div>
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
            <!--音频-->
            <audio :src="src" id="audio" controls hidden></audio>
            <!--返回键-->
            <div class="backContent">
                <div class="back" @click="back()">
                    <img src="../../static/images/bowuguan_detail_back.png" alt="">
                </div>
                <h2>{{title}}</h2>
                <div class="checkIntro" @click="toggleCover('show')">
                    <img src="../../static/images/check_detail.png" alt="">
                </div>
            </div>
        </div>
        <!--介绍遮罩-->
        <transition name="fadeIn">
            <div class="coverWrap" v-show="showCover">
                <div class="cover">
                    <div class="coverTitle">
                        <h4>简介</h4>
                        <div class="close" @click="toggleCover('hide')">
                            <img src="../../static/images/close.png" alt="">
                        </div>
                    </div>
                    <div class="coverContent">
                        <p>
                            {{description}}
                        </p>
                    </div>
                    <div class="userDiv">
                        <div class="headImg">
                            <img :src="userAvatar" alt="" v-if="userAvatar != ''">
                            <img src="../../static/images/moren.png" alt="" v-if="userAvatar == ''">
                        </div>
                        <span class="cezhanren">策展人:</span>
                        <span>{{userName}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <!--错误信息-->
        <transition name="fadeIn">
            <p class="error" v-show="showErrorMsgTip">系统异常</p>
        </transition>
    </div>
</template>
<style scoped>
    /*错误提示开始*/
    .error{
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
        z-index: 999;
    }
    /*错误提示结束*/
    .fadeIn-enter-active,.fadeIn-leave-active{
        animation: all 0.5s ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        opacity: 0;
    }
    .coverWrap{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        padding: 0.29rem 0.38rem 0;
    }
    .coverWrap > .cover{
        width: 100%;
        height: 7.78rem;
        border-radius: 0.05rem;
        overflow: hidden;
        position: relative;
        background: #fff;
    }
    .coverWrap > .cover > .coverTitle{
        width: 100%;
        height: 0.80rem;
        background: #a92123;
    }
    .coverWrap > .cover > .coverTitle > h4{
        width: 1.20rem;
        height: 0.80rem;
        line-height: 0.80rem;
        font-size: 0.28rem;
        font-family: "PingFang";
        color: rgba(255, 255, 255, 0.902);
        box-sizing: border-box;
        padding-left: 0.45rem;
        float: left;
    }
    .coverWrap > .cover > .coverTitle > .close{
        width: 0.62rem;
        height: 0.80rem;
        padding-top: 0.25rem;
        float: right;
    }
    .coverWrap > .cover > .coverTitle > .close > img{
        width: 0.29rem;
        height: 0.29rem;
    }
    .coverWrap > .cover > .coverContent{
        padding: 0.40rem 0.32rem 0;
        width: 100%;
        height: 6.00rem;
    }
    .coverWrap > .cover > .coverContent > p {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        text-align: justify;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(1, 0, 0);
        line-height: 1.538;
        text-indent: 2em;
    }
    .coverWrap > .cover > .userDiv{
        width: 100%;
        height: 0.96rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #f2f2f2;
    }
    .coverWrap > .cover > .userDiv > .headImg{
        border:0.02rem solid rgb(255, 255, 255);
        border-radius: 50%;
        width: 0.60rem;
        height: 0.60rem;
        box-sizing: border-box;
        overflow: hidden;
        margin-left: 0.32rem;
        margin-top: 0.18rem;
        float: left;
    }
    .coverWrap > .cover > .userDiv > .headImg > img{
        width: 100%;
        height: 100%;
    }
    .coverWrap > .cover > .userDiv > span{
        line-height: 0.96rem;
        font-size: 0.24rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
    }
    .coverWrap > .cover > .userDiv > .cezhanren{
        padding-left: 0.10rem;
    }
        /*返回键*/
    .backContent{
        width: 5.66rem;
        height: 0.80rem;
        background: rgba(169,33,36,0.5);
        position: absolute;
        top:0.29rem;
        left: 0.37rem;
        z-index: 999;
        border-top-left-radius: 0.06rem;
        border-top-right-radius: 0.06rem;
        overflow: hidden;
    }
    .backContent > .back{
        width: 0.62rem;
        height: 0.80rem;
        padding-top: 0.225rem;
        padding-left: 0.15rem;
        float: left;
    }
    .backContent > .back > img{
        width: 0.19rem;
        height: 0.33rem;
    }
    .backContent > h2{
        width: 4.42rem;
        height: 100%;
        float: left;
        line-height: 0.80rem;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        font-weight: bold;
    }
    .backContent > .checkIntro{
        width: 0.62rem;
        height: 0.80rem;
        float: left;
        padding-top: 0.25rem;
    }
    .backContent > .checkIntro > img{
        width: 0.28rem;
        height: 0.32rem;
    }
    /*详情页*/
    .detailWrap{
        width: 100%;
        height: 100%;
        background: url("../../static/images/curationBg.png") center center;
        background-size: cover;
        position: relative;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        /*overflow-y: scroll;*/
    }
    .detailWrap:after{
        content: ",";
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        z-index: 0;
    }
    .gallery-top{
        width: 100%;
        height: 7.78rem;
        border-radius: 0.06rem;
        overflow: hidden;
    }
    .gallery-top .swiper-slide{
        width: 6.40rem;
        height: 8.08rem;
        padding: 0.30rem 0.38rem 0;
        box-sizing: border-box;
    }
    .gallery-top .swiper-slide > .contentWrap{
        width: 100%;
        height: 7.48rem;
        background: #fff;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .gallery-top .swiper-slide > .contentWrap > .imgWrap{
        width: 100%;
        height: 3.80rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap{
        width: 100%;
        height: 1.08rem;
        box-sizing: border-box;
        padding: 0 0.30rem;
    }
    /*新改的样式开始*/
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce{
        width: 100%;
        height: 100%;
        border-bottom: 0.01rem solid rgb(223, 223, 221);
        position: relative;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .playImgContent{
        width: 0.75rem;
        height: 100%;
        float: left;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .playImgContent > img{
        width: 0.61rem;
        height:0.61rem;
        margin-top: 0.24rem;
    }
    .showImg{
        display: block;
    }
    .hideImg{
        display: none;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe{
        width: 4.28rem;
        height: 100%;
        float: left;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe > .firstLine{
        width: 100%;
        height: 0.54rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe > .firstLine > .guanfang{
        border:0.01rem solid rgb(169, 33, 36);
        border-radius: 0.05rem;
        background-color: rgba(0, 0, 0, 0);
        width: 0.52rem;
        height: 0.28rem;
        font-size: 0.18rem;
        font-family: "Adobe Heiti Std";
        color: rgb(169, 33, 36);
        line-height: 0.28rem;
        text-align: center;
        float: left;
        margin-top: 0.27rem;
        margin-right: 0.10rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe > .firstLine > .collectName{
        width: 3.00rem;
        height: 0.54rem;
        float: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        line-height: 0.82rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe .collectionDetail{
        width: 0.80rem;
        height: 0.20rem;
        font-size: 0.22rem;
        font-family: "PingFang";
        color: rgb(169, 33, 36);
        font-weight: bold;
        line-height: 1.0;
        text-align: right;
        position: absolute;
        right:0;
        top:0.24rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe .collectionDetail > img{
        width: 0.10rem;
        height: 0.20rem;
        vertical-align: baseline;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .newSimpleIntroduce > .newDescribe .secondLine{
        width: 100%;
        height: 0.54rem;
        font-size: 0.20rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 0.44rem;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    /*新改的样式结束*/
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .simpleIntroduce > .wordDescribe > .firstLine > .collectionDetail{
        width: 0.70rem;
        height: 0.22rem;
        float: right;
        font-size: 0.22rem;
        font-family: "PingFang";
        color: rgb(169, 33, 36);
        text-align: right;
        line-height: 0.22rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .simpleIntroduceWrap > .simpleIntroduce > .wordDescribe > .firstLine > .collectionDetail > img{
        width: 0.10rem;
        height: 0.20rem;
        margin-top: -0.01rem;
    }
    .gallery-top .swiper-slide > .contentWrap > .introduceWord{
        width: 100%;
        height: 2.60rem;
        padding:0.22rem 0.30rem 0;
        box-sizing: border-box;
    }
    .gallery-top .swiper-slide > .contentWrap > .introduceWord > p{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        text-align: justify;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 1.385;
    }
    /*下边那个*/
    .gallery-thumbs{
        width: 100%;
        height: 2.85rem;
        padding: 0.32rem 0 0 0.37rem;
    }
    .gallery-thumbs .newSlide{
        width: 2.50rem!important;
        height: 2.57rem!important;
        margin-right: 0.20rem;
    }
    .gallery-thumbs .newSlide:nth-last-child(1){
        /*margin-right: 0.35rem;*/
    }
    .gallery-thumbs .newSlide > .imgWrap{
        border-radius: 0.05rem;
        background-color: rgb(220, 220, 220);
        width: 2.50rem;
        height: 1.67rem;
        overflow: hidden;
    }
    .gallery-thumbs .newSlide > .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .gallery-thumbs .newSlide > p{
        width: 2.50rem;
        height: 0.60rem;
        line-height: 0.60rem;
        font-size: 0.25rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<script>
    export default{
        data(){
            return {
                showCover:false,          //显示遮罩
                isGuanfang:true,          //是不是官方讲解词
                hasExplanation:true,      //有讲解词
                id:"",                     //传过来的id
                src:"",                    //音频的播放路径
                showErrorMsgTip:false,    //错误信息显示
                arrList:[],                //数组轮播
                title:'',                  //策展的标题
                description:'',            //策展的简介
                userAvatar:'',             //用户头像
                userName:'',               //用户名称
                galleryTop:'',             //上边那个swiper
                galleryThumbs:'',          //下边那个swiper
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');         //需要隐藏底部的栏
            this.id = this.$route.query.id;             //获取到传过来的id
            this.getData();                             //获取数据
        },
        methods:{
            //返回
            back(){
                this.$router.back();
            },
            //显示和隐藏遮罩
            toggleCover(str){
                switch (str){
                    case "show":this.showCover = true;break;
                    case "hide":this.showCover = false;break;
                }
            },
            //跳转到藏品详情页
            leap(id){
                this.$router.push({path:'scrollMode',query:{id:id}})
            },
            //swiper
            swiper(){
                //上边那个swiper
                this.galleryTop  = new Swiper('.gallery-top', {
                    spaceBetween: 0,
                    loop:true,
                    observer: true,
                    preventClicks:false,
                });
                //下边那个swiper
                this.galleryThumbs  = new Swiper('.gallery-thumbs', {
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                    slideToClickedSlide: true,
                    preventClicks:false,
                });
//                galleryTop.params.control = galleryThumbs;
            },
            //点击下边的上边的发生变化
            changeBigImg(index){
                let index111 = index+1;
                this.galleryTop.slideTo(index111, 500, false);
            },
            //获取数据
            getData(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/detail.do`,
                    method:"GET",
                    params:{
                        id:this.id
//                        id:201707281357471000
                    }
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        //请求成功
                            this.title = response.data.data.title;                  //策展的标题
                            this.description = response.data.data.description;      //策展的简介
                            this.userAvatar = response.data.data.userAvatar;        //用户头像
                            this.userName =  response.data.data.userName;           //用户名称
                            this.arrList = response.data.data.collections;          //数组轮播
                    }else {
                        this.showErrorMsgTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                        },3000);                                                   //3秒之后错误信息消失
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //点击播放按钮
            playAudio(e,url){
                let myAudio = document.getElementById('audio');
                let target = $(e.target);                       //点的那个
                let isPlay = target.attr("isPlaying");          //选中的那个是不是正在播放
                let that = this;
                if(isPlay == "false") {
                    that.src = url;
                    console.log(that.src);
                    $(".clickPlay").attr("isPlaying", "false").removeClass("hideImg");            //先将所有的还原
                    $(".clickStop").addClass("hideImg");
                    target.attr("isPlaying", "true").addClass("hideImg").siblings(".clickStop").removeClass("hideImg");
                    myAudio.currentTime = 0.0;                 //先把url变成点击的那个再播放
                    setTimeout(function () {
                        myAudio.play();
                    }, 0)
                }else {
                    console.log(222);
                    target.attr("isPlaying", "true").addClass("hideImg").siblings(".clickStop").removeClass("hideImg");
                    myAudio.play();                           //继续播放
                }
            },
            //点击暂停播放
            stopAudio(e){
                let myAudio = document.getElementById('audio');
                let target = $(e.target);                       //点的那个
                target.addClass("hideImg").siblings(".clickPlay").removeClass("hideImg");
                myAudio.pause();
            },
            //播放完成
            endedPlay(){
                document.getElementById("audio").pause();
                document.getElementById("audio").currentTime = 0.0;
                $(".clickPlay").attr("isPlaying","false").removeClass("hideImg");
                $(".clickStop").addClass("hideImg");
            }
        },
        mounted(){
            document.getElementById("audio").addEventListener("ended",this.endedPlay);
        },
        updated(){
            this.swiper();
        },
    }
</script>