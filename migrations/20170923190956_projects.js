
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('projects', function(table) {
          table.increments('id').primary();
          table.integer('creatorId').references('id').inTable('users');
          table.integer('score');
          table.string('zipcode');
      })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
       knex.schema.dropTable('projects')
   ]);
};
