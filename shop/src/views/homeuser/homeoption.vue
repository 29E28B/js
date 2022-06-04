<template>
  <div class="homeOption">
    <div class="classify">
        <div v-for="item  in className" :key="item.url" @click="classifyChange(item.url)" :class="{selected:$route.path=='/home'+item.url}" v-if="username !== -1 || item.option =='商品列表'">
            <i :class="item.icon"></i>
            <span class="option"> {{item.option}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'homeOption',
    data(){
        return {
          username:this.$store.state.userinfo ? this.$store.state.userinfo.username : -1,
            className:[
              {
                option:'商品列表',
                url:'/shopList',
                icon:'el-icon-s-shop'
              },
              {
                option:'我的购物车',
                url:'/mycar',
                icon:'el-icon-shopping-cart-2'
              },{
                option:'我的订单',
                url:'/myorder',
                icon:'el-icon-s-order'
            },
            {
                option:'个人信息',
                url:'/myinfo',
                icon:'el-icon-user-solid'
            },
            {
                option:'修改密码',
                url:'/changepsw',
                icon:'el-icon-s-tools',
            }]
        }
    },
    methods:{
        // 点击跳转路由
        classifyChange(url){
            this.$router.replace('/home'+url);
        }
    }
}
</script>

<style scoped>
.classify{
    height: calc(100vh - 50px);
    line-height: 40px;
    background-color: #324157;
    justify-content: space-between;
    color: #E4E7ED;
    padding-top:30px;
    overflow: hidden;
}
.classify>div{
    text-align: left;
    box-sizing: border-box;
    padding-left: 30px;
    margin-bottom:20px;
}
.classify span{
    padding: 5px;
}
.selected{
    color: #46A3FF;
    
}
.option{
    cursor: pointer;
}

</style>