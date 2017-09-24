
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('tags', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('tags')
    ]);
};
