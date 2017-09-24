
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('projectusers', function(table) {
            table.integer('usertId').references('id').inTable('users');
            table.integer('projectId').references('id').inTable('projects');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('projectusers')
    ]);
};
