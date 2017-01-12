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
        var questions = _.flatten(_.pluck(docs,'text'));

        var counts = _.countBy(questions);
        
        questions = _.map(counts, function(value,key) {
        	return { name: key, count: value }
        });

        res.send(questions);
	}).catch( (err) => {
        Utils.handleError(err,res);
    });


});

module.exports = router;