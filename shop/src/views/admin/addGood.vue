<template>
<div class="addGood">
    <main-top-bar classify='添加商品'></main-top-bar>
    <div class="formBox">
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
             <input type="file" accept="image/*" ref="file">
           <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
             <el-button @click="resetForm('ruleForm')">重置</el-button>
           </el-form-item>
         </el-form>
    </div>

</div>
  
</template>

<script>
import { Message } from 'element-ui';
import mainTopBar from '../../components/common/mainTopBar.vue';
// import qs from 'qs'
export default {
    data() {
      return {
        ruleForm: {
          goodname: '',
          author:'',
          company: '',
          goodid:'',
          price:'',
          goodnumber:'',
          number:''
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
      };
    },
    components:{
        mainTopBar,
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.file.files[0]==undefined ? Message.warning('还未上传图片'): this.sendGoodData();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 提交商品数据
      sendGoodData(){
        let formData1=new FormData();
        formData1.append('data',JSON.stringify(this.ruleForm));
        formData1.append('picname',this.$refs.file.files[0]);
        this.$axios.post('/admin/addgoods',formData1,{headers:{'Content-Type':'multipart/form-data'}})
        .then(res => Message.success(res.data.msg))
        .catch(err=>console.log(err))
      }

    }
}
</script>

<style scoped>
 .addGood{
     width: 100%;
     height: 100%;
     /* background-image: url("~assets/Image/BG1.jpg"); */
     background-size: cover;

 }

.formBox{
    margin-top: 10px;
    width: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
 .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
 }
 .avatar-uploader .el-upload:hover {
     border-color: #409EFF;
 }
 .avatar-uploader-icon {
     font-size: 28px;
     color: #8c939d;
     width: 178px;
     height: 178px;
     line-height: 178px;
     text-align: center;
 }
</style>