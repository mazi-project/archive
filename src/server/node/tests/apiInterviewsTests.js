'use strict';

var assert = require('assert');
var _ = require('underscore');
var fs = require('fs-extra')
var async = require('async')
var request = require('supertest');

var Interview = r_require('models/interview');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var TEST_IMAGE_PATH = "tests/files/img1.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "img1.jpg",
		type: "image/jpeg"
}

describe('API Routes /submissions/', function(){

  	beforeEach(function(done) {

  		r_require('database/database').connect((err) => {
			
			// Add some Models
			var size = Math.floor(5 + Math.random() * 10)
			var array = _.map(_.range(size), function(i) {
				return {
					text: 'model'+i,
					author: 'Test Peter'
				}
			});
			Interview.create(array, function(err,models) {
				//copy test file
				fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
					if (err) throw(err);
					done();
				});
			});
  		});
  	});

  	afterEach(function(done) {
  		async.parallel([
			(callback) => { Interview.removeAll(callback) }
		],() => {
        	r_require('database/database').disconnect();
        	done();
        }); 
    });

    var addInterview = function(callback) {
    	var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;
    		callback(res.body);
    	});
    }

	it('should POST on api/interviews', function(done){

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;
			assert.equal(res.body.text, data.text);
			done()
        });
	})

	it('should POST on api/interviews and add image on api/upload/image/:interviewId', function(done){

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		request(BASE_URL).post('api/interviews').send(data).end(function(err, res) {
			if (err)
    			throw err;

    		var interview = res.body;
			
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

	it('should GET on api/submissions/:id', function(done){

		//add interview
		addInterview( (model) => {
			request(BASE_URL).get('api/interviews/'+model._id).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
				assert.equal(res.body._id,model._id)
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
					assert(_.isEmpty(res.body));
					done();
		        });
		    });
		});
	});

	it('should PUT on api/interviews/:id with auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			tags: ['tag1','tag2'],
			author: 'Test Peter'
		}

		var data2 = {
			text: "text2",
			tags: ['tag1','tag2','tag3'],
			author: 'Test Peter'
		}

		//insert submission
		request(BASE_URL).post('api/interviews').send(data1).end(function(err, res) {
			if (err)
    			throw err;

    		var submissionId = res.body._id;

			assert.equal(res.body.tags.length, data1.tags.length);
			assert.equal(res.body.text, data1.text);

			//update submission
			request(BASE_URL).put('api/interviews/'+submissionId).auth(Config.authName, Config.authPassword).send(data2).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
	    		
				assert.equal(res.body.tags.length, data2.tags.length);
				assert.equal(res.body.text, data2.text);
				done()
	        });
        });
	});

	it('should not PUT on api/interviews/:id without auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			tags: ['tag1','tag2']
		}

		var data2 = {
			text: "text2",
			tags: ['tag1','tag2','tag3']
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
			author : "<$%0921ß30></br>",
			tags : [ 'tag1', 'tag2'],
			text : 'Test Nachricht<p>',
			location : "Berlin"
		}

		request(BASE_URL).post('api/interviews').send(data).expect(200).end(function(err, res) {
			if (err)
    			throw err;

    		assert.notEqual(res.body.author, data.author);
			assert.equal(res.body.tags.join(), data.tags.join());
			assert.notEqual(res.body.text, data.text);
			done();
        });
		
	});
});

