import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router)

export default new Router({
	//重置router 默认类名
	linkActiveClass : "active",
	routes: [
		{
			path:'/',
			redirect:'/goods'
		},{
			path:'*',
			redirect:'/goods'
		},{
			path: '/goods',
			name: 'goods',
			component: goods
		},{
			path: '/ratings',
			name: 'ratings',
			component: ratings
		},{
			path: '/seller',
			name: 'seller',
			component: seller
		}
	]
})
