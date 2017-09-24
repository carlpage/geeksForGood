var bookshelf = require('../config/bookshelf');

var Project = bookshelf.Model.extend({
    tableName: 'projects',
    
});

module.exports = Project;