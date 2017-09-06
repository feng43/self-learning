<template>
  <div id="app">
    <!-- img src="./assets/logo.png">
    <Hello></Hello> -->
    <h1 v-text="title"></h1>
    <h1 v-html="title2"></h1>
    <input v-model="newItem" type="text" @keyup.enter="addNew">   <!-- v-model 只限制使用在input textarea select中 -->
    <ul>
      <li v-for="item in items" v-text="item.label" :class="{finished:item.isFinished}" @click="toggleFinish(item)"></li> <!-- v-bind:class与:class相同   @click与v-on:click相同-->
    </ul>
    <!-- <components-a :msgfromfather='ssf' @child-tell-me-something="listenToMyBoy"></components-a> -->
    <components-a msgfromfather='ssf' @child-tell-me-something="listenToMyBoy"></components-a>
    <!-- 驼峰转成小写中线格式,定义  v-on:child-tell-me-something -->


    <!-- dispatch event -->
    <!-- <components-a msgfromfather="you die"></components-a> -->
    <p>{{ childWords }}</p>
    <!-- <Hello></Hello> -->
  </div>
</template>

<script>
import Hello from './components/Hello';
import componentsA from './components/componentsA';
import Store from "./store";
console.log(Store);
export default {
  // name: 'app',
  components: {
    Hello,
    componentsA
  },
  data () {  // 等价于 data: function (){}
    return {
      title : "this is a tudo list",
      title2 : "<span>???</span>this is a tudo list",
      items : //[
        // {
        //   label: "coding",
        //   isFinished: false
        // },
        // {
        //   label: "walking",
        //   isFinished: true
        // }
        Store.fetch(),
      //],
      newItem: "",
      childWords: "",
      ssf:""
    }
  },
  watch: {
    items: {
      handler (val, oldVal) {
        Store.save(val);
      },
      deep: true //为false items数组只有一个key更改的话取不到
    }
  },
  // events: {
  //   listenToMyBoy (msg) {
  //     this.childWords = msg;
  //   }
  // },
  methods: {//methods 对象
    toggleFinish (item) {
      console.log(item);
      item.isFinished = !item.isFinished;
    },
    addNew () {
      console.log(this.newItem);
      this.items.push({
        label: this.newItem,
        isFinished: false
      });
      this.newItem = "";
      this.ssf = "sunshifeng";
      //this.$broadcast('onAddnew', this.items);
    },
    listenToMyBoy (msg) {
      this.childWords = msg;
    }
  },  
  // 在组件创建完成时，执行的钩子函数  
  created (){  
      // 在main.js里导入并使用vue-resource之后，就可以通过this.$http来使用vue-resource了，这里我们用到了get方法  
      this.$http.get('/api/books').then((data) => {  
          // 由于请求成功返回的是Promise对象，我们要从data.body.data拿到books数组  
          console.log("-------")
          console.log(data)
      })
  } 
}

// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.finished {
  text-decoration: underline;
}
</style>
