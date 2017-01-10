'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Interview = r_require('/models/interview');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/submissions/
 */ 
router.get('/',(req,res) => {

    var interviews = null;

    Interview.list(). then( (docs) => {
        interviews = docs;
        return Interview.count();
    }).then( count => {
        res.send({
            docs : interviews,
            total_records : count
        });
    }).catch( (err) => {
        Utils.handleError(err,res);
    });

    /*//get qury options
    var options = {}
    if (_.has(req.query,'tag'))
        options.tags = req.query.tag;

    // paginate options
    var paginateOptions = {}
    if (_.has(req.query,'limit'))
        paginateOptions.limit = parseInt(req.query.limit);

    if (_.has(req.query,'skip'))
        paginateOptions.skip = parseInt(req.query.skip);

    // build query
    var query = Interview.find(options);
    query.sort({'updatedAt': -1});
    query.limit(paginateOptions.limit);
    query.skip(paginateOptions.skip);
    query.populate('attachments');

    // execute
    query.exec((err,models) => {
        if (Utils.handleError(err,res)) return;

        Interview.count(options, (err, count) => {
            if (Utils.handleError(err,res)) return;

            res.send({
                docs : models,
                total_records : count
            });
        });
    });*/
});

/*
 * GET /api/submissions/:id
 */ 
router.get('/:id',(req,res) => {
    //TODO: add populate
    Interview.get(req.params.id).then( (doc) => {
        res.send(doc);
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', (req, res) => {

    var interview = new Interview(req.body);

    //insert data
    interview.save().then( () => {
        print('Interview added to database with id: '+interview.id);
        // trigger socket event and send message to web app
        appEvents.emit('interview:new',interview.data)
        res.send(interview.data);
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

/*
 * PUT /api/submissions/:id with AUTH
 */
router.put('/:id', Auth.authentificate, (req, res) => {
 
    var data = req.body;

    //insert data
    Interview.update(data).then( doc => {

        print('Interview changed in database');

        // trigger socket event and send message to web app
        appEvents.emit('interview:changed',doc)
        res.send(doc);
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
            print("Interview "+req.params.id+" deleted from database");
            appEvents.emit('interview:removed',{ _id : req.params.id } )
        }
        res.send( {removed: result} );
    }).catch( (err) => {
        Utils.handleError(err,res);
    });
});

module.exports = router;