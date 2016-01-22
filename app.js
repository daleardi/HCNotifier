var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var documentClient = require('documentdb').DocumentClient;
var config = require('./config');
var docDbClient = new documentClient(config.host, {
    masterKey: config.authKey
});

var model = require('./models/notifier');
var notifier = new model(docDbClient, config.databaseId, config.collectionId);
notifier.init();

var notifiers = require('./routes/notifiers');
var notify = require('./routes/notify');

app.use('/notifiers', notifiers);
//app.use('/notify', notify);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(3000, function() {});