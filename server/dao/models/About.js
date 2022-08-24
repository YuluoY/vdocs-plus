const db = require('mongoose');

const schema = new db.Schema({
    content: String,
}, {timestamps: true});

module.exports = db.model('About', schema, 'about');