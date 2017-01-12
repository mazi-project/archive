'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');

var Attachment = r_require('/models/attachment');
var Utils = r_require('/utils/utils');

var router = express.Router();

/*
 * GET /questions/
 */ 
router.get('/',function(req,res){
    
	Attachment.list().then( docs => {
        // extract all questions, remove duplicates
        var questions = _.unique(_.flatten(_.pluck(docs,'text')));
        
        questions = _.map(questions, function(name) {
        	return { name: name }
        });

        res.send(questions);
	}).catch( (err) => {
        Utils.handleError(err,res);
    });


});

module.exports = router;