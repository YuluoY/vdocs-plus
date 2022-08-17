const db = require('mongoose');

const schema = new db.Schema({
    imgUrl: {type: String, default: '../assets/img/1.jpg'},
    name: {type: String, default: 'Anonymous'},
    email: String,
    address: {type: String, default: '#'},
    content: String,
    words: Number,
    system: String,
    browser: String,
    cname: {type: String, default: '地球'},
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

schema.pre('save', function (next) {
    this.words && (this.words = this.content.length || 0)
    next();
})

module.exports = db.model('Comment', schema, 'comment');