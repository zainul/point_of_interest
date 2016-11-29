const Bookshelf = require('../../config/bookshelf');
const indicative = require('indicative');

const Location = Bookshelf.Model.extend({

  tableName: 'locations',

  hasTimestamps: true,

  rules : {
    code: 'required',
    name: 'required',
    lat: 'required|number',
    lang: 'required|number'
  },

  initialize: function() {
    this.on('saving', this.validate, this);
    this.on('updating', this.validate, this);
  },

  validate: function(model, attrs, options) {

    return indicative.validateAll(this.toJSON(), this.rules)
      .then((result) => {
        return result
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

});

module.exports = Location;
