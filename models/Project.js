var bookshelf = require('../config/bookshelf');

var Project = bookshelf.Model.extend({
    tableName: 'projects',
    hasTimestamps: true
});

module.exports = Project;