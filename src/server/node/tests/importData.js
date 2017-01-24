'use strict';

var assert = require('assert');
var fs = require('fs-extra')
var _ = require('underscore')
var async = require('async')

var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

// files containing json data
var interviewFile = r_require("tests/import/interviews.json");
var attachmentFile = r_require("tests/import/attachments.json");

/* INTERVIEW TESTS */

describe('Import Data', function(){

	before( (done) => {
  		var db = r_require('models/database');

  		// delete all data
  		Interview.removeAll()
  		.then( () => {
  			return Attachment.removeAll()
  		}).then( () => {
  			db.disconnect(done);
  		}).catch(done);
    });

	it('import interviews', function(done){
		Interview.create(interviewFile.docs, true).then( () => {
			done();
		}).catch(done);
	});

	it('import attachments', function(done){

		// strip out interview data
		var docs = _.map(attachmentFile, (doc) => {
			doc.interview = doc.interview._id;
			return doc;
		});

		Attachment.create(docs, true).then( () => {
			done();
		}).catch(done);
	});
});