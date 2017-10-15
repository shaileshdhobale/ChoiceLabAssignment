//External dependencies
var express = require('express');
var router = express.Router();

// Internal dependencies
var citiesController = require('../controllers/citiesController.js');

router.get('/getcities/:state', citiesController.getAllCitiesByStateWise);

//exports
module.exports = router;