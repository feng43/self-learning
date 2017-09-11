<template>
    <div>
        <div class="header">
            <!--返回上一页-->
            <!--<transition name = "show">-->
            <!--v-show="showBack"-->
                <div class="coverBack">
                    <div class="back" @click = "back()">
                        <img src="../../static/images/bowuguan_detail_back.png" alt="">
                    </div>
                    <!--标题-->
                    <div class="cover">
                        <p>
                            {{title}}
                        </p>
                    </div>
                </div>
            <!--</transition>-->
        </div>
        <div class="thumbImg">
            <img :src="thumbUrl" alt="">
        </div>
        <!--基本信息-->
        <div class="information">
            <div class="border">
                <p>
                    <span class="key">时间</span>
                    <span class="dote">:</span>
                    <span class="value">{{time}}</span>
                </p>
                <p>
                    <span class="key">类型</span>
                    <span class="dote">:</span>
                    <span class="value">{{type}}</span>
                </p>
            </div>
        </div>
        <div class="information addressWrap">
            <p @click="leapDetail(orgId)">
                <span class="value museum">{{address}}</span>
                <span class="enterMuseum">
                    <img src="../../static/images/enter.png" alt="">
                </span>
            </p>
        </div>
        <!--详细信息-->
        <div class="detailContent" v-html="content"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                showBack:true,              //刚进来的时候显示头部的返回键
                id:'',                      //本页面的id
                title:'',                   //标题
                time:'',                    //时间
                type:'',                    //类型
                address:'',                 //地址
                content:'',                 //内容
                thumbUrl:'',                //最上边的大图
                orgId:''                    //博物馆的id
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
            this.id = this.$route.query.id;         //获取到传过来的id
            this.getData();                         //获取列表数据
        },
        created(){

        },
        methods:{
            back(){
                this.$router.back();
            },
            getData(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/activity/getDetail.do`,
                    method:"get",
                    params:{
                        id:this.id
                    }
                }).then((response) => {
                    console.log(response);
                    this.title = response.data.data.activityName;
                    this.thumbUrl = response.data.data.mainPic;
                    this.time = response.data.data.activityDate;
                    this.type = response.data.data.categoryName;
                    this.address = response.data.data.musExhibition;
                    this.content = response.data.data.content;
                    this.orgId = response.data.data.orgId;
                    console.log(this.title)
                }).catch((error) => {
                    console.log(error);
                })
            },
            watch(){
                let scrollTop = document.body.scrollTop;
                if(scrollTop < 10){
                    this.showBack = true;
                    return;
                }else {
                    this.showBack = false;
                }
            },
            //跳转到博物馆详情
            leapDetail(id){
                this.$router.push({path:"museumDetail",query:{id:id}});
            }
        },
        mounted(){
            window.addEventListener("scroll",this.watch);    //监听滚动事件，判断返回键是不是要隐藏
        },

    }
</script>
<style>
    /*返回按钮的动画*/
    .show-enter-active,.show-leave-active{
        transition: 1s all ease;
    }
    .show-enter,.show-leave-active{
        opacity: 0;
        transform: translateY(-100%);
    }
    .detailContent p{
        width: 100%;
        font-size: 0.22rem!important;
        color: #666;
        line-height: 0.38rem;
        text-align: justify;
    }
    .detailContent p span{
        width: 100%;
        font-size: 0.22rem!important;
        color: #666;
        line-height: 0.38rem;
        text-align: justify;
    }
    .detailContent p img{
        width: 100%;
        margin: 0.05rem 0;
    }
    .detailContent img{
        width: 100%;
        margin: 0.05rem 0;
    }
</style>
<style scoped>
    .header{
        background-color: rgb(197, 197, 197);
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        /*height: 360px;*/
    }
    .header > img{
        width: 100%;
        height: auto;
    }
    .header > .coverBack{
        /*background-color: rgba(0, 0, 0, 0.49);*/
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 0.90rem;
        background: url("../../static/images/bowuguan_detail_headerBg.png") no-repeat;
        background-size: 100% 0.90rem;
    }
    .header > .coverBack > .back{
        position: absolute;
        left: 0;
        top:0;
        width: 0.66rem;
        height: 100%;
        z-index: 999;
    }
    .header > .coverBack > .back > img{
        margin: 0.25rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .header > .coverBack > .cover{
        /*background-color: rgba(0, 0, 0,0.49);*/
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.90rem;
    }
    .header > .coverBack > .cover > p{
        padding: 0 0.80rem;
        font-size: 0.26rem;
        color: rgb(255, 255, 255);
        line-height: 0.90rem;
        text-align: center;
        height: 100%;
        letter-spacing: 0.02rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .thumbImg{
        width: 100%;
    }
    .thumbImg > img{
        width: 100%;
    }
    .information{
        width: 100%;
        height: 1.24rem;
        box-sizing: border-box;
        background: #fff;
    }
    .information:after{
        content: '';
        display: block;
        clear: both;
    }
    .information .border{
        width: 96.87%;
        height: 1.24rem;
        padding:0.10rem 0;
        border-bottom: 0.03rem solid rgb(242, 242, 242);
        float: right;

    }
    .information p{
        width: 100%;
        height: 0.50rem;
        line-height: 0.50rem;
        font-size: 0.24rem;
        color: rgb(102, 102, 102);
        letter-spacing: 0.02rem;
    }
    .information p .museum{
        color: rgb(51, 51, 51);
    }
    .information p .enterMuseum{
        display: block;
        float: right;
        width: 0.30rem;
        height: 100%;
        text-align: right;
    }
    .information p .enterMuseum > img{
        width: 0.14rem;
        height: 0.24rem;
        vertical-align: middle;
    }
    .addressWrap{
        height: 0.82rem;
        width: 100%;
        line-height: 0.70rem;
        padding:0.10rem 0.20rem;
        border-bottom: 0.12rem solid rgb(242, 242, 242);
    }
    .detailContent{
        width: 100%;
        padding: 0.20rem;
    }
</style>
