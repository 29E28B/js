import Vue from 'vue';
import VueRouter from 'vue-router';
// 用户路由
const Home=()=>import('../views/home.vue');
const login=()=>import('../views/login.vue');
const goodSearch=()=>import('../components/content/goodSearch.vue');
const myorder=()=>import('../views/homeuser/myorder.vue');
const myInfo=()=>import('../views/homeuser/myInfo.vue');
const changePsw=()=>import('../views/homeuser/userChangePsw.vue');

// 管理员路由
const admin=()=>import('../views/admin.vue');
const orderManage=()=>import('../views/admin/orderManage.vue');
const addGood=()=>import('../views/admin/addGood.vue');
const addUser=()=>import('../views/admin/addUser.vue');
const allUser=()=>import('../views/admin/allUser.vue');
const goodManage=()=>import('../views/admin/goodManage.vue');
const changePassWord=()=>import('../views/admin/adminChangePassWord.vue')
const shopList = ()=>import('../views/homeuser/shoplist.vue')
const myCar = ()=> import('../views/homeuser/mycar.vue')
const goodsdetail = () =>import('../views/homeuser/GoodsDetail.vue')
Vue.use(VueRouter);

// 解决重复跳转路由报错问题
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
};


const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path:'',
        redirect:'shopList'
      },
      {
        path:'myorder',
        component:myorder
      },
      {
        path:'goodsdetail',
        component:goodsdetail
      },
      {
        path:'shopList',
        component:shopList
      },
      {
        path:'mycar',
        component:myCar
      },
      {
        path:'goodsearch',
        component:goodSearch
      },{
        path:'myInfo',
        component:myInfo
      },{
        path:'changepsw',
        component:changePsw
      }
    ]
  },
  {
    path: '/admin',
    component:admin,
    children:[
      {
        path:'',
        redirect:'ordermanage'
      },
      {
        path:'goodsearch',
        component:goodSearch
      },
      {
        path:'ordermanage',
        component:orderManage
      },
      {
        path:'addgood',
        component:addGood
      },
      {
        path:'adduser',
        component:addUser
      },
      {
        path:'alluser',
        component:allUser
      },
      {
        path:'goodmanage',
        component:goodManage
      },
      {
        path:'changepassword',
        component:changePassWord
      }
      
    ]
  },{
    path:'/login',
    component:login
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
