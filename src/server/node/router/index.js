'use strict';

var express = require('express');
var bodyParser = require('body-parser');

/* Configure express */

module.exports = function (app) {

    var handleDbConnection = function(req, res, next) {

        var db = r_require('/database/database')
        db.connect();

        // action after response
        var afterResponse = function() {
            db.disconnect();
        }

        //res.on('finish', afterResponse);
        res.on('close', afterResponse);

        next();
    };

    var publicOptions = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    /* Error Handling */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });

	// serve static content
    if (Config.publicDir) {
        // serve backbone app
        app.use(Config.baseUrl,express.static(Config.publicDir,publicOptions));
        // serve files
        app.use(Config.baseUrl+'files/',express.static(Config.fileDir,publicOptions));
    }

    // connect to database when accessing api routes
    app.use(Config.baseUrl+'api/',handleDbConnection);

    // interview routes
    app.use(Config.baseUrl+'api/interviews', bodyParser.json());
    app.use(Config.baseUrl+'api/interviews', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/interviews', require('./interviews'));

    // attachment routes
    app.use(Config.baseUrl+'api/attachments', bodyParser.json());
    app.use(Config.baseUrl+'api/attachments', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/attachments', require('./attachments'));

    // tags routes
    app.use(Config.baseUrl+'api/tags', require('./tags'));

    // question routes
    app.use(Config.baseUrl+'api/questions', require('./questions'));

    // file routes
    app.use(Config.baseUrl+'api/upload', bodyParser.json());
    app.use(Config.baseUrl+'api/upload', require('./upload'));
};