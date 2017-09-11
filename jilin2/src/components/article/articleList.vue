<template>
    <div class="articleWrap">
        <div class="fixTop">
            <div class="activityHead">
                <div class="backWrap" @click="goBack()">
                    <img class="back" src="../../static/images/bowuguan_detail_back.png" alt="">
                </div>
                <h2 class="title">文创产品</h2>
            </div>
            <div class="navWrap swiper-container">
                <!--导航-->
                <ul class="navUl swiper-wrapper">
                    <li class="swiper-slide navLi" :data="navItem.id" :class="{activeNav:tab == index}" v-for="(navItem,index) in navList" @click="tabChange(index,$event)">{{navItem.categoryName}}</li>
                </ul>
            </div>
            <div class="line"></div>
        </div>
        <div class="contentListWrap" id="listWrap">
            <div class="list">
                <ul class="first">
                    <li v-for="item in leftList" @click="leapToDetail(item.id)">
                        <img :src="item.pictureUrl" alt="">
                        <div class="describe">
                            <p class="title">{{item.productName}}</p>
                            <p class="price">{{item.productPrice | currency}}</p>
                        </div>
                    </li>
                </ul>
                <ul class="second">
                    <li v-for="item in rightList" @click="leapToDetail(item.id)">
                        <img :src="item.pictureUrl" alt="">
                        <div class="describe">
                            <p class="title">{{item.productName}}</p>
                            <p class="price">{{item.productPrice}}</p>
                        </div>
                    </li>
                </ul>
                <div class="searchNone" v-show="showSearchNone">
                    <img src="../../static/images/searchNone.png" alt="">
                </div>
            </div>
            <div class="loading" v-show="isLoading">
                <img src="../../static/images/login.gif">
            </div>
        </div>
    </div>
