<template>
  <div class="adminOption">
    <el-menu
            :default-openeds="['1','2','3','4']"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
    >
        <el-submenu index="2" class="MenuTab">
        <template slot="title"><i class="el-icon-notebook-1"></i>商品管理</template>
          <el-menu-item index="2-1" @click="$router.replace(address[1])" :class="{'is-active':$route.path==address[1]}">添加商品</el-menu-item>
          <el-menu-item index="2-2" @click="$router.replace(address[2])" :class="{'is-active':$route.path==address[2]}">商品搜索</el-menu-item>
          <el-menu-item index="2-3" @click="$router.replace(address[3])" :class="{'is-active':$route.path==address[3]}">商品管理</el-menu-item>
    </el-submenu>
      <el-submenu index="1" class="MenuTab">
        <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
        <el-menu-item index="1-1" @click="$router.replace(address[0])" :class="{'is-active':$route.path==address[0]}">查看订单</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="MenuTab">
        <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item index="3-1" @click="$router.replace(address[4])" :class="{'is-active':$route.path==address[4]}">添加用户</el-menu-item>
          <el-menu-item index="3-2" @click="$router.replace(address[5])" :class="{'is-active':$route.path==address[5]}">用户管理</el-menu-item>
    </el-submenu>
     <el-submenu index="4" class="MenuTab">
        <template slot="title"><i class="el-icon-setting"></i>账号管理</template>
          <el-menu-item index="4-1" @click="$router.replace(address[6])" >修改密码</el-menu-item>
    </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
    name:'adminOption',
    data(){
        return {
            address:[
                '/admin/ordermanage',
                '/admin/addgood',
                '/admin/goodsearch',
                '/admin/goodmanage',
                '/admin/adduser',
                '/admin/alluser',
                '/admin/changepassword']
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
.MenuTab{
  min-width: 200px;
}
</style>