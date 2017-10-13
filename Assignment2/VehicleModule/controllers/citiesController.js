//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var constants = require('../utils/constant');
var envConfig = config.environmentConfig();

//Services
var citiesService = require('../services/citiesService.js');

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[citiesController]');

var getAllCitiesByStateWise = function (req, res) {
    var METHOD_NAME = "[getAllCitiesByStateWise] ";
    var response;
    citiesService.getAllCitiesByStateWise(function(error, result ){
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(result)) {
            response = {
                status: 200,
                message: constants.FETCH_ALL_CITIES_SUCCESS,
                data: {
                    cities: true,
                    citiesData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.FETCH_ALL_CITIES_FAILURE,
                data: {
                    cities: false

                }
            };
            res.status(200).send(response);
        }
    })
};

module.exports.getAllCitiesByStateWise = getAllCitiesByStateWise;