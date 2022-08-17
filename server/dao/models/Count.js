/**
 * @Author：雨落
 * @Dir：server/dao/models
 * @Time：2022/8/17 07:44:33
 */

const db = require('mongoose');

const schema = new db.Schema({
    sign: {type: String, default: 'count'},
    visitNum: {type: Number, default: 0}, // 访问次数
    visitorNum: {type: Number, default: 0},  // 访问人数
    visitors: {type: Array, default: []} // 访客信息
}, {timestamps: true});

module.exports = db.model('Count', schema, 'count');