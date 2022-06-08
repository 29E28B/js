<template>
  <div class="home" v-if="isshow">
      <el-container>
  <el-header height='80px'><nav-bar></nav-bar></el-header>
  <el-container>
    <el-aside width="200px"><home-option></home-option></el-aside>
    <el-main><main-box></main-box></el-main>
  </el-container>
</el-container>
       
  </div>
</template>

<script>
import navBar from '../components/common/navbar.vue';
import homeOption from './homeuser/homeoption.vue';
import mainBox from '../components/common/mainBox.vue';
export default {
    name:'home',
    data(){
        return {
            user:'李明',
            isshow:false
        }
    },
    components:{
        navBar,
        homeOption,
        mainBox,
    },
    created(){
        this.getUserInformation();
    },
    methods:{
        getUserInformation(){
            this.$axios.get('/user/userinfo')
            .then(res=>{
              console.log(res.data.data)
              if (res.data.data === undefined || res.data.data){
                this.isshow = true
              }
              res.data.data.path = 'http://127.0.0.1:8000/shop/picimg1/' + res.data.data.path.split("shoppic/imgs/").join("")
                this.$store.commit('getuserName',res.data.data);
            })
            .catch(err=>console.log(err.response));
        },
        checKAdminToken(){
            this.$axios.get('/checktoken')
            .then(res=>{
                if(res.data.data.user!=='user'){
                    window.localStorage.token='';
                    this.$router.replace('/login');
                }
            })
            .catch(err=>console.log(err))
    }
    }

}
</script>

<style scoped>
.home{
    width: 100vw;
    height: 100vh;
}
.el-main{
    padding: 0;
    overflow: hidden;
}
.el-header{
    padding: 0;
}
</style>