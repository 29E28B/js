const express=require('express');
const Sendmail=express.Router();
const nodemailer = require('nodemailer');
Sendmail.post('/sendemail',function(req,routerRes){
    try{
        console.log('发送邮件');
        let transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user: '1091928997@qq.com',
                // 这里密码不是qq密码，是你设置的smtp授权码
                pass: 'aqcqtqkrfwwpiefi',
            }
        });

        let mailOptions = {
            from: '1091928997@qq.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Hello', // Subject line
            // 发送text或者html格式
            // text: 'Hello world?', // plain text body
            html: '<b>欢迎注册！验证码为:556596</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                routerRes.json({
                    status:1,
                    data:{
                        msg:"发送失败"
                    }
                })
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            routerRes.json({
                status:0,
                data:{
                    msg:"发送成功"
                }
            })
        });
    }catch(err){
        console.log("发送邮件trycatch报错",err);
    }

})
module.exports=Sendmail;