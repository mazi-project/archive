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

    var options = {}
    if (_.has(req.query,'tag'))
        options.tags = req.query.tag;

    if (_.has(req.query,'text'))
        options.text = decodeURIComponent(req.query.text);

    if (_.has(req.query,'interview'))
        options.interview = decodeURIComponent(req.query.interview);

    Attachment.list(options).then( (docs) => {
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
 * GET /api/attachments/:id
 */ 
router.get('/:id',(req,res) => {
    Attachment.get(req.params.id).then( (doc) => {
        if (_.isEmpty(doc))
            return Promise.resolve([doc]);
        else
            return Attachment.populate([doc]);
    }).then( (doc) => {
        res.send(doc[0]);
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
        log('Attachment added to database width id: '+attachment.id);
        appEvents.emit('interview:changed',{ _id: interview.id })
        return attachment.populate();
    }).then( () => {
        res.send(attachment.data);
    }).catch( (err) => {
        Utils.handleError(err,res);
    })
});

/*
 * PUT /api/attachments/:id with AUTH
 */
router.put('/:id', Auth.authentificate, (req, res) => {
 
    var data = req.body;

    var attachment = new Attachment(data);

    //insert data
    attachment.save().then( doc => {
        log('Attachment changed in database');
        appEvents.emit('interview:changed',{ _id: attachment.data.interview.id })
    }).then( () => {
        return attachment.populate();
    }).then( () => {
        res.send(attachment.data);
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});


/*
 * DELETE /api/attachments/:id with AUTH
 */
router.delete('/:id', Auth.authentificate, (req, res) => {

    Attachment.remove({ _id: req.params.id }).then( result => {
        if (result > 0) {
            log("Attachment "+req.params.id+" deleted from database");
        }
        res.send( {removed: result} );
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

module.exports = router;
