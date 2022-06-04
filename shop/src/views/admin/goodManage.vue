<template>
  <div class="findGood">
    <main-top-bar classify="所有商品"></main-top-bar>
    <div class="searchBox">
      <input type='text' class="search" v-model="input" placeholder="请输入商品名进行查询" @keyup="checkEnter">
      <el-button type="primary" icon="el-icon-search" @click="goodSearch" ref="findGood1">搜索</el-button>
    </div>
    <div class="goods">
      <good-exhibit :goodsInfo="goodsInfo" :showDeleteBtn="true" :showState="true" @delete-success='removeGood'></good-exhibit>
    </div>
  </div>
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import GoodExhibit from '../../components/content/goodExhibit.vue';
import {Message} from 'element-ui';
export default {
  data(){
    return {
      input:'',
      goodsInfo:[],
      searchResult:[],
      allGoods:[],
    }
  },
  components: { mainTopBar, GoodExhibit },
  methods:{
    // 获取所有商品
    getAllGoods(){
      this.$axios.get('/admin/allgoodsinfo')
          .then(res=>{
            this.allGoods=res.data.data;
            this.goodsInfo=this.allGoods;
          })
          .catch(err=>console.log(err))
    },
    // 删除数据
    removeGood(index){
      this.goodsInfo.splice(index,1);
    },
    // 商品搜索
    goodSearch(){
      this.$axios.get('/goodsearchNoMerge',{params:{goodname:this.input}}).then(res=>{
        this.searchResult=res.data.data;
        this.goodsInfo=this.searchResult;
        if(res.data.msg=='暂无该数据'){
          Message.warning('暂无该商品');
        }
      });
    },
    // 检测是否按下回车
    checkEnter(){
      if(event.keyCode==13){
        this.$refs.findGood1.$el.click();
      }
    }

  },
  created(){
    this.getAllGoods();
  }

}
</script>

<style scoped>
.searchBox{
  display: flex;
  width: 100%;
}
.search{
  padding-left: 20px;
  height: 40px;
  flex: 1;
}
.goods{
  margin-top: 30px;
  height: calc(100vh - 280px);
  overflow: auto;
}

</style>