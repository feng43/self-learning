<template>
  <div>
    <v-header></v-header>
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
  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller : {}
      };
    },
    created () {
      
    },
    components : {
      "v-header" : header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/index.styl"
  .tab
    display: flex
    width: 100%
    height: 30px
    line-height: 30px
    background: #840FDA
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: #FFFFFF
        &.active
          height: 31px
          color: #5400B6
          background: #FFFFFF
</style>
