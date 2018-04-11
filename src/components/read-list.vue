<template>
    <div>
       <ul class="bulk_goods">
         <li class="goods-item" v-for="item, key in newslist" :key="key" @click="gotoDetail(item)">
           <div class="thumb" v-if="item.first_imgsmall">
             <img v-lazy="item.first_imgsmall">
           </div>
           <div class="detail" :class="{'noImg_detail':item.first_imgsmall==0}">
             <div class="goods-info">
               <div class="title" v-html="item.title"></div>
               <div class="meta">
                 {{alias.indexOf('news')>-1?('发布人:'+item.add_user):''}}
                 &nbsp;{{'用时'+item.click_num+'分钟'}}
                 {{item.reply_num>0?item.reply_num+'条评论':''}}
                 {{'发布时间:'+item.publish_time.substring(0,11)}}
               </div>
             </div>
           </div>
         </li>
       </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  import {getStore} from '@/utils/storeUtils'
export default {
  name: 'newslist',
  props:['newslist','alias'],
  data () {
    return {
       userInfo:getStore("userInfo"),
    }
  },
  mounted(){

  },
  methods:{
    gotoDetail(item){
      this.$emit('gotoDetail',item);
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .noRead{
    color: red;
  }
  ul {
    list-style: none;
    background-color: #ffffff;
  }
  .bulk_goods li{
    border-bottom: 1px solid #f5f5f5;
    padding: 0.2rem;
  }
  .bulk_goods .goods-item{
    display: block;
    position: relative;
    width: auto;
  }
  .bulk_goods .goods-item .thumb {
    float: left;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #f4f4f4;
    text-align: center;
  }
  .goods-item .detail {
    position: relative;
    font-size: 0.25rem;
    height: 1.5rem;
    margin-left: 1.8rem;
  }
  .goods-item .noImg_detail {
    margin-left: 0rem;
  }
  .goods-item .thumb img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    border: 0;
    vertical-align: middle;
  }
  .bulk_goods .goods-item .title {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.28rem;
    color: black;
  }
  .bulk_goods .meta {
    bottom: 0;
    position: absolute;
    width: 100%;
  }
</style>
