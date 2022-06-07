const express=require('express');
const goodsystem = require('../sql/goodsystem');
const adminChangePassword=express.Router();
adminChangePassword.post('/changepassword',(req,res)=>{
    console.log(req.user);
    goodsystem.query('select password from administrator where id=?',[req.user.userid],(err,results)=>{
        if(results[0].password==req.body.oldPassword){
            goodsystem.query('update administrator set password=? where id=?',[req.body.password,req.user.userid],(err,result)=>{
              if(result.affectedRows){
                return  res.send({
                    status:200,
                    msg:'密码修改成功,请重新登录',
                })
              }
              res.send({
                status:401,
                msg:'修改失败'
            })
            })
            
        }else{
            res.send({
                status:401,
                msg:'旧密码错误',
            });
        }
      
    })
   
})
module.exports=adminChangePassword;