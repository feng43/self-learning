<template>
    <div>
        <div class="headWrap">
            <div class="header">
                <div class="back" @click="goBack()">
                    <img src="../../static/images/bowuguan_detail_back.png" alt="">
                </div>
                <h3 class="title">
                    <span>吉林故事</span>
                </h3>
            </div>
            <!--导航-->
            <div class="tab swiper-container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" :data="item.id" :class="{active:tab == index}" @click="changeTab(index,$event)" v-for="(item,index) in classInfo">{{item.categoryName}}</li>
                </ul>
            </div>
        </div>
        <!--内容-->
        <div class="content">
            <div class="listWrap">
                <div class="list" v-for="item in showList" @click="goDetail(item.id)">
                    <div class="imgWrap">
                        <img :src="item.picUrl" alt="">
                    </div>
                    <p>{{item.headline}}</p>
                </div>
                <div class="showLoading" v-show="showLoading">
                    <p>正在加载中.....</p>
                </div>
                <div class="searchNone" v-show="showSearchNone">
                    <img src="../../static/images/searchNone.png" alt="" style="width: 100%;margin-top: 0.50rem;">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tab:0,                //刚进来的时候默认显示第一个tab
                showList:[],          //显示在页面上的列表
                newList:[],           //上拉加载到的新的数据
                classInfo:[],         //分类信息
                allDataArr:[],        //所有的数据的总集合

                historyStoryList:[],  //历史大记事
                cultureList:[],       //文化走廊
                historyPerson:[],     //历史名人
                scenicList:[],        //旅游景点
                dataInfo:{
                    type:1,
                    currentPage:1,
                    size:3
                },
                allowLoad:true,       //允许上拉加载
                showSearchNone:false, //先不显示没有找到数据
                scroll:'',             //列表包裹层被卷上去的高度加上列表显示的高度
                listWrapHeight:"",     //列表内包裹层的高度
                isLoading:false,      //正在加载
                showLoading:false,    //显示正在加载gif
                currentId:"",          //点中的那个tab对应的id
                pageInfo:[],           //页数的数组，是否允许加载,是不是第一次加载的信息
            }
        },
        created(){
            //获取分类信息
            this.getClassInfo();

            //进来的时候加载第一页
            this.getList();
        },
        updated(){

        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            //初始化swiper
            swiperInit(){
                let mySwiper = new Swiper('.tab', {
                    slidesPerView: 3.5,
                    freeMode: true,
                    preventClicks:false,
                    observer:true
                });
            },
            //tab切换
            changeTab(num,e){
                this.tab = num;                                              //点击的是第几个，从0开始计算
                this.dataInfo.type = parseInt($(e.target).attr("data"));     //参数，拿到对应的ID
                this.allowLoad = this.pageInfo[this.tab].allowLoad;         //这个页是不是还允许上拉加载
                $(".content")[0].scrollTop = 0;                              //scrollTop变成0，滚到最顶端
                if(this.pageInfo[this.tab].isFirstLoad == true){           //是第一次加载的话就加载一次，否则的话只是显示，不再做加载
                    this.dataInfo.currentPage = 1;                           //把参数的页数变成第一页
                    this.getList();
                }else {
                    this.showList = this.allDataArr[this.tab];
                    if(this.showList.length == 0){
                        this.showSearchNone = true;
                    }else {
                        this.showSearchNone = false;
                    }
                }
            },
            //获取吉林故事分类信息
            getClassInfo(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/story/getStoryCategories.do`,
                    method:"GET",
                    params:""
                }).then((response) => {
                    console.log(response);
                    this.classInfo = response.data.data;
                    for(let i = 0; i < this.classInfo.length;i++){
                        this.pageInfo.push({
                            currentPage:1,                //当前页
                            allowLoad:true,              //允许继续加载
                            isFirstLoad:true,            //是不是第一次加载
                            array:i,                     //第几个数组
                        })
                    }
//                    console.log(this.pageInfo);        //看一个页数信息等数据
                }).catch((error) => {
                    console.log(error);
                })
            },
            //加载第一页数据
            getList(){
                console.log(this.dataInfo);
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/story/getStories.do`,
                    method:"GET",
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.allDataArr[this.tab] = response.data.data;                          //拿到加载的数据
                        this.showList = this.allDataArr[this.tab];                              //数据加到对应的数组
                        this.pageInfo[this.tab].isFirstLoad = false;                            //将这个的是第一次加载变为false
                        //判断是不是允许继续加载
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.pageInfo[this.tab].allowLoad = true;                            //当前页是不是小于总的页数小于的话允许上拉加载
                            this.allowLoad = this.pageInfo[this.tab].allowLoad;                                  //做判断的那个allowLoad也更新
                        }else {
                            this.pageInfo[this.tab].allowLoad = false;
                            this.allowLoad = this.pageInfo[this.tab].allowLoad;                                  //做判断的那个allowLoad也更新
                        }
                        //判断是不是显示searchNone
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
                this.scroll = $(".content")[0].scrollTop + $(".content").innerHeight();
                this.listWrapHeight = $(".listWrap")[0].clientHeight - 5;
                if((this.scroll >= this.listWrapHeight) && (this.allowLoad == true)){
                    this.isLoading = true;
                    this.pageInfo[this.tab].currentPage++;                              //对应的数据的列表当前页+1
                    this.dataInfo.currentPage = this.pageInfo[this.tab].currentPage++; //传给后台的数据变成对应的数据的列表当前页
                    this.showLoading = true;
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/story/getStories.do`,
                        method:"GET",
                        params:this.dataInfo
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == 1){
                            this.isLoading = false;
                            this.showLoading = false;
                            this.allDataArr[this.tab] = this.allDataArr[this.tab].concat(response.data.data);        //拼接上
                            this.showList = this.allDataArr[this.tab];                                               //显示列表更新
                            if(response.data.page.currentPage < response.data.page.totalPage){
                                this.pageInfo[this.tab].allowLoad = true;                                            //当前页是不是小于总的页数小于的话允许上拉加载
                                this.allowLoad = this.pageInfo[this.tab].allowLoad;                                  //做判断的那个allowLoad也更新
                            }else {
                                this.pageInfo[this.tab].allowLoad = false;
                                this.allowLoad = this.pageInfo[this.tab].allowLoad;                                  //做判断的那个allowLoad也更新
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //跳转到详情页
            goDetail(id){
                this.$router.push({path:'StoryDetail',query:{id:id}});
            },
        },
        mounted(){
            //进来的时候初始化swiper
            this.swiperInit();

            if(!this.isLoading){
                $(".content")[0].addEventListener('scroll',this.loadMore);
            }
        }
    }
</script>
<style scoped>
    .headWrap{
        width: 100%;
        height: 1.70rem;
        position: fixed;
        background: #fff;
        top:0;
        left:0;
        z-index: 999;
    }
    .header {
        width: 100%;
        height: 0.90rem;
        background: #a92124;
    }
    .header > .back{
        width: 0.60rem;
        height: 100%;
        padding: 0 0 0 0.20rem;
        float: left;
        line-height: 0.90rem;
    }
    .header > .back >img{
        width: 0.19rem;
        height: 0.35rem;
        vertical-align: middle;
    }
    .header > .title{
        font-size: 0.30rem;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 0.90rem;
    }
    .header > .title > span{
        margin-left: -0.60rem;
    }
    .tab{
        width: 100%;
        overflow: hidden;
        height: 0.80rem;
        line-height: 0.80rem;
    }
    .tab > ul{
        width: 113%;
    }
    .tab > ul:after{
        content: '';
        display: block;
        clear: both;
    }
    .tab > ul > li{
        width: 25%;
        float: left;
        padding-left: 0.31rem;
        font-size: 0.26rem;
        color: rgb(51, 51, 51);
        border-bottom: 0.01rem solid #dcdcdc;
    }
    .tab > ul > li.active{
        color: #a92123;
        border-bottom: 0.04rem solid #a92123;
    }
    .content{
        width: 100%;
        padding: 0 0.31rem;
        margin:1.7rem 0 0.97rem 0;
        height: 8.65rem;
        overflow-y: scroll;
    }
    .content > .listWrap > .list{
        box-shadow: 0 0 0.04rem 0 rgba(102, 102, 102, 0.4);
        width: 100%;
        height: 3.97rem;
        border-radius: 0.04rem;
        overflow: hidden;
        margin-top: 0.20rem;
        background: #fff;
    }
    .content > .listWrap > .list:nth-child(1){
        margin-top: 0.25rem;
    }
    .content > .listWrap > .list > .imgWrap{
        width: 100%;
        height: 3.31rem;
        background: #f2f2f2;
    }
    .content > .listWrap > .list > .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .content > .listWrap > .list > p{
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