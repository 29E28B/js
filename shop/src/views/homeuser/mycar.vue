<template>
  <div>
    <main-top-bar classify="我的购物车"></main-top-bar>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;height: calc(100vh - 200px);overflow-x: hidden;overflow-y: auto"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="goodname"
          label="商品名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="company"
          label="商品描述"
          width="200">
      </el-table-column>
      <el-table-column
          label="商品图片"
          width="250">
        <template slot-scope="scope">
          <img
              :src="scope.row.picname"
              alt
              style="height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品单价"
          width="150"
          >
      </el-table-column>
      <el-table-column
          label="商品数量"
          width="250">
        <template slot-scope="scope">
          <el-input-number
              v-model="scope.row.goodsnumber"
              :min="1"
              :max="9999"
              size="mini"
              @change="handleNumChange()"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
          label="商品总价"
          width="230">
        <template slot-scope="scope">{{
            scope.row.price * scope.row.goodsnumber
          }}</template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <span style="margin-right: 5px">总计:{{max}}</span>
      <el-button @click="buyOne" type="primary">购买</el-button>
      <el-button @click="DeleteGoods(true)" type="danger">删除</el-button>
    </div>
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
      <div>订单总价:{{max}}</div>
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
import MainTopBar from "@/components/common/mainTopBar";
import {Message} from "element-ui";
export default {
  name: "mycar",
  components: {MainTopBar},
  data() {
    return{
      userid:this.$store.state.userinfo.id,
      tableData: [],
      formData:[],
      max:0,
      OrderList:[],
      userInfoForm:false,
      form:{
        consignee:'',
        address:'',
        phone:''
      },
      payType:'',
    }
  },
  created() {
    this.getAllCarInfo()
  },
  methods:{
    getAllCarInfo() {
      let parma = {
        userid:this.userid,
      }
      this.$axios
          .post("/user/GetAllCarInfo", parma)
          .then((res) => {
            this.tableData = res.data.data
          })
          .catch((err) => {
            console.log(err);
          });
    },
    handleNumChange() {
      this.max = 0;
      this.formData.forEach((item) => {
        this.max += item.price * item.goodsnumber;
      });
    },
    handleSelectionChange(val){
      console.log(val)
      this.formData = val
      this.handleNumChange()
    },
    DeleteGoodsNumber() {
      let datas = []
      this.formData.forEach(item =>{
        datas.push({
          goodsnumber: item.goodsnumber,
          goodsid: item.id
        })
      })
      this.$axios.post('/deleteGoodsNumber',{data:datas})
          .then(res =>{
            if (res.status === 200){
            }else {
            }
          })
          .catch(err=>console.log(err))
    },
    open(key,number) {
      this.$confirm(`商品${key}库存不足，最多可购买${number}件`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
      });
    },
    buyOne() {
      if (this.formData.length > 0){
        var Isok = true
        this.formData.forEach((item) => {
          if (item.goodsnumber > JSON.parse(item.number)){
            this.open(item.goodname,JSON.parse(item.number));
            Isok = false
          }
        });
        if (Isok){
          this.userInfoForm = true
        }
      }
    },
    BuyGoods(){
      this.formData.forEach(item =>{
        this.OrderList.push(Object.assign({
          buyerid:this.userid,
          goodsid:item.goodsid,
          totleprice:item.goodsnumber * JSON.parse(item.price),
          type:'未发货',
          time:'',
          goodsname:item.goodname,
          ordernumber:item.goodsnumber,
          ispinjia:'否'
        },this.form))
      })
      this.$axios.post('/addOrder',{data:this.OrderList})
          .then((res) =>{
            if (res.status === 200){
              this.DeleteGoods(false)
              this.DeleteGoodsNumber()
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
    DeleteGoods(key){
      let shopList = []
      this.formData.forEach(item =>{
        shopList.push(JSON.parse(item.goodsid))
      })
      let param = {
        userid:this.userid,
        goodsid:shopList
      }
      this.$axios
          .get("/user/DeleteCar", {params:param})
          .then((res) => {
            if (res.status === 200) {
              if (key){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getAllCarInfo()
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>

</style>