
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('datasets', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.integer('uploadId').references('id').inTable('users');
            table.string('description');
            table.integer('score');
            table.string('zipcode');
            table.string('url');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('datasets')
    ]);
};
