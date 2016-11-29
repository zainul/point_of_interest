
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', function(table){
      table.increments('id').primary();
      table.uuid('code').notNullable();
      table.string('name').notNullable();
      table.text('description').nullable();
      table.float('lat', 8, 8).notNullable();
      table.float('lang', 8, 8).notNullable();
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations')
  ])
};
