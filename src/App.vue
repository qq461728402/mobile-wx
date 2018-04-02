<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
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

</style>
