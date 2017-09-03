<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msg2 }}</h1>
    <h1>{{ msgfromfather }}</h1>
    <button @click="onClickMe">click!</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to componentA',
      msg2: this.msgfromfather
    }
  },
  // events: {
  //   onAddnew (items) {
  //     console.log(items);
  //   }
  // },
  props: [ "msgfromfather" ],//数组
  methods: {
    onClickMe () {
      console.log(this.msgfromfather);
      this.$emit("child-tell-me-something",this.msg);
      //this.$dispatch("child-tell-me-something",this.msg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
