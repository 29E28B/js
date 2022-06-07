const express=require('express');
const goodsystem = require('../sql/goodsystem');
const deleteGood=express.Router();
const fs=require('fs')
deleteGood.get('/deletegood',(req, res)=>{
    goodsystem.query('delete from goods where id=?',[req.query.goodid],(err,results)=>{
        if(results.affectedRows==1){
           
            fs.unlink(`shoppic/${req.query.pic}`,err=>{
                return err? console.log(err): res.status(200).send({msg:'删除成功'}) ;
             })
        }else{
            res.status(401).send({msg:'删除失败'});
        }
            

    })
})
module.exports=deleteGood;