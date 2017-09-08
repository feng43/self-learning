'use strict';
import Home from "../components/Home.vue"
import userCenter from "../components/userCenter.vue"
import login from "../components/login.vue"
import forgetPwd from "../components/forgetPwd.vue"

export default[
	{
		path:'/home',
		component:Home
	},{
		path:'/',
		redirect:'/home'
	},{
		path:'*',
		redirect:'/home'
	},{
		path:'/userCenter',
		component:userCenter
	},{
		path:'/login',
		component:login
	},{
		path:'/forgetPwd',
		component:forgetPwd
	}
]