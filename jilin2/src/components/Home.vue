<template>
    <div class="content">
        <!--轮播图-->
        <div class="swiper-container turnImgWrap">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiperTurnImg">
                    <router-link to="Virtual">
                        <img src="../static/images/banner.png" />
                    </router-link>
                </div>
                <div class="swiper-slide swiperTurnImg">
                    <router-link to="Story">
                        <img src="../static/images/banner2.png" />
                    </router-link>
                </div>
                <div class="swiper-slide swiperTurnImg">
                    <router-link to="/Activity">
                        <img src="../static/images/banner1.png" />
                    </router-link>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <!--跳转链接-->
        <div class="leapLinkWrap">
            <div class="leapLink">
                <router-link to="/museum">
                    <div>
                        <img src="../static/images/museum_home.png" alt="">
                        <p>博物馆</p>
                    </div>
                </router-link>
                <router-link to="/cpjs">
                    <div>
                        <img src="../static/images/collection_home.png" alt="">
                        <p>藏品</p>
                    </div>
                </router-link>
                <router-link to="/CurationHome">
                    <div>
                        <img src="../static/images/curation_home.png" alt="">
                        <p>在线策展</p>
                    </div>
                </router-link>
                <router-link to="/Virtual">
                    <div>
                        <img src="../static/images/virual_home.png" alt="">
                        <p>虚拟展厅</p>
                    </div>
                </router-link>
            </div>
        </div>
        <!--展讯-->
        <div class="commonListWrap">
            <div class="hotCommon">
                <div class="homeTile">
                    <img src="../static/images/home_display.png" alt="">
                    <span>展讯</span>
                    <router-link to="/exhibition">更多 <img class="arrow" src="../static/images/bowuguan_hot_more.png" alt=""></router-link>
                </div>
                <div class="commonContentWrap">
                    <div class="commonContent" v-for="exhibition in exhibitionArr" @click="leapDetail('ExhibitionDetial',exhibition.id)">
                        <div class="thumbImgWrap">
                            <img :src="exhibition.picUrl" alt="">
                        </div>
                        <p>{{exhibition.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--活动-->
        <div class="commonListWrap">
            <div class="hotCommon">
                <div class="homeTile">
                    <img src="../static/images/home_active.png" alt="">
                    <span>活动</span>
                    <router-link to="/Activity">更多 <img class="arrow" src="../static/images/bowuguan_hot_more.png" alt=""></router-link>
                </div>
                <div class="commonContentWrap">
                    <div class="commonContent" v-for="active in activeArr" @click="leapDetail('ActivityDetail',active.id)">
                        <div class="thumbImgWrap">
                            <img :src="active.pictureThumb" alt="">
                        </div>
                        <p>{{active.activityName}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!--文创-->
        <div class="articleWrap">
            <div class="article">
                <div class="homeTile">
                    <img src="../static/images/home_article.png" alt="">
                    <span>文创</span>
                    <router-link to="/Article" style="right: 0.10rem;">更多 <img class="arrow" src="../static/images/bowuguan_hot_more.png" alt=""></router-link>
                </div>
                <div class="swiper-container articleImgWrap">
                    <div class="swiper-wrapper articleBigWrap">
                        <div class="swiper-slide articleSlider" v-for="article in articleArr" @click="leapArticleDetail('wenchuang_detail',article.id)">
                            <div class="articleThumbWrap">
                                <img class="articleImg" :src="article.pictureUrl" alt="">
                            </div>
                            <p class="articleName">{{article.productName}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--吉林故事-->
        <div class="commonListWrap">
            <div class="hotCommon">
                <div class="homeTile">
                    <img src="../static/images/home_story.png" alt="" class="collectionImg">
                    <span>吉林故事</span>
                    <router-link to="/Story">更多 <img class="arrow" src="../static/images/bowuguan_hot_more.png" alt=""></router-link>
                </div>
                <div class="commonContentWrap">
                    <div class="commonContent" v-for="story in storyArr" @click="leapDetail('StoryDetail',story.id)">
                        <div class="thumbImgWrap">
                            <img :src="story.picUrl" alt="">
                        </div>
                        <p>{{story.headline}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                arrList:[],
                turnImgArr:[],
                exhibitionArr:[],
                activeArr:[],
                articleArr:[],
                storyArr:[],
                turnImg1:'',
                turnImg2:'',
                turnImg3:'',
                showCover:false,          //显示遮罩，开发完了就去掉
                userInfo:'',               //用户名和密码json
                phoneNum:'',               //电话号码
                password:'',               //密码
                isLogin:'',                //是不是登录
                userPwd:{},                //用户信息
                userStr:'',                //保存在session中
                user:'',                   //保存在local中
            }
        },
        mounted(){
            //页面加载获取数据
            //轮播图
            this.swiper();
            //精品藏品滚动
            this.swiperCollect();
        },
        methods:{
            // 请求数据
            getData:function () {
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/mainPage/detail.do`,
                    method:"get",
                    params:''
                }).then((response) =>{
                    console.log(response);
                    this.turnImgArr = response.data.turnImg;
                    this.exhibitionArr = response.data.data.getlatestSpr;
                    this.activeArr = response.data.data.activity.activities;
                    this.articleArr = response.data.data.wenChuangs;
                    this.storyArr = response.data.data.story;
                    this.exhibitionArr = this.exhibitionArr.slice(0,2);
                    this.storyArr = this.storyArr.slice(0,2);
                    this.articleArr = this.articleArr.slice(0,6);
                    this.turnImg1 = this.turnImgArr[0].url;
                    this.turnImg2 = this.turnImgArr[1].url;
                    this.turnImg3 = this.turnImgArr[2].url;
                }).catch((error) =>{
                    console.log(error);
                })
            },
            //banner图
            swiper(){
                new Swiper('.turnImgWrap', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 0,
                    loop: true,
                    speed:500,
                    autoplay:3000,
                    preventClicks:false,
                    observer:true
                });
            },
            //藏品的banner
            swiperCollect(){
                new Swiper('.articleImgWrap',{
                    slidesPerView: 2.3,
                    freeMode: true,
                    preventClicks:false,
                    observer:true
                })
            },
            //点击图片跳到详情页
            leapDetail(route,id){
                this.$router.push({path:route,query:{id:id}});
            },
            //点击文创的详情
            leapArticleDetail(route,id){
                this.detailData = {
                    dataList:[],
                    id:id
                };
                this.$store.dispatch('getArticleList',this.detailData);
                this.$router.push({path:route,query:{id:id}});
            },
            //进入首页判断是不是登录了，没登录的话就给他登录一次
            checkIsLogin(){
                let this_href = window.location.href;                          //拿到url路径
                console.log(this_href);
                if(this_href.indexOf("jsessionid") != -1 || this_href.indexOf("wxlogin") != -1){
                    //已经用微信登录
                    //调一下接口拿到数据存在localStorage中
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/wxIsLogin.do`,
                        method:"get",
                        params:""
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == 1){
                            this.userPwd = {
                                phoneNum:response.data.data.weixinUnionid,                   //用户名Id
                                password:response.data.data.password,                        //用户密码
                                nickName:response.data.data.nickName,			               //昵称
                                uid:response.data.data.id,					               //id
                                headimgurl:response.data.data.avatarUrl,		               //头像路径
                                sessionAdminName:response.data.data.nickName,	               //session中保存的
                                isWxLogin:true
                            };
                            //将数据放入浏览器本地存储
                            this.userStr = JSON.stringify(this.userPwd);
                            this.user = JSON.stringify(this.userPwd);
                            sessionStorage.userStr = this.userStr;
                            localStorage.user = this.userStr;
                        }else {
                            alert("请求出错");
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    return;
                }else if(localStorage.user){
                    //没有用微信登录，判断是不是有用户名和密码，有的话就登录一下，没有就算了
                    this.userInfo = JSON.parse(localStorage.user);
                    console.log(this.userInfo);
                    this.phoneNum = this.userInfo.phoneNum;
                    this.password = this.userInfo.password;
                    this.isLogin = true;
                    this.login();
                    return;
                }else {
                    return;                         //没有就算了
                }

            },
            //登录一下
            login(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/frontLogin.do`,
                    method:"POST",
                    data:{
                        phone:this.phoneNum,
                        password:this.password,
                    },
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then((response) => {
                    console.log(response);
                    //如果登录成功的话
                    if(response.data.data.sessionAdminName != null){
                        //保存用户登录信息
                        this.userPwd = {
                            phoneNum:this.phoneNum,                                     //用户名
                            password:this.password,                                     //用户密码
                            nickName:response.data.data.nickName,			               //昵称
                            uid:response.data.data.id,					               //id
                            headimgurl:response.data.data.headimgurl,		               //头像路径
                            sessionAdminName:response.data.data.sessionAdminName,	       //session中保存的
                        };
                        //将数据放入浏览器本地存储
                        this.userStr = JSON.stringify(this.userPwd);
                        this.user = JSON.stringify(this.userPwd);
                        sessionStorage.userStr = this.userStr;
                        localStorage.user = this.userStr;
                    }else {
//                      this.$router.push({path:"Login"});                              //登录失败跳到登录页面
                        return;
                    }
                })
            }
        },
        created(){
            this.getData();                                                //拿到首页的数据
            this.checkIsLogin();                                           //检查一下是不是登录了
        }
    }
</script>
<style>
    .turnImgWrap .swiper-pagination-bullet{
        opacity: 1.0!important;
        width: 0.10rem;
        height: 0.10rem;
        border-radius: 50%;
        background-color: rgb(204, 204, 204);
    }
    .turnImgWrap .swiper-pagination-bullet-active{
        width: 0.18rem;
        height: 0.10rem;
        background-color: rgb(169, 33, 36);
        border-radius: 0.05rem;
    }
</style>
<style scoped>
    .content{
        margin-bottom: 0.96rem;
        background: #fff;
    }
    .swiperTurnImg{
        width: 100%;
        text-align: center;
    }
    .turnImgWrap{
        background-color: rgb(255,255,255);
        width: 100%;
        height: 3.20rem;
    }
    .turnImgWrap div{
        width: 100%;
        height: 100%;
    }
    .turnImgWrap div a{
        width: 100%;
        height: 100%;
    }
    .turnImgWrap div a img{
        object-fit: cover;
        max-width: 100%;
        max-height: 100%;
    }
    .swiper-pagination{
        height: 0.25rem!important;
        text-align: center;
        padding-right: 0.10rem;
    }
    /*跳转链接*/
    .leapLinkWrap{
        width: 100%;
        height: 2.24rem;
        box-sizing: border-box;
        padding: 0 0.20rem;
    }
    .leapLink{
        width: 100%;
        height: 2.24rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #f2f2f2;
        padding-top: 0.38rem;
    }
    .leapLink:after{
        content: '';
        display: block;
        clear: both;
    }
    .leapLink > a{
        display: block;
        width: 25%;
        height: 100%;
        float: left;
    }
    .leapLink > a > div{
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 100%;
        border-radius: 0.05rem;
        text-align: center;
    }
    .leapLink > a > div > img{
        width: 1.06rem;
        height: 1.06rem;
    }
    .leapLink > a > div > p{
        font-size: 0.30rem;
        color: rgb(0, 0, 0);
        text-align: center;
        line-height: 1.2;
        padding-top: 0.17rem;
        font-family: "PingFang";
    }
    /*头部公共的标题*/
    .homeTile{
        width: 6.00rem;
        height: 0.92rem;
        line-height: 0.92rem;
        /*padding: 0.25rem 0 0;*/
    }
    .homeTile > img{
        width: 0.32rem;
        height: 0.33rem;
        margin-top: 0.28rem;
        float: left;
    }
    .homeTile > span{
        color: rgb(51, 51, 51);
        margin-left: 0.08rem;
        font-size: 0.28rem;
        font-family: "PingFang";
        font-weight: bold;
        float: left;
    }
    .homeTile > a{
        display: inline-block;
        font-size: 0.24rem;
        float: right;
        color: rgb(102, 102, 102);
    }
    .homeTile > a > .arrow{
        width: 0.11rem;
        height: 0.21rem;
        margin-top: 0.33rem;
    }
    /*热门博物馆*/
    .commonListWrap{
        width: 100%;
        padding: 0 0.20rem;
        height: 3.25rem;
    }
    .hotCommon{
        width: 100%;
        height: 3.25rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dfdfdd;
    }
    .hotCommon > .commonContentWrap{
        width: 100%;
        height: 2.32rem;
    }
    .commonContentWrap:after{
        content: '';
        display: block;
        clear: both;
    }
    .commonContentWrap > .commonContent{
        overflow: hidden;
        width: 2.90rem;
        height: 2.32rem;
        float: left;
    }
    .commonContentWrap > .commonContent:nth-child(1){
        margin-right: 0.20rem;
    }
    .commonContentWrap > .commonContent > .thumbImgWrap{
        width: 2.90rem;
        height: 1.64rem;
        border-radius: 0.05rem;
        background-color: rgb(220, 220, 220);
        overflow: hidden;
    }
    .commonContentWrap > .commonContent > .thumbImgWrap > img{;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .commonContentWrap > .commonContent > p{
        width: 100%;
        height: 0.68rem;
        font-size: 0.25rem;
        color: rgb(0, 0, 0);
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        padding-top: 0.10rem;
    }
    /*精品藏品*/
    .articleWrap{
        width: 100%;
        padding: 0 0 0 0.20rem;
        box-sizing: border-box;
        height: 3.28rem;
    }
    .article{
        width: 100%;
        height: 3.28rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dfdfdd;
    }
    .articleImgWrap{
        width: 100%!important;
        height: 2.35rem;
    }
    .articleBigWrap{
        width: 100%!important;
        height: 2.35rem;
    }
    .articleSlider{
        background-color: rgb(255, 255, 255);
        border-radius: 0.05rem;
        overflow: hidden;
        width: 2.50rem!important;
        height: 2.34rem;
        margin-right: 0.20rem;
    }
    .articleSlider > .articleThumbWrap{
        border-radius: 0.05rem;
        width: 2.50rem;
        height: 1.67rem;
        overflow: hidden;
    }
    .articleSlider > .articleThumbWrap > .articleImg{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .articleSlider > .articleName{
        width: 100%;
        height: 0.68rem;
        font-family: "PingFang";
        background: #fff;
        text-align: left;
        font-size: 0.25rem;
        color: rgb(0, 0, 0);
        padding-top: 0.10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>