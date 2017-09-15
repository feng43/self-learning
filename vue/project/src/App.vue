<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  data() {
    return {
      appId: '',
      timestamp: "",
      nonceStr: "",
      signature: ""
    }
  },
  //name: 'app',
  components: {
    //Homefooter
  },
  created() {
      this.$http.get("/huiyimember/wxconf?url=" + window.location.href).then((res) => {
        console.log(JSON.parse(res.body.content.data.json));
        var configData = JSON.parse(res.body.content.data.json);
        this.appId = res.body.content.data.appId;
        this.timestamp = configData.timestamp;
        this.nonceStr = configData.noncestr;
        this.signature = configData.signature;
        var _this = this;
        wx.config({
          debug: true,
          appId: _this.appId,
          timestamp: _this.timestamp,
          nonceStr: _this.nonceStr,
          signature: _this.signature,
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard',
            'translateVoice'
          ]
        });
        /*wx.ready(function(){
          //alert("准备好了");
          wx.onMenuShareAppMessage({ // 分享给朋友

            title: "标题", // 分享标题

            desc: "描述",   // 分享描述

            link: 'http://dwgl.nor-land.com/hyys/?#/share',   // 分享链接 默认以当前链接

            imgUrl: "../assets/img/dot.png",// 分享图标
            success: function () {
              alert('分享成功');
            },
            cancel: function () {
              alert('分享到朋友取消');
            }

          })
        });*/
        wx.error(function(res){
            console.log(res)
        });

        //  超时关闭
        /*setTimeout(e=>{console.log(e);},3000);*/
        
      }).catch((err) => {
        console.log("--err--");
        console.log(err);

      })
    }
}
</script>
<!-- <script type="text/javascript" src="./assets/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="./assets/js/swiper.min.js"></script> -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* height: 100vh;
  width: 100vw; */
}
@import "./assets/css/reset.css";
@import "./assets/css/style.css";
</style>
<style src="./assets/css/swiper.min.css"></style>
