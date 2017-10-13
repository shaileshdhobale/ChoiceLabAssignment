// External dependencies
var log4js = require('log4js');
var mongoose = require('mongoose');

// Internal dependencies
var config = require("../config/config.js");
var envConfig = config.environmentConfig();

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[dao/db]');

var CitiesList = require('./cities.js');
var connectToMongo = function() {
    // Connect to DB
    // var mongoURL = process.env.MONGO_OVERRIDE || environmentConfig.dbConnectionString;
    var mongoURL = envConfig.dbConnectionString;
    mongoose.connect(mongoURL);
    db = mongoose.connection;
    db.on('error', function onError(err) {
        logger.warn('Connection to Mongo Unsuccessful: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function() {
        logger.info('Mongoose default connection disconnected');
    });

    // When successfully connected
    db.on('connected', function() {
        logger.info('Mongoose default connection open');
    });

    db.once('open', function callback() {
        logger.info('Connection to Mongo Successful');
        addProductList();
    });
};

function addProductList() {
    var CitiesListArray = CitiesList.buildObject();
    CitiesList.addCitiesList(CitiesListArray, function(error) {
        if (error) {
            logger.error(JSON.stringify(error));
        } else {
            logger.info("All Cities are added successfully.");
        }
    })
}

var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
var merchant = new Schema({
    merchantName: { type: String, require: true },
    businessType: { type: String, require: true },
    emailId: { type: String, require: true },
    isEmailIdVerified: { type: Boolean, default: false }
});


// Exports modules.
module.exports.merchant = mongoose.model('merchant', merchant, 'merchant');
module.exports.cities = CitiesList;


//Mongoose Connection
module.exports.db = mongoose.connection;
module.exports.connectToMongo = connectToMongo;