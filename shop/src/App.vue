<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default{
  name:'app',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
}

</script>

<style>
  *{
    margin:0;
    padding:0
  }
  a{
    text-decoration: none;
  }
  body{
    font-size:16px;
    overflow: hidden;
    width: 100vw;
    height: 100vh;

  }

</style>
