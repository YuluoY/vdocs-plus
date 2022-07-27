const db = require('mongoose');
const {formatDate} = require("../../utils");

const schema = new db.Schema({
    username: String,
    realName: String,
    password: String,
    releaseDate: {type: String, default: () => formatDate(Date.now(), 'YYYY-MM-DD')},
    updateDate: {type: String, default: () => formatDate(Date.now(), 'YYYY-MM-DD')}
});

module.exports = db.model('User', schema, 'user');