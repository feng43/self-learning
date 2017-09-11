<template>
    <div>
        <div class="changePassHead">
            <div class="backWrap" @click="goBack()">
                <img class="back" src="../../static/images/bowuguan_backBtn.png" alt="">
            </div>
            <h2 class="title">修改密码</h2>
        </div>
        <div class="changeWrap">
            <input type="password" v-model="originPassword" placeholder="请输入原密码">
            <input type="password" v-model="newPassword" placeholder="请输入新密码">
            <input type="password" v-model="reNewPassword" placeholder="请确认新密码">
        </div>
        <div class="confirmWrap">
            <input class="confirm" type="button" value="确定" @click="changePassword()">
        </div>
        <transition name="fadeIn">
            <p class="errorTip" v-show="showMsg">{{errorMsg}}</p>
        </transition>
    </div>
</template>
<style scoped>
    .fadeIn-enter-active,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .fadeIn-enter,.fadeIn-leave-active{
        transition: 0.5s all ease;
        opacity: 0;
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
    .changePassHead{
        width: 100%;
        height: 0.80rem;
        line-height: 0.80rem;
        position: fixed;
        left: 0;
        top:0;
        background: #a92124;
    }
    .changePassHead > .backWrap{
        float: left;
        width: 10%;
        height: 100%;
    }
    .changePassHead > .backWrap > .back{
        margin: 0.225rem 0 0 0.20rem;
        width: 0.19rem;
        height: 0.35rem;
    }
    .changePassHead > .title{
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 0.80rem;
        font-size: 0.30rem;
        font-family: "PingFang";
        color: rgb(255, 255, 255);
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .changeWrap{
        width: 100%;
        margin-top: 1.12rem;
        padding: 0.20rem 0.60rem;
    }
    .changeWrap > input{
        border:0.01rem solid rgb(223, 223, 221);
        border-radius: 0.05rem;
        width: 100%;
        height: 0.82rem;
        font-size: 0.26rem;
        color: #666666;
    }
    .confirmWrap{
        padding: 0 0.60rem;
    }
    .confirm{
        display: block;
        width: 100%;
        height: 0.80rem;
        border-radius: 0.05rem;
        background-color: rgb(169, 33, 36);
        color: #fff;
        font-size: 0.28rem;
    }
</style>
<script>
    export default{
        data(){
            return {
                passwordReg:/^[0-9A-Za-z_]{8,18}$/, //密码的正则表达式
                originPassword: '',                  //原密码
                newPassword: '',                     //新密码
                reNewPassword: '',                   //确认新密码
                errorMsg:'',                         //错误信息提示
                showMsg:false,                       //显示不显示错误提示
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            //确认更改密码
            changePassword(){
                //检查原密码和现密码
                if(this.originPassword == ''){
                   this.errorMsg = "原密码不能为空";
                   this.showMsg = true;
                   let that = this;
                   setTimeout(function () {
                       that.showMsg = false;
                   },2000);
                   return;
                }else if(!(this.passwordReg.test(this.originPassword))){
                    this.errorMsg = "原密码必须为8-18为数字或字母";
                    this.showMsg = true;
                    let that = this;
                    setTimeout(function () {
                        that.showMsg = false;
                    },2000);
                    return;
                }else if(this.newPassword == ''){
                    this.errorMsg = "新密码不能为空";
                    this.showMsg = true;
                    let that = this;
                    setTimeout(function () {
                        that.showMsg = false;
                    },2000);
                    return;
                }else if(this.newPassword == this.originPassword){
                    this.errorMsg = "不能使用原来的密码";
                    this.showMsg = true;
                    let that = this;
                    setTimeout(function () {
                        that.showMsg = false;
                    },2000);
                    return;
                }else if(!(this.passwordReg.test(this.newPassword))){
                    this.errorMsg = "密码必须为8-18为数字或字母";
                    this.showMsg = true;
                    let that = this;
                    setTimeout(function () {
                        that.showMsg = false;
                    },2000);
                    return;
                }else if(this.newPassword != this.reNewPassword){
                    this.errorMsg = "您两次输入的密码不一致";
                    this.showMsg = true;
                    let that = this;
                    setTimeout(function () {
                        that.showMsg = false;
                    },2000);
                    return;
                }else {
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/front/updatePass.do`,
                        method:"POST",
                        data:{
                            orgPass:this.originPassword,
                            newPass:this.newPassword
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (obj) {
                            var str = [];
                            for (var s in obj) {
                                str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                            }
                            return str.join("&");
                        }
                    }).then((response) => {
                        console.log(response);
                        if(response.data.success == 1){
                            //修改密码成功
                            this.errorMsg = response.data.data;
                            this.showMsg = true;
                            let that = this;
                            setTimeout(function () {
                                //还原所有的变量
                                that.originPassword = '';
                                that.newPassword = '';
                                that.reNewPassword = '';
                                that.errorMsg = '';
                                that.showMsg =false;
                                that.$router.push({path:'Personal'});        //2秒之后跳到个人中心页面
                            },2000);
                        }else {
                            this.errorMsg = response.data.data;
                            this.showMsg = true;
                        }
                    })
                }
            }
        },

    }
</script>