<template>
    <div>
        <!--<transition name="fadeIn">-->
        <!--v-show="showHead"-->
            <div class="header">
                <div class="back" @click="back()">
                    <img src="../../static/images/bowuguan_detail_back.png" alt="">
                </div>
            </div>
        <!--</transition>-->
        <div class="detailWrap">
            <div class="bigImgWrap">
                <img :src="pictureThumb" alt="">
                <p class="title">{{headline}}</p>
            </div>
            <div class="timeWrap">
                <span class="address">吉林省博物院</span>
                <span class="time">{{publishDate}}</span>
            </div>
            <div class="storyContent" v-html="content">

            </div>
        </div>
    </div>
</template>
<style>
    .detailWrap > .storyContent{
        padding: 0.20rem;
    }
    .detailWrap > .storyContent p{
        font-size: 0.22rem!important;
        color: #666!important;
        line-height: 0.38rem!important;
        text-align: justify;
    }
    .detailWrap > .storyContent p span{
        font-size: 0.22rem!important;
        color: #666!important;
        line-height: 0.38rem!important;
        text-align: justify;
    }
    .detailWrap > .storyContent p img{
        width: 100%!important;
        margin: 0.10rem 0;
    }
    .detailWrap > .storyContent img{
        width: 100%!important;
        margin: 0.10rem 0;
    }
</style>
<style scoped>
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition: 0.5s all ease;
        transform: translateY(0);
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        transform: translateY(-100%);
        opacity:0;
    }
    .header{
        /*background-color: rgba(0, 0, 0, 0.502);*/
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 0.90rem;
        z-index: 999;
        background: url("../../static/images/bowuguan_detail_headerBg.png") no-repeat;
        background-size: 100% 0.90rem;
    }
    .header > .back{
        height: 0.90rem;
        width: 0.90rem;
    }
    .header > .back > img{
        margin: 0.25rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .detailWrap{
        width: 100%;
    }
    .detailWrap > .bigImgWrap{
        width: 100%;
        height: 3.60rem;
        background: #f2f2f2;
        position: relative;
    }
    .detailWrap > .bigImgWrap > img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    .detailWrap > .bigImgWrap > p{
        background-color: rgba(0, 0, 0, 0.502);
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.80rem;
        line-height: 0.80rem;
        font-size: 0.26rem;
        color: rgb(255, 255, 255);
        padding: 0 0.20rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .detailWrap > .timeWrap{
        width: 100%;
        height: 0.88rem;
        background: #fff;
        padding: 0 0.20rem;
        line-height: 0.76rem;
        border-bottom: 0.12rem solid rgb(242, 242, 242);
        box-sizing: border-box;
    }
    .detailWrap > .timeWrap > .address{
        font-size: 0.24rem;
        color: rgb(51, 51, 51);
    }
    .detailWrap > .timeWrap > .time{
        font-size: 0.24rem;
        color: rgb(153, 153, 153);
        float: right;
        display: inline-block;
        padding-top: 0.04rem;
    }
    .detailWrap > .storyContent{
        padding: 0.20rem;
    }
    .detailWrap > .storyContent p{
        font-size: 0.22rem!important;
        color: #666!important;
        line-height: 0.38rem;
        text-align: justify;
    }
    .detailWrap > .storyContent > p > img{
        width: 100%!important;
        margin: 0.10rem 0;
    }
    .detailWrap > .storyContent > img{
        width: 100%!important;
        margin: 0.10rem 0;
    }
</style>
<script>
    export default{
        data(){
            return {
                id:'',                          //本页面的id
                headline:'',                    //标题
                pictureThumb:'',                //图片的地址
                address:'',                     //地址
                publishDate:'',                 //发布时间
                content:'',                     //内容
                showHead:true,                  //显示顶部回退按钮
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
            this.id = this.$route.query.id;         //获取传过来的id
            this.getData();
        },
        methods:{
            //返回上一步
            back(){
                this.$router.back();
            },
            getData(){
                console.log(this.id);
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/story/getDetail.do`,
                    method:"GET",
                    params:{
                        id:this.id
                    }
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.headline = response.data.data.headline;
                        this.pictureThumb = response.data.data.picUrl;
                        this.address = response.data.data.musExhibition;
                        this.publishDate = response.data.data.publishDate;
                        this.content = response.data.data.content;
                    }
                })
            },
            watch(){
                let scrollTop = document.body.scrollTop;
                if (scrollTop < 10){
                    this.showHead = true;
                }else {
                    this.showHead = false;
                }
            }
        },
        mounted(){
            window.addEventListener("scroll",this.watch);       //监听滚动条事件
        }
    }
</script>