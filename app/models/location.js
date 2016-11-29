var Bookshelf = require('../../config/bookshelf');

var Location = Bookshelf.Model.extend({

  tableName: 'locations',

  hasTimestamps: true,

});

module.exports = Location;
