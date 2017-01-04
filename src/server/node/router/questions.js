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
    
	Attachment.list( (err, models) => {
		if (Utils.handleError(err,res))
            return;

        // extract all tags, remove duplicates
        var questions = _.unique(_.flatten(_.pluck(models,'text')));
        
        questions = _.map(questions, function(name) {
        	return { name: name }
        })

        res.send(questions);
	});

});

module.exports = router;