const express=require('express');
const goodsystem = require('../sql/goodsystem');
const fs = require("fs");
const e = require("express");
const GetAllCarInfo=express.Router();
GetAllCarInfo.post('/GetAllCarInfo', (req,res)=>{
    var length = 1
    goodsystem.query('select * from cart where userid=?',[req.body.userid],(err,results)=>{
        console.log(results)
         results.forEach((item,index) =>{
             goodsystem.query('select * from goods where id=?',[item.goodsid],(err,result)=>{
                result[0].picname = 'http://127.0.0.1:8000/shop/picimg/'+result[0].picname;
                Object.assign(results[index],result[0])
                if(length == results.length){
                    return  res.status(200).send({msg:'获取成功',data:results},)
                }else {
                    length++
                }
            })
        })
        if (results.length === 0){
            res.status(200).send({msg:'获取成功',data:results},)
        }
        if (err){
            res.status(401).send({msg:'获取失败,请重试'})
        }
    })


})
GetAllCarInfo.get('/DeleteCar',(req,res)=>{
    var length = 0
    req.query.goodsid.forEach(item=>{
        goodsystem.query('delete from cart where userid=? and goodsid=?',[req.query.userid,item],(err,results)=>{
            length++
            if (length === req.query.goodsid.length){
                if(results.affectedRows==1){
                    res.status(200).send({msg:'删除成功'}) ;
                }else{
                    res.status(401).send({msg:'删除失败'});
                }
            }
            if (err){
                res.status(401).send({msg:'删除失败'})
            }
        })

    })
})

GetAllCarInfo.post('/addShopping', (req,res)=>{
    goodsystem.query('select * from cart where userid=? and goodsid = ?',[req.body.userid,req.body.goodsid],(err,results)=>{
        console.log(results)
        if(results.length > 0){
            goodsystem.query('update cart set goodsnumber = goodsnumber + 1 where userid = ? and goodsid = ?',[req.body.userid,req.body.goodsid],(err,result)=>{
                if(result){
                    return  res.status(200).send({msg:'添加成功'})
                }
                res.status(401).send({msg:'添加失败'})
            })
        }else {
            goodsystem.query('insert into cart set ?',[req.body],(err,results)=>{
                if(results){
                    return  res.status(200).send({msg:'添加成功'})
                }
                res.status(401).send({msg:'添加失败'})
            })
        }
        if (err){
            res.status(401).send({msg:'添加失败'})
        }
    })

})
module.exports=GetAllCarInfo;