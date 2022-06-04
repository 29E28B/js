<template>
  <div >
    <main-top-bar classify="订单管理"></main-top-bar>
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
          <el-button @click="delivery(item.order_id)" v-if="item.type === '未发货'">发货</el-button>
          <el-button @click="Agree(item.order_id)" v-if="item.type === '买家请求退货中'">同意退货</el-button>
          <el-button @click="CancerComfimOrder('delete',item.order_id)" v-if="item.type === '已完成' || item.type === '同意退货'">删除订单</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>

  
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
export default {
    name:'OrderManage',
    components:{
        mainTopBar,
    },
    data(){
        return {
          OrderList:[]
        }
    },
  created() {
      this.getMyOrder()
  },
  methods:{
      Agree(key) {
          this.$confirm('请确认您是否同意退货', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post('/AgreeBack',{data:{
                order_id:key,
                type:'同意退货'
              }})
                .then(res =>{
                  if (res.status === 200){
                    this.$message({
                      type: 'success',
                      message: '同意退货成功！'
                    });
                    this.getMyOrder()
                  }else {
                    this.$message({
                      type: 'error',
                      message: '同意退货失败'
                    });
                  }
                })
                .catch(err=>console.log(err))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      delivery(key) {
        this.openAddress(key)
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
      getMyOrder(){
        this.OrderList = []
        this.$axios.get('/getAllOrderList')
            .then(res=>{
              console.log(res)
              this.OrderList = res.data.data
              this.OrderList.forEach(item =>{
                item.time = this.changeTime(item.time)
              })
            });
      },
      openAddress(key) {
        this.$prompt('请输入物流单号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          this.$axios.post('/UpdateType',{data:{
              Logistics:value,
              order_id:key,
              type:'已发货'
            }})
              .then(res =>{
                if (res.status === 200){
                  this.$message({
                    type: 'success',
                    message: '发货成功'
                  });
                  this.getMyOrder()
                }else {
                  this.$message({
                    type: 'error',
                    message: '发货失败'
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
      changeTime(sec) {
        var time = new Date(Number(sec));
        return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
      }
    },

}
</script>

<style scoped>


</style>