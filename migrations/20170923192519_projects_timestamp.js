
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
        table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
        table.dropTimestamps();
    })
  ])
};
