/*
* @Author: 89305141@qq.com
* @Date:   2017-06-11 13:10:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-15 09:45:44
*/

'use strict';
import Home from './components/Home.vue'
import Exhibition from './components/zhanLan/Exhibition.vue'
import ExhibitionAll from './components/zhanLan/ExhibitionAll.vue'
import NearbyAll from './components/zhanLan/NearbyAll.vue'
import ExhibitionDetial from './components/zhanLan/ExhibitionDetial.vue'

//zj
import Bowuguan from './components/boWuGuan/museum.vue'
import museumDetail from './components/boWuGuan/museumDetail.vue'
import hot from './components/boWuGuan/museum_hot.vue'
import near from './components/boWuGuan/museum_near.vue'
import scrollMode from "./components/cangPing/scrollMode.vue"
import addressMap from "./components/boWuGuan/addressMap.vue"

//cwh
import Activity from './components/activity/activity.vue'
import ActivityDetail from './components/activity/activityDetail.vue'
import Virtual from './components/virtual/virtual.vue'
import Story from './components/storyOfJilin/storyOfJilijn.vue'
import StoryDetail from './components/storyOfJilin/storyDetail.vue'
import Personal from './components/personal/personal.vue'
import Login from './components/personal/login.vue'
import Register from './components/personal/register.vue'
import MyVoice from './components/personal/myVoice.vue'
import MyCollection from './components/personal/myCollection.vue'
import ChangePassword from './components/personal/changPassword.vue'
import PersonalInfo from './components/personal/personalInfo.vue'
import CollectionMore from './components/homeMore/collectionMore.vue'
import CurationHome from './components/ceZhan/curation_home.vue'
import OtherCuration from './components/ceZhan/otherCuration.vue'
import MyCuration from './components/personal/myCuration.vue'
import CurationDetail from './components/ceZhan/curationDetail.vue'
import Article from './components/article/articleList.vue'

//cp
import cpjs from './components/cangPing/cpjs.vue'
import Cpdetail from './components/cangPing/Cpdetail.vue'
import cpSearch from './components/cangPing/cpSearch.vue'


//zj
import cezhan from './components/ceZhan/cezhan.vue'
import cezhan_message from './components/ceZhan/ceZhan_message.vue'
import wenchuang_detail from './components/article/wenchuang_detail.vue'

export default[
	//策展
	{
		path:'/cezhan',
		component:cezhan
	},{
		path:"/cezhan_message",
		component:cezhan_message
	},{
		path:'/home',
		component:Home
	},{
		path:'/',
		redirect:'/home'
	},{
		path:'*',
		redirect:'/home'
	},{
		path:'/exhibition',
		component:Exhibition
	},{
		path:'/ExhibitionDetial',
		component:ExhibitionDetial
	},{
		path:'/ExhibitionAll',
		component:ExhibitionAll
	},{
		path:'/NearbyAll',
		component:NearbyAll
	},{
		path:'/cpjs',
		component:cpjs
	},{
		path:'/Cpdetail',
		component:Cpdetail
	},{
		path:'/cpSearch',
		component:cpSearch
	},

	// zj museum start
	{
		path:'/museum',
		component:Bowuguan
	},{
		path:"/museumDetail",
		component:museumDetail
	},{
		path:'/hot',
		component:hot
	},{
		path:"/near",
		component:near
	},{
		path:"/scrollMode",
		component:scrollMode
	},{
		path:"/addressMap",
		component:addressMap
	},{
		
		path:"/wenchuang_detail",
		component:wenchuang_detail
	},

	//cwh
	// 活动
	{
		path:'/Activity',
        component:Activity
	},
	{
		path:'/ActivityDetail',
		component:ActivityDetail
	},
	// 虚拟展厅
	{
		path:'/Virtual',
		component:Virtual
	},
	//吉林故事
	{
		path:'/Story',
		component:Story
	},
	//吉林故事详情
	{
		path:'/StoryDetail',
		component:StoryDetail
	},
	//个人中心
	{
		path:'/Personal',
		component:Personal
	},
	//登录
	{
		path:'/Login',
		component:Login
	},
	//注册
	{
		path:'/Register',
		component:Register
	},
	//我的声音
	{
		path:'/MyVoice',
		component:MyVoice
	},
	//我的收藏
	{
		path:'/MyCollection',
		component:MyCollection
	},
	//修改密码
	{
		path:'/ChangePassword',
		component:ChangePassword
	},
	//个人信息
	{
		path:'/PersonalInfo',
		component:PersonalInfo
	},
	//首页的经典藏品更多
	{
		path:'/CollectionMore',
		component:CollectionMore
	},
	//策展首页
	{
        path:'/CurationHome',
        component:CurationHome
	},
	//他人的策展
	{
		path:'/OtherCuration',
		component:OtherCuration
	},
	//我的策展
	{
		path:'/MyCuration',
		component:MyCuration
	},
	//策展详情
	{
		path:'/CurationDetail',
		component:CurationDetail
	},
	//文创列表
	{
		path:'/Article',
		component:Article
	}
	
	
]