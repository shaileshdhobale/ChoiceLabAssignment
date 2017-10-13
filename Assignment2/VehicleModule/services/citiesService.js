//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var model = require('../dao/db.js');

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[citiesService]');

var getAllCitiesByStateWise = function(callback) {
    var METHOD_NAME = "[getAllCitiesByStateWise] ";
    model.cities.aggregate([
        {
            $group: {
                _id: "$state",
                Cities: {$push: "$city"}
            }
        },
        {
            $project: {
                _id: 0,
                State: "$_id",
                Cities: 1
            }
        }
    ], function(error, result) {
        if (error) {
            logger.error(METHOD_NAME + JSON.stringify(error));
            callback(error, null);
        } else {
            // logger.debug(METHOD_NAME + JSON.stringify(result));
            callback(null, result);
        }
    })
};


module.exports.getAllCitiesByStateWise = getAllCitiesByStateWise;
