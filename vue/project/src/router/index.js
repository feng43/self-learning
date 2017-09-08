import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router.config.js'

Vue.use(VueRouter)

const routers = new VueRouter({
  	routes: router      //注意是routes而不是routers,坑就在这里
});

export default routers;
