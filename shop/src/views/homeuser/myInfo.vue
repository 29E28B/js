<template>
<div class="myinfo">
    <main-top-bar classify="个人信息"></main-top-bar>
    <el-form :model="useform" :rules="rules" ref="useform" label-width="100px" class="demo-ruleForm" style="padding-top: 20px">
      <el-form-item label="头像：">
        <el-upload
            ref="upload"
            class="avatar-uploader"
            action="/car/admin/updateUser"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            :show-file-list="false"
            :auto-upload="false"
            :data="param11"
            :on-change="change"
            list-type="picture">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
  inject:["reload"],
  data() {
       return{
         useform:this.$store.state.userinfo,
         param11:{},
         imageUrl:'',
         rules: {
           username: [
             { required: true, message: '请输入姓名名称', trigger: 'blur' },
             { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
           ],
           gender: [
             { required: true, message: '请选择性别', trigger: 'change' }
           ],
           account: [
             {required: true,message: '请输入账号',trigger: 'blur'},
             {pattern:/^\d{11}$/ ,message: '账号为11位数字', trigger: 'blur' }
           ],
         }
       }
    },
    methods: {
      change(file){
        this.imageUrl = file.url
      },
      handleAvatarSuccess(res){
        if(res.msg =='修改成功'){
          Message.success(res.msg);
          this.reload()
        }else{
          Message.error(res.msg);
        }
      },
      // getUserInformation(){
      //   this.$axios.get('/user/userinfo')
      //       .then(res=>{
      //         console.log(res.data.data)
      //         if (res.data.data === undefined || res.data.data){
      //           this.isshow = true
      //         }
      //         this.$store.commit('getuserName',res.data.data);
      //       })
      //       .catch(err=>console.log(err.response));
      // },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.param11 = Object.assign({},this.useform,{userid:this.useform.id})
            this.$nextTick(()=>{
              this.$refs.upload.submit()
            })
            // this.$axios.post('/admin/updateUser',{data:Object.assign(this.useform,{userid:this.useform.id})})
            //     .then(res=>{
            //       console.log(res)
            //       if(res.status==200){
            //         Message.success(res.data.msg);
            //       }else{
            //         Message.error(res.data.msg);
            //       }
            //     })
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
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>