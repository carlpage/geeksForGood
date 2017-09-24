
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('usertags', function(table) {
            table.integer('userId').references('id').inTable('users');
            table.integer('tagId').references('id').inTable('tags');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('usertags')
    ]);
};
