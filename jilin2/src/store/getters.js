/*
* @Author: 89305141@qq.com
* @Date:   2017-06-11 13:46:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-13 15:03:12
*/

'use strict';
export default{
	headerShow:(state)=>{
		return state.header;
	},
	loading:(state)=>{
		return state.loading;
	},
	yearTime:(state)=>{
		return state.yearTime;
	},
	showSoundlist:(state)=>{
		return state.showSoundlist;
	},
	sounder:(state)=>{
		return state.sounder;
	},
	sounding:(state)=>{
		return state.sounding;
	}
}