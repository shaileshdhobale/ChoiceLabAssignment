/**
 * Purpose- Defining loggers
 */

"use strict";

// External dependencies
var log4js = require("log4js");
var _ = require('lodash');

// Internal dependencies
var config = require("../config/config");
var envConfig = config.environmentConfig();
var logLevel = envConfig.logLevel;

// Constants
/*var constants = require('./constant');

// Conditionally log if the app is not in 'test' mode
var inTest = process.env.NODE_ENV === constants.ENV_TYPE_TEST;
var preventLogWrite = process.env.PREVENT_LOG_WRITE !== undefined;
if (!inTest && !preventLogWrite) {
    log4js.configure(log4jsConfig);
}*/

/**
 * here we using log4js inbuilt functions.
 * @function getLogger()
 * @function setLevel()
 */
exports.logger = {
    getLogger: function(category, level) {
        var theLogger = log4js.getLogger(category);
        theLogger.setLevel(level);
        return theLogger;
    }
};

/**
 * For setting logger category and level as required.
 * @param {string} category
 * @param {string} level
 */
var Logger = function Logger(category, level) {
    if (_.isEmpty(level)) {
        level = logLevel;
    }
    this.theLogger = exports.logger.getLogger(category, level);
};

/**
 * defining customized logger functions.
 */
Logger.prototype.trace = function trace(msg, dbg) {
    logIt(this.theLogger, "trace", msg, dbg);
};

Logger.prototype.debug = function debug(msg, dbg) {
    logIt(this.theLogger, "debug", msg, dbg);
};

Logger.prototype.info = function info(msg, dbg) {
    logIt(this.theLogger, "info", msg, dbg);
};

Logger.prototype.warn = function warn(msg, dbg) {
    logIt(this.theLogger, "warn", msg, dbg);
};

Logger.prototype.error = function error(msg, dbg) {
    logIt(this.theLogger, "error", msg, dbg);
};

Logger.prototype.fatal = function fatal(msg, dbg) {
    logIt(this.theLogger, "fatal", msg, dbg);
};

/**
 * @constructor
 * @param  {object} theLogger
 * @param {string} theLevel
 * @param {string} theMsg
 * @param {string} debugId
 */
function logIt(theLogger, theLevel, theMsg, debugId) {
    // Opt for silence
    if (process.env.LOGGER_DISABLED) {
        return;
    }

    // Log it!
    if (debugId) {
        theLogger[theLevel]("[%s] [%s] [%s]", debugId.userId, debugId.csrId, debugId.ticketId, theMsg);
    } else {
        theLogger[theLevel]("%s", theMsg);
    }
}


global.logger = new Logger('', logLevel);

module.exports.Logger = Logger;