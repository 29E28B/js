<template>
  <div class="goodSearch">
        <main-top-bar classify='商品搜索' :isshow="isshow"></main-top-bar>
        <div class="searchBox">
                <input type='text' class="search" v-model="input" placeholder="请输入商品名进行查询" @keyup="checkEnter">
                <el-button type="primary" icon="el-icon-search" @click="goodSearch(input)" ref="searchBtn">搜索</el-button>
        </div>
      <el-table
              v-if="isshow"
              :data="searchResult"
              style="width: 100%;height: calc(100% - 110px);overflow-y: scroll">
          <el-table-column
                  prop="date"
                  label="图片"
                  width="200">
              <template slot-scope="scope">
                  <img
                          :src="scope.row.picname"
                          alt
                          style="height: 100px;width: 100px"
                  />
              </template>
          </el-table-column>
          <el-table-column
                  prop="goodname"
                  label="商品名"
                  width="200">
          </el-table-column>
          <el-table-column
                  prop="author"
                  label="商品类别"
                  width="190">
          </el-table-column>
          <el-table-column
                  prop="company"
                  width="180"
                  label="商品描述">
          </el-table-column>
          <el-table-column
                  prop="goodid"
                  label="商品编号"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="price"
                  width="180"
                  label="商品售价">
          </el-table-column>
          <el-table-column
                  prop="number"
                  label="剩余库存"
                  width="180">
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import { Message } from 'element-ui';
export default {
    name:'goodSerarch',
    props:{
      isshow:{
        type:Boolean,
        default:true
      }
    },
    data(){
         return {
             input:'',
             searchResult:[],
        }
    },
    components:{
        mainTopBar,
    },
    methods:{
        // 搜索商品
        goodSearch(goodname){
            this.$axios.get('/goodsearch',{params:{goodname,}}).then(res=>{
                if(res.data.msg=='暂无该数据'){
                  Message.warning('暂无该商品');
                }
                if (!this.isshow && res.data.msg !=='暂无该数据'){
                  this.$emit('SearchResult',res.data.data)
                }else {
                  this.searchResult=res.data.data;
                }
            });
        },
        checkEnter(){
            if(event.keyCode==13){
                this.$refs.searchBtn.$el.click();
            }
        }
    }

}
</script>

<style scoped>
.goodSearch{
    height: 100%;
}
.searchBox{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
}
.search{
    padding-left: 20px;
    flex: 1;
    outline: none;
    border: 1px solid #409EFF;
    border-radius: 3px;
    font-size: 14px;
    height: 100%;
    color: #606266;
}


</style>