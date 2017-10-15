//External dependencies
var _ = require('lodash');
var async = require('async');
var http = require('http');

//Internal dependencies
var config = require('../config/config.js');
var constants = require('../utils/constant');
var envConfig = config.environmentConfig();

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[citiesController]');

var getAllCitiesByStateWise = function (req, res) {
    var METHOD_NAME = "[getAllCitiesByStateWise] ";
    var response;
    var state = req.params.state;
    if(_.isEmpty(state)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    var endpoint = envConfig.GETCITIES_API + '?state=' + state;

    const https = require('https');

    http.get(endpoint, function(resp) {
        var  data = '';

    // A chunk of data has been recieved.
    resp.on('data', function(chunk)  {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', function()  {
        res.send(data)
    });

    }).on("error", function(err)  {
        response = {
            status: 500,
            message: constants.INTERNAL_SERVER_ERROR
        };
        res.status(500).send(response);
    });
};

module.exports.getAllCitiesByStateWise = getAllCitiesByStateWise;