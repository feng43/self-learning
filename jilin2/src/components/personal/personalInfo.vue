<template>
    <div class="bgContent">
    <div class="contentWrap">
        <div class="personInfoHead">
            <div class="backWrap" @click="goBack()">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title">个人信息</h2>
            <div class="clearAll" @click="saveInfo()">
                <span>保存</span>
            </div>
        </div>
        <!--<div class="headImg">-->
            <!--<span>头像</span>-->
            <!--<div class="img">-->
                <!--<img src="../../static/images/moren.png" alt="">-->
            <!--</div>-->
        <!--</div>-->
        <div class="infoContent">
            <div class="info">
                <span>昵称</span>
                <input class="inputInfo nickName" type="text" placeholder="请输入昵称" maxlength="10" v-model="nickName">
                <div class="arrow">
                    <img src="../../static/images/personInfoArrow.png" alt="">
                </div>
            </div>
            <div class="info">
                <span>性别</span>
                <input class="inputInfo" type="text" placeholder="请输入性别" v-model="sex" readonly disabled>
                <div class="arrow" @click="changeSex()">
                    <img src="../../static/images/personInfoArrow.png" alt="">
                </div>
            </div>
            <div class="info">
                <span>生日</span>
                <input class="inputInfo" type="text" placeholder="请输入生日" v-model="birthday" readonly disabled>
                <div class="arrow" @click="getDate()">
                    <img src="../../static/images/personInfoArrow.png" alt="">
                </div>
            </div>
            <div class="info">
                <span>职业</span>
                <input class="inputInfo" type="text" placeholder="请输入职业" maxlength="20" v-model="vocation">
                <div class="arrow">
                    <img src="../../static/images/personInfoArrow.png" alt="">
                </div>
            </div>
            <div class="info tagDiv">
                <span>标签</span>
                <textarea cols="30" rows="20" class="inputInfo tagInfo" placeholder="暂无标签" maxlength="26" v-model="tagName" v-on:input="changeTag()"></textarea>
                <div class="arrow">
                    <img src="../../static/images/personInfoArrow.png" alt="">
                </div>
            </div>
            <div class="totalNum" v-show="showTotalNum">还可以输入{{totalNum}}个字</div>
        </div>
        <!--修改性别-->
        <transition name="fadeIn">
            <!--v-show="showSex"-->
            <div class="cover" v-show="showSex">
                <div class="hideCover" @click="hideCover()"></div>
                <div class="changeSexWrap">
                    <div class="title">
                        <div class="complete" @click="checkSex()">完成</div>
                    </div>
                    <div class="sexDiv">
                        <div class="sexName">
                            <div @click="checkMale()">男</div>
                            <div @click="checkFemale()">女</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!--登录错误信息提示-->
        <transition name="fadeIn">
            <p class="errorTip" v-show="showErrorMsgTip">{{errorMsg}}</p>
        </transition>
    </div>
    </div>
