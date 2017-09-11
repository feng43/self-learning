<template>
    <div>
        <div class="changePassHead">
            <div class="backWrap" @click="goRouter('back','')">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title">精品藏品</h2>
        </div>
        <div class="collectContent">
            <ul class="collectWrap">
                <li v-for="item in collectList" @click="goRouter('detail',item.id)">
                    <div class="imgWrap">
                        <img :src="item.pictureThumb" alt="">
                    </div>
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <div class="loading" v-show="loading">
                <img src="../../static/images/login.gif" alt="">
            </div>
            <div class="searchNone" v-show="searchNone"></div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                dataInfo : {            //传给后台的参数
                    size:5,
                    currentPage:1
                },
                collectList:[],          //精品藏品列表数组
                allowLoad:true,         //允许加载 true为允许上拉加载，false不允许上拉加载
                searchNone:false,       //当请求列表没有数据的时候显示
                loading:false,          //加载的时候显示圈圈圈
                scrollHeight:'',         //被卷上去的高度加上能看到的高度
                listWrapHeight:'',       //列表的总高度
                imgWrapWidth:'',         //包裹图片的那个div的宽度
            }
        },
        created(){
            //获取第一个列表
            this.getDataList();
            //获取图片的宽度
            this.getImgWrapWidth();
        },
        methods:{
            goRouter(str,collectionId){
                switch (str){
                    //返回按钮
                    case "back":
                        this.$router.back();
                        return;

                    //跳转到详情
                    case "detail":
                        this.$router.push({path:"scrollMode",query:{id:collectionId}});
                        return;

                }
            },
            getImgWrapWidth(){
                this.imgWrapWidth = $(".imgWrap").width();
            },
            //请求数据刚进来的时候
            getDataList(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getAllHighColl.do`,
                    method:"GET",
                    params:this.dataInfo
                }).then(response => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.collectList = response.data.data;
                        if(response.data.page.currentPage < response.data.page.totalPage){
                            this.allowLoad = true;
                        }else {
                            this.allowLoad = false;
                        }
                        if(this.collectList.length == 0){
                            this.searchNone = true;
                        }else {
                            this.searchNone = false;
                        }
                    }else {
                        alert(response.data.data);
                    }

                    //let imgNewHeight = this.imgWrapWidth*imgHeight/imgWidth;
                    //img.css({top:-50%;margin-top:imgNewHeight/2});
                }).catch(error => {
                    console.log(error)
                })
            },
            //上拉加载更多数据
            loadMore(){
                this.scrollHeight = $(".collectContent")[0].scrollTop + $(".collectContent").innerHeight();    //被卷去的高度+能看到的高度
                this.listWrapHeight = $(".collectWrap")[0].clientHeight-5;                        //总高度减去5
                if((this.scrollHeight >= this.listWrapHeight) && (this.allowLoad == true)){
                    this.dataInfo.currentPage++;       //当前页+1
                    this.loading = true;              //显示加载中的那个圈圈圈
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getAllHighColl.do`,
                        method:"GET",
                        params:this.dataInfo
                    }).then(response => {
                        console.log(response);
                        if(response.data.success == 1){
                            this.collectList = this.collectList.concat(response.data.data);
                            if(response.data.page.currentPage < response.data.page.totalPage){
                                this.allowLoad = true;
                            }else {
                                this.allowLoad = false;
                            }
                        }else {
                            alert(this.data.data);
                        }
                        this.loading = false;         //显示加载中的那个圈圈圈
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        mounted(){
            if(!this.loading){
                $(".collectContent")[0].addEventListener('scroll',this.loadMore);
            }
        }
    }
</script>
<style scoped>
    .changePassHead{
        width: 100%;
        height: 0.92rem;
        line-height: 0.90rem;
        border-bottom: 0.02rem solid rgb(238, 238, 238);
        position: fixed;
        left: 0;
        top:0;
        background: #fff;
        z-index: 999;
    }
    .changePassHead > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .changePassHead > .backWrap > .back{
        margin: 0.29rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .changePassHead > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.92rem;
        color: rgb(51, 51, 51);
        font-size: 0.34rem;
        font-weight: 600;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .collectContent{
        width: 100%;
        height: 9.50rem;
        margin-top: 0.92rem;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 0 0.30rem;
    }
    .collectContent > .collectWrap{
        width: 100%;
        padding-bottom: 0.85rem;
    }
    .collectContent > .collectWrap > li{
        background-color: rgb(255, 255, 255);
        border-bottom: 0.01rem solid #dfdfdd;
        width: 100%;
        height: 4.19rem;
        padding-top: 0.22rem;
    }
    .collectContent > .collectWrap > li > .imgWrap{
        /*background-color: #f2f2f2;*/
        background-color: #f2f2f2;
        width: 100%;
        height: 3.31rem;
        border-radius: 0.05rem;
        overflow: hidden;
    }
    .collectContent > .collectWrap > li > .imgWrap > img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .collectContent > .collectWrap > li > p{
        width: 100%;
        height: 0.66rem;
        line-height: 0.66rem;
        font-size: 0.26rem;
        color: rgb(51, 51, 51);
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .loading{
        width: 100%;
        text-align: center;
        height: 0.32rem;
    }
</style>