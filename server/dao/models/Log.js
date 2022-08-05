const db = require('mongoose');

const schema = new db.Schema({
    title: String,
    href: String,
    // releaseDate: {type: Number, default: () => Date.now()},
    // updateDate: {type: Number, default: () => Date.now()}
}, {timestamps: true});

module.exports = db.model('Log', schema, 'log');