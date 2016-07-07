/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-07-07 10:47:10
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-07 12:52:23
*/

'use strict';

var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Attachment = r_require('/models/attachment');
var Interview = r_require('/models/interview');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * POST /api/attachments/
 */ 
router.post('/', (req, res) => {


    var attachment = new Attachment(req.body);
    
    //only allow new attachments
    delete attachment['_id'];

    //check for id
    if (!attachment.interview) {
    	Utils.handleError({ message: 'No interview id supplied.' },res);
    	return;
    }

    // find interview
    Interview.findOne({ _id : attachment.interview}, (err, interview) => {
    	if (Utils.handleError(err,res)) return;

    	if (!interview) {
            Utils.handleError({ message: 'interview Id not found.' },res);
        	return;
        }

        // add attachment
        interview.addAttachment(attachment, (err, model) => {
        	if (Utils.handleError(err,res)) return;

        	print('Attachment added to database');

        	// trigger socket event and send message to web app
        	appEvents.emit('interview:changed',{ _id: attachment.interview })
        	res.send(model);
        });

    })

});

module.exports = router;