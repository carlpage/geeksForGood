var bookshelf = require('../config/bookshelf');

var Tag = bookshelf.Model.extend({
    tableName: 'tags',
    hasTimestamps: true
});

module.exports = Tag;