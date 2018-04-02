<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="登录" bgcolor="#d41d0f" color="#ffffff"></yd-navbar>
    <yd-cell-group style="margin-top: 0.2rem" id="loginFrom">
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" v-model="loginInfo.loginname" max="20" placeholder="请输入用户名" required></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密   码：</span>
        <yd-input slot="right" type="password" v-model="loginInfo.password" placeholder="请输入密码" required></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large"  class="login_5" @click.native="gotoLogin" type="danger">登录</yd-button>
  </yd-layout>
</template>
<script>
  import API from '@/api'
  import {setStore} from '@/utils/storeUtils'
  export default {
    name: 'login',
    data () {
      return {
          loginInfo:{
            loginname:'',
            password:'',
          }
      }
    },
    mounted(){
      this.getUnitInfo();//获取单位信息
    },
    methods: {
      gotoLogin(){
        if(this.loginInfo.loginname.length==0){
          this.$dialog.toast({mes: '请输入用户名', timeout: 1000});
          return;
        }else if(this.loginInfo.password.length==0){
          this.$dialog.toast({mes: '请输入密码', timeout: 1000});
          return;
        }
        this.$dialog.loading.open('登录中...');
        const _this =this;
        API.common.login(this.loginInfo, 'password', true).then(function (response) {
            _this.$dialog.loading.close();
            if(response.statusCode == 0){
                var userInfo =response.message.user[0];
               setStore('userInfo',userInfo);
              this.$router.push({path: '/'});
            }else{
              _this.$dialog.toast({mes: response.message, timeout: 1000});
            }
        })
      },
      getUnitInfo(){
        API.common.getUnitInfo().then(function (response) {
          if (response.statusCode == 0) {
            var unitInfo  =response.message.unit[0]
            setStore('unitInfo', unitInfo);
          }
        })
      }
    },
  }
</script>

<style scoped>
  .login_5{
    background-color: #d41d0f;
    margin: auto;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: .3rem;
  }
</style>
<style>
  #loginFrom .yd-cell-left{
    width: 1.6rem;
  }
</style>
