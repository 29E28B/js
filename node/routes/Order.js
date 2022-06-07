const express=require('express');
const goodsystem = require('../sql/goodsystem');
const e = require("express");
const Order=express.Router();
Order.post('/addOrder',(req,res)=>{
    let length = 0;
    let nowTime = new Date().getTime();
    req.body.data.forEach(item =>{
        item.time = nowTime
        goodsystem.query('insert into t_order set ?',[item],(err,results)=>{
            console.log(results)
            console.log(err)
            length++
            if(results && length === req.body.data.length){
                return  res.status(200).send({msg:'下单成功'})
            }
            if (!results){
                res.status(401).send({msg:'下单失败'})
            }
        })
    })
})

Order.post('/deleteGoodsNumber',(req,res)=>{
    let length = 0;
    req.body.data.forEach(item =>{
        goodsystem.query('update goods set number = number - ? where id = ?',[item.goodsnumber,item.goodsid],(err,results)=>{
            length++
            if(results && length === req.body.data.length){
                return  res.status(200).send()
            }
            if (!results){
                res.status(401).send()
            }
        })
    })
})

Order.post('/UpdateType',(req,res)=>{
    goodsystem.query('update t_order set ? where order_id = ?',[req.body.data,req.body.data.order_id],(err,results)=>{
            if(results){
                return  res.status(200).send({
                    msg:'发货成功'
                })
            }
            if (!results){
                res.status(401).send({
                    msg:'发货失败'
                })
            }
        })
})

Order.post('/RequestBack',(req,res)=>{
    goodsystem.query('update t_order set ? where order_id = ?',[req.body.data,req.body.data.order_id],(err,results)=>{
        if(results){
            return  res.status(200).send({
                msg:'请求退货成功'
            })
        }
        if (!results){
            res.status(401).send({
                msg:'请求退货失败'
            })
        }
    })
})

Order.post('/AgreeBack',(req,res)=>{
    goodsystem.query('update t_order set ? where order_id = ?',[req.body.data,req.body.data.order_id],(err,results)=>{
        if(results){
            return  res.status(200).send({
                msg:'同意退货成功'
            })
        }
        if (!results){
            res.status(401).send({
                msg:'同意退货失败'
            })
        }
    })
})

Order.post('/ComfimOrder',(req,res)=>{
    goodsystem.query('update t_order set ? where order_id = ?',[req.body.data,req.body.data.order_id],(err,results)=>{
        if(results){
            return  res.status(200).send({
                msg:'收货成功'
            })
        }
        if (!results){
            res.status(401).send({
                msg:'收货失败'
            })
        }
    })
})

Order.post('/getAllOrder',(req,res)=>{
    goodsystem.query('select * from t_order where buyerid=?',[req.body.userid],(err,results)=>{
        if(results.length!=0){
            return res.status(200).send({
                data:results
            })

        }else if(results.length==0){
            return res.status(200).send({
                data:results
            })
        }
        res.status(422).send({
            msg:'获取订单失败',
        })
    })

})
Order.get('/getAllOrderList',(req,res)=>{
    goodsystem.query('select * from t_order ',(err,results)=>{
        if(results.length!=0){
            return res.status(200).send({
                data:results
            })
        }else if(results.length==0){
            return res.status(200).send({
                data:results
            })
        }
        res.status(422).send({
            msg:'获取订单失败',
        })
    })

})

Order.post('/getAllPJOrderList',(req,res)=>{
    goodsystem.query("select PJcontent,buyerid,order_id from t_order where goodsid = ? and ispinjia = '是'",[req.body.goodsid],(err,results)=>{
        if(results.length >= 0){
            return res.status(200).send({
                data:results
            })
        }
        res.status(422).send({
            msg:'获取订单失败',
        })
    })
})

Order.post('/DeletePJ',(req,res)=>{
    goodsystem.query("update t_order set PJcontent = '' where order_id = ?",[req.body.order_id],(err,results)=>{
        if(results){
            return res.status(200).send({
                msg:'删除评论成功',
                data:results
            })
        }
        res.status(422).send({
            msg:'获取订单失败',
        })
    })
})

Order.get('/DeleteOrder',(req,res)=>{
    goodsystem.query('delete from t_order where order_id=?',[req.query.order_id],(err,results)=>{
                if(results.affectedRows==1){
                    res.status(200).send({msg:'删除成功'}) ;
                }else{
                    res.status(401).send({msg:'删除失败'});
                }
            if (err){
                res.status(401).send({msg:'删除失败'})
            }
        })

})
module.exports=Order;