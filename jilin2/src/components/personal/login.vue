<template>
    <div>
        <div class="header">
            <div class="back" @click="goBack()">
                <img src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h3 class="title">
                <span>登录</span>
            </h3>
        </div>
        <!--手机号-->
        <div class="inputWrap phoneNumWrap">
            <!--<input type="text" placeholder="请输入手机号" v-model="phoneNum" v-on:input="checkPhoneNum()">-->
            <!--<p v-show="phoneError">{{phoneErrorMsg}}</p>-->
            <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="phoneNum" v-on:focus="cancelErrorTip()">
        </div>
        <!--密码-->
        <div class="inputWrap passwordWrap">
            <!--<input type="password" placeholder="请输入密码" maxlength="18" minlength="4" v-model="password" v-on:input="checkPassword()">-->
            <!--<p v-show="passwordError">{{passwordErrorMsg}}</p>-->
            <input type="password" placeholder="请输入密码" maxlength="18" minlength="4" v-model="password" v-on:focus="cancelErrorTip()">
        </div>
        <!--验证码-->
        <div class="inputWrap verificationcodeWrap" v-show="identifyShow">
            <input id="code" v-model="verificationCode" maxlength="4" type="tel" placeholder="请输入验证码">
            <img @click="changeLoginImg($event)" :src="getCodeUrl">
        </div>
        <!--登录-->
        <div class="config">
            <input type="button" value="登录" @click="login()" :disabled="locked">
        </div>
        <!--忘记密码和注册-->
        <!--<router-link to="#">
            <span class="forgetPassWord">忘记密码?</span>
        </router-link>-->
        <a href="javascript:;">
            <span class="noAccount">还没有账号？<router-link to="Register">立即注册</router-link></span>
        </a>
        <!--微信和qq登录-->
        <div class="otherLogin">
            <div class="headLine">
                <div></div>
                <p>社交账号登录</p>
            </div>
            <div class="loginWrap">
            	
            		 <!--<div @click="WxLogin">-->
            		 <div style="margin: 0 auto">
            		 	<a href="http://test.tj720.com/mip/wxLogin.do">
	                    <img src="../../static/images/wechat.png" alt="">
	                    </a>
	                    <p>微信登录</p>
	                </div>
            	
                <!--<div>-->
                    <!--<img src="../../static/images/qq.png" alt="">-->
                    <!--<p>QQ登录</p>-->
                <!--</div>-->
            </div>
        </div>
        <!--登录错误信息提示-->
        <transition name="showError">
            <p class="errorTip" v-show="showErrorMsgTip">{{errorMsg}}</p>
        </transition>
        <!--<p v-show="showErrorMsg">{{errorMsg}}</p>-->
        <div style="clear: both"></div>
    </div>
