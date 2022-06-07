const express=require('express');
const goodsystem = require('../sql/goodsystem');
const goodSearch=express.Router();
goodSearch.get('/goodsearch',(req, res)=>{

    goodsystem.query('select * from goods where goodname like ?',[`%${req.query.goodname}%`],(err,result)=>{
        let goodnumber=[];
        let searchResult=[];
        console.log('111' + JSON.stringify(result))
        result.forEach(item => {
            item.picname='http://127.0.0.1:8000/shop/picimg/'+item.picname;
            item.goodnumber+='-XX';
            // 计算馆藏数量及剩余可借        
            if(goodnumber.indexOf(item.goodnumber)==-1){
                goodnumber.push(item.goodnumber);
                item.sum=1;
                item.status==0? item.remain=1 : item.remain=0;
                searchResult.push(item);
            }else{
                searchResult[goodnumber.indexOf(item.goodnumber)].sum++;
                if(item.status==0) {searchResult[goodnumber.indexOf(item.goodnumber)].remain++};

            }
        });
        if(result.length==0){
          return  res.send({
                status:401,
                msg:'暂无该数据',
            })
        }
        res.send({
            status:0,
            msg:'查询成功',
            data:searchResult,
        })
    })
})
goodSearch.get('/goodsearchNoMerge',(req, res)=>{


    goodsystem.query('select * from goods where goodname like ?',[`%${req.query.goodname}%`],(err,result)=>{
        result.forEach(item => {
            item.picname='http://127.0.0.1:8000/shop/picimg/'+item.picname;
        });
        if(result.length==0){
          return  res.send({
                status:401,
                msg:'暂无该数据',
            })
        }
        res.send({
            status:0,
            msg:'查询成功',
            data:result,
        })
    })
})
module.exports=goodSearch;