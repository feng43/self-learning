/*
 * @Author: 89305141@qq.com
 * @Date:   2017-06-11 13:46:13
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-06-13 15:03:12
 */

'use strict';
import getters from './getters.js'
const state = {
    header: true,
    loading:false,
	getUrl: 'http://47.93.103.113:8080', //最后改这里的线上路径,
    yearTime: false, //是否显示年代
    appid:'wxf8f2f3917d846a7a',
    showSoundlist: false, //是否显示录音扇形功能
    sounder: true,
    sounding: false,
    //全局window scroll
    //path: 使用页面路由路径
    //objData: 函数，对象等数据
    //调用方法实例this.$store.state.mutations.scrollWin(topToggle,this);
    scrollWin(objData, _this) {

        $(window).unbind("scroll").on("scroll", function() {

            console.log(_this.$route.path);

            switch(_this.$route.path) {
                case "/museumDetail":
                    objData();
                    break;
                case '/ExhibitionAll':
                    objData();
                    break;
                case '/Virtual':
                    objData(_this);
                    break;
                case '/ExhibitionDetial':
                    objData();
                    break;
            }

        });
    },
//  userInfo:{
//      //保存用户信息
//      nickName:'',			//昵称
//      uid:'',					//id
//      headimgurl:'',			//头像路径
//      sessionAdminName:'',	//session中保存的
//  },
    cityData:{
        latitude:0,					//经度
        longitude:0					//维度
    },
    //文创详情列表
    articleDetailList:{
        dataList:[],              //详情列表
        id : 0,
    }
};
const mutations = {
    showHeader(state) {
        state.header = true;
    },
    hideHeader(state) {
        state.header = false;
    },
    showLoading(state) {
        state.loading = true;
    },
    hideLoading(state) {
        state.loading = false;
    },
    showYearTime(state) {
        state.yearTime = true;
    },
    hideYearTime(state) {
        state.yearTime = false;
    },
    showSoundlist(state){
        state.showSoundlist = true;
    },
    sounder(state){
        state.sounder = false;
    },
    sounding(state){
        state.sounding = true;
    },
    hideSoundlist(state){
        state.showSoundlist = false;
    },
    hidesounder(state){
        state.sounder =true;
    },
    hidesounding(state){
        state.sounding = false;
    },
    updateUserInfo(state,newUserInfo){
        state.userInfo = newUserInfo;
    },
    changeCityId(state,obj){
        state.cityData=obj;
    },
    setUrl(state,url){
        state.getUrl=url;
    },
    getArticleList(state,obj){
        state.articleDetailList = obj;
    }
};
export default {
    state,
    mutations,
    getters
}