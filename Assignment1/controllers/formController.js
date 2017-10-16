//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var constants = require('../utils/constant');
var envConfig = config.environmentConfig();

//Services
var formService = require('../services/formService.js');

// logger
var Logger = require('../utils/logger.js').Logger;
var logger = new Logger('[formController]');

var addNewFormController = function (req, res) {
    var METHOD_NAME = "[addNewFormController] ";
    var response;
    var reqBody = req.body;

    if(_.isEmpty(reqBody.formName) || _.isEmpty(reqBody.formTemplate)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    formService.addNewFormController(reqBody, function(error, result ){
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
                message: constants.FETCH_ALL_FORMS_SUCCESS,
                data: {
                    form: true,
                    formData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.FETCH_ALL_FORMS_FAILURE,
                data: {
                    form: false

                }
            };
            res.status(200).send(response);
        }
    })
};

var getAllForms = function (req, res) {
    var METHOD_NAME = "[getAllForms] ";
    var response;
    formService.getAllForms(function(error, result) {
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
                message: constants.FETCH_ALL_FORMS_SUCCESS,
                data: {
                    form: true,
                    formData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.FETCH_ALL_FORMS_FAILURE,
                data: {
                    form: false

                }
            };
            res.status(200).send(response);
        }
    })
};

module.exports.addNewFormController = addNewFormController;
module.exports.getAllForms = getAllForms;