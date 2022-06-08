const express=require('express');
const goodsystem = require('../sql/goodsystem');
var multer = require('multer')
const fs = require("fs");

const updateUser=express.Router();
updateUser.post('/updateUser', multer({
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
    const goodClear={account:req.body.account,username:req.body.username,gender:req.body.gender,path:path};
    goodsystem.query('update users set ? where id=?',[goodClear,req.body.userid],(err,results)=>{
        if(results){
            return  res.status(200).send({msg:'修改成功'})
        }
        res.status(401).send({msg:'修改失败,请重试'})
    })

})
module.exports=updateUser;