'use strict';
import Home from "../components/Home.vue"
import userCenter from "../components/userCenter.vue"
import login from "../components/login.vue"
import forgetPwd from "../components/forgetPwd.vue"
import myPartner from "../components/myPartner.vue"
import myPartnerSec from "../components/myPartnerSec.vue"
import addPartner from "../components/addPartner.vue"
import addPartnerSec from "../components/addPartnerSec.vue"
import addMyPartner from "../components/addMyPartner.vue"
import addMyInvestor from "../components/addMyInvestor.vue"
import bankCard from "../components/bankCard.vue"
import editCard from "../components/editCard.vue"
import integralCard from "../components/integralCard.vue"
import editPwd from "../components/editPwd.vue"
import register from "../components/register.vue"
import integralDetail from "../components/integralDetail.vue"
import getCash from "../components/getCash.vue"
import share from "../components/share.vue"
import pay from "../components/pay.vue"
import paySuccess from "../components/paySuccess.vue"

export default[
	{
		path:'/home',
		component:Home
	},{
		path:'/',
		redirect:'/login'
	},{
		path:'*',
		redirect:'/login'
	},{
		path:'/userCenter',
		component:userCenter
	},{
		path:'/login',
		component:login
	},{
		path:'/forgetPwd',
		component:forgetPwd
	},{
		path:'/myPartner',
		component:myPartner
	},{
		path:'/myPartnerSec',
		component:myPartnerSec
	},{
		path:'/addPartner',
		component:addPartner
	},{
		path:'/addPartnerSec',
		component:addPartnerSec
	},{
		path:'/addMyPartner',
		component:addMyPartner
	},{
		path:'/addMyInvestor',
		component:addMyInvestor
	},{
		path:'/bankCard',
		component:bankCard
	},{
		path:'/editCard',
		component:editCard
	},{
		path:'/integralCard',
		component:integralCard
	},{
		path:'/editPwd',
		component:editPwd
	},{
		path:'/register',
		component:register
	},{
		path:'/integralDetail',
		component:integralDetail
	},{
		path:'/getCash',
		component:getCash
	},{
		path:'/share',
		component:share
	},{
		path:'/pay',
		component:pay
	},{
		path:'/paySuccess',
		component:paySuccess
	}
]