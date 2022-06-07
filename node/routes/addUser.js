const express=require('express');
const goodsystem = require('../sql/goodsystem');
const addUser=express.Router();
addUser.post('/adduser',(req,res)=>{
    goodsystem.query('insert into users set ?',[req.body.data],(err,results)=>{
        if(results){
          return  res.status(200).send({msg:'添加成功'})
        }
        res.status(401).send({msg:'添加失败,该用户已存在'})
    })
})
module.exports=addUser;