<template>
  <yd-layout id="publicNews">
    <yd-navbar slot="navbar" :title="title"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">标题：</span>
        <yd-input slot="right" v-model="formData.title" placeholder="请输入标题"></yd-input>
      </yd-cell-item>
      <yd-cell-item v-if="messages.isHaveTime==1">
        <span slot="left">参数：</span>
        <div slot="right" style="width: 100%;text-align: left">
          <yd-checkbox v-model="formData.toptime">永久置顶</yd-checkbox>
          <yd-checkbox v-model="formData.recommend">限期置顶</yd-checkbox>
        </div>
      </yd-cell-item>
      <yd-cell-item v-if="messages.isHaveTime==1" id="recommend">
        <span slot="left">是否推荐文章：</span>
        <div slot="right" style="width: 100%;text-align: left">
          <yd-checkbox  v-model="formData.recommend">推荐文章</yd-checkbox>
        </div>
      </yd-cell-item>
       <yd-cell-item v-if="messages.isHaveReply==1">
         <span slot="left">是否允许回复：</span>
         <div slot="right" style="width: 100%;text-align: left">
         <yd-checkbox  v-model="formData.reply">允许回复</yd-checkbox>
         </div>
       </yd-cell-item>
      <yd-cell-item v-if="messages.isHaveAppraise==1">
        <span slot="left">是否允许评论：</span>
        <div slot="right" style="width: 100%;text-align: left">
        <yd-checkbox  v-model="formData.content">允许评论</yd-checkbox>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">内容：</span>
        <yd-textarea slot="right" v-model="formData.content" placeholder="请输入内容" maxlength="100"></yd-textarea>
      </yd-cell-item>
      <yd-cell-item id="upImg">
        <span slot="left">上传附件：</span>
        <yd-grids-group slot="right" :rows="4">
          <yd-grids-item v-for="imgs,index1 in filess" :key="index1">
            <div slot="else" style="text-align: center;" >
              <img :src="imgs" style="height: 1.2rem;max-width: 1.2rem">
              <img src="@/assets/img/delete.png" style="height: 0.3rem;width: 0.3rem;position: absolute;right: 0rem" @click="delImage(index1)">
            </div>
          </yd-grids-item>
          <yd-grids-item type="a">
            <vue-core-image-upload slot="else" style="text-align: center;"
                                   inputOfFile="file"
                                   inputAccept="image/*"
                                   :compress="70"
                                   :multiple-size="5"
                                   :isXhr="false"
                                   :max-file-size="5242880"
                                   @imageuploading="imageuploading">
              <img src="@/assets/img/addImages.png" class="messimg" style="height: 1.2rem;width: 1.2rem">
            </vue-core-image-upload>
          </yd-grids-item>
        </yd-grids-group>
      </yd-cell-item>
     </yd-cell-group>
    <yd-button  size="large" type="primary" style="background-color: #d41d0f; margin: auto;width: 80%;margin-top: 20px;font-size: .3rem;" @click.native="publicInfo">发布</yd-button>
  </yd-layout>
</template>
<script>
 import API from '@/api'
 import VueCoreImageUpload from 'vue-core-image-upload'
 import {getObjectURL} from '@/utils/dealImg'
export default {
  name: 'news',
  data () {
    return {
      title:'',
      alias:'',
      moduleid:'',
      popedomflg:'',
      role:'',
      filess:[],
      files:'',
      relfiles:[],
      messages:{
        isHaveTime:0,
        isHaveReply:0,
        isHaveAppraise:0,
      },
      formData:{
        recommend:0,
        reply:0,
        appraise:0,
        toptime:0,
        content:'',
        title:'',
      }
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  mounted(){
    this.title=this.$route.query.title;
    this.alias=this.$route.query.alias;
    this.moduleid=this.$route.query.moduleid;
    this.role=this.$route.query.role;
    this.popedomflg=this.$route.query.popedomflg;
    document .title=this.title;
    console.log(this.title);
    this.getNewsTypeInfo();
  },
  methods:{
    getNewsTypeInfo(){
      var _this=this;
      var pares={'alias':this.alias,'moduleid':this.moduleid,'role':this.role,'popedomflg':this.popedomflg};
      API.news.getNewsTypeInfo(this,pares,'加载中...',function (data) {
        console.log(data);
        _this.messages=data.message;
      })
    },
    imageuploading(file){
      this.files= getObjectURL(file);
      this.filess.push(this.files);
      this.relfiles.push(file);
    },
    delImage(index){
      this.filess.shift(index);
      this.relfiles.shift(index);
    },
    publicInfo(){
      var formData = new FormData();
      for (var i=0;i< this.relfiles.length;i++){
        formData.append('file'+i, this.relfiles[i]);
      }
      var  b ={alias:this.alias,moduleid:this.moduleid,title:this.formData.title,content:this.formData.content,readflg:1,parktop:1};
      API.news.saveNewsInfo(this,b,formData,'发布中...',function (data) {
        console.log(data);
      })
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #upImg .yd-cell-right >div{
    width: 100%;
  }
  #publicNews .yd-cell-left{
    width: 70px;
  }
</style>
