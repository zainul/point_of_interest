var express = require('express');
var router = express.Router();

var locationController = require('./controllers/locations');

router.get('/locations', locationController.index)
      .get('/locations/:id', locationController.show)
      .post('/locations/', locationController.create)
      .put('/locations/:id/update', locationController.update)
      .delete('/locations/:id', locationController.delete)

module.exports = router;
