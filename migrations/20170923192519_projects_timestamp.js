
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
        
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
