'use strict';

var assert = require('assert');
var fs = require('fs-extra')
var _ = require('underscore');
var request = require('supertest');
var async = require('async')

var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl

var TEST_IMAGE_PATH = "tests/files/img1.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "img1.jpg",
		type: "image/jpeg"
}
var TEST_AUDIO_PATH = "tests/files/audio2.wav"
var TEST_AUDIO_FILE = {
		path: "tests/files/test.wav",
		originalFilename: "test.wav",
		type: "audio/wav"
}

describe('API Routes /attachments/', function() {

	before(function(done) {
		done();
  	});

  	after(function(done) {

		var db = r_require('models/database');
  		async.parallel([
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	db.disconnect(done);
        }); 
    });

    beforeEach(function(done) {

		//copy test file
		fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
			if (err) throw(err);
			fs.copy(TEST_AUDIO_PATH, TEST_AUDIO_FILE.path, (err) => {
				if (err) throw(err);
				done();
			});
		});
	});

	var postInterview = function(callback) {
		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			name: 'Test Peter'
		}
		//create interview
		request(BASE_URL).post('api/interviews').send(data).expect(200).end(function(err, res) {
			if (err) throw err;
			callback(res.body);
		});
	}

    var postFile = function(attachmentId,file,callback) {


    	request(BASE_URL).post('api/upload/attachment/'+attachmentId).attach('file', file.path).expect(200).end(function(err, res) {
			if (err) throw err;

			var attachment = res.body;

			//check if file exists
			fs.access(attachment.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				callback(attachment);
			});
		});

    };

    it('should POST a new attachment on api/attachments/', function(done) {
    	postInterview( (interview) => {

    		var data = {
				text: "attachment text",
				tags: ['test1' , 'test2'],
				interview: interview._id
			}

			//create attachment
			request(BASE_URL).post('api/attachments/').send(data).expect(200).end( (err, res) => {
				if (err) throw err;
				done();
			});
    	});
    });

	it('should POST a file on api/upload/attachment/:id', function(done) {

		postInterview( (interview) => {
    		var data = {
				text: "attachment text",
				tags: ['test1' , 'test2'],
				interview: interview._id
			}
			//create attachment
			request(BASE_URL).post('api/attachments/').send(data).expect(200).end( (err, res) => {
				if (err) throw err;

				var attachment = res.body;

				postFile(attachment._id, TEST_AUDIO_FILE, (attachment) => {

					//check if file exists
					fs.access(attachment.file.url, fs.F_OK, (err) => {
						if (err) throw err;
						done();
					});
				});
			});
    	});
	});


});