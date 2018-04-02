<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!--<footer class="yd-tabbar v_nav">-->
      <!--<div  class="yd-tabbar-item">-->
        <!--<span class="yd-tabbar-icon">-->
            <!--<i class="icon-home-outline"></i>-->
        <!--</span>-->
        <!--<span class="yd-tabbar-txt">首页</span>-->
      <!--</div>-->
      <!--<div class="yd-tabbar-item">-->
        <!--<span class="yd-tabbar-icon">-->
            <!--<i class="icon-shopcart-outline"></i>-->
        <!--</span>-->
        <!--<span class="yd-tabbar-txt">购物车</span>-->
      <!--</div>-->
      <!--<div  class="tabbar-item">-->
        <!--<span class="tabbar-icon">-->
            <!--<i class="icon-ucenter-outline"></i>-->
        <!--</span>-->
        <!--<span class="tabbar-txt">个人中心</span>-->
      <!--</div>-->
    <!--</footer>-->
  </div>
</template>
<script>
 import API from '@/api'
export default {
  name: 'layout',
  data () {
    return {
      currentPath:'',
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v_nav { max-width:640px;position: fixed; bottom: 0; width: 100%; height:45px;border-top: #dcdcdc 1px solid; z-index: 97;padding:0px; margin:0 auto; padding-bottom:2px; padding-top:2px }
  .vf_nav{ width:100%;height:45px; margin:auto; padding:0px; margin:0px;}
</style>
