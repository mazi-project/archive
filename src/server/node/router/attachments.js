/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-07-07 10:47:10
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:09:27
*/

'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Attachment = r_require('/models/attachment');
var Interview = r_require('/models/interview');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/attachments/
 */ 
router.get('/',(req,res) => {

    // //get qury options
    // var options = {}
    // if (_.has(req.query,'tag'))
    //     options.tags = req.query.tag;

    // // build query
    // var query = Attachment.find(options);
    // query.sort({'updatedAt': -1});
    // query.populate('interview');

    // // execute
    // query.exec((err,models) => {
    //     res.send(models);
    // });
    Attachment.list((err, docs) => {
        if (Utils.handleError(err,res)) return;
        res.send(docs);
    })
});

/*
 * POST /api/attachments/
 */ 
router.post('/', (req, res) => {

    var attachment = new Attachment(req.body);

    //check for id
    if (!attachment.data.interview) {
    	Utils.handleError({ message: 'No interview id supplied.' },res);
    	return;
    }

    // find interview
    var interview = new Interview({ _id : attachment.data.interview});

    interview.fetch((err) => {
    	if (Utils.handleError(err,res)) return;

        // save attachment
        attachment.save( (err) => {

            // add attachment to interview
            interview.addAttachment(attachment.id, (err) => {
                if (Utils.handleError(err,res)) return;

                print('Attachment added to database width id: '+attachment.id);

                // trigger socket event and send message to web app
                appEvents.emit('interview:changed',{ _id: interview.id })
                res.send(attachment.data);
            });
        })  
    })
});

/*
 * GET /api/attachments/:id
 */ 
router.get('/:id',(req,res) => {
    Attachment.findOne({ _id: req.params.id}).populate('interview').exec((err,model) => {
        if (Utils.handleError(err,res)) return;

        res.send(model);
    });
});

module.exports = router;
