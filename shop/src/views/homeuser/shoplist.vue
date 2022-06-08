<template>
  <div>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in imgList" :key="item.value">
        <img :src="item.src" style="height: 100%;width: 100%">
      </el-carousel-item>
    </el-carousel>

      <good-serarch :isshow="false" @SearchResult="SearchResult"></good-serarch>
    <div style="height: calc(100vh - 332px)">
      <div style="display: flex;width: 100%">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            text-color="#fff"
            active-text-color="#FF0000"
            background-color="#ffcccc"
            @select="getCartListData"
        >
          <el-menu-item v-for="(item,index) in allType" :key="index" :index="item.value" style="height: 100px">{{
              item.value
            }}</el-menu-item>
        </el-menu>
        <div style="width: 100%;height: calc(100vh - 200px);overflow-y: auto;overflow-x: hidden">

          <el-row :gutter="24">
            <el-col :span="6" v-for="(item,index) in newShopList" :key="index">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img
                    :src="item.picname"
                    class="image"
                    width="100%"
                    height="200px"
                    @click="getOneGoodMessage(item)"
                />
                <div style="padding: 14px">
                  <span>商品名称:{{ item.goodname }}</span>
                  <div style="padding-top: 10px">
                    <span class="time">商品售价:￥{{item.price}}</span>
                  </div>
                  <div style="padding-top: 10px">
                    <span class="time">商品库存:{{item.number}}</span>
                  </div>
                  <div class="bottom clearfix">
                    <el-button
                        type="primary"
                        @click="addChart(item)"
                    >直接购买</el-button
                    >
                    <el-button
                        type="success"
                        @click="addMyChart(item)"
                    >加入购物车</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="goodsCartDialog" width="30%">
      <span style="color: red">恭喜您，加入购物车成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsCartDialog = false">继续购物</el-button>
        <el-button type="primary" @click="showCart()">查看购物车</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请填写收货信息" :visible.sync="userInfoForm">
      <el-form :model="form">
        <el-form-item label="收货人：">
          <el-input v-model="form.consignee" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="收货地址：">
          <el-input v-model="form.address" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input v-model="form.phone" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <label>请选择支付方式:</label>
        <el-select v-model="payType" placeholder="请选择支付方式">
          <el-option label="微信" value="微信"></el-option>
          <el-option label="支付宝" value="支付宝"></el-option>
        </el-select>
      </div>
      <div v-if="payType !== ''">
        <div>二维码</div>
        <img
            v-if="payType === '微信'"
            width="150px"
            height="150px"
            src="../../assets/Image/微信支付.png" />
        <img
            v-else
            width="150px"
            height="150px"
            src="../../assets/Image/支付宝支付.png" />
      </div>
      <div>订单价格:{{this.BuyGoodsInfo.price}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInfoForm = false">取 消</el-button>
        <el-button
            type="primary"
            @click="BuyGoods"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GoodSerarch from "@/components/content/goodSearch";
export default {
  name: "shoplist",
  components: {GoodSerarch},
  data() {
    return{
      userid:this.$store.state.userinfo ? this.$store.state.userinfo.id : -1,
      goodsCartDialog:false,
      activeIndex: "热销水果",
      imgList:[
        {
          src: require("@/assets/Image/水果0.jpg"),
          value:1
        },
        {
          src:require("@/assets/Image/水果1.jpg"),
          value:2
        },
        {
          src:require("@/assets/Image/水果2.jpg"),
          value:3
        }
      ],
      allType: [{
        value: '热销水果',
        label: '热销水果'
      }, {
        value: '降价水果',
        label: '降价水果'
      }, {
        value: '进口水果',
        label: '进口水果'
      }],
      newShopList: [],
      AllShopList: [],
      userInfoForm:false,
        form:{
          consignee:'',
          address:'',
          phone:''
    },
      BuyGoodsInfo:{},
      payType:''
    }
  },
  created() {
   this.getAllGoods()
  },
  methods: {
    getOneGoodMessage(key) {
      this.$router.push({
        path:'/home/goodsdetail',
        query:key
      })
    },
    showCart() {
      this.$router.push('/home/mycar')
      this.goodsCartDialog = false
    },
    SearchResult(key) {
      this.newShopList = key
      this.activeIndex = key[0].author
    },
    getCartListData(key, keyPath) {
      this.newShopList = []
      this.AllShopList.forEach(item =>{
        if (item.author === key){
          this.newShopList.push(item)
        }

      })
    },
    DeleteGoodsNumber() {
      let datas = [{
        goodsnumber: 1,
        goodsid: this.BuyGoodsInfo.id
      }]
      this.$axios.post('/deleteGoodsNumber',{data:datas})
          .then(res =>{
            if (res.status === 200){
            }else {
            }
          })
          .catch(err=>console.log(err))
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
    BuyGoods() {

      let parmas = [{
        buyerid:this.userid,
        goodsid:this.BuyGoodsInfo.id,
        totleprice:this.BuyGoodsInfo.price,
        type:'未发货',
        goodsname:this.BuyGoodsInfo.goodname,
        time:'',
        ordernumber:1,
        ispinjia:'否'
      }]
      Object.assign(parmas[0],this.form)
      this.$axios.post('/addOrder',{data:parmas})
          .then( async res =>{
            if (res.status === 200){
              await this.DeleteGoodsNumber()
              this.$message({
                type: 'success',
                message: '下单成功!'
              });
              this.$router.push('/home/myorder')
            }else {
              this.$message({
                type: 'success',
                message: '下单失败请重试!'
              });
            }
          })
          .catch(err=>console.log(err))
    },
    getAllGoods(){
      this.$axios.get('/admin/allgoodsinfo')
          .then(res=>{
             res.data.data.forEach(item =>{
              if (item.author === this.activeIndex){
                this.newShopList.push(item)
              }
            })
            this.AllShopList = JSON.parse(JSON.stringify(res.data.data))
          })
          .catch(err=>console.log(err))
    },
    addChart(item) {
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
        this.BuyGoodsInfo = item
        this.userInfoForm = true
    },
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
                this.goodsCartDialog = true
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
  }
}
</script>

<style scoped>

</style>