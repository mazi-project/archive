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
		type: "audio/wav"
}

describe('Create Test Database', function(){

  	beforeEach(function(done) {

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

  	afterEach(function(done) {
    	var db = r_require('models/database');
		db.disconnect(done);
    });

	it('should add one interview', function(done){

		new Interview({
			name : "Ludwig Mayer",
			role : "Urban Designer",
			text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet convallis arcu. Mauris feugiat diam sit amet nunc ullamcorper, in malesuada ligula porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet neque convallis urna malesuada consectetur.',
		}).save().then( () => {
			done()
		}).catch(done);
	})

	it('should add one interview and attach an image', function(done){

		var interview = new Interview({
			name : "Letterbox",
			role : "Super cool girl",
			text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet convallis arcu. Mauris feugiat diam sit amet nunc ullamcorper, in malesuada ligula porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet neque convallis urna malesuada consectetur.',
		})

		interview.save().then( () => {
			return interview.attachImage(TEST_IMAGE_FILE)
		}).then( () => {
			//check if file exists
			fs.access(interview.data.image.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});

	it('should create an attachment without file', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "gentrification", "urban_gardening" ],
				text : "Was läuft gut in der Stadt?",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			assert.equal(interview.id,attachment.data.interview);
			done();
		}).catch(done);
	});

	it('should create an attachment with a file', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Describe a recent conversionation you had with someone that you found inspiring and unexpected?",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			return attachment.attachFile(TEST_AUDIO_FILE);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);

	});

	it('should add a second attachment', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "gentrification", "urban_gardening" ],
				text : "Was läuft gut in der Stadt?",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			var file = TEST_AUDIO_FILE;
			file.originalFilename = 'test2.wav';
			return attachment.attachFile(file);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});

	it('should add a third attachment', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Question for audio file 3",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			var file = TEST_AUDIO_FILE;
			file.originalFilename = 'test3.wav';
			return attachment.attachFile(file);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);

	});

	it('should add an attachment to second model', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[1]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "Question for audio file 3",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			var file = TEST_AUDIO_FILE;
			file.originalFilename = 'test3.wav';
			return attachment.attachFile(file);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});

	it('should add an attachment to second model with special characters in question', function(done){

		var interview = null;
		var attachment = null;
		Interview.list().then( docs => {
			interview = new Interview(docs[1]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "389798u&dfdf=?;yth\"'",
				interview : interview.id
			});

			return attachment.save();
		}).then( () => {
			var file = TEST_AUDIO_FILE;
			file.originalFilename = 'test4.wav';
			return attachment.attachFile(file);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});

	it('should add another interview and attach an image', function(done){

		var interview = new Interview({
			name : "Peter",
			text : 'Lorem ipsum',
		})

		interview.save().then( () => {
			return interview.attachImage(TEST_IMAGE_FILE)
		}).then( () => {
			//check if file exists
			fs.access(interview.data.image.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});

	it('should add several more interviews', function(done){

		var array = _.map(_.range(10), function(i) {
			return {
				name : "Test Entry "+i,
				role : "testing pagination",
				text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet convallis arcu. Mauris feugiat diam sit amet nunc ullamcorper, in malesuada ligula porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet neque convallis urna malesuada consectetur.',
		
			}
		});

		Interview.create(array).then( () => {
			done();
		}).catch(done);
	});
});