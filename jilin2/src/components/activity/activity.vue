<template>
    <div class="content">
        <!--头部的那一堆筛选和返回键-->
        <div class="fixedTop">
            <div class="activityHead">
                <div class="backWrap" @click="goBack()">
                    <img class="back" src="../../static/images/bowuguan_detail_back.png" alt="">
                </div>
                <h2 class="title">活动</h2>
                <div class="calendar" @click="getDate()">
                    <img src="../../static/images/calendar.png" alt="">
                </div>
            </div>
            <div class="checkTile">
                <div class="condition" @click="showListCity()">
                    <span class="checkName" :class="{checkNameActive:showCityList}">{{addressTitle}}</span>
                    <i class="arrowDown" :class="{rotateActive:showCityList}"></i>

                </div>
                <div class="condition" @click="showTypeRight()">
                    <span class="checkName" :class="{checkNameActive:showType}">{{categoryTitle}}</span>
                    <i class="arrowDown" :class="{rotateActive:showType}"></i>
                </div>
                <!--城市和博物馆列表-->
                <transition name="fadeIn">
                    <div class="addressWrap" v-show="showCityList">
                        <ul class="cityList">
                            <li class="cityName cityNameAll" :class="{cityNameActive:cityIndex == -1}" @click="checkAllCity()">全部</li>
                            <li class="cityName" :class="{cityNameActive:index == cityIndex}" v-for="(cityName,index) in cityListArr" @click="checkCity(cityName,index)">{{cityName.cityName}}</li>
                        </ul>
                        <ul class="museumList" v-show="showMuseumList">
                            <!--<li class="museumName" :class="{museumNameActive:museumIndex == -1}" @click="checkAllMuseum()">全部<i v-show="museumIndex == -1" class="right"></i></li>-->
                            <li class="museumName"></li>
                            <li class="museumName" :class="{museumNameActive:index == museumIndex}" v-for="(museum,index) in museumListArr" @click="checkMuseum(museum,index)">{{museum.name}}<i v-show="index == museumIndex" class="right"></i></li>
                        </ul>
                    </div>
                </transition>
                <!--类别-->
                <transition name="fadeType">
                    <div class="typeWrap" v-show="showType">
                        <ul>
                            <li class="activeTitle">活动种类</li>
                            <li :class="{checked:typeIndex == -1}" @click="checkTypeAll()">全部<i v-show="typeIndex == -1" class="right checked"></i></li>
                            <li v-for="(activityName,index) in typeListArr" :class="{checked:typeIndex == index}" @click="checkType(activityName,index)"><span>{{activityName.categoryName}}</span><i v-show="typeIndex == index" class="right checked"></i></li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
        <!--遮罩-->
        <transition name="coverBlack">
            <div class="cover" v-show="showType || showCityList"></div>
        </transition>
        <!--列表-->
        <div class="listWrap">
            <div class="listWrapBig">
                <div class="list" v-for="actList in activeList" @click="goDetail(actList.id)">
                    <div class="img">
                        <img :src="actList.pictureThumb" alt="">
                    </div>
                    <p>{{actList.activityName}}</p>
                </div>
                <div class="loading" v-if="showLoading">
                    <img src="../../static/images/login.gif" alt="">
                </div>
                <img class="searchNone" v-if="searchNone" src="../../static/images/searchNone.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
