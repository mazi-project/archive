'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');

var Interview = r_require('/models/interview');
var Utils = r_require('/utils/utils');

var router = express.Router();

/*
 * GET /tags/
 */ 
router.get('/',function(req,res){
    
	Interview.find({}, (err, models) => {
		if (Utils.handleError(err,res))
            return;

        // extract all tags, remove duplicates
        var tags = _.unique(_.flatten(_.pluck(models,'tags')));
        
        tags = _.map(tags, function(tag) {
        	return { name: tag }
        })

        res.send(tags);
	});

});

module.exports = router;