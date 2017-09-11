/*
* @Author: 89305141@qq.com
* @Date:   2017-06-11 13:43:27
* @Last Modified by:   89305141@qq.com
* @Last Modified time: 2017-06-11 14:14:53
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from './mutations.js'
import actions from './actions.js'

export default new Vuex.Store({
	modules:{
		mutations
	},
	actions
});