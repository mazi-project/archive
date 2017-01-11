'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Interview = r_require('/models/interview');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/interviews/
 */ 
router.get('/',(req,res) => {

    //get query options
    var options = {}
    if (_.has(req.query,'tag'))
        options.tag = req.query.tag;

    // pagination options
    if (_.has(req.query,'limit'))
        options.limit = parseInt(req.query.limit);
    if (_.has(req.query,'skip'))
        options.skip = parseInt(req.query.skip);

    // start query
    var interviews = null;
    Interview.list(options).then( docs => {
        return Interview.populate(docs);
    }).then( docs => {
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

});

/*
 * GET /api/interviews/:id
 */ 
router.get('/:id',(req,res) => {
    //TODO: add populate
    Interview.get(req.params.id).then( doc => {
        return Interview.populate([doc]);
    }).then( docs => {
        res.send(docs[0]);
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
        print('Interview added to database with id: '+interview.id);
        // trigger socket event and send message to web app
        appEvents.emit('interview:new',interview.data)
        res.send(interview.data);
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
        console.log(err);
        Utils.handleError(err,res);
    });
});

module.exports = router;