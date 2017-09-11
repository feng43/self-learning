import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.config.js'
import store from './store/'
import axios from 'axios'
import Loading from './components/loading/'

import VueLazyload from 'vue-lazyload'
//import VueLazyload from 'vue-lazyload/vue-lazyload-next'

Vue.use(VueLazyload, {
//error: 'dist/error.png',
//loading: 'dist/login.gif',
  try: 3 // default 1
})


Vue.use(VueRouter);
Vue.use(Loading);

// 关于axios的一些配置
// axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的

   axios.interceptors.request.use(function (config) {  //配置发送请求的信息
     store.dispatch('showLoading')  
     return config;
   }, function (error) {
     return Promise.reject(error);
   });

   axios.interceptors.response.use(function (response) { //配置请求回来的信息
     store.dispatch('hideLoading')
     return response;
   }, function (error) {

     return Promise.reject(error);
   });

// //axios对象挂到vue原型上了
Vue.prototype.$http = axios;

const router = new VueRouter({
//	mode:'history',
	scrollBehavior:()=>({
		y:0
	}),
	routes
});
// router.prototype.go(-1)

export default new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
});


