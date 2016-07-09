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
		originalFilename: "test.jpg",
		type: "image/jpeg"
}
var TEST_AUDIO_PATH = "tests/files/audio1.wav"
var TEST_AUDIO_FILE = {
		path: "tests/files/test.wav",
		originalFilename: "test.wav",
		type: "image/jpeg"
}

describe('Create Test Database', function(){

  	beforeEach(function(done) {

  		r_require('database/database').connect(() => {

			//copy test img file
			fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
				if (err) throw(err);
				// copy test audio file
				fs.copy(TEST_AUDIO_PATH, TEST_AUDIO_FILE.path, (err) => {
					if (err) throw(err);
					done();
				});
			});
  		});
  	});

  	afterEach(function(done) {
    	r_require('database/database').disconnect();
    	done();
    });

	it('should add one interview', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		})

		interview.save(function(err, model) {
			if (err) throw err;
			done();
		});
	})

	it('should add one interview and attach an image', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		})

		// save interview
		interview.save(function(err, model) {
			if (err) throw err;

			// attach image
			model.attach('image', { path: TEST_IMAGE_FILE.path, dir: model._id }, (err) => {
				if (err) throw err;

				// save interview
				model.save(function(err, model) {
					if (err) throw err;

					//check if file exists
					fs.access(model.image.url, fs.F_OK, (err) => {
						if (err) throw err;
						done();
					});
				});

			});
		});
	});

	it('should create an attachment without file', function(done){

		Interview.find({}, (err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum"
			});

			models[0].addAttachment(attachment, (err, model) => {
				if (err) throw err;
				assert.equal(models[0]._id,model.interview);
				done();
			});

		})
	});

	it('should create an attachment with a file', function(done){

		Interview.find({}, (err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Audio File 1"
			});

			models[0].addAttachment(attachment, (err, model) => {
				if (err) throw err;

				model.attach('file', { path: TEST_AUDIO_FILE.path, dir: model.interview }, (err) => {
					
					model.save((err, model) => {
						//check if file exists
						fs.access(model.file.url, fs.F_OK, (err) => {
							if (err) throw err;
							done();
						});
					});
				});
			});
		});
	});

	it('should add a second attachment', function(done){

		Interview.find({}, (err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Audio File 2"
			});

			models[0].addAttachment(attachment, (err, model) => {
				if (err) throw err;

				model.attach('file', { path: TEST_AUDIO_FILE.path, dir: model.interview }, (err) => {
					
					model.save((err, model) => {
						//check if file exists
						fs.access(model.file.url, fs.F_OK, (err) => {
							if (err) throw err;
							done();
						});
					});
				});
			});
		});
	});

	it('should add a third attachment', function(done){

		Interview.find({}, (err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Audio File 3"
			});

			models[0].addAttachment(attachment, (err, model) => {
				if (err) throw err;

				model.attach('file', { path: TEST_AUDIO_FILE.path, dir: model.interview }, (err) => {
					
					model.save((err, model) => {
						//check if file exists
						fs.access(model.file.url, fs.F_OK, (err) => {
							if (err) throw err;
							done();
						});
					});
				});
			});
		});
	});

	it('should add another interview and attach an image', function(done){

		var interview = new Interview({
			name : "Peter",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Lorem ipsum',
		})

		// save interview
		interview.save(function(err, model) {
			if (err) throw err;

			// attach image
			model.attach('image', { path: TEST_IMAGE_FILE.path, dir: model._id }, (err) => {
				if (err) throw err;

				// save interview
				model.save(function(err, model) {
					if (err) throw err;

					//check if file exists
					fs.access(model.image.url, fs.F_OK, (err) => {
						if (err) throw err;
						done();
					});
				});

			});
		});
	});
});