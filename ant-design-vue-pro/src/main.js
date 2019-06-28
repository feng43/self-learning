import Vue from "vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// import "ant-design-vue/dist/antd.less";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input
} from "ant-design-vue";
// import "ant-design-vue/lib/button/style";

import Authorized from "./components/Authorized";

import Auth from "./directives/auth";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);

Vue.component("Authorized", Authorized);

Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
