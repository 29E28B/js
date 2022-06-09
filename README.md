

# 2021-2022学年第2学期

# **实 验 报 告**

![zucc](./img/zucc.png "ZUCC")

- 课程名称：跨平台脚本开发技术  
- 实验项目:  期末大作业
- 专业班级：_计算1902_                      
- 学生学号：_31901051_
- 学生姓名：_舒以恒_
- 实验指导教师：郭鸣

---




1. ## 项目分工表格

   - 2人，项目权重和为 1.9

   | 姓名   | 学号     | 班级     | 任务                                      | 权重 |
   | ------ | -------- | :------- | :---------------------------------------- | :--- |
   | 舒以恒 | 31901051 | 计算1902 | 用户登录注册+头像上传+用户信息删改        | 0.95 |
   | 孙国豪 | 31901053 | 计算1902 | 商品的购买与生成订单+商品和订单的增删改查 | 0.95 |

   

1. ## 项目自我评估表

   | 技术点          | 自评等级:(1-5) | 备注                                               |
   | :-------------- | :------------- | -------------------------------------------------- |
   | FRP             |                |                                                    |
   | session Storage | 4              | ✔ window.localStorage长期保存数据                  |
   | 响应式编程      | 5              | ✔ VUE3                                             |
   | 函数式编程      | 5              | ✔ VUE3                                             |
   | Element UI      | 5              | ✔ VUE3                                             |
   | xx 框架         | 5              | ✔ 前端框架：element-ui；后端框架：node.js，express |
   | ORM 工具        | 4              | ✔ routes /  hibernate                              |
   | Graph QL        |                |                                                    |

    

1. ## 项目说明

   * 项目是独立开发。主题为“水果商城”，主要有用户注册登录功能，购买水果及下单功能，管理员对商品、订单、用户的增删改查功能。此项目前端使用了vue3，用vue-cli脚手架初始化项目，采用了element-ui框架组件开发，提升了开发效率。在后端的数据获取方面，使用nodejs和express框架写的接口请求数据，从数据库中查询数据响应前端请求。

   

1. ## 解决技术要点说明

   - 解决**JWT加密和校验** ， 关键代码与步骤如下

   ```js
   // token秘钥
   const secretkey='shopmanage';
   
   app.use(bodyParser());
   
   app.use(express.urlencoded({extended:false}))
   app.use(cors());
   app.use(expressJWT({secret:secretkey,algorithms:['HS256']}).unless({path:[/^\/login/,/^\/getAllPJOrderList/,/^\/sendemail/,/^\/admin\/allgoodsinfoo/,/^\/admin\/adduser/,/^\/admin\/updateUser/,/^\/shop\/picimg/,/^\/shop\/picimg1/]}))
   
   app.use(express.static('shoppic'));
   
   
   // 用户登录
   userLogin.post('/userlogin',(req,res)=>{
       goodsystem.query('select password,id,account from  users where account=?',req.body.account,(err,results)=>{
           if(results.length!==0){
               if(results[0].password===req.body.password){
                   res.send({
                       status:0,
                       msg:'登录成功',
                       data:results[0],
                       token:'Bearer '+jwt.sign({userid:results[0].id,account:results[0].account,user:'user'},
                                       secret,
                                       {expiresIn:'24h'}
                           )
                   })
                   return
               }
           }
           res.status(422).send({
               msg:'账号或密码错误'
           });
       });
   })
   ```

   - 解决**图像文件上传**， 关键代码与步骤如下

   ```js
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
   module.exports=addUser;
   
   ```

   - 解决**头像图像的修改**， 关键代码与步骤如下

   ```js
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
   ```

   * 解决**商品模糊查询**， 关键代码与步骤如下

   ```vue
   methods:{
           // 搜索商品
           goodSearch(goodname){
               this.$axios.get('/goodsearch',{params:{goodname,}}).then(res=>{
                   if(res.data.msg=='暂无该数据'){
                     Message.warning('暂无该商品');
                   }
                   if (!this.isshow && res.data.msg !=='暂无该数据'){
                     this.$emit('SearchResult',res.data.data)
                   }else {
                     this.searchResult=res.data.data;
                   }
               });
           },
           checkEnter(){
               if(event.keyCode==13){
                   this.$refs.searchBtn.$el.click();
               }
           }
       }
   ```

   

1. ## 心得体会

   - 这学期的跨平台开发课程，自己尝试了完整的从零开始搭建了前端和后端项目，并且实现了数据的请求交互，熟悉了vue3和node.js的基础开发方法，在这个过程中遇到了许多技术难题，但最后都一一解决了，自己写出来客户端和服务端还是很有成就感的。为了实现页面头像上传功能，我头疼了很久，也上网找了很久，终于找到了解决办法，可以在express框架中在请求一个fs模块，动态的去创建地址和改变图片命名。整体上来说学了这么久的js，我感觉nodejs的前后端交互相对其他后端开发工具还是比较方便的，易于调试和检查数据。在课程建议上，感觉课上对理论部分的理解还是有点吃力，需要大量的课外自主学习和扩充内容，同时建议实验文档中的实验步骤能写的更加详细一点。
