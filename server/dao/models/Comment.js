const db = require('mongoose');

const schema = new db.Schema({
    imgUrl: {type: String, default: '../assets/img/1.jpg'},
    name: {type: String, default: 'Anonymous'},
    email: String,
    address: {type: String, default: '地球村'},
    content: String,
    words: Number,
    system: String,
    browser: String,
    path: {type: String, required: true},
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    userInfo: Array,
    sub: [{
        type: db.SchemaTypes.ObjectId,
        ref: 'Comment',
    }],
    isSub: {type: Boolean, default: false},
    parentId: String
}, {timestamps: true});

module.exports = db.model('Comment', schema, 'comment');