var bookshelf = require('../config/bookshelf');

var ProjectComment = bookshelf.Model.extend({
    tableName: 'projectcomments',
    hasTimestamps: true
});

module.exports = ProjectComment;