'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');

var Attachment = r_require('/models/attachment');
var Utils = r_require('/utils/utils');

var router = express.Router();

/*
 * GET /tags/
 */ 
router.get('/',function(req,res){
    
	Attachment.list().then( docs => {
        // extract all tags, remove duplicates
        var tags = _.unique(_.flatten(_.pluck(docs,'tags')));
        tags = _.map(tags, function(tag) {
        	return { name: tag }
        });
        res.send(tags);
	}).catch( (err) => {
        Utils.handleError(err,res);
    });

});

module.exports = router;