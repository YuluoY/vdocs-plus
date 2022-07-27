module.exports = (app) => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/vdocs-plus', {
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('数据库中的vdocs-plus集合连接成功！');
        }
    });
    require('require-all')(__dirname + '\\models');
}