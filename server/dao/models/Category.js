const db = require('mongoose');

const schema = new db.Schema({
    categoryName: String,
});

module.exports = db.model('Category', schema, 'category');