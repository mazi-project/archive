'use strict';

var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');
var async = require('async')

var Attachment = r_require('models/attachment');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var QUESTIONS = ['What would this first questions ask?','special&characters""\'=3question'];

describe('API Routes /questions/', function(){

  	before(function(done) {
		
		Attachment.removeAll().then( () => {
			return Promise.all([
				new Attachment({
					name: 'Test Peter',
					text: QUESTIONS[0]
				}).save(),
				new Attachment({
					name: 'Test Peter',
					text: QUESTIONS[0]
				}).save(),
				new Attachment({
					name: 'Test Peter',
					text: QUESTIONS[1]
				}).save()
			]);
		}).then( () => {
			done();
		}).catch(done);
			
  	});

  	after(function(done) {

  		var db = r_require('models/database');

  		Attachment.removeAll()
  		.then( () => {
  			db.disconnect(done);
  		}).catch(done);
    });

	it('should GET 2 questions on api/questions', function(done){

		var request = require('supertest');


		request(BASE_URL).get('api/questions').end(function(err, res) {
			if (err)
    			throw err;
			
    		var questions = res.body;

    		assert.equal(questions.length,2);

			done();
        });
	})

	it('should GET 2 questions on api/questions with correct counts', function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/questions').end(function(err, res) {
			if (err)
    			throw err;
			
    		var questions = res.body;

    		assert.equal(questions[0].count,2);
    		assert.equal(questions[1].count,1);

			done();
        });
	})

	it('should GET 2 attachments on api/attachments/?text='+QUESTIONS[0], function(done){

		var request = require('supertest');


		request(BASE_URL).get('api/attachments/?text='+encodeURIComponent(QUESTIONS[0])).end(function(err, res) {
			if (err)
    			throw err;
			
    		var questions = res.body;

    		assert.equal(questions.length,2);

			done();
        });
	})

	it('should handle special characters on api/attachments/?text=', function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/questions').end(function(err, res) {
			if (err)
    			throw err;
			
    		var questions = res.body;

    		request(BASE_URL).get('api/attachments/?text='+encodeURIComponent(questions[1].name)).end(function(err, res) {
				if (err)
	    			throw err;
				
	    		var questions = res.body;

	    		assert.equal(questions.length,1);

				done();
	        });
        });

		
	})
	
});

