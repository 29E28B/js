<template>
  <div class="navbar">
    <header class="nav">
        <div class="logo">
            <img src="~assets/logo/logo.jpg" alt="" class="logoimg">
            <span style="padding-left: 20px">水果购物平台</span>
            
        </div>
        <div class="user" v-if="username !== -1">欢迎你&nbsp;&nbsp;{{username}},
          <el-avatar shape="square" :size="100" :fit="fit" :src="logoimgurl" style="width: 50px;height: 50px;margin-top: 10px;"></el-avatar>
          <span class="exit" @click="loginExit">退出登录</span>
        </div>
        <span class="exit" @click="login" v-else>登入</span>
    </header>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    name:'navbar',
    data(){
        return {
          fit: 'cover',
          logoimgurl:this.$store.state.userinfo.path,
          user:'',
          username:this.$store.state.userinfo ? this.$store.state.userinfo.username : -1
        }
    },
  methods:{
        loginExit(){
            localStorage.token=null;
             Message.success('退出登录成功')
            this.$router.push('/login');
        },
      login(){
        this.$router.push('/login');
      }
    },

}
</script>

<style scoped>
.nav{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100vw;
    height: 80px;
    line-height: 80px;
    background-color: #561399;
    padding: 0 10px;
    color: #fff;
}
.logo{
    display: flex;
    overflow: hidden;
    font-size: 23px;
    font-weight: 500;
    height: 100%;
    align-items: center;
}
.user{
    height: 100%;
    font-size: 16px;
}
.exit{
    cursor: pointer;
    font-size: 13px;
    color: red;
}
.logoimg{
    height: 70%;
}
.el-avatar >>> img{
  width: 100%;
}
</style>