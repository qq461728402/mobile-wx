<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title"></yd-navbar>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">

        <yd-list theme="4" slot="list">
          <yd-list-item v-for="item, key in newslist" :key="key">
            <img slot="img" :src="item.img">
            <span slot="title">{{item.title}}</span>
            <yd-list-other slot="other">
              <div>
                <span class="list-price"><em>¥</em>{{item.marketprice}}</span>
                <span class="list-del-price">¥{{item.productprice}}</span>
              </div>
              <div>content</div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script>
 import API from '@/api'
 import {getStore} from '@/utils/storeUtils'
export default {
  name: 'news',
  data () {
    return {
      title:'',
      alias:'',
      menuid:'',
      pageNow:1,
      pageSize:10,
      newslist:[],
    }
  },
  mounted(){
    this.title=this.$route.query.title;
    this.alias=this.$route.query.alias;
    this.menuid=this.$route.query.menuid;
    document .title=this.title;
    this.getNewsList(true);
    console.log(this.title);
  },
  methods:{
    loadList(){
        this.pageNow=1;
       this.getNewsList();
    },
    loadMore(){
        this.pageNow++;
      this.getNewsList();
    },
    getNewsList(isrefresh){
      var userInfo=getStore('userInfo');
      const _this=this;
      var params={currentpage:this.pageNow,numperpage:this.pageSize,regtime:userInfo.reg_time,status:'',alias:this.alias};
      API.news.getNewsList(this,params,this.pageNow==1&&isrefresh?'加载中...':'',function (respones) {
          if (respones.message&&respones.message.newslst){
            if (_this.pageNow==1){
              _this.newslist=respones.message.newslst;
              _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
              _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            }else{
              _this.newslist=_this.newslist.concat(respones.message.newslst);
              if (respones.message.newslst.length==_this.pageSize){
                _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              }else{
                _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
              }
            }
          }else{
            _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          }
      })
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
