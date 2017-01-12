'use strict';

var assert = require('assert');
var fs = require('fs-extra')
var _ = require('underscore')
var async = require('async')
var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var TEST_IMAGE_PATH = "tests/files/img1.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "img1.jpg",
		type: "image/jpeg"
}

describe('Database Pagination Tests', function(){


  	beforeEach(function(done) {
			
		// Add some Models
		var size = Math.floor(10 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'Test Peter'
			}
		});

		Interview.create(array).then( () => {
			//copy test file
			fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
				if (err) {
					done(err);
					return;
				}
				
				var db = r_require('models/database');
				db.disconnect(done);
			});
		}).catch(done);
  	});

  	afterEach(function(done) {

  		var db = r_require('models/database');

  		Interview.removeAll()
  		.then( () => {
  			db.disconnect(done);
  		}).catch(done);
  		
    });

	it('should be able to limit results to 5', function(done){

		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			return Interview.list({ limit : 5 });
		}).then( (docs) => {
			assert.equal(docs.length,5);
			done();
		}).catch(done);

	});

	it('should be able to skip 5 docs', function(done){

		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			return Interview.list({ skip : 5 });
		}).then( (docs) => {
			assert.equal(docs[0]._id,interviews[5]._id);
			done();
		}).catch(done);

	});

	it('should be able to skip 5 docs and limit to 2', function(done){

		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			return Interview.list({ skip : 5, limit : 2 });
		}).then( (docs) => {
			assert.equal(docs[0]._id,interviews[5]._id);
			assert.equal(docs[1]._id,interviews[6]._id);
			done();
		}).catch(done);

	});
});