<template>
  <div>
    <v-header :headerData="headerData"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/direct'>直推慧赢卡</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/all'>伞下慧赢卡</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';

  //请求ok的状态码
	const ERR_OK = 1;
  export default {
    data () {
			return {
				headerData : {}
			}
		},
		created () {
			// 获取总奖金
			this.$axios.get('/hyysActivity/pub/getJackpot').then((response) => {
				if( response.data.status == ERR_OK ){
					this.headerData = response.data.data;
				} else {
				alert(response.data.message);
				};
			}).catch( (error) => {
				alert("出错了,请稍后重试");
				console.log(error);
			});
		},
    components : {
      "v-header" : header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/index.styl"
  .tab
    width: 100%
    height: 60px
    line-height: 60px
    background: url("./assets/bg.png")
    .tab-item
      display: inline-block
      width: 200px
      height: 100%
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: #FFFFFF
        &.active
          height: 61px
          color: #5400B6
          background: #FFFFFF
</style>
