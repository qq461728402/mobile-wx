<template>
  <yd-layout id="homepage">
    <yd-navbar slot="navbar" title="首页">
      <router-link to="#" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-grids-group  :rows="4" :title="key" v-for="(items,key) in list" :key="key">
      <yd-grids-item v-for="(item,index) in items" :key="index" @click.native="gotoModule(item)">
        <yd-badge type="danger" slot="else" class="badge" v-if="item.count>0">{{item.count}}</yd-badge>
        <img slot="icon" :src="item.img | picture12" style="height: 100%;">
        <span slot="text" style="font-size: 0.25rem">{{item.name}}</span>
      </yd-grids-item>
    </yd-grids-group>
    <yd-tabbar slot="tabbar"  active-color="#00a7ff">
      <yd-tabbar-item title="首页" link="#" active>
        <yd-icon name="home" slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="电话本" link="#" >
        <yd-icon name="dianhuaben" custom slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心"  link="#">
        <yd-icon name="ucenter-outline" slot="icon" size=".5rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-layout>
</template>
<script>
  import API from '@/api'
  import {setStore} from '@/utils/storeUtils'
  export default {
    name: 'HelloWorld',
    data () {
      return {
          list:{},
      }
    },
    mounted(){
      this.getMenuType();
    },
    methods: {
      getMenuType(){
          const _this=this;
          API.common.getMenuType(this,{},'加载中...',function (respones) {
            var childtypelst=respones.message.childtypelst;
            var shoolModel=[];
            var homeModel=[];
            var officeModel=[];
            childtypelst.forEach(function (item) {
              if(item.alias.indexOf('news')>=0||item.alias.indexOf('emsg')>=0||item.alias.indexOf('Message')>=0){
                //校内动态
                shoolModel.push(item);
              }else if(item.alias.indexOf('home')>=0||item.alias.indexOf('Home')>=0){
                //家校互联
                homeModel.push(item);
              }else{
                //协同效率
                officeModel.push(item);
              }
              _this.list={'校内动态':shoolModel,'协同效率':officeModel,'家校互联':homeModel};
            })
          });
      },
      //进入对应模块
      gotoModule(item){
          var alias=item.alias;
          if(alias.indexOf('news')>-1||alias.indexOf('emsg')>-1||alias.indexOf('Message')>-1||alias.indexOf('book')>-1||alias.indexOf('home')>-1){

          }else if(alias.indexOf('http://')>-1||alias.indexOf('https://')>-1){
            this.$router.push({path: '/iframe',query:{url:alias}});
          }
      },
    },
  }
</script>
<style scoped>
  .badge{
    position: absolute;
    right: 6%;
    top: 10%;
  }
</style>
<style>
  #homepage .yd-grids-txt{
    padding: .2rem .2rem 0 .2rem;
  }
  #homepage .yd-grids-4:before{
    border-bottom:0px
  }
  #homepage .yd-gridstitle{
    color: #000000;
    background-color: #ffffff;
  }
  #homepage .yd-grids-item:after{
    border-bottom:0px;
  }
  #homepage .yd-grids-4 .yd-grids-item:not(:nth-child(4n)):before{
    border-right:0px;
  }
  #homepage .yd-gridstitle:after{
    border-bottom:0px;
  }
</style>
