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

describe('Database Connection Test', function() {

	it('should connect to mongoDB', function(done) {

		var Database = r_require('database/database')

		Database.connect((err) => {
			if (err)
				throw err;
			Database.disconnect();
			done();
		});
	});

});

/* SUBMISSION TESTS */

describe('Database Interview Test', function(){

  	beforeEach(function(done) {

  		r_require('database/database').connect(() => {

			//copy test file
			fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
				if (err) throw(err);
				done();
			});
  		});
  	});

  	afterEach(function(done) {
  		async.parallel([
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	r_require('database/database').disconnect();
        	done();
        }); 
    });

	it('should create a database file and add one interview', function(done){

		var interview = new Interview({
			author : "Letterbox",
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
			author : "Letterbox",
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

	it('should add a interview and return it', function(done){

		var message = require('node-uuid').v4()

		var interview = new Interview({
			text: message,
			author: 'test'
		});

		interview.save(function(err, model) {
			if (err) throw err;
			var objectId = model._id;

			// check if model exists
			Interview.find({ _id: objectId} , function(err, models) {
	        	assert.equal(message,models[0].text)
	        	done();
			});

		});
	})

	it('should match the correct submission count', function(done) {

		// insert some models
		
		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Interview.create(array, function(err,models) {
			Interview.count({}, function(err, count) {
				assert.equal(count,size) // check correct size
				done();
			});
		});
	})

	it('should be able to remove an item', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Interview.create(array, function(err,models) {
			Interview.remove({ _id: models[0]._id} , function(err) {
				Interview.count({}, function(err,count) {
					assert.equal(count,size-1) // check if one item was removed
					done();
				});
			});
		});
	})

	it('should list all models', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Interview.create(array, function(err) {
			Interview.find({}, function(err,models) {
				assert.equal(models.length,size)
				done();
			})
			
		});
	});
});

/* ATTACHMENT TESTS */

describe('Database Attachment Test', function(){


  	beforeEach(function(done) {

  		r_require('database/database').connect(() => {
  			//add interview
	  		var interview = new Interview({
				author : "Letterbox",
				tags : [ 'tag_1', 'tag_2'],
				text : 'Test Nachricht',
			})

			interview.save(function(err, model) {
				if (err) throw err;
				
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
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	r_require('database/database').disconnect();
        	done();
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
				text : "lorem ipsum"
			});

			models[0].addAttachment(attachment, (err, model) => {
				if (err) throw err;

				model.attach('file', { path: TEST_IMAGE_FILE.path, dir: model.interview }, (err) => {
					
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
});