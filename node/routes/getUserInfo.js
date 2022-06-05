const express=require('express');
const goodsystem = require('../sql/goodsystem');
const getUserInfo=express();
getUserInfo.get('/getuserinfo',(req, res)=>{

    goodsystem.query('select * from users where account=?',[req.query.account],(err,results)=>{
        if(results.length!=0){
          const userInfo={...results[0],password:''};

              return res.status(200).send({
                 data:userInfo
             })           

        }
        res.status(422).send({
            msg:'没有该用户',
        })
    })

})
module.exports=getUserInfo;