</template>
<style scoped>
    .articleWrap{
        background: #f2f2f2;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .fixTop{
        width: 100%;
        height:1.61rem;
        box-sizing: border-box;
        position: fixed;
        top:0;
        left: 0;
    }
    .line{
        width: 100%;
        height: 0.02rem;
        background: #dfdfdd;
        position: absolute;
        bottom: 0.01rem;
        left: 0;
    }
    .activityHead{
        width: 100%;
        height: 0.81rem;
        line-height: 0.80rem;
        background: #a92124;
        border-bottom: 0.01rem solid #dfdfdd;
        box-sizing: border-box;
    }
    .activityHead .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .activityHead .back{
        margin: 0.225rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .activityHead .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.80rem;
        color: rgb(255, 255, 255);
        font-size: 0.30rem;
        font-weight: 500;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .navWrap{
        width: 100%!important;
        height: 0.80rem;
        padding-left: 0.20rem;
        box-sizing: border-box;
        background: #fff;
    }
    .navWrap > .navUl{
        width: 18.00rem!important;
        height: 0.80rem;
    }
    .navWrap > .navUl > .navLi{
        width: 9.00% !important;
        height: 0.80rem;
        line-height: 0.80rem;
        box-sizing: border-box;
        font-size: 0.24rem;
        font-family: "PingFang";
        color: rgb(0, 0, 0);
        text-align: center;
    }
    .navWrap > .navUl > .navLi.activeNav{
        border-bottom: 0.04rem solid #a92124;
        line-height: 0.80rem;
        color: rgb(169, 33, 36);
    }
    .loading{
        text-align: center;
    }
    .loading > img{
        width: 0.32rem;
        height: 0.32rem;
    }
    .contentListWrap{
        width: 100%;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 0.15rem 0.20rem 0;
        position: absolute;
        top:1.61rem;
        left: 0;
        bottom: 0.96rem;
        right: 0;
    }
    .contentListWrap > .list{
        overflow: hidden;
    }
    .contentListWrap > .list > ul{
        width: 2.90rem;
        float: left;
    }
    .contentListWrap > .list > ul.first{
        margin-right: 0.20rem;
    }
    .contentListWrap > .list > ul > li{
        border-radius: 0.05rem;
        background-color: rgb(83, 83, 83);
        box-shadow: 0 0.07rem 0.13rem 0 rgba(6, 0, 1, 0.09);
        width: 100%;
        overflow: hidden;
        margin-bottom: 0.20rem;
    }
    .contentListWrap > .list > ul > li > img{
        width: 100%;
        vertical-align: middle;
    }
    .contentListWrap > .list > ul > li > .describe{
        width: 100%;
        height: 0.86rem;
        background: #fff;
    }
    .contentListWrap > .list > ul > li > .describe > p{
        height: 0.43rem;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 0.15rem;
        font-size: 0.26rem;
        font-family: "PingFang";
        box-sizing: border-box;
    }
    .contentListWrap > .list > ul > li > .describe > p.title{
        color: rgb(0, 0, 0);
        line-height: 0.50rem;
    }
    .contentListWrap > .list > ul > li > .describe > p.price{
        font-size: 0.20rem;
        color: rgb(169, 33, 36);
        font-weight: bold;
        line-height: 0.35rem;
    }
    .searchNone{
        width: 100%;
        padding-top: 0.20rem;
    }
    .searchNone > img{
        width: 100%;
    }
</style>
<script>
    export default{
        data(){
            return {
                tab: 0,                                        //点击的是第几个导航
                isLoading:false,                              //正在加载loading
                navList:[],                                   //导航列表
                pageInfo:[],                                  //页面的信息，包括当前页，是不是允许继续加载，是不是第一次加载，第几个数组
                allDataList:[],                               //总的数据列表
                dataParams:{                                  //传给后台的参数
                    currentPage:1,
                    size:10,
                    id:1
                },
                showList:[],                                 //显示在页面上的列表
                leftList:[],                                 //瀑布流左边的列表
                rightList:[],                                //瀑布流右边的列表
                showSearchNone:false,                       //没有对应的数据的时候显示
                allowLoad:true,                             //用于判断是不是可以上拉加载
                scroll:0,                                   //被卷上的高度加上能看到的高度
                listWrapHeight:0,                           //列表的总高度
                leftHeight:0,                               //左边列表的高度
                rightHeight:0,                              //右边列表的高度
                dataList:{

                }
            }
        },
        created(){
            //获取导航信息
            this.getNavList();
        },
        mounted(){
            //进来的时候初始化swiper
            this.swiperInit();
            //监听滚轮事件做上拉加载
            if(!this.isLoading){
                $(".contentListWrap")[0].addEventListener('scroll',this.loadMore);
            }
        },
        updated(){

        },
        activated(){
            this.getList();
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            //初始化swiper
            swiperInit(){
                let mySwiper = new Swiper('.navWrap', {
                    slidesPerView: 3.8,
                    freeMode: true,
                    preventClicks:false,
                    observer:true
                });
            },
            //请求nav列表
            getNavList(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/wenchang/getCategories.do`,
                    method:"GET",
                    params:{}
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.navList = response.data.data;
                        for(let i = 0;i < this.navList.length;i++){
                           this.pageInfo.push({
                               currentPage:1,                 //当前要加载第几页数据
                               allowLoad:true,               //是不是允许继续加载
                               isFirstLoad:true,             //是不是第一次加载
                               array:i                       //第几个数组
                           });
                        }
//                        console.log(this.pageInfo);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //点击tab切换
            tabChange(index,e){
                this.tab = index;                                                    //标记选中了哪个nav
                this.dataParams.id = $(e.target).attr("data");                       //拿到选中的那个id，传给后台
                this.allowLoad = this.pageInfo[this.tab].allowLoad;                 //是不是允许加载换成当前状态
                $(".contentListWrap")[0].scrollTop = 0;                              //列表返回顶部
                if(this.pageInfo[this.tab].isFirstLoad == true){                    //说明这是第一次加载，请求第一次加载的方法
                    this.dataParams.currentPage = this.pageInfo[index].currentPage; //传给后台需要加载第几页数据
                    this.getList();                                                 //请求数据
                }else {
                    this.showList = this.allDataList[index];                        //否则的话就显示选中的那个列表
                    this.pullFun();                                                 //瀑布流调用一下
                    if(this.showList.length == 0){
                        this.showSearchNone = true;
                    }else {
                        this.showSearchNone = false;
                    }
                }
            },
            //获取列表数据
            getList(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/wenchang/getWenChuangs.do`,
                    method:"get",
                    params:this.dataParams
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.allDataList[this.tab] = response.data.data;                    //拿到加载的数据，放到总列表中
                        this.showList = this.allDataList[this.tab];                        //显示列表显示拿到的那个数据
                        this.pullFun();                                                     //调用一下瀑布流
                        this.pageInfo[this.tab].isFirstLoad = false;                       //证明不是第一次加载了，再点的时候就不用加载了
                        //判断是不是允许继续加载
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.pageInfo[this.tab].allowLoad = true;                                //允许上拉加载
                            this.allowLoad = this.pageInfo[this.tab].allowLoad;                      //用于做判断的那个allowLoad也更新一下
                        }else {
                            this.pageInfo[this.tab].allowLoad = false;                               //不允许上拉加载
                            this.allowLoad = this.pageInfo[this.tab].allowLoad;                      //用于做判断的那个allowLoad也更新一下
                        }
                        //判断searchNone是不是要显示
                        if(this.showList.length == 0){
                            this.showSearchNone = true;
                        }else {
                            this.showSearchNone = false;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //上拉加载
            loadMore(){
                this.scroll = $(".contentListWrap")[0].scrollTop + $(".contentListWrap").innerHeight();  //被卷上去的高度+能看到的高度
                this.listWrapHeight = $(".list")[0].clientHeight-5;                                      //列表的总高度
                if((this.scroll > this.listWrapHeight) && (this.allowLoad == true)){
                    this.isLoading = true;                                                               //显示正在加载loading
                    this.pageInfo[this.tab].currentPage++;                                               //请求的当前页+1
                    this.dataParams.currentPage = this.pageInfo[this.tab].currentPage;                  //发给后台的参数请求变成当前的当前的那个

                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/wenchang/getWenChuangs.do`,
                        method:"get",
                        params:this.dataParams
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == 1){
                            this.isLoading = false;
                            this.allDataList[this.tab].concat(response.data.data);                       //拼接到对应的数组里边
                            this.showList = this.allDataList[this.tab];                                  //显示列表对应的更新一下
                            this.pullFun();                                                               //调用一下瀑布流显示
                            if(response.data.page.currentPage < response.data.page.totalPage){
                                this.pageInfo[this.tab].allowLoad = true;                                //允许上拉加载
                                this.allowLoad = this.pageInfo[this.tab].allowLoad;                      //用于做判断的那个也更新一下
                            }else {
                                this.pageInfo[this.tab].allowLoad = false;                               //允许上拉加载
                                this.allowLoad = this.pageInfo[this.tab].allowLoad;                      //用于做判断的那个也更新一下
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //跳转到详情页
            leapToDetail(id){
                this.detailData = {
                    dataList:this.showList,
                    id:id
                };
                this.$store.dispatch('getArticleList',this.detailData);
                this.$router.push({path:"wenchuang_detail",query:{id:id}});
            },
            //瀑布流方法
            pullFun(){
                this.leftList = [];                                                  //瀑布流左边的列表清空一下
                this.rightList = [];                                                 //瀑布流右边的列表清空一下
                this.leftHeight = 0;
                this.rightHeight = 0;                                                //将高度都清零之后重新计算
                for(var i = 0;i < this.showList.length;i++){
                    if(this.leftHeight <= this.rightHeight){
                        this.leftHeight += parseInt(145 * this.showList[i].picHeight / this.showList[i].picWidth) + 53;
                        this.leftList.push(this.showList[i]);
                    }else {
                        this.rightHeight += parseInt(145 * this.showList[i].picHeight / this.showList[i].picWidth) + 53;
                        this.rightList.push(this.showList[i]);
                    }
                }
            }
        },
        //过滤器
        filters:{
            currency:function (value) {
                if(!value){
                    return "";
                }else {
                    value = "¥" + value;
                    return value;
                }
            }
        }
    }
</script>