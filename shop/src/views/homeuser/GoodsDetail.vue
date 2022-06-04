<template>
  <div style="background-color: #FFFFF4;overflow-y: auto;height: calc(100vh - 80px)">
    <div class="box">
      <div class="imgbox">
        <img
            :src="GoodsMessage.picname"
            class="image"
            width="100%"
            height="100%"
        />
      </div>
      <div class="detailbox">
        <h2>商品名称:{{GoodsMessage.goodname}}</h2>
        <h1>商品详情:{{GoodsMessage.company}}</h1>
        <h1>商品单价:{{GoodsMessage.price}}</h1>
        <h1>商品类别:{{GoodsMessage.author}}</h1>
        <h1>商品库存:{{GoodsMessage.number}}件</h1>
      </div>
    </div>
    <div>
      <el-button @click="addMyChart(GoodsMessage)"style="margin-left: 50px;width: 100px;height: 40px;margin-bottom: 20px" type="success" >加入购物车</el-button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品评价</span>
      </div>
      <div v-for="(item,index) in OrderList" :key="index" class="text item">
        <span>用户: {{index+1 + '   '+  '评价内容：' + item.PJcontent }}</span>
        <el-button v-if="item.buyerid == userid" @click="deletePJ(item.order_id)" type="primary">删除评论</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  data() {
    return{
      GoodsMessage:{},
      OrderList:[],
      userid:this.$store.state.userinfo ? this.$store.state.userinfo.id : -1,
    }
  },
  created() {
    this.GoodsMessage = this.$route.query
    this.getMyOrder()
  },
  methods:{
    addMyChart(item) {
      console.log(this.userid)
      if (this.userid === -1 || this.userid === undefined){
       this.open();
       return;
      }
      if (item.number == 0) {
        this.$message({
          message: "商品无库存",
          type: "error",
        });
        return;
      }
      let parma = {
        userid:this.userid,
        goodsid: item.id,
        goodsnumber:1
      }
      this.$axios
          .post("/user/addShopping", parma)
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                message: "加入成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "加入失败，请重试",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '目前为游客状态，请登入后再试'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done();
            this.$router.push('/login');
          } else {
            done();
          }
        }
      }).then(action => {

      });
    },
    deletePJ(key) {
      this.$axios.post('/DeletePJ',{order_id:key})
          .then(res=>{
            if (res.status === 200){
              this.$message({
                type: 'success',
                message: '评论删除成功!'
              });
              this.getMyOrder()
            }else {
              this.$message({
                type: 'success',
                message: '评论删除失败 请重试!'
              });
            }
          });
    },
    getMyOrder(){
      this.$axios.post('/getAllPJOrderList',{goodsid:this.GoodsMessage.id})
          .then(res=>{
            this.OrderList = []
            res.data.data.forEach(item =>{
              if (item.PJcontent !== ''){
                this.OrderList.push(item)
              }
            })
          });
    },
  },
}
</script>

<style scoped>
.box{
  width: 90%;
  height: calc(70vh - 80px);
  padding:20px 50px;
  display: flex;
  justify-content: space-around;
}
.imgbox{
  width:40% ;
  height: 80%;
}
.detailbox{
  width:40% ;
  height: 80%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border: 1px solid gray;
  background-color: #d0d0d0;
  align-items: center;
}
/*.pinjia{*/
/*  width: 90%;*/
/*  height: 50px;*/
/*  background-color: #4e89ae;*/
/*  margin-left: 50px;*/
/*}*/
.text {
  font-size: 14px;
}

.item {
  display: flex;
  margin-bottom: 18px;
  justify-content:space-between;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 90%;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>