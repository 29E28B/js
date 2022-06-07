const express=require('express');
const goodsystem = require('../sql/goodsystem');
const allGoodsInfo=express.Router();
allGoodsInfo.get('/allgoodsinfo',(req, res)=>{
    goodsystem.query('select * from goods',(err,results)=>{
        if(results.length>=0){
            results.forEach(item => {
                item.picname='http://127.0.0.1:8000/shop/picimg/'+item.picname;
            });
            res.status(200).send({data:results})
        }else{
            res.status(401).send({msg:'未知错误'})
        }
    })
   
})
module.exports=allGoodsInfo;