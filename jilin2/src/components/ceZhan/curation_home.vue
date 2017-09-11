<template>
    <div>
        <div class="titleWrap">
            <div class="backWrap" @click="goRouter('back','','')">
                <img class="back" src="../../static/images/bowuguan_detail_back.png" alt="">
            </div>
            <h2 class="title">策展</h2>
            <span class="startCuration" @click="goRouter('startCuration','cezhan_message','')">开始策展  <img src="../../static/images/arrowRight.png" alt=""></span>
        </div>
        <div class="contentBigWrap">
            <div class="contentWrap">
                <!--轮播图-->
                <div class="swiper-container container_wrap">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <!--@click="goRouter('leap','CurationDetail','')"-->
                            <img src="../../static/images/curationPng.png" alt="">
                            <h2>孔子文化展</h2>
                        </div>
                        <div class="swiper-slide">
                            <img src="../../static/images/curationPng.png" alt="">
                            <h2>孔子文化展</h2>
                        </div>
                        <div class="swiper-slide">
                            <img src="../../static/images/curationPng.png" alt="">
                            <h2>孔子文化展</h2>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <!--策展达人-->
                <div class="curationPerson">
                    <h2 class="personTitle"><img src="../../static/images/bowuguan_detail_leftBorder_normal.png" alt=""> 策展达人</h2>
                    <div class="personalWrap">
                        <div class="personContent" v-for="(item,index) in curationPersonList" @click="goRouter('leap','OtherCuration',item.userId)">
                            <span  class="num"></span>
                            <div class="imgWrap">
                                <img :src="item.userAvatar" alt="" v-if="item.userAvatar != ''">
                                <img src="../../static/images/moren.png" alt="" v-if="item.userAvatar == ''">
                            </div>
                            <div class="nickName">{{item.userName}}</div>
                            <div class="humanQi">
                                <span>人气</span>
                                <span>{{item.totalViewCounts}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--策展列表-->
                <div class="curationListWrap">
                    <h2 class="personTitle"><img src="../../static/images/bowuguan_detail_leftBorder_normal.png" alt=""> 策展列表</h2>
                    <div class="listWrap">
                        <div class="content" v-for="item in curationList">
                            <div class="contentImgWrap">
                                <img :src="item.imgSrc" alt="" @click="goRouter('leap','CurationDetail',item.id)">
                            </div>
                            <div class="describe">
                                <h3>{{item.title}}</h3>
                                <div class="describeContent">
                                    <div class="imgContainer">
                                        <img :src="item.userAvatar" alt="" v-if="item.userAvatar != ''">
                                        <img src="../../static/images/moren.png" alt="" v-if="item.userAvatar == ''">
                                    </div>
                                    <p class="name">{{item.userName}}</p>
                                    <div class="viewed">
                                        <img src="../../static/images/eye_hui.png" alt="">
                                        <span>{{item.viewCounts}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="searchNone" v-if="showSearchNone">
                            <img src="../../static/images/curationSearchNone.png" alt="">
                        </div>
                    </div>
                    <div class="loading" v-show="isLoading">
                        <img src="../../static/images/login.gif" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!--没登陆提示登录-->
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
        <!--错误信息-->
        <transition name="fadeIn">
             <p class="error" v-show="showErrorMsgTip">{{errorMsg}}</p>
        </transition>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                swiperList:[],                              //轮播图列表
                curationPersonList:[],                      //策展达人列表
                curationList:[],                            //策展列表
                dataInfo:{
                    size:8,
                    currentPage:1
                },
                allowLoad:true,                             //为true时允许上拉加载，否则不允许
                scrollHeight:'',                            //被卷上去的距离+外包裹层的距离
                listHeight:'',                              //列表的总高度
                showSearchNone:false,                      //没有策展的时候显示没有找到图片
                isLoading:false,                           //正在加载
                showCover:false,                           //显示提示登录
                errorMsg:'',                                //错误信息
                showErrorMsgTip:false,                     //显示错误提示信息
                swiperFun:"",                                  //轮播图
            }
        },
        activated(){
            //首次进来的时候拿到列表数据
            this.getData();
        },
        updated(){

        },
        created(){

        },
        methods:{
            //轮播图
            swiper(){
                this.swiperFun = new Swiper('.swiper-container',{
                    pagination:'.swiper-pagination',
                    paginationClickable:true,
                    spaceBetween:0,
                    autoplay:3000,
                    loop:true
                });
            },
            //点击开始策展跳转到策展页面
            goRouter(str,path,params){
                switch(str)
                {
                    //返回按钮
                    case "back":
                    this.$router.back();
                    break;

                    //开始策展
                    case "startCuration":
                    //先判断是不是登录了
                    if(localStorage.user){
                        this.$router.push({path:path});
                    }else{
                        this.showCover = true;
                    }
                    break;

                    //精选策展和策展列表跳转到详情,其他人的策展跳转
                    case "leap":
                    this.$router.push({path:path,query:{id:params}});
                    break;
                }
            },
            //进来的是获取数据
            getData(){
                this.dataInfo.currentPage = 1;                   //请求第一页的数据
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getCurations.do`,
                    method:"GET",
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.isLoading = false;                                                             //关掉gif
                        this.curationPersonList = response.data.data.bestCurationUsers;                      //策展达人
                        this.curationList = response.data.data.curUsers;                                     //策展列表
                        if(response.data.page.currentPage < response.data.page.totalPage){                   //判断当前页和总页数的关系
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                        if(this.curationList.length == 0){                                                   //判断策展列表是不是空的
                            this.showSearchNone = true;
                        }else {
                            this.showSearchNone = false;
                        }
                    }else {
                        this.showErrorMsgTip = true;
                        this.errorMsg = response.data.data;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                            that.errorMsg = "";
                        },2000);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //上拉加载更多
            loadMore(){
                this.scrollHeight = $(".contentBigWrap")[0].scrollTop + $(".contentBigWrap").innerHeight();
                this.listHeight = $(".contentWrap")[0].clientHeight + 40;
                if((this.scrollHeight >= this.listHeight) && this.allowLoad == true){
                    this.dataInfo.currentPage++;                   //请求第一页的数据
                    this.isLoading = true;                        //正在加载gif图显示
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getCurations.do`,
                        method:"GET",
                        params:this.dataInfo
                    }).then((response) => {
                        if(response.data.success == 1){
                            this.isLoading = false;                                                             //关掉gif
                            this.curationList =this.curationList.concat(response.data.data.curUsers);           //策展列表
                            if(response.data.page.currentPage < response.data.page.totalPage){                   //判断当前页和总页数的关系
                                this.allowLoad = true;
                            }else {
                                this.allowLoad = false;
                            }
                        }
//                        成功之后 this.isLoading = false;
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //点击取消
            hideCover(){
                this.showCover = false;
            },
            //点击登录
            goLoginPage(){
                this.$router.push({ path: 'Login' });
                this.showCover = false;
            }
        },
        mounted(){
            //激活swiper插件
            this.swiper();
            //监测滚轮加载
            if(!this.isLoading){
                $(".contentBigWrap")[0].addEventListener('scroll',this.loadMore);
            }
        },
        components: {

        }
    }
