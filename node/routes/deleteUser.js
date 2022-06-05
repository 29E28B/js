const express=require('express');
const goodsystem = require('../sql/goodsystem');
const deleteUser=express.Router();
deleteUser.get('/deleteuser',(req, res)=>{
    goodsystem.query('delete from users where id=?',[req.query.userid],(err,result)=>{
        if (result.affectedRows==1){
            res.status(200).send({msg:'删除成功'})
        }else {
            res.status(401).send({msg:'删除失败'});
        }
    })
})
module.exports=deleteUser;