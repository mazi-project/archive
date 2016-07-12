'use strict';

var assert = require('assert');
var fs = require('fs-extra')
var _ = require('underscore')
var async = require('async')
var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var TEST_IMAGE_PATH = "tests/files/img2.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "test.jpg",
		type: "image/jpeg"
}
var TEST_AUDIO_PATH = "tests/files/audio2.wav"
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
			name : "Ludwig Mayer",
			role : "Urban Designer",
			text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet convallis arcu. Mauris feugiat diam sit amet nunc ullamcorper, in malesuada ligula porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet neque convallis urna malesuada consectetur.',
		})

		interview.save(function(err, model) {
			if (err) throw err;
			done();
		});
	})

	it('should add one interview and attach an image', function(done){

		var interview = new Interview({
			name : "Letterbox",
			role : "Super cool girl",
			text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet convallis arcu. Mauris feugiat diam sit amet nunc ullamcorper, in malesuada ligula porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet neque convallis urna malesuada consectetur.',
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
				tags : [ "gentrification", "urban_gardening" ],
				text : "Was läuft gut in der Stadt?"
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
				tags : [ "recht_auf_stadt", "bullshit" ],
				text : "Wo willst du mitbestimmen?"
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

	it('should add an attachment to second model', function(done){

		Interview.find({}, (err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Audio File 3"
			});

			models[1].addAttachment(attachment, (err, model) => {
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