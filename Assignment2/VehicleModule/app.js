var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var app = express();

//routes
var citiesRoutes = require('./routes/citiesRoutes.js');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//httpOnly and secure Request
app.use(function(req, res, next) {
    res.cookie('sessionid', '1', { httpOnly: true });
    res.cookie('sessionid', '1', { secure: true });    next();
});

log4js.configure('./config/logConfig.json');
//Internal dependencies
var Logger = require('./utils/logger.js').Logger;
var logger = new Logger('[app]');

// Connect to MongoDB
var db = require('./dao/db.js');
db.connectToMongo();

app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With,X-XSRF-TOKEN, querycriteria, x-access-token, sessionId, userId");
    res.removeHeader("X-Powered-By");
    next();
});

logger.info("Initializing router..");
app.all('*', citiesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found : ' + req.url);
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    logger.error(JSON.stringify(err.stack));
    // logger.error(JSON.stringify(err.message));
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

// process.on('uncaughtException', function(err) {
//     logger.log('whoops! There was an uncaught error', err);
//     // do a graceful shutdown,
//     // close the database connection etc.
//     process.exit(1);
// });
module.exports = app;