</script>
<style>
    .swiper-pagination-bullet{
        background-color: rgba(204, 204, 204,1)!important;
        width: 0.10rem!important;
        height: 0.10rem!important;
    }
    .swiper-pagination-bullet-active{
        background-color: rgb(169,33,36)!important;
        width: 0.16rem!important;
        height: 0.10rem!important;
        border-radius: 0.05rem!important;
    }
</style>
<style scoped>
    .fadeIn-enter-active, .fadeIn-leave-active {
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter, .fadeIn-leave-active {
        transition: 0.5s all ease;
        opacity: 0;
    }
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

    .titleWrap {
        width: 100%;
        height: 0.80rem;
        position: fixed;
        left: 0;
        top:0;
        background: rgba(169,33,36,0.678);
        z-index: 999;
    }
    .titleWrap > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .titleWrap > .backWrap > .back{
        margin: 0.21rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .titleWrap > .title{
        width: 80%;
        font-family: "PingFang";
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.80rem;
        color: rgb(255, 255, 255);
        font-size: 0.30rem;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .titleWrap > .startCuration{
        display: block;
        width: 2.00rem;
        height: 0.80rem;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        position: absolute;
        top:0;
        right: 0;
        line-height: 0.85rem;
        padding-right: 0.20rem;
        text-align: right;
    }
    .titleWrap > .startCuration > img{
        width: 0.09rem;
        height:0.14rem;
        vertical-align: middle;
    }
    /*轮播图*/
    .contentBigWrap{
        width: 100%;
        height: 10.39rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .contentWrap{
        width: 100%;
    }
    .swiper-container{
        width: 100%;
        height: 4.47rem;
        box-sizing: border-box;
        border-bottom: 0.20rem solid #f2f2f2;
    }
    .swiper-container .swiper-slide{
        width: 6.40rem;
        height: 4.27rem;
        background: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, #f2f2f2 100% );
        position: relative;
    }
    .swiper-container .swiper-slide > img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    .swiper-container .swiper-slide > h2{
        width: 100%;
        height: 0.80rem;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 0.30rem;
        color: rgb(255, 255, 255);
        line-height: 0.80rem;
        box-sizing: border-box;
        padding-left: 0.20rem;
        font-weight: bold;
        font-family: "PingFang";
    }
    .swiper-pagination{
        text-align: right;
        box-sizing: border-box;
        padding-right: 0.20rem;
        height: 0.50rem;
        line-height: 0.50rem;
    }
    /*策展达人*/
    .curationPerson{
        width: 100%;
        height: 3.74rem;
        border-bottom: 0.20rem solid #f2f2f2;
    }
    .personTitle{
        width: 100%;
        box-sizing: border-box;
        font-family: "PingFang";
        height: 0.77rem;
        font-size: 0.28rem;
        color: rgb(51, 51, 51);
        font-weight: bold;
        line-height: 0.76rem;
        border-bottom: 0.01rem solid #dfdfdd;
        padding: 0 0.20rem;
    }
    .personTitle > img{
        width: 0.06rem;
        height:0.25rem;
        vertical-align: middle;
    }
    .curationPerson > .personalWrap{
        width: 100%;
        height: 2.77rem;
        box-sizing: border-box;
        padding: 0 0.20rem;
    }
    .curationPerson > .personalWrap > .personContent{
        width: 100%;
        height: 0.95rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dfdfdd;
        line-height: 0.94rem;
    }
    .curationPerson > .personalWrap > .personContent:nth-child(3){
        border-bottom: none;
    }
    .curationPerson > .personalWrap > .personContent > .num{
        display: inline-block;
        width: 0.22rem;
        height: 0.28rem;
        float: left;
        margin-top: 0.33rem;
        margin-right: 0.15rem;
    }
    .curationPerson > .personalWrap > .personContent:nth-child(1) > .num{
        background: url("../../static/images/1.png") center;
        background-size: 0.22rem 0.28rem;
    }
    .curationPerson > .personalWrap > .personContent:nth-child(2) > .num{
        background: url("../../static/images/2.png") center;
        background-size: 0.22rem 0.28rem;
    }
    .curationPerson > .personalWrap > .personContent:nth-child(3) > .num{
        background: url("../../static/images/3.png") center;
        background-size: 0.22rem 0.28rem;
    }
    .curationPerson > .personalWrap > .personContent > .imgWrap{
        border-radius: 50%;
        width: 0.56rem;
        height: 0.56rem;
        box-sizing: border-box;
        overflow: hidden;
        border:0.02rem solid rgb(204, 204, 204);
        background-color: rgb(153, 153, 153);
        display:inline-block;
        margin-top: 0.19rem;
        float: left;
        margin-right: 0.12rem;
    }
    .curationPerson > .personalWrap > .personContent > .imgWrap > img{
        width: 100%;
        height: 100%;
    }
    .curationPerson > .personalWrap > .personContent > .nickName{
        display: inline-block;
        width: 3.00rem;
        padding-left: 0.05rem;
        height: 0.94rem;
        line-height: 0.94rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(3, 3, 3);
        text-align: left;
    }
    .curationPerson > .personalWrap > .personContent > .humanQi{
        display: block;
        width: 1.40rem;
        height: 0.94rem;
        margin: 0 auto;
        font-size: 0.20758rem;
        font-family: "PingFang";
        color: rgb(153, 153, 153);
        line-height: 0.94rem;
        float: right;
        text-align: right;
        vertical-align: middle;
    }
    .curationPerson > .personalWrap > .personContent > .humanQi > span:nth-child(2){
        font-size: 0.34rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        font-weight: bold;
        vertical-align: top;
        padding-left: 0.12rem;
    }
    .curationPerson > .personalWrap > .personContent:nth-child(1) span:nth-child(2){
        color: rgb(169, 33, 36);
    }
    /*策展列表*/
    .curationListWrap{
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.20rem;
        margin-bottom: 0.95rem;
    }
    .curationListWrap > h2{
        border-bottom: none;
        padding: 0;
    }
    .curationListWrap > .listWrap{
        /*padding-top: 0.40rem;*/
    }
    .curationListWrap > .listWrap:after{
        display: block;
        content: "";
        clear: both;
    }
    .curationListWrap > .listWrap > .content{
        width: 2.90rem;
        height: 2.82rem;
        float: left;
        border-radius: 0.06rem;
        overflow: hidden;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0.01rem 0.04rem 0 rgba(6, 0, 1, 0.07);
        box-sizing: border-box;
        margin-bottom: 0.20rem;
    }
    .curationListWrap > .listWrap > .content:nth-child(2n+1){
        margin-right: 0.20rem;
    }
    .curationListWrap > .listWrap > .content > .contentImgWrap{
        background-color: rgb(242, 242, 242);
        width: 2.90rem;
        height: 1.62rem;
    }
    .curationListWrap > .listWrap > .content > .contentImgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .curationListWrap > .listWrap > .content > h3{
        width: 2.70rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.25rem;
        font-family: "Microsoft YaHei";
        color: rgb(51, 51, 51);
    }
    .curationListWrap > .listWrap > .content > .describe{
        width: 100%;
        height: 1.20rem;
        padding: 0 0.15rem;
        box-sizing: border-box;
    }
    .curationListWrap > .listWrap > .content > .describe > h3{
        width: 100%;
        height:0.54rem;
        border-bottom: 0.01rem solid #dfdfdd;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        line-height: 0.54rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent{
        width: 100%;
        height: 0.66rem;
        line-height: 0.66rem;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .imgContainer{
        border-radius: 50%;
        width: 0.45rem;
        height: 0.45rem;
        float: left;
        overflow: hidden;
        margin-top: 0.10rem;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .imgContainer > img{
        width: 100%;
        height: 100%;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .name{
        float: left;
        width: 1.30rem;
        height: 0.66rem;
        line-height: 0.66rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 0.10rem;
        font-size: 0.25rem;
        font-family: "PingFang";
        color: rgb(102, 102, 102);
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .viewed{
        /*background-color: rgba(0, 0, 0, 0.502);*/
        float: right;
        width: 0.80rem;
        height: 0.66rem;
        line-height: 0.66rem;
        text-align: right;
        font-size: 0.20rem;
        font-family: "PingFang";
        color: rgb(102, 102, 102);
        font-weight: bold;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .viewed > img{
        width: 0.30rem;
        height: 0.18rem;
        margin-top: 0.24rem;
    }
    .curationListWrap > .listWrap > .content > .describe > .describeContent > .describe{
        width: 100%;
        height: 0.45rem;
        position: absolute;
        left: 0;
        bottom: 0.08rem;
        padding: 0 0.10rem;
    }
    /*没找到数据*/
    .curationListWrap > .listWrap > .searchNone{
        width: 100%;
    }
    .curationListWrap > .listWrap > .searchNone > img{
        width: 100%;
    }
    /*正在加载*/
    .curationListWrap > .loading{
        width: 100%;
        text-align: center;
        padding:0 0 0.10rem 0;
    }
    .curationListWrap > .loading > img{
        width: 0.32rem;
        height: 0.32rem;
    }
</style>
