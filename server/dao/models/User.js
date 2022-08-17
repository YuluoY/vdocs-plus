const db = require('mongoose');

const schema = new db.Schema({
    username: String,
    realName: String,
    password: String,
}, {timestamps: true});

module.exports = db.model('User', schema, 'user');