const db = require('mongoose');
const {formatDate} = require("../../utils");

const schema = new db.Schema({
    title: String,
    href: String,
    releaseDate: {type: String, default: () => formatDate(Date.now(), 'YYYY-MM-DD')},
    updateDate: {type: String, default: () => formatDate(Date.now(), 'YYYY-MM-DD')}
});

module.exports = db.model('Log', schema, 'log');