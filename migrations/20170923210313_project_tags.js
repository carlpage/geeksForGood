
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('projecttags', function(table) {
            table.integer('projectId').references('id').inTable('projects');
            table.integer('tagId').references('id').inTable('tags');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('projecttags')
    ]);
};
