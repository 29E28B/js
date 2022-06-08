const path=require('path');
function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports={
    devServer:{
        proxy: {
            '/car':{
                target:'http://localhost:8000',
                changeOrigin:true,
                pathRewrite:{
                    '^/car':''
                }
            },
        }
    },
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
            }
        }
    }
}