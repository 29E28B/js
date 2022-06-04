<template>
  <div class="myorder">
      <main-top-bar></main-top-bar>
      <div class="orderHis">订单情况</div>
    <div style="height:calc(100vh - 200px);overflow-x: hidden;overflow-y: auto">
      <el-descriptions class="margin-top"  :column="3" border v-for="item in OrderList" :key="item.order_id" style="margin-bottom: 20px">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            收货人
          </template>
          {{ item.consignee }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ item.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            收货地址
          </template>
          {{ item.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            订单状态
          </template>
          <el-tag size="small">{{item.type}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-postcard"></i>
            商品名称
          </template>
          {{item.goodsname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-pie-chart"></i>
            商品数量
          </template>
          {{item.ordernumber}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-timer"></i>
            订单创建时间
          </template>
          {{item.time}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-timer"></i>
            订单总价
          </template>
          {{item.totleprice}}
        </el-descriptions-item>
        <el-descriptions-item v-if="item.Logistics">
          <template slot="label">
            <i class="el-icon-timer"></i>
            物流单号
          </template>
          {{item.Logistics}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-tools"></i>
            操作
          </template>
          <el-button @click="CancerComfimOrder('delete',item.order_id)" v-if="item.type === '已完成' ||item.type === '同意退货' ">删除订单</el-button>
          <el-button @click="BackOrder(item.order_id)" v-if="(item.type !== '未发货' && item.type !== '买家请求退货中' && item.type !== '同意退货')">请求退货</el-button>
          <el-button @click="CancerComfimOrder('cancel',item.order_id)" v-if="item.type === '未发货'">取消订单</el-button>
          <el-button @click="confimOrder(item.order_id)" v-if="item.type === '已发货'">确认收货</el-button>
          <el-button @click="pinjia(item.order_id)" v-if="item.type === '已完成' && item.ispinjia === '否'">去评价</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import mainTopBar from '../../components/common/mainTopBar.vue';
export default {
  components: { mainTopBar },
    name:'myorder',
    data(){
        return {
          OrderList:[],
          userid:this.$store.state.userinfo.id,
          failure:false
        }
    },
    created(){
        this.getMyOrder();
    },
    methods:{
      pinjia(key) {
          this.$prompt('请输入评价内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$axios.post('/ComfimOrder',{data:{
                order_id:key,
                ispinjia:'是',
                PJcontent:value
              }})
                .then(res =>{
                  if (res.status === 200){
                    this.$message({
                      type: 'success',
                      message: '评价成功！'
                    });
                    this.getMyOrder()
                  }else {
                    this.$message({
                      type: 'error',
                      message: '评价失败'
                    });
                  }
                })
                .catch(err=>console.log(err))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
      },
      confimOrder(key) {
        this.$axios.post('/ComfimOrder',{data:{
            order_id:key,
            type:'已完成'
          }})
            .then(res =>{
              if (res.status === 200){
                this.$message({
                  type: 'success',
                  message: '确认收货成功！'
                });
                this.getMyOrder()
              }else {
                this.$message({
                  type: 'error',
                  message: '确认收货失败'
                });
              }
            })
            .catch(err=>console.log(err))
      },
      BackOrder(key) {
        this.$axios.post('/RequestBack',{data:{
            order_id:key,
            type:'买家请求退货中'
          }})
            .then(res =>{
              if (res.status === 200){
                this.$message({
                  type: 'success',
                  message: '请求退货成功，等待卖家处理'
                });
                this.getMyOrder()
              }else {
                this.$message({
                  type: 'error',
                  message: '请求退货失败'
                });
              }
            })
            .catch(err=>console.log(err))
      },
      CancerOrder(value,key) {
        this.$axios
            .get("DeleteOrder", {params:{order_id:value}})
            .then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.getMyOrder();
                if (!this.failure){
                  this.$message({
                    type: 'success',
                    message: `${key}成功!`
                  });
                }
              }else {
                this.$message({
                  type: 'info',
                  message: '操作失败'
                });
                this.failure = true
                if (!this.failure){
                  this.$message({
                    type: 'success',
                    message: `${key}成功!`
                  });
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
      },
      CancerComfimOrder(item,value) {
        if (item === 'delete'){
          this.open('删除',value)
        }else {
          this.open('取消',value)
        }
      },
      open(key,value) {
        this.$confirm(`此操作将永久${key}该订单, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
           this.CancerOrder(value,key)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      getMyOrder(){
            this.OrderList = []
            this.$axios.post('/getAllOrder',{userid:this.userid})
            .then(res=>{
              console.log(res)
              this.OrderList = res.data.data
              this.OrderList.forEach(item =>{
                item.time = this.changeTime(item.time)
              })
            });
        },
      changeTime(sec) {
        var time = new Date(Number(sec));
        return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
      }
    },
}
</script>

<style scoped> 
.orderHis{
    position: relative;
    font-size: 19px;
    line-height: 50px;
    padding-left: 50px;
    color: #fff;
    height: 50px;
   background-color: #4e89ae;
}
.orderHis span{
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 0;
}
.myorder{
    height:calc(100% - 40px);
}
</style>