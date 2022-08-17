const db = require('mongoose');

const schema = new db.Schema({

}, {timestamps: true});

module.exports = db.model('About', schema, 'about');