<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title"></yd-navbar>
    <yd-tab horizontal-scroll slot="navbar" v-model="tab2" :prevent-default="false" :item-click="itemClick">
      <yd-tab-panel v-for="item,index in typetree" :key="index" :label="item.name"></yd-tab-panel>
    </yd-tab>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <read-list  v-if="subalias=='book_read'" slot="list" :newslist="newslist" :alias="alias"  @gotoDetail="gotoDetail"></read-list>
        <book_read_stat  v-else-if="subalias=='book_read_stat'" slot="list" :newslist="newslist" :alias="alias"  @gotoDetail="gotoDetail"></book_read_stat>
        <news-list v-else slot="list" :newslist="newslist" :alias="alias"  @gotoDetail="gotoDetail"></news-list>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
 import API from '@/api'
 import {getStore} from '@/utils/storeUtils'
 import newsList from '@/components/news-list'
 import readList from '@/components/read-list'
 import bookReadStat from '@/components/book_read_stat'
 import {dealimg,dealurl} from '@/utils/dealImg'
export default {
  name: 'news',
  data () {
    return {
      tab2:0,
      title:'',
      alias:'',
      menuid:'',
      subalias:'',
      submenuid:'',
      pageNow:1,
      pageSize:10,
      newslist:[],
      typetree:[],
    }
  },
  components: {
    newsList,
    readList,
    bookReadStat
  },
  mounted(){
    this.title=this.$route.query.title;
    this.alias=this.$route.query.alias;
    this.menuid=this.$route.query.menuid;
    document .title=this.title;
    this.getNewsTypeTree();
  },
  methods:{
    getNewsTypeTree(){
      var params={menuid:this.menuid,alias:this.alias};
      API.news.getNewsTypeTree(this,params,'加载中...',(respones)=>{
            if (respones.message && respones.message.typetree){
              this.typetree=respones.message.typetree;
              if (this.typetree.length>0){
                  var itemTab=this.typetree[this.tab2];
                  this.getItemTab(itemTab);
              }
            }
      });
    },
    itemClick(key){
      this.tab2 = key;
      var itemTab=this.typetree[this.tab2];
      this.getItemTab(itemTab);
    },
    getItemTab(itemTab){
      if (itemTab){
        this.subalias=itemTab.alias;
        this.submenuid=itemTab.menuid;
        this.pageNow=1;
        if (this.subalias=='book_read_stat'){
          this.getMyBookStatList(true);
        }else if(this.subalias =='book_stat'){
          this.getMyBookStat(true);
        }else{
          this.getNewsList(true);
        }
      }
    },
    loadList(){
       this.pageNow=1;
      if (this.subalias=='book_read_stat'){
        this.getMyBookStatList();
      }else if(this.subalias =='book_stat'){
        this.getMyBookStat();
      }else{
        this.getNewsList();
      }
    },
    loadMore(){
      this.pageNow++;
      if (this.subalias=='book_read_stat'){
          this.getMyBookStatList();
      }else if(this.subalias =='book_stat'){
           this.getMyBookStat();
      }else{
        this.getNewsList();
      }
    },
    getNewsList(isrefresh){
      var userInfo=getStore('userInfo');
      const _this=this;
      var params={currentpage:this.pageNow,numperpage:this.pageSize,regtime:userInfo.reg_time,status:'',alias:this.subalias};
      API.news.getNewsList(this,params,this.pageNow==1&&isrefresh?'加载中...':'',function (respones) {
          if (respones.message&&respones.message.newslst){
            respones.message.newslst.forEach(function (item) {
              if (item.first_imgsmall){
                item.img=dealimg(item.first_imgsmall);
              }
            });
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
    },
    getMyBookStatList(isrefresh){
      var userInfo=getStore('userInfo');
      const _this=this;
      var params={serviceCode:'15',args:this.pageNow+','+this.pageSize};
      API.news.getMyBookStatList(this,params,this.pageNow==1&&isrefresh?'加载中...':'',function (respones) {
        if (respones&&respones.msg){
          respones.msg.forEach(function (item) {
            if (item.first_imgsmall){
              item.img=dealimg(item.first_imgsmall);
            }
          });
          if (_this.pageNow==1){
            _this.newslist=respones.msg;
            _this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
            _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
          }else{
            _this.newslist=_this.newslist.concat(respones.msg);
            if (respones.msg.length==_this.pageSize){
              _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }else{
              _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          }
        }else{
          _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        }
      },'',false,true);
    },
    getMyBookStat(isrefresh){
      var userInfo=getStore('userInfo');
      const _this=this;
      var params={serviceCode:'15'};
      API.news.getMyBookStatList(this,params,this.pageNow==1&&isrefresh?'加载中...':'',function (respones) {
        if (respones&&respones.msg){
          respones.msg.forEach(function (item) {
            if (item.first_imgsmall){
              item.img=dealimg(item.first_imgsmall);
            }
          });
          _this.newslist=respones.msg;
          _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        }else{
          _this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        }
      },'',false,true);
    },
    gotoDetail(item){
      var urlstr = dealurl(this.alias,item);
      this.$router.push({path: '/iframe',query:{'url':urlstr,'title':item.title+'详情'}});
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
