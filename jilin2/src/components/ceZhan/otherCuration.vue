<template>
    <div class="contentCurationOther">
        <div class="titleWrap">
            <div class="backWrap" @click="goRouter('back','','')">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title"><span style="margin-left: 1.10rem;color: rgb(168, 32, 35);">“</span><h3>{{userName}}</h3><span style="color: rgb(168, 32, 35);">”</span><span>的策展</span></h2>
        </div>
        <div class="contentWrap">
            <div class="listWrap">
                <div class="content" v-for="item in listArr">
                    <div class="imgContent" @click="goRouter('detail','CurationDetail',item.id)">
                        <img :src="item.imgSrc" alt="">
                    </div>
                    <div class="name">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="delWrap">
                        <div class="eye">
                            <img src="../../static/images/eye_hui.png" alt="">
                            {{item.viewCounts}}
                        </div>
                    </div>
                </div>
                <div class="searchNone" v-if="searchNone">
                    <img src="../../static/images/curationSearchNone.png" alt="">
                </div>
            </div>
            <div class="isLoading" v-show="isLoading">
                <img src="../../static/images/login.gif" alt="">
            </div>
        </div>
        <!--错误信息-->
        <transition name="fadeIn">
            <p class="error" v-show="showErrorMsgTip">{{errorMsg}}</p>
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
    .contentCurationOther{
        background: #f2f2f2;
    }
    .titleWrap {
        width: 100%;
        height: 0.92rem;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        top:0;
        background: #a92124;
        z-index: 999;
        border-bottom: 0.02rem solid rgb(238, 238, 238);
    }
    .titleWrap > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .titleWrap > .backWrap > .back{
        margin: 0.29rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .titleWrap > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.92rem;
        color: rgb(255, 255, 255);
        font-size: 0.34rem;
        font-weight: 600;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .titleWrap > .title > h3{
        float: left;
        max-width: 1.65rem;
        height: 0.90rem;
        line-height: 0.90rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: rgb(255, 255, 255);
        font-size: 0.34rem;
        font-weight: 600;
        padding: 0;
    }
    .titleWrap > .title > span{
        font-size: 0.34rem;
        color: rgb(255, 255, 255);
        float: left;
        margin: 0;
        padding: 0;
    }
    /*列表wrap*/
    .contentWrap{
        width: 100%;
        height: 10.43rem;
        margin-top: 0.92rem;
        padding: 0.20rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .contentWrap > .listWrap{
        width: 100%;
    }
    .contentWrap > .listWrap > .content{
        width: 2.90rem;
        height: 2.82rem;
        float: left;
        border-radius: 0.06rem;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 0.01rem 0.04rem 0 rgba(6, 0, 1, 0.07);
        overflow: hidden;
    }
    .contentWrap > .listWrap:after{
        display: block;
        content: "";
        clear: both;
    }
    .contentWrap > .listWrap > .content:nth-child(2n+1){
        margin-right: 0.20rem;
    }
    .contentWrap > .listWrap > .content > .imgContent{
        background-color: rgb(242, 242, 242);
        width: 2.90rem;
        height: 1.62rem;
        overflow: hidden;
        position: relative;
    }
    .contentWrap > .listWrap > .content > .imgContent > img{
        width: 100%;
        height:100%;
        object-fit: cover;
    }
    .contentWrap > .listWrap > .content > .name{
        width: 100%;
        height: 0.54rem;
        padding:0 0.15rem;
        box-sizing: border-box;
    }
    .contentWrap > .listWrap > .content > .name > p{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        line-height: 0.53rem;
        border-bottom: 0.01rem solid #dfdfdd;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.29495rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
    }
    .contentWrap > .listWrap > .content > .delWrap{
        width: 100%;
        height: 0.66rem;
        padding:0 0.15rem;
        box-sizing: border-box;
    }
    .contentWrap > .listWrap > .content > .delWrap > .eye{
        width: 50%;
        height: 0.66rem;
        float: left;
        font-size: 0.20758rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        font-weight: bold;
        line-height: 0.66rem;
    }
    .contentWrap > .listWrap > .content > .delWrap > .eye > img{
        width: 0.30rem;
        height: 0.18rem;
        margin-top: 0.24rem;
    }
    .contentWrap > .listWrap > .searchNone{
        width: 100%;
        padding-top: 0.40rem;
    }
    .contentWrap > .listWrap > .searchNone > img{
        width: 100%;
    }
    .contentWrap > .isLoading{
        width: 100%;
        text-align: center;
    }

</style>
<script>
    export default{
        data(){
            return {
                listArr:[],                                        //数据数组
                allowLoad:true,                                   //为true的时候允许上拉加载
                searchNone: false,                                //没有数据的时候显示图片
                isLoading:false,                                  //正在加载中
                dataInfo:{                                         //需要传给后台的参数
                    userId:"",
                    currentPage:1,
                    size:10
                },
                scrollTop:"",                                      //卷上去的高度和能看到的高度之和
                wrapHeight:"",                                     //列表的高度
                showErrorMsgTip:false,                            //显示错误提示遮罩
                errorMsg:"",                                       //错误信息
                userName:"",                                       //用户的名字
            }
        },
        methods:{
            goRouter(str,path,params){
                switch (str){
                    case "back":
                        this.$router.back();
                        break;

                    case "detail":
                        this.$router.push({path:path,query:{id:params}});
                        break;
                }
            },
            getData(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getUserCurations.do`,
                    method:"GET",
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.listArr = response.data.data;
                        this.userName = response.data.data[0].userName;
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                        if(this.listArr.length == 0){
                            this.searchNone = true;
                        }else {
                            this.searchNone = false;
                        }
                    }else{
                        this.showErrorMsgTip = true;
                        this.errorMsg = response.data.data;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                            that.errorMsg = "";
                        },2000);
                        return;
                    }
                    //判断有没有数据
                    //判断是不是允许上拉加载
                }).catch((error) => {
                    console.log(error);
                })
            },
            loadMore(){
                this.scrollTop = $(".contentWrap")[0].scrollTop + $(".contentWrap").innerHeight();
                this.wrapHeight = $(".listWrap")[0].clientHeight+20;
                if((this.scrollTop >= this.wrapHeight) && (this.allowLoad == true)){
                    console.log(111);
                    this.dataInfo.currentPage++;
                    this.isLoading = true;
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getUserCurations.do`,
                        method:"GET",
                        params:this.dataInfo
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == 1){
                            this.listArr = this.listArr.concat(response.data.data);
                            if(response.data.page.currentPage < response.data.page.totalPage){
                                this.allowLoad = true;
                            }else {
                                this.allowLoad = false;
                            }
                        }else{
                            this.showErrorMsgTip = true;
                            this.errorMsg = response.data.data;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                                that.errorMsg = "";
                            },2000);
                            return;
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
        },
        activated(){
            this.$store.dispatch('hideHeader');                //需要隐藏底部的栏
            this.getData();                                    //获取第一页信息
            this.dataInfo.userId = this.$route.query.id;      //获取到传过来的id
        },
        mounted(){
            if(!this.isLoading){
                $(".contentWrap")[0].addEventListener('scroll',this.loadMore);
            }
        }
    }
</script>