//    import picker1 from "../../static/js/mui.picker.min";
    export default{
        data(){
            return{
                isLoading:true,              //是不是正在加载数据
                addressTitle:"地 区",         //地区的选择按钮提示
                categoryTitle:"类 别",        //类别的选择按钮提示
                activeList:[],                //列表的数组
                showCityList:false,          //开始的时候隐藏下拉筛选列表
                scrollTop:'',                 //当前滚动的坐标+可是区域的高度
                listWrapHeight:'',            //包含列表的总高度
                allowLoad:true,              //开始的时候是允许上拉加载的,为false不允许加载
                showType:false,              //开始的时候隐藏类型筛选列表
                isActiveCity:false,          //开始的时候地区筛选为黑色
                isActiveType:false,          //开始的时候种类筛选为黑色
                showMuseumList:false,        //开始的时候隐藏博物馆列表
                cityListArr:[],               //城市的列表数组
                museumListArr:[],             //对应城市下的博物馆的列表数组
                typeListArr:[],               //活动类型数组
                city:'',                      //选中了哪个城市
                museumId:'',                  //选中了哪个博物馆的id
                date:123,                      //选中了哪个日期
                typeId:'',                    //选中了哪个类型的id
                cityIndex:-1,                 //选中的那个城市的索引
                museumIndex:-2,               //选中的那个博物馆的索引
                typeIndex:-1,                 //选中的类型的索引
                searchNone:false,            //没有数据的时候显示的图片
                showLoading:false,           //隐藏gif动画
                dataInfo:{                    //传给后台的数据
                    currentPage:1,
                    size:8,
                    orgId:0,
                    activityCategory:0,
                    activityDate:"",
                }
            }
        },
        methods:{
            //返回键按钮
            goBack(){
                this.dataInfo.orgId = 0;
                this.dataInfo.activityCategory = 0;
                this.dataInfo.activityDate = "";
                this.$router.go(-1);
            },

            //获取城市和博物馆的数据列表和和活动类型
            getCityMuseumListInfo(){
                this.dataInfo.currentPage = 1;
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/activity/getActivities.do`,
                    method:"get",
                    params:this.dataInfo
                }).then((response) => {
                    console.log(response);
                    console.log(this.dataInfo);
                    this.cityListArr = response.data.data.orgList;                                       //城市和博物馆列表
                    this.typeListArr = response.data.data.categories;                                    //类型列表
                    this.activeList = response.data.data.activities;                                     //活动列表
                    //当前页小于总页数的时候允许继续加载
                    if(response.data.page.currentPage < response.data.page.totalPage){
                        this.allowLoad = true;
                    }else {
                        this.allowLoad = false;
                    }
                    if(response.data.data.activities.length == 0){
                        this.searchNone = true;
                    }else {
                        this.searchNone = false;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //筛选
            getCheckList(){
                this.dataInfo.currentPage = 1;           //设置为请求第一页
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/activity/getActivities.do`,
                    method:"get",
                    params:this.dataInfo
                }).then((response) => {
                    this.activeList = [];                                                               //先把列表清空了
                    console.log(response);
                    console.log(this.dataInfo);
                    this.activeList = this.activeList.concat(response.data.data.activities);            //活动列表
                    //当前页小于总页数的时候允许继续加载
                    if(response.data.page.currentPage < response.data.page.totalPage){
                        this.allowLoad = true;
                    }else {
                        this.allowLoad = false;
                    }
                    if(response.data.data.activities.length == 0){
                        this.searchNone = true;
                    }else {
                        this.searchNone = false;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },

            //上拉加载更多
            loadMore(){
                this.scroll = $(".listWrap")[0].scrollTop + $(".listWrap").innerHeight();         //被卷去的高度+能看到的高度
                this.listWrapHeight = $(".listWrapBig")[0].clientHeight-5;                        //总高度减去5
                //当滑到底部并且允许加载的时候加载数据
                if((this.scroll >= this.listWrapHeight) && (this.allowLoad == true)){
                    this.isLoading = false;
                    this.dataInfo.currentPage++;        //请求的当前页+1
                    this.showLoading = true;           //显示正在加载的loading
                    console.log(this.dataInfo);
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/activity/getPCActivities.do`,
                        method:"get",
                        params:this.dataInfo
                    }).then((response) => {
                        console.log(response);
                        this.activeList = this.activeList.concat(response.data.data.activities);            //活动列表
                        this.showLoading = false;      //加载成功之后关闭正在加载的loading
                        this.isLoading = true;
                        //当前页小于总页数的时候允许继续加载
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

            //点击地区按钮
            showListCity(){
                this.showCityList = !this.showCityList;
                this.showType = false;
            },
            //点击类型按钮
            showTypeRight(){
                this.showType = !this.showType;
                this.showCityList = false;
            },
            //点击城市的列表
            checkCity(event,index){
                this.city = event.name;                   //拿到选中的那个城市
                this.museumListArr = event.museum;        //拿到对应城市下的博物馆
                this.showMuseumList = true;               //博物馆的列表展开
                this.cityIndex = index;                   //拿到点击的城市的索引
                this.museumIndex = -2;                    //博物馆的索引变为全部
            },
            //点击城市列表的全部
            checkAllCity(){
                this.cityIndex = -1;                      //将索引变为-1
                this.showMuseumList = false;             //博物馆的列表隐藏
                this.addressTitle = "全部";               //标题变成选中的那个
                this.dataInfo.orgId = 0;                  //传给后台的数据的博物馆id
                setTimeout(() => {
                    this.showCityList = false;           //0.5秒后把遮罩列表收起来
                },300);
                //然后发送请求新的列表
                this.getCheckList();
            },
            //点击博物馆列表
            checkMuseum(event,index){
                this.orgId = event.cityId;                //拿到点击的那个博物馆的id
                this.museumIndex = index;                 //拿到点击的博物馆的索引
                this.dataInfo.orgId = event.cityId;       //传给后台的数据的博物馆id
                this.addressTitle = event.name;           //标题变成选中的那个
                console.log(this.dataInfo);
                setTimeout(() => {
                    this.showCityList = false;            //0.5秒后把遮罩列表收起来
                },300);
                //然后发送请求新的列表
                this.getCheckList();
            },
            //点击类型下对应的类型按钮
            checkType(event,index){
                this.typeIndex = index;
                this.activityCategory = event.id;
                this.dataInfo.activityCategory = event.id; //参数里边的id改成选中的这个
                this.categoryTitle = event.categoryName;   //类型标题的title变成选中的那个
                setTimeout(() => {
                    this.showType = false;                //0.5秒后把遮罩列表收起来
                },300);
                //然后发送请求新的列表
                console.log(this.dataInfo);
                this.getCheckList();
            },
            //点击类型的全部
            checkTypeAll(){
                this.typeIndex = -1;
                this.dataInfo.activityCategory = 0;       //参数里边的id改成选中的这个
                this.categoryTitle = "全部";              //类型标题的title变成选中的那个
                setTimeout(() => {
                    this.showType = false;                //0.5秒后把遮罩列表收起来
                },300);
                //然后发送请求新的列表
                this.getCheckList();
            },
            //获取时间之后刷新列表
            getDate(){
                this.showType = false;
                this.showCityList = false;                 //类型和列表遮罩都收起来
                let that = this;                           //用that承接一下this
                mui.init();                                 //初始化
                let options = {                             //初始化参数
                    "type":"date",
                    "beginYear":2016,
                    "endYear":2126
                };
                /*首次显示时实例化组件，示例为了简洁，将 options 放在了按钮的 dom 上，也可以直接通过代码声明 optinos 用于实例化 DtPicker*/
                let picker = new mui.DtPicker(options);
                picker.show(function(rs) {
                    that.date = rs.text;                         //将日期改成选中那个
                    that.dataInfo.activityDate = rs.text;        //需要传给后台的参数里边的日期改成选中的那个
                    picker.dispose();
                    //然后重新发送一遍请求
                    console.log(that.dataInfo);
                    that.getCheckList();
                });
            },

            //点击跳转到详情页
            goDetail(id){
                this.$router.push({path:'activityDetail',query:{id:id}});
            }

        },
        created(){

        },
        activated(){
            //获取城市和对应的城市下的博物馆的列表信息
            this.getCityMuseumListInfo();
        },
        mounted(){
            //监测上拉加载
            if(this.isLoading){
                $(".listWrap")[0].addEventListener('scroll',this.loadMore);
            }
        },
        destroyed:function(){

        },
        deactivated(){
            this.dataInfo.orgId = 0;
            this.dataInfo.activityCategory = 0;
            this.dataInfo.activityDate = "";
        }
    }
</script>
<style scoped>
    @import "../../static/css/mui.picker.min.css";
    /*地址弹出层动画*/
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 0;
        /*transform: translateY(-100%);*/
    }
    /*类型弹出层动画*/
    .fadeType-enter-active,.fadeType-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeType-enter,.fadeType-leave-active{
        transition: 0.5s all ease;
        opacity: 0;
    }
    /*遮罩*/
    .cover{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 10;
        position: fixed;
        left: 0;
        top:0;
    }
    /*遮罩的动画*/
    .coverBlack-enter-active,.coverBlack-leave-active{
        transition: 0.5s all ease;
    }
    .coverBlack-enter,.coverBlack-leave-active{
        transform: translateY(100%);
    }
    .content{
        width: 100%;
        margin-bottom: 0.78rem;
    }
    .fixedTop{
        width: 100%;
        height: 1.72rem;
        background: #fff;
        position: fixed;
        top:0;
        left: 0;
        z-index: 999;
    }
    .activityHead{
        width: 100%;
        height: 0.90rem;
        line-height: 0.90rem;
        background: #a92124;
        /*border-bottom: 0.02rem solid rgb(238, 238, 238);*/
    }
    .activityHead .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .activityHead .back{
        margin: 0.29rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .activityHead .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.92rem;
        color: rgb(255, 255, 255);
        font-size: 0.30rem;
        font-weight: 500;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .activityHead .calendar{
        width: 10%;
        height: 100%;
        float: right;
    }
    .activityHead .calendar img{
        float: right;
        width: 0.37rem;
        height: 0.33rem;
        margin: 0.30rem 0.20rem 0 0;
    }
    .checkTile{
        width: 100%;
        height: 0.80rem;
        position: relative;
    }
    .checkTile .condition{
        width: 50%;
        height: 100%;
        float: left;
        font-size: 0.26rem;
        line-height: 0.80rem;
        color: rgb(51, 51, 51);
        text-align: center;
        position: relative;
    }
    .checkTile .condition .checkNameActive{
        color: #a92123;
    }
    .checkName{
        display: inline-block;
        width: 30%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 0.3rem;
    }
    .checkTile .condition i{
        width: 0.33rem;
        height: 0.19rem;
        display: inline-block;
        background: url("../../static/images/activityArrowDown.png") no-repeat 0.04rem 0.05rem;
        background-size: 0.19rem 0.12rem;
        transition: all 0.5s;
        transform: rotate(0deg);
        position: absolute;
        left: 60%;
        top: 0.3rem;
    }
    .checkTile .condition i.rotateActive{
        transform:rotate(180deg);
    }
    /*地区*/
    .addressWrap{
        width: 100%;
        background: rgba(255,255,255,0.8);
        height: 6.01rem;
        position: absolute;
        left: 0;
        top:0.80rem;
    }
    .addressWrap .cityList{
        float: left;
        background: #fff;
        width: 30%;
        height: 100%;
        overflow-y: scroll;
        max-height: 6.00rem;
    }
    .addressWrap .cityList .cityName{
        padding-left: 0.50rem;
        height: 0.70rem;
        line-height: 0.70rem;
        font-size: 0.26rem;
        color: rgba(0, 0, 0, 0.6);
        border-bottom: 0.01rem solid rgb(247,247,247);
        border-right: 0.01rem solid rgb(247,247,247);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .addressWrap .cityList .cityNameActive{
        background: rgba(236,236,236,1);
        color: #a92123;
    }
    .addressWrap .cityList .cityNameAll{
        padding-left: 0.25rem;
    }
    .addressWrap .museumList{
        width: 70%;
        max-height: 6.00rem;
        background: rgba(236,236,236,1);
        float: left;
        overflow-y: scroll;
    }
    .addressWrap .museumList .museumName{
        padding-left: 0.50rem;
        height: 0.70rem;
        line-height: 0.70rem;
        font-size: 0.26rem;
        color: rgba(0, 0, 0, 0.6);
        border-bottom: 0.01rem solid rgb(247,247,247);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .addressWrap .museumList .museumName .right{
        display: block;
        float: right;
        width: 0.22rem;
        height: 0.16rem;
        background: url("../../static/images/yes.png") no-repeat center;
        background-size: contain;
        margin: 0.26rem 0.40rem;
    }
    .addressWrap .museumList .museumNameActive{
        color: #a92123;
    }
    /*类别*/
    .typeWrap{
        width: 100%;
        max-height: 4.5rem;
        position: absolute;
        left: 0;
        top:0.80rem;
    }
    .typeWrap > ul{
        width: 100%;
        height: 100%;
        background: #fff;
        overflow-y: scroll;
    }
    .typeWrap > ul > li{
        width: 100%;
        padding-left: 0.50rem;
        height: 0.70rem;
        line-height: 0.70rem;
        font-size: 0.26rem;
        color: rgba(0, 0, 0, 0.6);
        border-bottom: 0.01rem solid rgb(247,247,247);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .typeWrap > ul > li.activeTitle{
        height: 0.58rem;
        background: rgb(239,239,239);
        padding-left: 0.25rem;
        font-weight: 600;
    }
    .typeWrap > ul > li.checked{
        color: #a92123;
    }
    .typeWrap > ul > li > i{
        display: block;
        float: right;
        width: 0.22rem;
        height: 0.16rem;
        background: url("../../static/images/yes.png") no-repeat center;
        background-size: contain;
        margin: 0.26rem 0.40rem;
    }
    /*活动列表*/
    .listWrap{
        width: 100%;
        padding:0 0.20rem;
        margin-top: 1.72rem;
        height: 8.70rem;
        overflow: hidden;
        overflow-y: scroll;
        background: #f2f2f2;
    }
    .listWrap .listWrapBig{
        width: 100%;
    }
    .listWrap .listWrapBig:after{
        content: '';
        display: block;
        clear: both;
    }
    .listWrap .searchNone{
        width: 100%;
        margin-top: 1.30rem;
    }
    .listWrap:after{
        content: '';
        display: block;
        clear: both;
    }
    .listWrap .list{
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 3.76rem;
        margin-bottom: 0.20rem;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .listWrap .list .img{
        background-color: rgb(197, 197, 197);
        width: 100%;
        height: 3.14rem;
    }
    .listWrap .list .img img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .listWrap .list p{
        height: 0.61rem;
        width: 100%;
        text-align: left;
        line-height: 0.61rem;
        color: rgb(51, 51, 51);
        font-size: 0.26rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 0.20rem;
    }
    .loading{
        width: 100%;
        text-align: center;
        height: 0.32rem;
        box-sizing: content-box;
        padding-bottom: 0.70rem;
        float: left;
    }
</style>

