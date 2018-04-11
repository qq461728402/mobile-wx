<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title"></yd-navbar>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <news-list slot="list" :newslist="newslist" :alias="alias"  @gotoDetail="gotoDetail"></news-list>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>

    <div class="side-bar" v-if="popedom">
      <a @click="add()"></a>
    </div>
  </yd-layout>
</template>
<script>
 import API from '@/api'
 import {getStore} from '@/utils/storeUtils'
 import newsList from '@/components/news-list'
 import {dealimg,dealurl} from '@/utils/dealImg'
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
      popedomflg:'',
      role:'',
      popedom:false,
    }
  },
  components: {
    newsList
  },
  mounted(){
    this.title=this.$route.query.title;
    this.alias=this.$route.query.alias;
    this.menuid=this.$route.query.menuid;
    document .title=this.title;
    this.getNewsList(true);
    this.getPublishPopedom();
    console.log(this.title);
  },
  methods:{
    add(){
      this.$router.push({path: '/publicNews',query:{'title':'发布'+this.title}});
    },
    loadList(){
        this.pageNow=1;
       this.getNewsList();
    },
    loadMore(){
      this.pageNow++;
      this.getNewsList();
    },
    //判断是否具有发布权限
    getPublishPopedom(){
      const  _this=this;
      API.news.getPublishPopedom(this,{'typeid':this.alias},function (respones) {
         if(respones.message){
           _this.popedomflg=respones.message.popedomflg;
           _this.role=respones.message.role;
         }
        if(respones.statusCode==0){
            if (_this.alias.indexOf('Message')>-1){
              if (_this.alias=='Message-1'||_this.alias=='Message-2'){
                  _this.popedom=true;
              }
            }else{
              _this.popedom=true;
            }
        }
      })
    },
    getNewsList(isrefresh){
      var userInfo=getStore('userInfo');
      const _this=this;
      var params={currentpage:this.pageNow,numperpage:this.pageSize,regtime:userInfo.reg_time,status:'',alias:this.alias};
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
