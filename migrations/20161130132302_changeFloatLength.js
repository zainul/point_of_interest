
exports.up = function(knex, Promise) {
  return knex.schema.table("locations", function(table) {
    table.dropColumn('lat');
    table.dropColumn('lang');
  });
};

exports.down = function(knex, Promise) {

};
