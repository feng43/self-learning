<template>
    <div class="collectionContent">
        <div class="collectionHead">
            <div class="backWrap" @click="goBack()">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title">我的收藏</h2>
            <!--<div class="clearAll">-->
                <!--<span>清空</span>-->
            <!--</div>-->
        </div>
        <div class="listWrap">
            <ul class="listContent">
                <li v-for="list in dataList">
                    <div class="imgWrap" @click="leapDetail(list.id)">
                        <img :src="list.pictureThumb" alt="">
                    </div>
                    <div class="describeWrap">
                        <p>{{list.name}}</p>
                    </div>
                    <div class="cancelWrap">
                        <img src="../../static/images/cancel_collection.png" alt="" @click="cancelCollect(list.id,list.type)">
                        <span>取消收藏</span>
                    </div>
                </li>
                <div class="loading" v-if="showLoading">
                    <img src="../../static/images/login.gif" alt="">
                </div>
                <img class="searchNone" v-show="searchNone" src="../../static/images/searchNone.png" alt="" style="margin-top: 1.00rem;width: 100%;">
            </ul>
        </div>
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
        <transiton name="tipIn">
            <div class="errorTipMsg" v-show="showErrorTip">{{errorTip}}</div>
        </transiton>
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
    .collectionContent{
        background: #f2f2f2;
    }
    .collectionHead{
        width: 100%;
        height: 0.92rem;
        line-height: 0.90rem;
        border-bottom: 0.02rem solid rgb(238, 238, 238);
        position: fixed;
        left: 0;
        top:0;
        z-index: 1000;
        background: #a92124;
    }
    .collectionHead > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .collectionHead > .backWrap > .back{
        margin: 0.29rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .collectionHead > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.92rem;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
    }
    .collectionHead > .clearAll{
        position: absolute;
        right: 0.20rem;
        top:0;
        width: 1.00rem;
        height: 100%;
        line-height: 1.00rem;
        font-size: 0.30rem;
        text-align: right;
        color: rgb(102, 102, 102);
    }
    .listWrap{
        width: 100%;
        height: 9.75rem;
        margin: 0.92rem 0 0 0;
        overflow: hidden;
        overflow-y: scroll;
    }
    .listWrap > .listContent{
        width: 100%;
        padding:0 0.20rem 0.20rem 0.20rem;
    }
    .listWrap > .listContent:after{
        display: block;
        content: '';
        clear: both;
    }
    .listWrap > .listContent > li{
        border-radius: 0.06rem;
        overflow: hidden;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0.01rem 0.04rem 0 rgba(6, 0, 1, 0.07);
        width: 2.9rem;
        height: 2.82rem;
        float: left;
        margin-top: 0.20rem;
        position: relative;
    }
    .listWrap > .listContent > li:nth-child(2n+1){
        margin-right: 0.18rem;
    }
    .listWrap > .listContent > li .imgWrap{
        background-color: rgb(197, 197, 197);
        width: 100%;
        height: 1.62rem;
        overflow: hidden;
    }
    .listWrap > .listContent > li .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .listWrap > .listContent > li > .describeWrap{
        width: 100%;
        height:0.54rem;
        padding: 0 0.15rem;
        box-sizing: border-box;
    }
    .listWrap > .listContent > li > .describeWrap > p{
        font-size: 0.29495rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        width: 100%;
        height: 0.54rem;
        line-height: 0.54rem;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dfdfdd;
    }
    .listWrap > .listContent > li > .cancelWrap{
        width: 100%;
        height: 0.65rem;
        padding: 0 0.15rem;
        line-height: 0.65rem;
    }

    .listWrap > .listContent > li > .cancelWrap > img{
        width: 0.24rem;
        height: 0.24rem;
        margin-top: 0.21rem;
    }
    .listWrap > .listContent > li > .cancelWrap > span{
        font-size: 0.20758rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        text-align: left;
    }

    .loading{
        padding-top: 0.10rem;
        width: 100%;
        text-align: center;
        height: 0.32rem;
        box-sizing: content-box;
        padding-bottom: 0.70rem;
        float: left;
    }
    .cover{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.49);
        padding: 0.20rem;
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
</style>
<script>
    export default{
        data(){
            return {
                dataList:[],                                             //数据列表
                dataInfo:{
                    size:8,
                    currentPage:1
                },
                scroll:'',                                               //卷上去的高度加上能看到的高度
                listWrapHeight:'',                                       //那么多列表一共占了多少高度
                allowLoad:true,                                          //判断是不是允许加载
                isLoading:true,                                          //正在加载
                showLoading:false,                                       //显示gif图
                searchNone:false,                                        //没有找到图片
                id:'',                                                    //要取消收藏的那个id
                type:'',                                                  //要取消收藏的那个类型
                showCover:false,                                         //要不要显示遮罩层
                errorTip:'',                                              //错误信息
                showErrorTip:false,                                          //要不要显示错误提示
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
            this.getList();                         //刚进来的时候请求一遍数据
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            //刚进来获取一次列表数据
            getList(){
                this.dataInfo.currentPage = 1;
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/collect/myCollectedCollecion.do`,
                    method:'get',
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 0){
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
                    }else {
                        this.dataList = response.data.data;    //收藏列表
                        if(this.dataList.length == 0){
                            this.searchNone = true;
                        }else {
                            this.searchNone = false;
                        }
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //上拉加载
            loadMore(){
                this.scroll = $(".listWrap")[0].scrollTop + $(".listWrap").innerHeight();
                this.listWrapHeight = $(".listContent")[0].clientHeight-5;
                if((this.scroll >= this.listWrapHeight) && (this.allowLoad == true)){
                    this.isLoading =false;
                    this.dataInfo.currentPage++;
                    this.showLoading = true;
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/collect/myCollectedCollecion.do`,
                        method:'get',
                        params:this.dataInfo
                    }).then((response) => {
                        console.log(response);
                        this.isLoading =true;
                        this.showLoading = false;
                        this.dataList = this.dataList.concat(response.data.data);  //收藏列表
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //取消收藏
            cancelCollect(id,type){
                this.id = id;
                this.type = type;
                this.showCover = true;
            },
            //点击确认之后取消收藏
            confirmCancel(){
                console.log(this.id+this.type);
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/collect/notCollectCollection.do`,
                    method:"GET",
                    params:{
                        id:this.id,
                        collectionType:this.type
                    }
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.showErrorTip = true;
                        this.showCover = false;
                        this.errorTip = response.data.data;
                        this.dataInfo.currentPage = 1;          //重新请求第一页
                        this.getList();                         //再重新请求一次
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                        },3000);
                    }else {
                        this.showErrorTip = true;
                        this.showCover = false;
                        this.errorTip = response.data.data;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                        },3000);
                    }
                })
            },
            //点击取消按钮
            noConfirm(){
                this.showCover = false;
            },
            //跳转到详情页
            leapDetail(id){
                this.$router.push({path:"scrollMode",query:{id:id}});
            }
        },
        created(){

        },
        mounted(){
            //监测上拉加载
            if(this.isLoading){
                $(".listWrap")[0].addEventListener('scroll',this.loadMore);
            }
        }
    }
</script>