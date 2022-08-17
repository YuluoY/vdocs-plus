const db = require('mongoose');

const schema = new db.Schema({
    title: String,
    href: String,
}, {timestamps: true});

module.exports = db.model('Log', schema, 'log');