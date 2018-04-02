<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="消息">
    </yd-navbar>
    <iframe :src="geturl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
  </yd-layout>
</template>
<script>
 import API from '@/api'
export default {
  name: 'layout',
  data () {
    return {
      geturl:'',
    }
  },
  mounted(){
     this.geturl=this.$route.query.url;
    console.log(this.geturl);
  },
  methods:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
