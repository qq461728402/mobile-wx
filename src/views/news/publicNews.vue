<template>
  <yd-layout>
    <yd-navbar slot="navbar" :title="title"></yd-navbar>

  </yd-layout>
</template>
<script>
 import API from '@/api'
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
  mounted(){
    this.title=this.$route.query.title;
    document .title=this.title;
    console.log(this.title);
  },
  methods:{

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
