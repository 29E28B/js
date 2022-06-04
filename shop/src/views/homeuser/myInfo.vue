<template>
<div class="myinfo">
    <main-top-bar classify="个人信息"></main-top-bar>
    <el-form :model="useform" :rules="rules" ref="useform" label-width="100px" class="demo-ruleForm" style="padding-top: 20px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="useform.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="useform.gender" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model.number="useform.account" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('useform')">立即修改</el-button>
        <el-button @click="resetForm('useform')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
  
</template>

<script>
import mainTopBar from '../../components/common/mainTopBar.vue';
import {Message} from "element-ui";
export default {
   name:'myinfo',
    data() {
       return{
         useform:this.$store.state.userinfo,
         rules: {
           username: [
             { required: true, message: '请输入姓名名称', trigger: 'blur' },
             { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
           ],
           gender: [
             { required: true, message: '请选择性别', trigger: 'change' }
           ],
           account: [
             {required: true,type: 'number',message: '请输入账号',trigger: 'change'},
             {pattern:/^\d{10}$/ ,message: '账号为10位数字', trigger: 'change' }
           ],
         }
       }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        console.log(this.useform)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/updateUser',{data:Object.assign(this.useform,{userid:this.useform.id})})
                .then(res=>{
                  console.log(res)
                  if(res.status==200){
                    Message.success(res.data.msg);
                  }else{
                    Message.error(res.data.msg);
                  }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    components: { mainTopBar },
    filters:{
        //日期处理函数
        formatDate(date){
            date=parseInt(date);
            let time=new Date(date);
            let y=time.getFullYear();
            let m=time.getMonth()+1;
            let d=time.getDate();
            return y+'/'+m+'/'+d;
        }
    }
}
</script>

<style scoped>
.myinfo{
  height: 100%;
}
.info{
  box-sizing: border-box;
  padding:50px 0 0 50px ;
  width: 100%;
  height: calc(100% - 60px);
}

</style>