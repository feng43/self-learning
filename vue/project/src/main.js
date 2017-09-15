// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import wx from 'weixin-js-sdk'
/*Vue.use(wx)*/
Vue.use(VueResource)


export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
