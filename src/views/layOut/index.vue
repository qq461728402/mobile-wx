<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title"></yd-navbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <yd-tabbar slot="tabbar" active-color="#00a7ff">
      <yd-tabbar-item title="首页" link="/home" :active="currentPath=='/home'">
        <yd-icon name="home" slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="电话本" link="/phonebook" :active="currentPath=='/phonebook'">
        <yd-icon name="dianhuaben" custom slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心"  link="/personcenter" :active="currentPath=='/personcenter'">
        <yd-icon name="ucenter-outline" slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>
<script>
 import API from '@/api'
export default {
  name: 'layout',
  data () {
    return {
      currentPath:'',
      title:'首页',
    }
  },
  mounted(){
    this.currentPath=this.$route.path;
  },
  methods:{

  },
  watch:{
    $route(to,from){
      this.currentPath=this.$route.path;
      this.title =to.meta.title;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
