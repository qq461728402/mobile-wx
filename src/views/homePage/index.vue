<template>
  <div id="homepage">
    <yd-grids-group  :rows="4" :title="key" v-for="(items,key) in list" :key="key">
      <yd-grids-item v-for="(item,index) in items" :key="index" @click.native="gotoModule(item)" id="itemd">
        <yd-badge type="danger" slot="else" class="badge" v-if="item.count>0">{{item.count}}</yd-badge>
        <img slot="icon" v-lazy="item.img" style="height: 100%;">
        <span slot="text" style="font-size: 0.25rem">{{item.name}}</span>
      </yd-grids-item>
    </yd-grids-group>
  </div>
</template>
<script>
  import API from '@/api'
  import {setStore} from '@/utils/storeUtils'
  import {dealimg} from '@/utils/dealImg'
  export default {
    name: 'homePage',
    data () {
      return {
          list:{},
      }
    },
    mounted(){
    },
    activated(){
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
              if (item.img){
                item.img=dealimg(item.img);
              }
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
              if (item.childcount==0){//没有分类
                  this.$router.push({path:'/news',query:{title:item.name,alias:item.alias,menuid:item.menuid}});
              }else{//有分类
              }
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
  #itemd img[lazy=error] {
    background: url(~@/assets/img/logo.png);
    background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
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