</template>
<style scoped>
    .bgContent{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background: #f2f2f2;
    }
    .contentWrap{
        width: 100%;
        height: 6.30rem;
        background: #fff;
    }
    .errorTip{
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
    @import "../../static/css/mui.picker.min.css";
    /*修改昵称的遮罩*/
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        transform: translateY(100%);
        opacity: 0;
    }
    .cover{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.49);
        position: fixed;
        left: 0;
        top:0;
        z-index: 1000;
    }
    .cover > .hideCover{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right:0;
        top:0;
        border-bottom: 0;
        z-index: 998;
    }
    .cover > .changeSexWrap{
        width: 100%;
        height: 3.72rem;
        background: linear-gradient(to bottom,#d1d5db 0%,#c3d6da 65%,#bed7da 70%,#d1d5db 100%);
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .cover > .changeSexWrap > .title{
        width: 100%;
        height: 0.63rem;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #dcdfe3;
        padding-right: 0.15rem;
    }
    .cover > .changeSexWrap > .title > .complete{
        width: 0.50rem;
        height: 100%;
        line-height: 0.63rem;
        font-size: 0.22rem;
        color: #0079ff;
        float: right;
        text-align: right;
        font-weight: 600;
    }
    .cover > .changeSexWrap > .sexDiv{
        width: 100%;
        height: 0.51rem;
        border-bottom: 0.02rem solid #acc1c4;
        border-top: 0.01rem solid #b1b7bb;
        position: absolute;
        left: 0;
        top:1.95rem;
        -webkit-overflow-scrolling: touch;
    }
    .cover > .changeSexWrap > .sexDiv > .sexName{
        width: 100%;
        height: 1.02rem;
        text-align: center;
        position: absolute;
    }
    .cover > .changeSexWrap > .sexDiv > .sexName > div{
        height: 0.51rem;
        line-height: 0.51rem;
    }
    .personInfoHead{
        width: 100%;
        height: 0.80rem;
        line-height: 0.80rem;
        background: #a92124;
    }
    .personInfoHead > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .personInfoHead > .backWrap > .back{
        margin: 0.225rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .personInfoHead > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.80rem;
        color: rgb(255, 255, 255);
        font-size: 0.30rem;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-family: "PingFang";
    }
    .personInfoHead > .clearAll{
        position: absolute;
        right: 0.20rem;
        top:0;
        width: 1.00rem;
        height: 0.80rem;
        line-height: 0.80rem;
        font-size: 0.26rem;
        text-align: right;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
    }
    /*头像*/
    .headImg{
        width: 100%;
        height: 1.06rem;
        border-bottom: 0.01rem solid #f2f2f2;
        line-height: 1.06rem;
        padding: 0 0.20rem;
        font-size: 0.28rem;
        font-family: "PingFang";
        color: rgb(102, 102, 102);
    }
    .headImg > .img{
        width: 0.60rem;
        height: 0.60rem;
        border-radius: 50%;
        float: right;
        margin-top: 0.23rem;
        overflow: hidden;
    }
    .headImg > .img > img{
        width: 100%;
        height: 100%;
    }
    /*个人信息*/
    .infoContent{
        padding: 0 0.20rem;
    }
    .infoContent > .info{
        width: 100%;
        height: 0.74rem;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #f2f2f2;
        position: relative;
        line-height: 0.74rem;
        font-size: 0.28rem;
        font-family: "PingFang";
        color: rgb(102, 102, 102);
    }
    .infoContent > .info > .inputInfo{
        width: 60%;
        height: 0.74rem;
        position: absolute;
        right: 0.30rem;
        top:0;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
        text-align: right;
        background: none;
        font-size: 0.26rem;
        font-family: "PingFang";
        color: rgb(102, 102, 102);
    }
    .infoContent > .info > .nickName{
        color: rgb(0, 0, 0);
    }
    .infoContent > .tagDiv{
        height: 1.48rem;
        border-bottom: none;
    }
    .infoContent > .tagDiv > .tagInfo{
        height: 1.48rem;
        line-height: 0.74rem;
    }
    .totalNum{
        width: 100%;
        height: 0.60rem;
        font-size: 0.24rem;
        font-family: "PingFang";
        color: rgb(153, 153, 153);
        line-height: 0.60rem;
        text-align: right;
        box-sizing: border-box;
        padding-right: 0.30rem;
    }
    .infoContent > .info > .arrow{
        width: 0.30rem;
        height: 0.74rem;
        float: right;
    }
    .infoContent > .info > .arrow > img{
        width: 0.12rem;
        height: 0.22rem;
        float: right;
        margin-top: 0.26rem;
    }
</style>
<script>
    export default{
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
            this.getPersonInfo();                   //获取个人信息
        },
        data(){
            return {
                showSave:false,                             //是不是显示保存按钮
                nickName: '',                               //昵称
                sex:"",                                     //性别
                birthday:"",                                //生日
                vocation:"",                                //职业
                tagName:"",                                 //标签
                sexNum:1,                                   //性别的代号 0 1 2 对应男 女 保密
                showNickName:false,                        //显示修改昵称遮罩
                showSex:false,                             //显示修改性别的遮罩
                showAddress:false,                         //显示修改地址的遮罩
                showVocation:false,                        //修改职业
                showTagName:false,                         //修改标签
                totalNum:26,                                //最多输入26个字符
                showTotalNum:false,                        //显示最多输入
                middleSex:"",                               //性别的中间变量
                errorMsg:"",                                //提示信息
                showErrorMsgTip:false,                     //是不是显示错误提示信息
                backSex:"",                                 //传给后台的sex信息
            }
        },
        methods:{
            //后退
            goBack(){
               this.$router.back();
            },
            hideCover(){
                this.showSex = false;
            },
            //获取生日
            getDate(){
                let that = this;                           //用that承接一下this
                mui.init();                                 //初始化
                let options = {                             //初始化参数
                    "type":"date",
                    "beginYear":1900,
                    "endYear":2600
                };
                /*首次显示时实例化组件，示例为了简洁，将 options 放在了按钮的 dom 上，也可以直接通过代码声明 optinos 用于实例化 DtPicker*/
                let picker = new mui.DtPicker(options);
                picker.show(function(rs) {
                    that.birthday = rs.text;                         //将日期改成选中那个
                    picker.dispose();
                });
            },
            //当数据改变的时候显示保存按钮
            change(){
                this.showSave = true;
            },
            //点击更改性别
            changeSex(){
                this.showSex = true;
            },
            //点击选择性别的确认
            checkSex(){
                this.showSex = false;
                this.sex = this.middleSex;
            },
            //选择男性
            checkMale(){
                this.middleSex = "男";
                $(".sexName").animate({top:0});
            },
            //选择女性
            checkFemale(){
                this.middleSex = "女";
                $(".sexName").animate({top:"-0.51rem"});
            },
            //改标签
            changeTag(){
                this.showTotalNum = true;
                this.totalNum = 26 - this.tagName.length;
            },
            //获取个人信息
            getPersonInfo(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/user/getUserInfo.do`,
                    method:"GET",
                    params:""
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        let infoArr = response.data.data;
                        this.nickName = infoArr.nickName;
                        this.sex = infoArr.sex;
                        switch (this.sex){
                            case 0:this.sex = "女";break;
                            case 1:this.sex = "男";break;
                        }
                        this.birthday = infoArr.birthdayStr;
                        this.vocation = infoArr.job;
                        this.tagName = infoArr.description;
                        if(this.tagName == "null"){
                            this.tagName = "";
                        }
                    }else{
                        this.errorMsg = response.data.data;
                        this.showErrorMsgTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                        },2000);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            //保存个人信息
            saveInfo(){
                switch (this.sex){
                    case "女":this.backSex = 0;break;
                    case "男":this.backSex = 1;break;
                }
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/mobile/user/updateUserInfo.do`,
                    method:"POST",
                    data:{
                        nickName:this.nickName,
                        sex:this.backSex,
                        birthdayStr:this.birthday,
                        job:this.vocation,
                        description:this.tagName,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    },
                    withCredentials:true                            //加了这段就可以跨域了
                }).then((response) => {
                    console.log(response);
                    if(response.data.success == 1){
                        this.errorMsg = response.data.data;
                        this.showErrorMsgTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                        },2000);
                        this.showTotalNum = false;
                    }else {
                        this.errorMsg = response.data.data;
                        this.showErrorMsgTip = true;
                        let that = this;
                        setTimeout(function () {
                            that.showErrorMsgTip = false;
                        },2000);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

