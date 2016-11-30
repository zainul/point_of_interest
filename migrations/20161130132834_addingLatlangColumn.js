
exports.up = function(knex, Promise) {
  return knex.schema.table("locations", function(table) {
    table.float('lat', 18, 15).notNullable();
    table.float('lang', 18, 15).notNullable();
  });
};

exports.down = function(knex, Promise) {

};
