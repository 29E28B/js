<template>
<div class="login" >
    <h2>水果购物平台</h2>
    <div class="loginMethod">
        <span @click='userLogin' :class="{loginMethodselect:loginMethods!='用户'}">用户账号登录</span>
        |<span @click='adminLogin' :class="{loginMethodselect:loginMethods!='管理员'}">管理员登录</span>
        </div>
        <main :class="isshow ? 'loginbox' : 'loginbox1'">
            <h4 class="title" v-if="isshow">{{loginMethods}}账号登录</h4>
            <h4 class="title" v-else>注册账号</h4>
          <table width='100%' cellspacing='15' v-if="isshow">
                  <tr>
                      <td width='40'>账号:</td>
                      <td><input type='text' class="account" placeholder="请输入账号" name="account" v-model="account" @keyup="checkAccount"></td>
                        <td width='80'><span class="accountRemind" v-show="!accountFormat">用户账号需为11数字</span></td>
                  </tr>
                  <tr>
                     <td width='40'>密码:</td>
                     <td> <input type="password" class="psw" placeholder="请输入密码" name="password" v-model="password" @keyup="checkPsw"></td>
                     <td width='80'><span class="pswRemind" v-show="!pswFormat">密码须为5-16位</span></td>
                  </tr>
              </table>
          <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-else>
            <el-form-item label="姓名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input v-model.number="ruleForm.account" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
              <el-input v-model="ruleForm.email"></el-input>
              <el-button @click="sendemail">发送邮箱验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="password" v-if="isOK">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
              <el-button @click="resetForm">去登入</el-button>
            </el-form-item>
          </el-form>
              <div class="subbox" v-if="isshow">
                <input type="submit" class="submit" value='登录' ref="submit" @click="submit(account,password)">
                <input type="submit" class="submit" value='注册' ref="regiest" @click="regiest">
              </div>
          <div class='forgetPsw' v-if="loginMethods=='用户'"><span id="resetPsw" @click="resetPsw">忘记密码</span></div>
        </main>
</div>
</template>

<script>
import {Message} from "element-ui";

