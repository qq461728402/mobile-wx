<template>
  <yd-layout id="repaire">
    <yd-navbar slot="navbar" title="报修管理"></yd-navbar>
    <yd-tab horizontal-scroll slot="navbar" v-model="tab2" :prevent-default="false" :item-click="itemClick">
      <yd-tab-panel v-for="item,index in repaireclasslst" :key="index" :label="item.apply_repaire_class_name"></yd-tab-panel>
    </yd-tab>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
        <repaireList slot="list" :repairelist="repairelst" @gotoDetail="gotoDetail"></repaireList>
        <span slot="doneTip">我是有底线的</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
    <div class="side-bar">
      <a @click="add()"></a>
    </div>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
 import API from '@/api'
 import repaireList from '@/components/repaire-list'
export default {
  name: 'repaire',
  data () {
    return {
      classid:'',
      title:'',
      tab2:0,
      pageNow:1,
      pageSize:10,
      repaireclasslst:[],
      repairelst:[],
    }
  },
  components:{
    repaireList
  },
  mounted(){
    this.classid=this.$route.query.classid;
    this.getRepaireClassList();
  },
  methods:{
    getRepaireClassList(){
       API.repaire.getRepaireClassList(this,{classid:this.classid},'加载中...',data =>{
         this.repaireclasslst=data.message.repaireclasslst;
         if (this.repaireclasslst.length>0){
           var itemTab=this.repaireclasslst[this.tab2];
           this.getRepaireList(itemTab,true);
         }
       })
    },
    itemClick(key){
      this.tab2 = key;
      this.pageNow=1;
      var itemTab=this.repaireclasslst[this.tab2];
      this.getRepaireList(itemTab,true);
    },
    loadList(){
      this.pageNow=1;
      var itemTab=this.repaireclasslst[this.tab2];
      this.getRepaireList(itemTab);
    },
    loadMore(){
      this.pageNow++;
      var itemTab=this.repaireclasslst[this.tab2];
      this.getRepaireList(itemTab);
    },
    getRepaireList(item,isrefresh){
      var classid =item.apply_repaire_class_id;
      var params={currentpage:this.pageNow,numperpage:this.pageSize,status:'',keywords:'',classid:classid};
      API.repaire.getRepaireList(this,params,this.pageNow==1&&isrefresh?'加载中...':'', (respones)=> {
        if (respones.message&&respones.message.repairelst){
          if (this.pageNow==1){
            this.repairelst=respones.message.repairelst;
            this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
          }else{
            this.repairelst=this.repairelst.concat(respones.message.repairelst);
            if (respones.message.repairelst.length==this.pageSize){
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            }else{
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            }
          }
        }else{
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        }
      })
    },
    //获取详情
    gotoDetail(item){
      this.$router.push({name: 'detailRepaire',params:item});
    },
    //新增
    add(){

    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
  #repaire .yd-tab-nav:after{
    border-bottom:0px
  }
</style>
