const express=require('express');
const addGoods=express.Router();
const multiparty=require('multiparty');
const fs=require('fs');
const path= require('path');
const goodsystem = require('../sql/goodsystem');
addGoods.post('/addgoods',(req, res)=>{
        let form=new multiparty.Form({uploadDir:path.join(__dirname,'../shoppic')});
        form.parse(req,(err,fileds,files)=>{
            let goodData=JSON.parse(fileds.data);
            // 判断商品编号是否存在
            goodsystem.query('select count(*) as num from goods where goodid=?',[goodData.goodid],(err,result)=>{
                if(result[0].num==0){
                    goodData.goodnumber=goodData.goodid.split('-')[0];
                    // 要保存的文件名
                    goodData.picname=goodData.goodid+'.jpg';
                    // 数据库添加记录
                    goodsystem.query('insert into goods set ?',[goodData],(err,result1)=>{
                        if(result1){        
                            // 文件重命名                   
                            fs.rename(files.picname[0].path,`shoppic/${goodData.picname}`,(err)=>{
                                return  err ? console.log(err) : res.status(200).send({msg:'添加成功'});                           
                            })
                        }
                    })
                }else{
                  res.status(401).send({msg:'添加失败,商品编号已存在'});
                //   删除传入的文件
                  fs.unlink(files.picname[0].path,err=>{
                     return err? console.log(err):console.log('success');
                  })
                }
            })          
        })
})
module.exports=addGoods;
