<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" :img-set="imgUrl"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" :img-set="imgUrl"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      imgUrl:require('../static/logo.png'),
    }
  },
}
</script>

<style>
#app {
  height: 100%;
  over-flow: auto;     /* winphone8和android4+ */
  -webkit-overflow-scrolling: touch;    /* ios5+ */
}
#app .yd-navbar{
  display: none;
}
.side-bar {width: 30px;position: fixed;bottom: 20px;right: 25px;font-size: 0;line-height: 0;z-index: 100;}
.side-bar a {width: 30px;height: 30px;display: inline-block;margin-bottom: 2px;background:url(~@/assets/img/add.png) no-repeat center ;}
</style>
