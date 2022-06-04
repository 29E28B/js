<template>
  <div class="allUser">
      <div class="tableBox">
           <el-table
              :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
              max-height='880px'>
              <el-table-column
                label="账号"
                prop="account">
              </el-table-column>
              <el-table-column
                label="姓名"
                prop="username">
              </el-table-column>
              <el-table-column
                label="性别"
                prop="gender">
              </el-table-column>
              <el-table-column
                align="right">
                <template slot="header" >
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入姓名进行搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="open(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>        
      </div>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model.number="form.account" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editusermessage">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
 export default {
    data() {
      return {
        tableData: [],
        search: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{
          username:'',
          gender:'',
          account: '',
          userid:''
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
            {pattern:/^\d{10}$/ ,message: '账号为10位数字', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.form.username = row.username
        this.form.gender = row.gender
        this.form.account = JSON.parse(row.account)
        this.form.userid = row.id
      },
      editusermessage() {
        this.$axios.post('/admin/updateUser',{data:this.form})
            .then(res=>{
              console.log(res)
              if(res.status==200){
                this.dialogFormVisible = false
                Message.success(res.data.msg);
                this.getUsers();
              }else{
                Message.error(res.data.msg);
              }
            })
      },
      open(index, row) {
        this.$confirm('此操作将永久删除该用户,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUsers(index,row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getUsers(){
        this.$axios.get('/user/getalluser')
        .then(res=>{
          this.tableData=res.data.data;
        })
        .catch(err=>console.log(err))
      },
      deleteUsers(index,row){
        this.$axios.get('/admin/deleteuser',{params:{userid:row.id}})
        .then(res=>{
          Message.success(res.data.msg);
          this.tableData.splice(index,1)
        })
        .catch(err=>console.log(err))
      }
    },
    created(){
        this.getUsers();
    }
  }
</script>

<style scoped>
</style>