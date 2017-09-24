
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('datasettags', function(table) {
            table.integer('datasetId').references('id').inTable('datasets');
            table.integer('tagId').references('id').inTable('tags');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('datasettags')
    ]);
};
