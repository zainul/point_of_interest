const Location = require('../models/location');
const uuid = require('node-uuid');

exports.index = (req, res) => {
  Location.fetchAll().then((locations) => {
      res.json({ locations });
    });
}

exports.show = (req, res) => {
  Location
    .where('code', req.params.id)
    .fetch()
    .then(function(location) {
      res.json({ location })
    });
}

exports.create = (req, res) => {
  new Location({
    code: uuid.v1(),
    name: req.body.name,
    description: req.body.description,
    lat: req.body.lat,
    lang: req.body.lang
  }).save().then((location) => {
    res.json({ location })
  })
}

exports.update = (req, res) => {
  var location = Location
    .where('code', req.params.id)
    .fetch()
    .then(function(location) {
      return location
    });

  location
    .save({
      name: req.body.name,
      description: req.body.description,
      lat: req.body.lat,
      lang: req.body.lang
    })
    .then(function(saved) {
      res.json({ saved });
    });
}

exports.delete = (req, res) => {
  Location
    .where('code', req.params.id)
    .destroy()
    .then(function(destroyed) {
      res.json({ destroyed });
    });
}
