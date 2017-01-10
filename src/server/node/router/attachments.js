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

    Attachment.list().then( (docs) => {
        if (_.isEmpty(docs))
            return Promise.resolve(docs);
        else
            return Attachment.populate(docs);
    }).then( (docs) => {
        res.send(docs);
    }).catch( (err) => {
        Utils.handleError(err,res);
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

    interview.fetch().then( () => {
        // save attachment
        return attachment.save();
    }).then( () => {
        // add attachment to interview
        return interview.addAttachment(attachment.id);
    }).then( () => {
        print('Attachment added to database width id: '+attachment.id);
        // trigger socket event and send message to web app
        appEvents.emit('interview:changed',{ _id: interview.id })
        res.send(attachment.data);
    }).catch( (err) => {
        Utils.handleError(err,res);
    })
});

/*
 * GET /api/attachments/:id
 */ 
router.get('/:id',(req,res) => {
    Attachment.get(req.params.id).then( (doc) => {
        if (_.isEmpty(doc))
            return Promise.resolve(doc);
        else
            return Attachment.populate([doc]);
    }).then( (doc) => {
        res.send(doc[0]);
    }).catch( (err) => {
        Utils.handleError(err,res);
    })
});

module.exports = router;
