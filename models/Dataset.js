var bookshelf = require('../config/bookshelf');

var Dataset = bookshelf.Model.extend({
    tableName: 'datasets',
    hasTimestamps: true
});

module.exports = Dataset;