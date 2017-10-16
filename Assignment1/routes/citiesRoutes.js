//External dependencies
var express = require('express');
var router = express.Router();

// Internal dependencies
var formController = require('../controllers/formController.js');

router.post('/add/new/form', formController.addNewFormController);
router.get('/all/forms', formController.getAllForms);
//exports
module.exports = router;