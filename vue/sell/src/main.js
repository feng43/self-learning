// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';   //App.vue
import router from './router';
import VueResource from 'vue-resource';

import 'common/stylus/index.styl';

Vue.use(VueResource);

Vue.config.productionTip = false;

//Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',   //挂载点  挂载在id=app上
  router,
  template: '<App/>',
  components: { App }
});
// 
// 
// let app = Vue.extend(App);
// let router = new VueRouter;

// router.map({
// 	'/goods' : {
// 		components : goods
// 	}
// });
// router.start(app,"#app");