<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="NavBar">
      <router-link to="#" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div>乱七八糟的内容在这里，超出容器，将出现滚动条。</div>
    <div>乱七八糟的内容在这里，超出容器，将出现滚动条。</div>
    <div>乱七八糟的内容在这里，超出容器，将出现滚动条。</div>

    <yd-tabbar slot="tabbar">
      <yd-tabbar-item title="首页" link="#" active>
        <yd-icon name="home" slot="icon"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="#">
        <yd-icon name="shopcart-outline" slot="icon"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="#">
        <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>

<script>
 import API from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.login();
  },
  methods:{
     login(){
       API.common.getUnitInfo({'service':'unitBP.getUnitInfo'}).then(function (data) {

       })
     }
  },
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
