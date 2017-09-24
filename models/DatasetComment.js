var bookshelf = require('../config/bookshelf');

var DatasetComment = bookshelf.Model.extend({
    tableName: 'datasetcomments',
    hasTimestamps: true
});

module.exports = DatasetComment;