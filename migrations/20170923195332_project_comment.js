
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('projectcomments', function(table) {
            table.increments('id').primary();
            table.integer('parentId').references('id').inTable('projectcomments');
            table.integer('projectId').references('id').inTable('projects');
            table.string('comment');
            table.integer('userId').references('id').inTable('users');
            table.integer('score');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('projectcomments')
    ]);
};
