module.exports = (app) => {
    const mongoose = require('mongoose');
    let connectUrl = 'mongodb://localhost:27017/vdocs-plus'
    if (process.env.NODE_ENV !== 'development') {
        connectUrl = 'mongodb://yuluo:hyl1027@127.0.0.1:27017/vdocs?authSource=admin'
    }
    mongoose.connect(connectUrl, {
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('数据库中的vdocs-plus集合连接成功！');
        }
    });
    require('require-all')(__dirname + '/models');
}