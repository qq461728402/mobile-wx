<template>
    <div>
       <ul class="bulk_goods">
         <li class="goods-item" v-for="item, key in repairelist" :key="key" @click="gotoDetail(item)">
           <van-row style="font-size: 0.3rem;padding-bottom: .1rem" >
             <van-col offset="1" span="11"> <yd-icon name="baoxiu" size=".3rem" color="#0586e8" custom></yd-icon> {{item.apply_repaire_title}}</van-col>
             <van-col span="11" style="text-align: right;" :class="{'reply_status0':item.reply_status==0,'reply_status1':item.reply_status==1,'reply_status2':item.reply_status==2,'reply_status3':item.reply_status==3}">{{item.reply_status==1?'处理完毕':item.reply_status==2?'已委外处理':item.reply_status==3?'不能处理':item.reply_status==4?'正在处理中':'待处理'}}</van-col>
           </van-row>
           <van-row style="color: #585858;">
             <van-col offset="1" span="11">报修人:{{item.repaire_user_name}}</van-col>
             <van-col span="11">报修时间:{{item.apply_repaire_time|dateFormet}}</van-col>
           </van-row>
           <van-row style="color: #585858">
             <van-col offset="1" span="11">维修人:{{item.repaire_user_name}}</van-col>
             <van-col span="11">维修电话:{{item.tel}}</van-col>
           </van-row>
         </li>
       </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  import {getStore} from '@/utils/storeUtils'
  import { Row, Col } from 'vant';
export default {
  name: 'repairelist',
  props:['repairelist'],
  components:{
    [Row.name]:Row,
    [Col.name]:Col,
  },
  data () {
    return {
       userInfo:getStore("userInfo"),
    }
  },
  filters: {
    dateFormet: function (value) {
      if(value&&value.length>11){
       return value.substr(5,11);
      }else{
        return '';
      }
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
  .reply_status0{
    color: #f00;
  }
  .reply_status1{
    color: #009600;
  }
  .reply_status2{
    color: #0000ff;
  }
  .reply_status3{
    color: #f00;
  }
  ul {
    list-style: none;
    background-color: #ffffff;
  }
  .bulk_goods li{
    border-bottom: 1px solid #f5f5f5;
    padding:0.1rem 0;
  }
</style>
