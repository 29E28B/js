const express=require('express');
const app=express();
// 导入模块

// cors模块
const cors=require('cors');
const path=require('path');
// 获取post请求中的参数
const bodyParser=require('body-parser');
const expressJWT=require('express-jwt');


// 路由模块
const login=require('./routes/login');
const userinfo = require('./routes/userinfo');
const goodSearch=require('./routes/goodSearch');
const userChangePassword=require('./routes/userChangePassword');
const GetAllCarInfo=require('./routes/GetAllCarInfo');
const getUserInfo=require('./routes/getUserInfo');
const updateUser = require('./routes/updateUser');
const updateGoods = require('./routes/updateGoods');
const allGoodsInfo=require('./routes/allGoodsInfo');
const deleteGood=require('./routes/deleteGood');
const addUser=require('./routes/addUser');
const deleteUser = require('./routes/deleteUser');
const adminChangePassword = require('./routes/adminChangePassword');
const checkToken = require('./routes/checkToken');
const addGoods = require('./routes/addGoods');
const Order = require('./routes/Order');
const SendMail = require('./routes/SendMail');
// 自定义变量

// token秘钥
const secretkey='shopmanage';

app.use(bodyParser());

app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(expressJWT({secret:secretkey,algorithms:['HS256']}).unless({path:[/^\/login/,/^\/getAllPJOrderList/,/^\/sendemail/,/^\/admin\/allgoodsinfoo/,/^\/admin\/adduser/,/^\/admin\/updateUser/,/^\/shop\/picimg/,/^\/shop\/picimg1/]}))

app.use(express.static('shoppic'));

// token错误处理中间件
app.use((err,req,res,next)=>{
    if(err.name=='UnauthorizedError'){
        res.send({
            status:401,
            msg:'token已过期'
        })
    }else{
        res.send({
            status:500,
            msg:'未知错误',
        })
    }
})

app.use('/login',login);
app.use(checkToken);
app.use('/user',userinfo);
app.use(goodSearch,Order,SendMail);
app.use('/user',[userChangePassword,GetAllCarInfo]);
app.use('/admin',[getUserInfo,allGoodsInfo,deleteGood,addUser,deleteUser,adminChangePassword,addGoods,updateUser,updateGoods]);
// 响应图片
app.get('/shop/picimg/:picname',(req,res)=>{
   res.sendFile(path.join(__dirname,'/shoppic/'+req.params.picname))
})
app.get('/shop/picimg1/:path',(req,res)=>{
    res.sendFile(path.join(__dirname,'/shoppic/imgs/'+req.params.path))
})
app.listen(8000,()=>{
    console.log('服务器开启成功');
})