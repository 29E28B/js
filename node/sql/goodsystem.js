// 链接sql数据库
const mysql=require('mysql');
const goodsystem=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123',
    database:'shop'
})
module.exports=goodsystem;