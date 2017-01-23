'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Interview = r_require('/models/interview');
var Attachment = r_require('/models/attachment');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/interviews/
 */ 
router.get('/',(req,res) => {

    //get query options
    var options = {}

    // pagination options
    if (_.has(req.query,'limit'))
        options.limit = parseInt(req.query.limit);
    if (_.has(req.query,'skip'))
        options.skip = parseInt(req.query.skip);

    // start query
    var interviews = null;
    var attachments = null;
    // get interview
    Interview.list(options).then( docs => {
        interviews = docs;
        // get attachments for each interview
        return Promise.all(_.map(docs, (doc) => {
            return Attachment.list({ interview : doc._id });
        }));
    }).then( docs => {
        attachments = docs;
        return Interview.count();
    }).then( count => {
        var docs = _.map(interviews, (element, i) => {
            return { interview: element, attachments : attachments[i] }
        });
        res.send({
            docs : docs,
            total_records : count
        });
    }).catch( (err) => {
        Utils.handleError(err,res);
    });

});

/*
 * GET /api/interviews/:id
 */ 
router.get('/:id',(req,res) => {
    var interview = null;
    Interview.get(req.params.id).then( doc => {
        interview = doc;
        if (_.has(interview,'_id'))
            return Attachment.list({ interview : interview._id});
        else
            return Promise.resolve([]);
    }).then( attachments => {
        res.send({
            interview : interview,
            attachments : attachments
        });
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

/*
 * POST /api/interviews/
 */ 
router.post('/', (req, res) => {

    var interview = new Interview(req.body);

    //insert data
    interview.save().then( () => {
        log('Interview added to database with id: '+interview.id);
        // trigger socket event and send message to web app
        appEvents.emit('interview:new',interview.data)
        res.send({ interview: interview.data });
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

/*
 * PUT /api/interviews/:id with AUTH
 */
router.put('/:id', Auth.authentificate, (req, res) => {
 
    var data = req.body;

    //insert data
    Interview.update(data).then( doc => {

        log('Interview changed in database');

        // trigger socket event and send message to web app
        appEvents.emit('interview:changed',doc)
        res.send({ interview: doc });
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

/*
 * DELETE /api/submissions/:id with AUTH
 */
router.delete('/:id', Auth.authentificate, (req, res) => {

    Interview.remove({ _id: req.params.id }).then( result => {
        if (result > 0) {
            log("Interview "+req.params.id+" deleted from database");
            appEvents.emit('interview:removed',{ _id : req.params.id } )
        }
        res.send( {removed: result} );
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

module.exports = router;