<template>
    <div class="contentCuration">
        <div class="titleWrap">
            <div class="backWrap" @click="goRouter('back','','')">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title">我的策展</h2>
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
                        <div class="del" @click="askIfDel(item.id)">
                            <img src="../../static/images/del_curation.png" alt="">删除
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
        <transition name="fadeIn">
            <div class="coverWrap" v-show="showCover">
                <div class="cover">
                    <div class="headTitle">
                        <p>提示</p>
                    </div>
                    <div class="coverContent">
                        <p>是否删除?</p>
                        <div class="btnWrap">
                            <div class="btn cancel" @click="cancelDel()">取消</div>
                            <div class="btn confirm" @click="confirmDel()">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="errorTipMsg" v-show="showErrorTip">{{errorTip}}</div>
    </div>
</template>
<style scoped>
    /*动画*/
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
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
        z-index: 999;
    }
    /*遮罩*/
    .coverWrap{
        position: fixed;
        width: 100%;
        height: 2.68rem;
        left: 0;
        top:50%;
        padding: 0 0.20rem;
        box-sizing: border-box;
        margin-top: -1.34rem;
        z-index: 999;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .cover{
        width: 100%;
        height: 2.68rem;
        background: #fff;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .cover > .headTitle{
        width: 100%;
        height: 0.78rem;
        background: #a92123;
    }
    .cover > .headTitle > p{
        font-size: 0.28rem;
        font-family: "PingFang";
        color: rgba(255, 255, 255, 0.902);
        line-height: 0.78rem;
        padding-left: 0.25rem;
        box-sizing: border-box;
    }
    .cover > .coverContent{
        width: 100%;
        height: 1.90rem;
        padding-top: 0.35rem;
        box-sizing: border-box;
    }
    .cover > .coverContent > p{
        padding-left: 0.25rem;
        box-sizing: border-box;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(1, 0, 0);
    }
    .btnWrap{
        width: 100%;
        height: 1.10rem;
        padding-top: 0.40rem;
    }
    .btnWrap > .btn{
        float: right;
        border-radius: 0.05rem;
        width: 0.94rem;
        height: 0.48rem;
        text-align: center;
        font-size: 0.22rem;
        font-family: "PingFang";
        line-height: 0.48rem;
    }
    .btnWrap > .confirm{
        background-color: rgb(169, 33, 35);
        color: rgb(255, 255, 255);
        margin-right: 0.33rem;
    }
    .btnWrap > .cancel{
        border:0.01rem solid rgb(223, 223, 221);
        border-radius: 0.05rem;
        background-color: rgba(242, 242, 242, 0);
        margin-right: 0.63rem;
    }
    .contentCuration{
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
        font-size: 0.30rem;
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
        color: rgb(168, 32, 35);
        font-size: 0.34rem;
        font-weight: 600;
        padding: 0;
    }
    .titleWrap > .title > span{
        font-size: 0.34rem;
        color: rgba(51, 51, 51, 0.89);
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
        margin-bottom: 0.20rem;
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
        line-height: 0.60rem;
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
        line-height: 0.72rem;
    }
    .contentWrap > .listWrap > .content > .delWrap > .eye > img{
        width: 0.30rem;
        height: 0.18rem;
        margin-top: 0.24rem;
    }
    .contentWrap > .listWrap > .content > .delWrap > .del{
        width: 50%;
        height: 0.66rem;
        float: right;
        font-size: 0.20758rem;
        font-family: "PingFang";
        color: rgb(171, 32, 37);
        text-align: right;
        line-height: 0.72rem;
    }
    .contentWrap > .listWrap > .content > .delWrap > .del > img{
        width: 0.18rem;
        height: 0.22rem;
        margin-top: 0.22rem;
        margin-right: 0.08rem;
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
                    currentPage:1,
                    size:10
                },
                scrollTop:"",                                      //卷上去的高度和能看到的高度之和
                wrapHeight:"",                                     //列表的高度
                delId:'',                                          //要删除的那个id
                showCover:false,                                  //遮罩隐藏
                showErrorTip:false,                               //错误提示信息显示还是隐藏
                errorTip:'',                                      //错误提示信息
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
                this.dataInfo.currentPage = 1;
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getMyCurations.do`,
                    method:"GET",
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == -1){
                        this.errorTip = "登录过期，请重新登录";
                        this.showErrorTip = true;
                        let that = this;
                        setTimeout(function () {
                           that.showErrorTip = false;
                            this.errorTip = "";
                        },2000);
                        return;
                    }else if(response.data.success == 0){
                        this.errorTip = response.data.data;
                        this.showErrorTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                            this.errorTip = "";
                        },2000);
                        return;
                    }else if(response.data.success == 1){
                        this.listArr = response.data.data;          //拿到数据列表
                        if(response.data.page.currentPage < response.data.page.totalPage){                   //判断当前页和总页数的关系
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                        if(this.listArr.length == 0){                                                      //判断策展列表是不是空的
                            this.searchNone = true;
                        }else {
                            this.searchNone = false;
                        }
                    }
                    //判断有没有数据
                    //判断是不是允许上拉加载
                }).catch((error) => {
                    console.log(error);
                })
            },
            //上拉加载更多
            loadMore(){
                this.scrollTop = $(".contentWrap")[0].scrollTop + $(".contentWrap").innerHeight();
                this.wrapHeight = $(".listWrap")[0].clientHeight+20;
                if((this.scrollTop >= this.wrapHeight) && (this.allowLoad == true)){
                    console.log(111);
                    this.dataInfo.currentPage++;
                    this.isLoading = true;
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/getMyCurations.do`,
                        method:"GET",
                        params:this.dataInfo
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == -1){
                            this.errorTip = "登录过期，请重新登录";
                            this.showErrorTip = true;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorTip = false;
                                this.errorTip = "";
                            },2000);
                            return;
                        }else if(response.data.success == 0){
                            this.errorTip = response.data.data;
                            this.showErrorTip = true;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorTip = false;
                                this.errorTip = "";
                            },2000);
                            return;
                        }else if(response.data.success == 1){
                            this.listArr = this.listArr.concat(response.data.data);          //拿到数据列表
                            if(response.data.page.currentPage < response.data.page.totalPage){                   //判断当前页和总页数的关系
                                this.allowLoad = true;
                            }else {
                                this.allowLoad = false;
                            }
                            if(this.listArr.length == 0){                                                      //判断策展列表是不是空的
                                this.searchNone = true;
                            }else {
                                this.searchNone = false;
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //点击删除询问是不是要删除
            askIfDel(id){
                this.showCover = true;
                this.delId = id;
            },
            //确认删除
            confirmDel(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/curation/deleteCuration.do`,
                    method:"GET",
                    params:{
                        id:this.delId
                    }
                }).then((response) => {
                    console.log(response);
                    //成功之后遮罩隐藏，然后把id还原
                    if(response.data.success == 1){
                        this.showCover = false;
                        this.errorTip = "删除成功";
                        this.showErrorTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                            this.errorTip = "";
                        },2000);
                        this.getData();                       //重新请求列表
                        return;
                    }else{
                        this.errorTip = response.data.data;
                        this.showErrorTip = true;
                        this.showCover = false;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorTip = false;
                            this.errorTip = "";
                        },2000);
                        return;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //取消删除
            cancelDel(){
                this.showCover = false;
                this.delId = "";
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');         //需要隐藏底部的栏
            this.getData();                             //获取第一页信息
        },
        mounted(){
            if(!this.isLoading){
                $(".contentWrap")[0].addEventListener('scroll',this.loadMore);
            }
        }
    }
</script>