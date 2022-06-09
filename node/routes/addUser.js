const express=require('express');
const goodsystem = require('../sql/goodsystem');
var multer = require('multer')
const fs = require("fs");
const addUser=express.Router();
addUser.post('/adduser', multer({
    //设置文件存储路径
    dest: 'shoppic'
}).array('file', 1), function (req, res, next){
    let files = req.files;
    let file = files[0];
    let fileInfo = {};
    let path = 'shoppic/imgs/' + Date.now().toString() + '_' + file.originalname;
    fs.renameSync('./shoppic/' + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = path;
    Object.assign(req.body,{path:path})
    goodsystem.query('insert into users set ?',[req.body],(err,results)=>{
        if(results){
          return  res.status(200).send({msg:'添加成功'})
        }
        res.status(401).send({msg:'添加失败,该用户已存在'})
    })
})
addUser.post('/adduser1',(req,res)=>{
    goodsystem.query('insert into users set ?',[req.body.data],(err,results)=>{
        if(results){
          return  res.status(200).send({msg:'添加成功'})
        }
        res.status(401).send({msg:'添加失败,该用户已存在'})
    })
})
module.exports=addUser;