</template>
<style scoped>
    .showError-enter-active,.showError-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .showError-enter,.showError-leave-active{
        opacity: 0;
    }
    .header {
        width: 100%;
        height: 0.80rem;
        background: #a92124;
    }
    .header > .back{
        width: 0.60rem;
        height: 100%;
        padding: 0 0 0 0.20rem;
        float: left;
    }
    .header > .back >img{
        width: 0.19rem;
        height: 0.35rem;
        margin-top: 0.225rem;
    }
    .header > .title{
        font-size: 0.30rem;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 0.80rem;
    }
    .header > .title > span{
        margin-left: -0.60rem;
    }
    .phoneNumWrap{
        padding: 0.40rem 0.60rem 0;
    }
    .passwordWrap{
        margin-top: -0.06rem;
        padding: 0 0.60rem;
    }
    .inputWrap > input{
        font-size: 0.26rem;
        color: rgb(1, 1, 1);
        border: 0.01rem solid rgb(223, 223, 221);
        border-radius: 0.05rem;
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 0.82rem;
    }
    .verificationcodeWrap{
        padding: 0 0.60rem;
        position: relative;
        margin-top: -0.04rem;
    }
    .verificationcodeWrap > img{
        position: absolute;
        right: 0.80rem;
        top:0.15rem;
    }
    .config{
        padding:0.10rem 0.60rem 0;
    }
    .config > input{
        border-radius: 0.05rem;
        background-color: rgb(169, 33, 36);
        width: 100%;
        height: 0.80rem;
        font-size: 0.28rem;
        color: rgb(255, 255, 255);
    }
    a > span{
        display: inline-block;
        font-size: 0.24rem;
        color: rgb(169, 33, 36);
        padding-top: 0.12rem;
    }
    .forgetPassWord{
        margin-left: 0.60rem;
    }
    .noAccount{
        float: right;
        padding-right: 0.60rem;
        color: rgb(1,1,1);
    }
    .noAccount > a{
        color: rgb(169, 33, 36);
    }
    .otherLogin{
        width: 100%;
        height: 2.60rem;
        padding: 0 0.60rem;
        position: fixed;
        bottom: 0;
    }
    .otherLogin > .headLine > div{
        position: absolute;
        top:0.12rem;
        width: 81.25%;
        height: 0.02rem;
        background: #ccc;
        z-index: 0;
    }
    .otherLogin > .headLine > p{
        font-size: 0.22rem;
        color: rgb(51, 51, 51);
        width: 1.95rem;
        height: 0.24rem;
        margin: 0 auto;
        background: #fff;
        line-height: 0.24rem;
        position: relative;
        padding: 0 0.25rem;
    }
    .loginWrap{
        width: 65%;
        height: 2.30rem;
        margin: 0 auto;
    }
    .loginWrap > div{
        padding-top: 0.40rem;
        /*float: left;*/
        width: 50%;
        height: 100%;
        text-align: center;
    }
    .loginWrap > div img{
        width: 0.98rem;
        height: 0.98rem;
    }
    .loginWrap > div > p{
        padding-top: 0.15rem;
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
</style>
<script>
    export default{
        data(){
            return {
                phoneNum:"",                                                      //手机号
                phoneReg:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9]|0[0-9])\d{8}$/,    //手机号的正则验证
                phoneErrorMsg:"",                                                 //手机号的错误提示
                phoneError:false,                                                //显示不显示手机号的错误提示信息
                password:"",                                                      //密码
                passwordErrorMsg:"",                                              //密码的错误提示信息
                passwordError:false,                                             //显示不显示密码的错误提示信息
                errorTimes:0,                                                     //num   登录没有成功的次数
                identifyShow:false,                                              //验证码要不要隐藏
                verificationCode:'',                                              //验证码
                errorMsg:'',                                                      //登录错误提示信息
                lockTwoHours:false,                                              //锁定两个小时
                userInfo:'',                                                      //用户信息
                showErrorMsg:false,                                              //显示登录后的错误信息
                locked:false,                                                    //开始的时候没有锁定
                showErrorMsgTip:false,                                           //显示错误信息
                userStr:"",                                                       //将登陆信息存入session
                getCodeUrl:"",                                                    //获取验证码的地址
                user:'',
                userPwd:"",
                height:''
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
            this.getCodeUrlFun();
        },
        mounted(){
            //当屏幕的输入数字的时候就把其他的登录隐藏
            window.addEventListener("resize", function () {
                this.height = document.documentElement.clientHeight;
                if(this.height <= 500){
                    $(".otherLogin").css({display:"none"});
                }else {
                    $(".otherLogin").css({display:"block"});
                }
            }, false);
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            //输入框聚焦的时候隐藏提示框
            cancelErrorTip(){
                this.showErrorMsgTip = false;
            },
            //拿到验证码的url
            getCodeUrlFun(){
                this.getCodeUrl = `${this.$store.state.mutations.getUrl}/mip/getImgCode.do`
            },
            //登录
            login(){
                //检查手机号是不是符合规则
                //手机号为空
                if(this.phoneNum.length == 0){
                    this.showErrorMsgTip = true;
                    this.errorMsg = "请输入11位手机号";
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(!(this.phoneReg.test(this.phoneNum))){
                    this.showErrorMsgTip = true;
                    this.errorMsg = "请输入正确的手机号";
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(this.password.length == 0){
                    this.showErrorMsgTip = true;
                    this.errorMsg = "请输入密码";
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else {
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/frontLogin.do`,
                        method:"POST",
                        data:{
                            phone:this.phoneNum,
                            password:this.password,
                            verificationCode:this.verificationCode
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
//                        console.log(response.data.success);
                        if(response.data.success == -101){
                            this.errorMsg = response.data.data;
                            this.showErrorMsgTip = true;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                        }else if(response.data.data.sessionAdminName != null){
//                            console.log("登录成功");
                            //隐藏错误提示信息,把所有的都清空
                            let that = this;
                            setTimeout(function () {
//                                this.phoneNum = '';
//                                this.password = '';
                                that.showErrorMsgTip = false;
                                that.errorMsg = "";
                            },500);
                            //保存用户登录信息
                            this.userPwd = {
                                phoneNum:this.phoneNum,                                     //用户名
                                password:this.password,                                     //用户密码
                                nickName:response.data.data.nickName,			            //昵称
                                uid:response.data.data.id,					                //id
                                headimgurl:response.data.data.headimgurl,		            //头像路径
                                sessionAdminName:response.data.data.sessionAdminName,	    //session中保存的
                                isWxLogin:false
                            };
                            //将数据放入浏览器本地存储
	                        this.userStr = JSON.stringify(this.userPwd);
                            this.user = JSON.stringify(this.userPwd);
							sessionStorage.userStr = this.userStr;
                            localStorage.user = this.userStr;
//                              console.log(this.userInfo);
//                              this.$store.commit('updateUserInfo',this.userInfo);
//                              console.log(this.$store.state.mutations.userInfo);    //根路径里边的userinfo
							window.location.href="/mip/jilin2/index.html?login=true";
//                          this.$router.push({path:'Personal'});
                        }else{
                            this.errorMsg = response.data.data.tipMessage;
//                            this.showErrorMsg = true;
                            this.showErrorMsgTip = true;
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                        }
                        if(response.data.data.errorTimes == 0){
                            this.identifyShow = false;
                            this.lockTwoHours = false;
                            return;
                        }else if(response.data.data.errorTimes > 0){
                            this.identifyShow = true;                 //错误次数超过1次就输入验证码
                        }else if(response.data.data.errorTimes >= 5){
                            //错误次数超过5次提示被锁定
                            this.showErrorMsgTip = true;
                            this.errorMsg = "您输入的错误次数过多，锁定两个小时";
                            this.showErrorMsg = true;
                            this.locked = true;     //锁定
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            WxLogin(){
            	//微信第三方登录
//          	this.$http({
//          		url:,
//          		method:"get",
//          	}).then(function(res){
//          		console.log(res);
//          	})
				var _this = this;
            	$.ajax({
            		type:"get",
            		url:`${_this.$store.state.mutations.getUrl}/mip/wxLogin.do`,
            		async:true,
            		dataType:'jsonp',
//          		crossDomain:true,
            		success:function(data){
            			console.log(data);
            		}
            	});
            },
            //改验证码
            changeLoginImg(e){
                let target = $(e.target);
                target.attr("src",this.getCodeUrl + Math.random());
            }
        },
    }
</script>