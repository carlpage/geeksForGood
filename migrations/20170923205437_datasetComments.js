
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('datasetcomments', function(table) {
            table.increments('id').primary();
            table.integer('parentId').references('id').inTable('datasetcomments');
            table.integer('datasetId').references('id').inTable('datasets');
            table.string('comment');
            table.integer('userId').references('id').inTable('users');
            table.integer('score');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('datasetcomments')
    ]);
};
