const express=require('express');
const goodsystem = require('../sql/goodsystem');
const updateUser=express.Router();
updateUser.post('/updateUser',(req,res)=>{
    const goodClear={account:req.body.data.account,username:req.body.data.username,gender:req.body.data.gender};
    goodsystem.query('update users set ? where id=?',[goodClear,req.body.data.userid],(err,results)=>{
        if(results){
            return  res.status(200).send({msg:'修改成功'})
        }
        res.status(401).send({msg:'修改失败,请重试'})
    })

})
module.exports=updateUser;