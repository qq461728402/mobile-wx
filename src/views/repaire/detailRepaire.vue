<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="维修详情"></yd-navbar>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
 import API from '@/api'
export default {
  name: 'detailRepaire',
  data () {
    return {
        detaildic:{},
    }
  },

  mounted(){
    this.detaildic =this.$route.params;
    console.log(this.detaildic);
  },
  methods:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
