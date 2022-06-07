const express=require('express');
const goodsystem = require('../sql/goodsystem');
const userChangePassword=express.Router();
userChangePassword.post('/changepassword',(req, res)=>{
    goodsystem.query('select password from users where id=?',[req.user.userid],(err,results)=>{
        if(results.length==0){
            res.status(401).send({msg:'登录已过期'})
        }else{
            if(results[0].password==req.body.oldPassword){
                goodsystem.query('update users set password=? where id=?',[req.body.password,req.user.userid],(err,result)=>{
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
        }
      
    })
   
})
module.exports=userChangePassword;