export default {
    name:'login',
    data(){
        return {
            loginMethods:'用户',
            accountFormat:true,
            pswFormat:true,
            account:'',
            password:'',
            isshow:true,
          isOK:false,
          ruleForm: {
            username: '',
            gender: '男',
            account:'',
            password:'',
            email:'',
            code:''
          },
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
              {pattern:/^\d{11}$/ ,message: '账号为11位数字', trigger: 'change' }
            ],
            password:[
              {required: true, min: 5, max: 16, message: '密码为5-16位', trigger: 'change' }
            ]
          }

        }
    },
    mounted(){
        this.$refs.submit.disabled=true;
    },
    methods:{
      submitForm(formName) {
        if (this.ruleForm.code ==''){
          this.$message({
            message: '请先获取验证码！',
            type: 'error'
          });
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.code != 556596){
              this.$message({
                message: '验证码不正确！',
                type: 'error'
              });
            }else {
              let parma = {
                username: this.ruleForm.username,
                gender: this.ruleForm.gender,
                account:this.ruleForm.account,
                password:this.ruleForm.password
              }
              this.$axios.post('/admin/adduser',{data:parma})
                  .then(res=>{
                    if (res.status === 200){
                      this.$message({
                        message: '注册成功！！',
                        type: 'success'
                      });
                    }else {
                      this.$message({
                        message: '注册失败！！',
                        type: 'error'
                      });
                    }
                  })
                  .catch(err=>console.log(err))
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      sendemail(){
        this.$axios.post('/sendemail',{email:this.ruleForm.email})
            .then(res=>{
              if (res.status === 200){
                this.$message({
                  message: '邮件发送成功！请注意查收',
                  type: 'success'
                });
                this.isOK = true
              }
            })
            .catch(err=>console.log(err))
      },
        resetForm(){
          this.isshow = true
        },
        regiest() {
          this.isshow = false
        },
      userLogin(){
            this.isshow = true
            this.loginMethods='用户';
        },
        // 管理员身份登录
        adminLogin(){
          this.isshow = true
            this.loginMethods='管理员';
        },
        // 忘记密码跳转路由
        resetPsw(){
            alert('请联系后台管理');
        },
        // 检查账号是否符合规范
        checkAccount(){
            let checkAccount=/^\d{10}$/;
            let accountTest=checkAccount.test(event.target.value);
            if(!accountTest&&this.loginMethods=='用户'){
                this.$refs.submit.disabled=true;
                 return this.accountFormat=false;               
            }
            this.accountFormat=true;
             this. btndisabled();
             this.checkEnter()
        },
        // 检查密码是否符合规范
        checkPsw(){
              let checkPsw=/^\S{5,16}$/;
            let pswTest=checkPsw.test(event.target.value)
              if(!pswTest){
                this.$refs.submit.disabled=true;
                return this.pswFormat=false;
            }
            this.pswFormat=true;
            this. btndisabled();
            this.checkEnter()
        },
        // 按下回车实现登录
         checkEnter(){
            if(event.keyCode==13){
                this.$refs.submit.click();
            }
        },
        // 提交按钮启用函数
        btndisabled(){
            if(this.accountFormat&&this.pswFormat){
                 this.$refs.submit.disabled=false;
            }
        },
         submit(account,password){
             if(this.loginMethods==='用户'){
                  this.$axios.post('/login/userlogin',{
                  account,
                  password,
               })
               .then(res=>{
                  if(res.data.msg=='登录成功'){
                    window.localStorage.token=res.data.token;
                      this.$router.replace('/home');
                    }
                  
                  })
                .catch(err=>console.log(err));
             }
             if(this.loginMethods==='管理员'){
                this.$axios.post('/login/adminlogin',{
                account,
                password,
            }).then(res=>{
                if(res.data.msg=='登录成功'){
                    window.localStorage.token=res.data.token;
                    this.$router.replace('/admin');
                }
                
            }).catch(err=>{
                console.log(err)
            });
             }
        }

    }


}
</script>

<style scoped>
h2{
    margin-top: 5vh;
    text-align: center;
    color: yellowgreen;
}
.login{
    width: 100vw;
    height: 100vh;
    background-image: url("~assets/Image/BG2.jpg");
    background-size: cover;
    overflow: hidden;
}
.loginMethod{
    margin: 0 10px;
    text-align: right;
    cursor:pointer;
}
.loginbox{
    width: 30vw;
    min-width: 200px;
    max-width: 500px;
    margin:auto;
    margin-top: 20vh;
    padding:30px 20px;
    border-radius:10px;
    background-color: #fff;
}
.loginbox1{
  width: 30vw;
  min-width: 200px;
  max-width: 500px;
  margin:auto;
  padding:30px 20px;
  border-radius:10px;
  background-color: #fff;
}
.title{
    margin-bottom: 20px;
    font-size: 20px;
    text-align: center;
}
tr td:nth-child(2){
    display: block;
    width: 100%;
}
.account,
.psw{
    width:90%;
    height: 40px;
    outline: none;
    padding-left: 20px;
    border: 1px solid rgb(0, 132, 255);
    border-radius: 8px;
}
.subbox{
    margin-top: 20px;
    text-align: center;
}
.submit{
    text-align: center;
    padding:10px 15px;
    border-radius: 3px;
    outline: none;
    border: none;
    background-color: rgb(0, 162, 255);
    cursor:pointer;
}
.forgetPsw{
    font-size:12px;
    color: #aaa;
    text-align: right;
}
.loginMethodselect{
    color: rgb(24, 197, 240);
}
#resetPsw{
    cursor: pointer;
}
.accountRemind,
.pswRemind{
    font-size: 10px;
    color: red;
}
.accountRemind::before,
.pswRemind::before{
    content: 'x';
    display: inline-block;
    color: #fff;
    margin-right: 2px;
    line-height: 16px;
    text-align: center;
    width: 16px;
    height: 16px;
    background-color: #e00;
    border-radius: 8px;
}

</style>