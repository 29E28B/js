const express=require('express');
const goodsystem = require('../sql/goodsystem');
const userinfo=express.Router();
userinfo.get('/userinfo',(req, res)=>{
    // 根据id获取用户信息
    goodsystem.query('select * from users where id=? and account=?',[req.user.userid,req.user.account],(err,results)=>{
        if(results.length===0){
            return res.status(401).send({
                msg:'登录已过期',
            })
        }else {
            const userinfo={...results[0],password:null,status:null,headurl:null};
            res.send({
                status:200,
                msg:'用户信息获取成功！！',
                data:userinfo
            })
        }
    })
})
userinfo.get('/getalluser',(req, res)=>{
     // 获取所有用户信息
    goodsystem.query('select * from users',(err,results)=>{
         const userinfo=results.map(item => {
             return {...item,password:null,status:null,headurl:null}
         });
          return  res.status(200).send({data:userinfo})
       
      
    })   

})
module.exports=userinfo;