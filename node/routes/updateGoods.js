const express=require('express');
const goodsystem = require('../sql/goodsystem');
const updateGoods=express.Router();
updateGoods.post('/updateGoods',(req,res)=>{
    goodsystem.query('update goods set ? where id=?',[req.body,req.body.id],(err,results)=>{
        if(results){
            return  res.status(200).send({msg:'修改成功'})
        }
        res.status(401).send({msg:'修改失败,请重试'})
    })

})
module.exports=updateGoods;