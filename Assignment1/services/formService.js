//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var model = require('../dao/db.js');

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[formService]');

var addNewFormController = function(formObject, callback) {
    var METHOD_NAME = "[addNewFormController] ";
    model.form(formObject).save(function(error, result) {
        if (error) {
            logger.error(METHOD_NAME + JSON.stringify(error));
            callback(error, null);
        } else {
            // logger.debug(METHOD_NAME + JSON.stringify(result));
            callback(null, result[0]);
        }
    })
};

var getAllForms = function(callback) {
    var METHOD_NAME = "[getAllForms] ";
    model.form.find(function(error, result) {
        if (error) {
            logger.error(METHOD_NAME + JSON.stringify(error));
            callback(error, null);
        } else {
            // logger.debug(METHOD_NAME + JSON.stringify(result));
            callback(null, result);
        }
    })
}

module.exports.addNewFormController = addNewFormController;
module.exports.getAllForms = getAllForms;
