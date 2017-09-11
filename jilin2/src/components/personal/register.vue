<template>
    <div>
        <!--第一页手机号获取验证码-->
        <div v-show="showPage == 1">
            <div class="header">
                <div class="back" @click="goBack()">
                    <img src="../../static/images/bowuguan_backBtn.png" alt="">
                </div>
                <h3 class="title">
                    <span>注册</span>
                </h3>
            </div>
            <div class="register registerPageOne">
                <div class="inputWrap phoneNum">
                    <input type="tel" placeholder="请输入手机号" name="phoneNum" maxlength="11" v-model="phoneNum">
                    <img src="../../static/images/del.png" alt="" @click="clearPhone()">
                </div>
                <div class="inputWrap identifyCode">
                    <input type="tel" placeholder="请输入四位手机验证码" maxlength="4" v-model="identifyCode" id="identifyCode">
                    <input type="button" class="getCode" @click="getSecretCode()" value="获取验证码" v-show="showGetCode">
                    <input type="button" class="getCode getCodeDone" @click="getSecretCode()" value="" v-show="!showGetCode">
                </div>
                <div class="termWrap checkedWrap">
                    <!--<input type="checkbox" v-model="state" >-->
                    <i class="checkImg" :class="{'checkImgActive':state==true}" @click="checked()"></i>
                    <span>我已阅读并同意 <a href="javascript:;" @click="showAgreement()" class="xieyi">《注册协议》</a></span>
                </div>
                <div class="confirm">
                    <input type="button" value="下一步" @click="goPageTwo()" :disabled="!state">
                </div>
            </div>
        </div>
        <!--第二页设置密码和确认密码-->
        <div v-show="showPage == 2">
            <div class="header">
                <div class="back" @click="goPageOne()">
                    <img src="../../static/images/bowuguan_backBtn.png" alt="">
                </div>
                <h3 class="title">
                    <span>设置密码</span>
                </h3>
            </div>
            <div class="register registerPageTwo">
                <div class="topImg">
                    <img src="../../static/images/checkDone.png" alt="">
                    <p>验证通过！请重置密码 </p>
                </div>
                <div class="inputWrapTwo nickName">
                    <input type="text" placeholder="输入昵称" v-model="nickName">
                </div>
                <div class="inputWrapTwo passWord">
                    <input type="password" placeholder="设置密码" minlength="8" maxlength="18" v-model="passWord">
                </div>
                <div class="inputWrapTwo rePassWord">
                    <input type="password" placeholder="确认密码" minlength="8" maxlength="18"  v-model="rePassWord">
                </div>
                <div class="confirm confirmTwoPage">
                    <input type="button" value="完成" @click="goPageSuccess()">
                </div>
            </div>
        </div>
        <!--注册成功-->
        <div v-show="showPage == 3">
            <div class="header">
                <div class="back" @click="goBackPageTwo()">
                    <img src="../../static/images/bowuguan_backBtn.png" alt="">
                </div>
                <h3 class="title">
                    <span>注册成功</span>
                </h3>
            </div>
            <div class="register registerSuccess">
                <div class="success">
                    <img src="../../static/images/registSuccess.png" alt="">
                    <p class="successRegisted">注册成功! {{leapTime}}秒后自动调转</p>
                    <div class="confirm confirmThreePage">
                        <input type="button" value="返回主页" @click="leapToHome()">
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息弹出框-->
        <transition name="tipMsg">
            <div class="cover" v-show="showCover">
                <div class="tipWrap">
                    <div class="title">提示</div>
                    <p class="msg">{{tipMsg}}</p>
                    <input type="button" class="tipConfirm" @click="hideCover()" value="确定">
                    <input type="button" class="tipCancel" @click="hideCover()" value="取消">
                </div>
            </div>
        </transition>
        <!--提示信息弹出框-->
        <transition name="tipMsg">
            <div class="cover" v-show="showRegistedMsg">
                <div class="tipWrap">
                    <div class="title">提示</div>
                    <p class="msg">该手机号已注册，请直接登录</p>
                    <input type="button" class="tipConfirm" @click="goLogin()" value="登录">
                    <input type="button" class="tipCancel" @click="hideCover()" value="取消">
                </div>
            </div>
        </transition>
        <!--注册协议-->
        <transition name="tipMsg">
            <div class="cover" v-show="showAgreementCover">
                <div class="agreementWrap">
                    <div class="title">注册协议</div>
                    <div class="agreementContent">
                        <h2>用户使用协议</h2>
                        <p>欢迎您注册成为“文物山东”网站用户。在注册前请您仔细阅读如下服务条款：</p>
                        <p>本服务协议双方为本网站与本网站客户，本服务协议具有合同效力。您确认本服务协议后，本服务协议即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站咨询。 无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击协议正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。</p>
                        <h3>协议细则</h3>
                        <h5>1、本网站服务条款的确认和接纳</h5>
                        <p>本网站各项服务的所有权和运作权归本网站拥有。</p>
                        <h5>2、用户必须：</h5>
                        <p>(1)自行配备上网的所需设备， 包括个人电脑、调制解调器或其他必备上网装置。</p>
                        <p>(2)自行负担个人上网所支付的与此服务有关的电话费用、 网络费用。</p>
                        <h5>3、用户在本网站交易平台上不得发布下列违法信息：</h5>
                        <p>(1)反对宪法所确定的基本原则的；</p>
                        <p>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                        <p>(3)损害国家荣誉和利益的；</p>
                        <p>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                        <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                        <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                        <p>(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                        <p>(8)侮辱或者诽谤他人，侵害他人合法权益的；</p>
                        <p>(9)含有法律、行政法规禁止的其他内容的。</p>
                        <h5>4、有关个人资料</h5>
                        <p>(1)提供及时、详尽及准确的个人资料。</p>
                        <p>(2)同意接收来自本网站的信息。</p>
                        <p>(3)不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。</p>
                        <h5>5、服务条款的修改</h5>
                        <p>本网站有权在必要时修改服务条款，本网站服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。</p>
                        <h5>6、用户的帐号、密码和安全性</h5>
                        <p>一旦注册成功成为用户，将得到一个密码和帐号。若用户未能保管好自己的帐号和密码安全，将由个人承担全部后果。另外，每个用户都要对其帐户中的所有活动和事件负全责。用户可随时根据指示改变个人密码，也可以结束旧的帐户重开一个新帐户。用户若发现任何非法使用帐号或账号存在安全漏洞的情况，请立即通知本网站。</p>
                        <h5>7、拒绝提供担保</h5>
                        <p>用户明确同意信息服务的使用由用户个人承担风险。本网站不担保服务不会受中断，对服务的及时性、安全性以及出错发生都不作担保，但会在能力范围内，避免出错。</p>
                        <h5>8、有限责任</h5>
                        <p>本网站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站形象受损，所以本网站事先提出这种损害的可能性，同时会尽量避免这种损害的发生。</p>
                        <h5>9、信息的储存及限制</h5>
                        <p>本网站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其服务的帐号。</p>
                        <h5>10、用户管理</h5>
                        <p>用户必须遵循：</p>
                        <p>(1) 使用信息服务不作非法用途。</p>
                        <p>(2) 不干扰或混乱网络服务。</p>
                        <p>(3) 遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规、政策、程序和惯例为根据的。</p>
                        <h5>11、保障</h5>
                        <p>用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用、违反服务条款的损害补偿费用以及其它人使用用户的电脑、帐号和其它知识产权的追索费。</p>
                        <h5>12、结束服务</h5>
                        <p>用户或本网站可随时根据实际情况中断一项或多项服务。本网站不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对之后的条款修改有异议，或对本网站服务不满，用户可以行使如下权利：</p>
                        <p>(1) 不再使用本网站信息服务。</p>
                        <p>(2) 通知本网站停止对该用户的服务。</p>
                        <p>结束用户服务后，用户使用本网站服务的权利马上中止。从即时起，用户没有权利、本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。</p>
                        <h5>13、通告</h5>
                        <p>所有发给用户的通告都可通过重要页面的公告或电子邮件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。</p>
                        <h5>14、信息内容的所有权</h5>
                        <p>本网站定义的信息内容包括：文字、软件、声音、相片、录象、图表；在广告中全部内容；本网站为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。因此，用户只能在本网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容，或创造与内容有关的派生产品。</p>
                        <h5>15、法律</h5>
                        <p>本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。</p>
                        <input type="button" value="已阅读" @click="hideAgreementCover()" class="argueBtn">
                    </div>
                </div>
            </div>
        </transition>
        <!--登录错误信息提示-->
        <transition name="showError">
            <p class="errorTip" v-show="showErrorMsgTip">{{errorMsg}}</p>
        </transition>
    </div>
</template>
<style scoped>
    /*错误提示信息弹出动画*/
    .showError-enter-active,.showError-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .showError-enter,.showError-leave-active{
        opacity: 0;
    }
    /*遮罩动画*/
    .tipMsg-enter-active,.tipMsg-leave-active{
        transition: 0.5s all ease;
        opacity:1;
    }
    .tipMsg-enter,.tipMsg-leave-active{
        opacity: 0;
    }
    /*遮罩tip层*/
    .cover{
        width: 100%;
        height: 100%;
        padding: 0 0.32rem;
        position: fixed;
        left: 0;
        top:0;
        background: rgba(0,0,0,0.49);
    }
    .cover > .tipWrap{
        width: 100%;
        height: 3.00rem;
        background: #fff;
        margin-top: 3.50rem;
        border-radius: 0.08rem;
        overflow: hidden;
        position: relative;
    }
    .cover > .tipWrap > .title{
        height: 0.88rem;
        width: 100%;
        background-color: rgb(169, 33, 36);
        padding-left: 0.20rem;
        line-height: 0.88rem;
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
        text-align: left;
        font-size: 0.30rem;
        color: rgba(255, 255, 255, 0.902);
    }
    .cover > .tipWrap > .msg{
        padding: 0.20rem;
    }
    .cover > .tipWrap input{
        position: absolute;
        margin-right: 0.20rem;
        bottom: 0.20rem;
    }
    .cover > .tipWrap .tipConfirm{
        right:1.20rem;
        background: rgb(169, 33, 36);
        color: #fff;
    }
    .cover > .tipWrap > .tipCancel{
        right:0
    }
    .cover > .agreementWrap{
        width: 100%;
        height:9.20rem;
        background: rgb(255,255,255);
        border-radius: 0.10rem;
        overflow: hidden;
        margin-top: 1.15rem;
    }
    .cover > .agreementWrap > .title{
        height: 0.88rem;
        width: 100%;
        background-color: rgb(169, 33, 36);
        padding-left: 0.20rem;
        line-height: 0.88rem;
        color: #fff;
        border-top-left-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
        text-align: center;
        font-size: 0.30rem;
        color: rgba(255, 255, 255, 0.902);
    }
    .cover > .agreementWrap > .agreementContent{
        padding: 0.37rem;
        height: 8.3rem;
        overflow: scroll;
        text-align: justify;
    }
    .cover > .agreementWrap > .agreementContent > h2{
        font-size: 0.32rem;
        font-weight: 600;
        text-align: center;
        padding-bottom: 0.20rem;
    }
    .cover > .agreementWrap > .agreementContent > h3{
        font-size: 0.28rem;
        font-weight: 600;
        padding: 0.20rem 0;
    }
    .cover > .agreementWrap > .agreementContent > h5{
        font-size: 0.26rem;
        font-weight: 600;
        padding: 0.20rem 0;
        color: rgb(0, 0, 0);
    }
    .cover > .agreementWrap > .agreementContent > p{
        font-size: 0.26rem;
        text-align: justify;
        color: rgb(0, 0, 0);
        line-height: 0.40rem;
        text-indent: 2em;
    }
    .argueBtn{
        border-radius: 0.05rem;
        background-color: rgb(169, 33, 36);
        width: 100%;
        height: 0.80rem;
        font-size: 0.28rem;
        color: rgb(255, 255, 255);
        text-align: center;
    }
    /*头部*/
    .header {
        width: 100%;
        height: 0.80rem;
        background: #a92124;
    }
    .header > .back{
        width: 0.60rem;
        height: 100%;
        padding: 0.225rem 0 0 0.20rem;
        float: left;
    }
    .header > .back >img{
        width: 0.19rem;
        height: 0.35rem;
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
    .register{
        width: 100%;
        padding: 0.16rem 0.60rem;
    }
    .register .inputWrap{
        position: relative;
        padding: 0;
        margin: 0.24rem 0 0 0;
    }
    .register .inputWrap > img{
        position: absolute;
        width: 0.40rem;
        height: 0.40rem;
        right: 0.24rem;
        top:0.21rem;
    }
    .register .inputWrap > input{
        border: 0.01rem solid rgb(223, 223, 221);
        border-radius: 0.05rem;
        background-color: rgb(255, 255, 255);
        height: 0.82rem;
        font-size: 0.26rem;
    }
    .register > .identifyCode{
        margin-top: 0.05rem;
    }
    .register .inputWrap > .getCode{
        position: absolute;
        right: 0.24rem;
        background: #fff;
        color: rgb(169, 33, 36);
        width: 1.50rem;
        height: 0.40rem;
        top:0.21rem;
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
        font-size: 0.22rem;
        text-align: right;
    }
    .register .inputWrap > .getCodeDone{
        color: rgb(51, 51, 51);
    }
    .termWrap{
        margin-top: 0.24rem;
    }
    .termWrap:after{
        content: '';
        display: block;
        clear: both;
    }
    .termWrap > .checkImg{
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
        background-image: url("../../static/images/checked.png");
        background-size: 0.64rem 0.32rem;
        background-position: -0.315rem 0;
        float: left;
        transition: background-position 0.5s ease;
    }
    .termWrap > .checkImgActive{
        background-position: 0 0;
    }
    .termWrap > span{
        display: inline-block;
        font-size: 0.24rem;
        color: rgb(1, 1, 1);
        float: left;
        margin-left: 0.08rem;
        margin-top: -0.02rem;
    }
    .termWrap > span > a{
        border-bottom: 0.02rem solid #af3033;
        color: #af3033;
    }
    .phoneTipError > p {
        padding-bottom: 0.15rem;
    }
    .getCodeError > p{
        padding-bottom: 0.28rem;
    }
    .checkedWrap{
        margin-top: -0.10rem;
    }
    .confirm{
        padding-top: 0.30rem;
        width: 100%;
    }
    .confirm > input{
        display: block;
        width: 100%;
        height: 0.80rem;
        border-radius: 0.05rem;
        background-color: rgb(169, 33, 36);
        color: #fff;
        font-size: 0.28rem;
    }
    /*第二页*/
    .topImg{
        width: 100%;
        height: 2.20rem;
        margin-top: -0.16rem;
        text-align: center;
        padding-top: 0.40rem;
    }
    .topImg > img{
        width: 0.62rem;
        height: 0.62rem;
    }
    .topImg > p{
        font-size: 0.26rem;
        color: rgb(1, 0, 0);
        text-align: center;
        padding-top: 0.24rem;
    }
    .inputWrapTwo{
        width: 100%;
        padding: 0;
        margin: 0;
        height: 0.82rem;
        margin-bottom: 0.24rem;
    }
    .inputWrapTwo > input{
        border:0.01rem solid rgb(223, 223, 221);
        border-radius: 0.05rem;
        width: 100%;
        height: 0.82rem;
        font-size: 0.26rem;
        color: #666666;
    }
    .errorTip{
        width: 100%;
        height: 0.80rem;
        line-height: 0.56rem;
        font-size: 0.24rem;
        color: #666666;
    }
    .errorTip > p{
        width: 100%;
        height: 100%;
    }
    .confirmTwoPage{
        padding-top: 0;
    }
    /*第三页*/
    .success{
        width: 100%;
        margin-top: -0.16rem;
        text-align: center;
        padding-top: 0.40rem;
    }
    .success > img{
        width: 0.62rem;
        height: 0.62rem;
    }
    .success > .successRegisted{
        font-size: 0.26rem;
        color: rgb(1, 0, 0);
        text-align: center;
        width: 100%;
        padding-top: 0.20rem;
    }
    .confirmThreePage{
        margin-top: 0.15rem;
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
                showPage:1,                                                                   //默认显示第一页
                phoneNum:"",                                                                  //手机号
//                regPhone:/^1[0-9][0-9]\d{8}$/,                                              //手机号正则表达式
//                regPhone:/^1[034578]\d{9}$/,                                                //手机号正则表达式
                regPhone:/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9]|0[0-9])\d{8}$/,        //手机号正则表达式
                identifyCode:"",                                                             //验证码
                nickName:"",                                                                 //设置昵称
                nickNameReg:/^[0-9a-zA-Z_\/u4e00-\u9fa5]{1,10}$/,                           //昵称的正则表达式验证
                nickNameMsg:"",                                                              //昵称的错误提示信息
                passWord:"",                                                                 //密码
                passwordReg:/^[0-9A-Za-z_]{8,18}$/,                                         //密码的正则表达式验证
                rePassWord:"",                                                               //确认密码
                tipMsg:"提示信息",                                                           //提示信息
                showCover:false,                                                            //提示框遮罩隐藏
                showAgreementCover:false,                                                   //协议的遮罩
                timeNum:60,                                                                  //60秒后可以重新获取
                state:true,                                                                 //复选框的状态，false没选中
                showRegistedMsg:false,                                                      //这个手机号已经注册成功的提示信息
                num:0,                                                                       //注册的时候第一次输入num = 0，这时候修改密码不提示两次不一致
                leapTime:5,                                                                  //注册成功后5秒跳转到主页
                timer:'',                                                                    //定时器
                verificationCode:'',                                                         //登录时要发送的验证码
                userInfo:'',                                                                 //用户信息
                showGetCode:true,                                                            //显示发送验证码
                showErrorMsgTip:false,                                                       //是不是要显示错误提示信息
                errorMsg:'',                                                                 //错误提示信息
            }
        },
        activated(){
            this.$store.dispatch('hideHeader');     //需要隐藏底部的栏
        },
        methods:{
            //第一页的业务逻辑
            goBack(){
                this.$router.go(-1);
            },
            //第一页的x清除电话号码
            clearPhone(){
                this.phoneNum = "";
            },
            //第一页的点击下一步跳转到第二页
            goPageTwo(){
                //this.showRegistedMsg = true;
                //验证手机和验证码是不是正确
                if(this.phoneNum.length == 0){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "手机号码不能为空";                                                  //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(!this.regPhone.test(this.phoneNum)){
                    this.showErrorMsgTip = true;                                                          //显示错误提示信息
                    this.errorMsg = "请输入正确的11位手机号码";                                                  //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(this.identifyCode.length != 4){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "请输入4位有效验证码";                                              //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else {
                    this.showPage = 2;
                }
            },
            //如果已经注册过，跳到登录页面
            goLogin(){
                this.$router.push({path:'Login'});      //跳到登录页面
                this.showRegistedMsg = false;          //隐藏提示框
            },
            //返回第一页
            goPageOne(){
                this.showPage = 1;
            },
            //返回第二页
            goBackPageTwo(){
                this.showPage = 2;
            },
            //获取验证码
            getSecretCode(){
                //发送请求验证码
                if(!(this.regPhone.test(this.phoneNum))){
                    this.errorMsg = "请输入正确的手机号码";
                    this.showErrorMsgTip = true;
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;               //2秒之后关上弹出框
                    },2000);
                    return;
                }else {
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/sendSecretCode.do`,
                        method:"get",
                        params:{
                            phone:this.phoneNum
                        }
                    }).then((response) => {
                        console.log(response)
                        if(response.data.success == -101){
                            this.tipMsg = "您频繁登录，ip登录受限，请联系管理员！";
                            this.showCover = true;
                            return;
                        }else if(response.data.success == 1){
                            //获取验证码成功
                            let that = this;                            //60秒倒计时
                            $(".getCodeDone").val(60);
                            this.showGetCode = false;                  //显示倒计时
                            this.phoneSuccess = false;                 //显示倒计时,将按钮设为禁用
                            let timer = setInterval(function () {
                                that.timeNum--;
                                $(".getCodeDone").val(that.timeNum+"s后重新获取");
                                if(that.timeNum == 0){
                                    $(".getCode").val("重新发送");
                                    this.showGetCode = true;            //隐藏倒计时,显示发送
                                    that.timeNum = 60;
                                    clearInterval(timer);                //清除定时器
                                    that.phoneSuccess = true;            //将按钮设置为可用
                                }
                            },1000);
                            return;
                        }else {
                            if(response.data.data == "0"){
                                //表示手机号已经存在，提示直接登录
                                this.showRegistedMsg = true;
                                return;
                            }else if(response.data.data == "-1"){
                                this.tipMsg = "您输入的手机号为空号";
                                this.showCover = true;
                                return;
                            }else if(response.data.data == "2"){
                                this.tipMsg = "系统异常";
                                this.showCover = true;
                                return;
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            //复选框选择和取消选择
            checked(){
                this.state = !this.state;
            },
            //隐藏遮罩，包括提示信息遮罩，和提示已注册要登录的遮罩
            hideCover(){
                this.showCover = false;
                this.showRegistedMsg = false;
            },
            //显示协议的遮罩
            showAgreement(){
                this.showAgreementCover = true;
            },
            //隐藏协议遮罩
            hideAgreementCover(){
                this.showAgreementCover = false;
            },
            //第二页的业务逻辑
            //点击下一步跳到注册成功页面
            goPageSuccess(){
                //先验证昵称和密码
                if(this.nickName.length == 0){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "昵称不能为空";                                                     //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(!(this.nickNameReg.test(this.nickName))){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "昵称必须为1-10位有效字符";                                         //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(this.passWord.length == 0){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "密码不能为空";                                                     //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(!(this.passwordReg.test(this.passWord))){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "密码必须由8到18位数字或字母组成";                                  //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else if(this.passWord != this.rePassWord){
                    this.showErrorMsgTip = true;                                                        //显示错误提示信息
                    this.errorMsg = "您两次输入的密码不一致";                                           //填写错误提示信息
                    let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
                    return;
                }else {
                    this.$http({
                        url:`${this.$store.state.mutations.getUrl}/mip/front/register.do`,
                        method:"get",
                        timeout: 5000,
                        params:{
                            phone:this.phoneNum,
                            secretCode:this.identifyCode,
                            nickName:this.nickName,
                            password:this.passWord
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
                        if(response.data.success == -101){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "您频繁登录，ip登录受限，请联系管理员";                              //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        }else if(response.data.success == 0){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "系统未知错误，请联系管理员";                                       //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        }else if(response.data.success == -1){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "手机号不可以为空";                                                 //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        }else if(response.data.success == -2){
                            //这个手机号已经注册过了
                            this.showRegistedMsg = true;
                            return;
                        }else if(response.data.success == -3){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "短信验证码不能为空";                                               //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        } else if(response.data.success == -4){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "未发送请求手机验证";                                               //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        }else if(response.data.success == -5){
                            this.showErrorMsgTip = true;                                                        //显示错误提示信息
                            this.errorMsg = "短信验证码错误";                                                   //填写错误提示信息
                            let that = this;
                            setTimeout(function () {
                                that.showErrorMsgTip = false;
                            },2000);
                            return;
                        }else if(response.data.success == 1){
                            //注册成功
                            this.clearData();                                        //还原所有的数据
                            this.showPage = 3;                                       //显示第三页
                            let that = this;
                            this.timer = setInterval(function () {
                                that.leapTime--;                                     //每隔一秒减1，5秒后跳转
                                if(that.leapTime == 0){
                                    clearInterval(that.timer);                       //关闭定时器
                                    that.clearData();                                //还原所有的数据
                                    that.login();                                    //登录一下跳转到个人中心
//                                    that.$router.push({path:"Login"});             //跳转到个人中心页面
                                }
                            },1000);
                            }else {
                                this.errorMsg = "短信验证码超时";
                                this.showErrorMsgTip = true;
                                let that = this;
                                setTimeout(function () {
                                    that.showErrorMsgTip = false;
                                },2000);
                                return;
                            }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            },
            //点击跳转主页跳转到主页
            leapToHome(){
                clearInterval(this.timer);                                          //清除定时器
                this.clearData();                                                   //还原所有的数据
                this.$router.push({path:'home'});                                   //跳到主页
            },
            clearData(){
                //把所有的数据都清空了
                this.showPage = 1,                                                                  //默认显示第一页
                this.phoneNum = "",                                                                 //手机号
                this.phoneTipError = "",                                                            //手机号正则验证报错
                this.phoneNumErrorTip = false,                                                     //手机号错误提示框
                this.phoneSuccess = false,                                                         //手机号还没有验证成功为false
                this.identifyCode = "",                                                             //验证码
                this.identifyErrorTip = false,                                                     //验证码的提示框
                this.identifyCodeError = "",                                                        //验证码的报错提示
                this.nickName = "",                                                                 //设置昵称
                this.nickNameMsg = "",                                                              //昵称的错误提示信息
                this.nickNameErrorShow = false,                                                    //昵称提示框先隐藏起来
                this.nickNameLegal = false,                                                        //昵称不合法为false，合法为true
                this.passWord = "",                                                                 //密码
                this.passwordMsg = "",                                                              //密码的错误提示信息
                this.passwordErrorShow = false,                                                    //显示密码错误的提示信息
                this.passwordLegal = false,                                                        //密码不合法为false，合法为true
                this.rePassWord = "",                                                               //确认密码
                this.rePasswordErrorShow = false,                                                   //确认密码错误提示信息
                this.rePasswordLegal = false,                                                      //确认重复的密码不合法为false，合法为true
                this.tipMsg = "提示信息",                                                           //提示信息
                this.showCover = false,                                                            //提示框遮罩隐藏
                this.showAgreementCover = false,                                                   //协议的遮罩
                this.timeNum = 60,                                                                  //60秒后可以重新获取
                this.state = false,                                                                //复选框的状态，false没选中
                this.showRegistedMsg =false,                                                       //这个手机号已经注册成功的提示信息
                this.num = 0,                                                                       //注册的时候第一次输入num = 0，这时候修改密码不提示两次不一致
                this.leapTime = 5                                                                   //5秒后自动跳转
            },
            //注册成功之后马上登录一下
            login(){
                this.$http({
                    url:`${this.$store.state.mutations.getUrl}/mip/frontLogin.do`,
                    method:"POST",
                    data:{
                        phone:this.phoneNum,
                        password:this.passWord,
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
                    console.log(response.data.success);
                    if(response.data.data.sessionAdminName != null){
                        console.log("登录成功");
                        //隐藏错误提示信息
                        let headimgurl = response.data.data.headimgurl;
                        if(headimgurl == "http://localhost/"){
                            headimgurl = "./static/images/3Dcp.png";
                            console.log("还没上传图片，用默认的头像");
                        }
                        //保存用户信息
                        this.userInfo = {
                            nickName:response.data.data.nickName,			            //昵称
                            uid:response.data.data.id,					                //id
                            headimgurl:headimgurl,		                                //头像路径
                            sessionAdminName:response.data.data.sessionAdminName,	    //session中保存的
                        };
                        console.log(this.userInfo);
                        this.$store.commit('updateUserInfo',this.userInfo);
                        console.log(this.$store.state.mutations.userInfo);              //根路径里边的userinfo
                        //将数据放入浏览器本地存储
                        this.userStr = JSON.stringify(this.userInfo);
                        sessionStorage.userStr = this.userStr;
                        this.$router.push({path:'Personal'});
                    }else {
                        this.$router.push({path:'Login'});
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        components: {

        }
    }
</script>


