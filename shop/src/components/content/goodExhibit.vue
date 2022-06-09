<template>
  <div class="shopExhibit">
          <div class="lendBox">
          <div class="goodsItem" v-for="(item,index) in goodsInfo" :key="index">
            <div id="goodsIndex">序号：{{index+1}}</div>
            <div class="goodPic"><img :src="item.picname" alt=""></div>
             <div class="goodInfo">
                 <div id="goodName">商品名：{{item.goodname}}</div>
                 <div id="author">类别:{{item.author}}</div>
                 <div id="company"> 商品描述：{{item.company}}</div>
                 <div id="goodNum">商品编号：{{item.goodid}}</div>
             </div>
             <div class="price">商品价格：￥{{item.price}}</div>
            <div class="price">商品库存：{{item.number}}</div>
            <div class="delete">
              <el-button type="primary" @click="edit(item)">编辑</el-button>
            </div>
            <div class="delete" v-if="showDeleteBtn">
                 <el-button type="danger" @click="open(item.id,index,item.status,item.picname)">删除</el-button>
             </div>
                                
             <div class="other">
                 <slot></slot>
             </div>
      </div>
            <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名" prop="goodname">
                  <el-input v-model="ruleForm.goodname"></el-input>
                </el-form-item>
                <el-form-item label="商品类别" prop="author">
                  <el-select v-model="ruleForm.author" placeholder="请选择" style="width: 100%">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品描述" prop="company">
                  <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <el-form-item label="商品编号" prop="goodid">
                  <el-input v-model="ruleForm.goodid"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                  <el-input v-model="ruleForm.price"></el-input>
                </el-form-item >
                <el-form-item label="商品数量" prop="number">
                  <el-input v-model="ruleForm.number"></el-input>
                </el-form-item >
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editgoodsmessage">确 定</el-button>
              </div>
            </el-dialog>
     </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
    name:'shopExhibit',
    data() {
      return{
        dialogFormVisible:false,
        ruleForm: {
          goodname: '',
          author:'',
          company: '',
          goodid:'',
          price:'',
          number:'',
          id:''
        },
        options: [{
          value: '热销水果',
          label: '热销水果'
        }, {
          value: '降价水果',
          label: '降价水果'
        }, {
          value: '进口水果',
          label: '进口水果'
        }],
        rules: {
          goodname: [
            { required: true, message: '请输入商品名', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请选择类别', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ],
          goodid: [
            { required: true,pattern:/^\S{1,8}\-\d{1,5}$/, message: '商品编号须为xx-xx', trigger: 'blur' }
          ],
          price: [
            {required: true, pattern:/^\d{1,6}\.\d{2}$/, message: '价格须为x.xx', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' }
          ]
        }
      }
    },
    props:{
      goodsInfo:{
            type:Array,
            default(){
                return [];
            }

        },
        showDate:{
            type:Boolean,
            default(){
                return false;
            } 
        },
        showReturn:{
            type:Boolean,
            default(){
                return false;
            } 
        },
        showDeleteBtn:{
            type:Boolean,
            default(){
                return false;
            }
        },
        showState:{
            type:Boolean,
            default(){
                return false;
            }
        }        


    },
    filters:{
        //日期处理函数
        formatDate(date){
            date=parseInt(date);
            let time=new Date(date);
            let y=time.getFullYear();
            let m=time.getMonth()+1;
            let d=time.getDate();
            return y+'/'+m+'/'+d;
        },
    },
    methods:{
        editgoodsmessage() {
          this.$axios.post('/admin/updateGoods',this.ruleForm)
              .then(res=>{
                console.log(res)
                if(res.status==200){
                  this.dialogFormVisible = false
                  Message.success(res.data.msg);
                  this.$parent.getAllGoods()
                }else{
                  Message.error(res.data.msg);
                }
              })
        },
        getDelete(id,index,picname){
            let fileName=picname.split('/');
            this.$axios.get('/admin/deletegood',{params:{goodid:id,pic:fileName[fileName.length-1]}})
            .then(res=>{
                Message.success(res.data.msg);
                this.$emit('delete-success',index);
            })
            .catch(err=>console.log(err))

        },
        edit(item) {
          this.dialogFormVisible = true
          Object.keys(this.ruleForm).forEach(item1=>{
            this.ruleForm[item1] = item[item1]
          })
        },
        open(id,index,status,picname) {
        this.$confirm('确认删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getDelete(id,index,picname)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }

}
</script>

<style scoped>
.lendBox{
    height:calc(100% - 60px - 30px);
    background-color: #fff;
    overflow: auto;
}
.goodsItem{
    display: flex;
    justify-content:flex-start;
    padding: 0 10px;
    height: 100px;
    /* background-image: linear-gradient(to right, #fddb92 0%, #d1fdff 100%); */
    border-bottom: 2px solid #ccc;
    overflow: hidden;
}
#goodsIndex{
    line-height: 100px;
    margin-right: 20px;
}
.goodPic{
    display: flex;
    align-items: center;

    height: 100%;
    line-height: 100px;
    margin: 0 20px;
    vertical-align: middle;
}
.goodPic img{
    height: 80%;
    
}
.goodInfo{
    flex: 1;
}
.delete{
    height: 100%;
    line-height: 100px;
}
.other{
    display: flex;
    height: 100%;
    line-height: 100px;
}
#goodName{
    font-size: 18px;
    font-weight: 700;
}
#author,
#company,
#goodNum{
    font-size: 16px;
    color: rgb(92, 92, 86);
}
.price{
    margin-right: 30px;
    line-height: 100px;
}

</style>