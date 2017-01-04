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

    Interview.list((err,models) => {
        if (Utils.handleError(err,res)) return;

        Interview.count( (err, count) => {
            if (Utils.handleError(err,res)) return;

            res.send({
                docs : models,
                total_records : count
            });
        });
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
    Interview.get(req.params.id, (err,model) => {
        if (Utils.handleError(err,res)) return;

        res.send(model);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', (req, res) => {

    var interview = new Interview(req.body);
    
    //only allow new interview
    delete interview['_id'];

    //insert data
    interview.save((err, model) => {
        if (Utils.handleError(err,res))
            return;

        print('Interview added to database');

        // trigger socket event and send message to web app
        appEvents.emit('interview:new',model)
        res.send(model);
    });
});

/*
 * PUT /api/submissions/:id with AUTH
 */
router.put('/:id', Auth.authentificate, (req, res) => {
 
    var data = req.body;

    //insert data
    Interview.update(data, (err, model) => {
        if (Utils.handleError(err,res)) return;

        print('Interview changed in database');

        // trigger socket event and send message to web app
        appEvents.emit('interview:changed',model)
        res.send(model);
    });
});

/*
 * DELETE /api/submissions/:id with AUTH
 */
router.delete('/:id', Auth.authentificate, (req, res) => {

    Interview.remove({ _id: req.params.id }, (err, result) => {
        if (Utils.handleError(err,res)) return;

        if (result > 0) {
            print("Interview "+req.params.id+" deleted from database");
            appEvents.emit('interview:removed',{ _id : req.params.id } )
        }
        res.send( {removed: result} );
    });
});

module.exports = router;