const db = require('mongoose');

const schema = new db.Schema({
    imgUrl: {type: String, default: '../assets/img/1.jpg'},
    name: {type: String, default: 'Anonymous'},
    email: String,
    address: String,
    content: String,
    words: Number,
    system: String,
    browser: String,
    path: String
});

module.exports = db.model('Comment', schema, 'comment');