
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('projects', function(table) {
            table.string('name');
            table.string('description');
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('projects', function(table) {
            table.dropColumn('name');
            table.dropColumn('description');
        })
    ])
};
