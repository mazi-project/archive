'use strict';

var assert = require('assert');
var _ = require('underscore');
var fs = require('fs-extra');
var async = require('async');
var request = require('supertest');

var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var TEST_IMAGE_PATH = "tests/files/img1.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "img1.jpg",
		type: "image/jpeg"
}

describe('API Routes /interviews/', function(){

  	beforeEach(function(done) {
			
		// Add some Models
		var size = Math.floor(5 + Math.random() * 10)
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

  		Interview.removeAll().then( () => {
  			return Attachment.removeAll()
  		}).then( () => {
  			db.disconnect(done);
  		}).catch(done);
  		
    });

    var addInterview = function(callback) {
    	var data = {
			text: "unittest_" + require('node-uuid').v4(),
			name: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;
    		callback(res.body.interview);
    	});
    }

	it('should POST on api/interviews', function(done){

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			name: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;
			assert.equal(res.body.interview.text, data.text);
			done()
        });
	})

	it('should POST on api/interviews and add image on api/upload/image/:interviewId', function(done){

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			name: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;

    		var interview = res.body.interview;
			
    		request(BASE_URL).post('api/upload/image/'+interview._id).attach('file', TEST_IMAGE_FILE.path).expect(200).end(function(err, res) {
				if (err) throw err;

				var attachment = res.body;

				//check if file exists
				fs.access(attachment.image.url, fs.F_OK, (err) => {
					if (err) throw err;
					done();
				});
			});

        });
	})

	it('should GET on api/interviews', function(done){

		request(BASE_URL).get('api/interviews').expect(200).end(function(err, res) {
			if (err)
    			throw err;
			done();
        });
	})

	it('should GET on api/interviews with attachments', function(done){

		var interviewId = null;
		Interview.list().then( docs => {
			interviewId = docs[0]._id;
			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interviewId
			});
			return attachment.save();
		}).then( () => {
			request(BASE_URL).get('api/interviews').expect(200).end(function(err, res) {
				if (err)
	    			throw err;
	    		var docs = res.body.docs;
	    		assert.equal(docs[0].attachments[0].interview, interviewId);
				done();
	        });
		}).catch(done);

		
	})

	it('should GET on api/interviews/:id', function(done){

		//add interview
		addInterview( (model) => {
			request(BASE_URL).get('api/interviews/'+model._id).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
	    		var interview = res.body.interview;
				assert.equal(interview._id,model._id)
				done();
	        });
		});
	})

	it('should not DELETE on api/interviews/:id without auth', function(done){

		addInterview( (model) => {
			request(BASE_URL).delete('api/interviews/'+model._id).expect(401).end(function(err, res) {
				if (err) throw err;
				done();
		    });
		});
	});

	it('should DELETE on api/interviews/:id with auth', function(done){

		addInterview( (model) => {
			request(BASE_URL).delete('api/interviews/'+model._id).auth(Config.authName, Config.authPassword).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
				assert.equal(res.body.removed, 1);
				
				//check if model is really deleted
				request(BASE_URL).get('api/interviews/'+model._id).expect(200).end(function(err, res) {
					if (err)
	    				throw err;
					assert(_.isEmpty(res.body.interview));
					done();
		        });
		    });
		});
	});

	it('should PUT on api/interviews/:id with auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			name: 'Test Peter'
		}

		var data2 = {
			text: "text2",
			name: 'Test Peter'
		}

		//insert submission
		request(BASE_URL).post('api/interviews').send(data1).end(function(err, res) {
			if (err)
    			throw err;

    		var submissionId = res.body._id;

			assert.equal(res.body.interview.text, data1.text);

			//update submission
			request(BASE_URL).put('api/interviews/'+submissionId).auth(Config.authName, Config.authPassword).send(data2).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
	    		
				assert.equal(res.body.interview.text, data2.text);
				done()
	        });
        });
	});

	it('should not PUT on api/interviews/:id without auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			name: "Test Peter"
		}

		var data2 = {
			text: "text2",
			name: "Test Peter"
		}

		//insert submission
		request(BASE_URL).post('api/interviews').send(data1).end(function(err, res) {
			if (err)
    			throw err;

    		var submissionId = res.body._id;

			//update submission, expect 401
			request(BASE_URL).put('api/interviews/'+submissionId).send(data2).expect(401).end(function(err, res) {
				if (err) throw err;
				done();
	        });
        });
	});

	it('should escape special characters on api/interviews', function(done){

		var request = require('supertest');

		var data = {
			name : "<$%0921ß30></br>",
			text : 'Test Nachricht<p>',
			location : "Berlin"
		}

		request(BASE_URL).post('api/interviews').send(data).expect(200).end(function(err, res) {
			if (err)
    			throw err;

    		assert.notEqual(res.body.name, data.name);
			assert.notEqual(res.body.text, data.text);
			done();
        });
		
	});
});

