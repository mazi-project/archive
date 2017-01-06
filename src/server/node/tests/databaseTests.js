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

		var Database = r_require('models/database')

		Database.connect();

		// check if collections were created
		var db = Database.db;
		db.collectionNames( function(err,names) {
			if (err) throw err;
			
			Database.disconnect(done);
		});
	});

});

/* INTERVIEW TESTS */

describe('Database Interview Test', function(){

  	beforeEach(function(done) {

		//copy test file
		fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
			if (err) throw(err);
			done();
		});
  	});

  	afterEach(function(done) {

  		var db = r_require('models/database');

  		// remove all interviews
  		Interview.removeAll(function(err) {
  			if (err) throw(err);
  			db.disconnect(done);
  		});
    });

	it('should create a database file and add one interview', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		});

		interview.save( (err, model) => {
			if (err) throw err;
			done();
		});
	})

	it('should add a interview and return it', function(done){

		var message = require('node-uuid').v4()

		var interview = new Interview({
			text: message,
			name: 'test'
		});

		interview.save( function(err, model) {
			if (err) throw err;

			// check if model exists
			Interview.get(model._id, function(err, model) {
				if (err) throw err;
	        	assert.equal(message,model.text)
	        	done();
			});

		});
	})

	it('should add a interview and be able to fetch it', function(done){

		var message = require('node-uuid').v4()

		var interview = new Interview({
			text: message,
			name: 'test'
		});

		interview.save( function(err, model) {
			if (err) throw err;

			// check if model exists
			var fetchedInterview = new Interview({ _id : model._id});
			fetchedInterview.fetch(function(err, model) {
				if (err) throw err;
	        	assert.equal(message,fetchedInterview.data.text)
	        	done();
			});

		});
	})

	it('should add one interview and attach an image', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		});

		// save interview
		interview.save(function(err, model) {
			if (err) throw err;

			// attach image
			interview.attachImage(TEST_IMAGE_FILE, (err,model) => {
				if (err) throw err;

				//check if file exists
				fs.access(interview.data.image.url, fs.F_OK, (err) => {
					if (err) throw err;
					done();
				});

			});
		});
	});


	it('should match the correct submission count', function(done) {

		// insert some models
		
		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'test'
			}
		});

		async.each(array, function(element, cb) {
			Interview.create(element, cb);
		}, function(err) {
			if (err) throw err;
			Interview.count(function(err, count) {
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
				name: 'test'
			}
		});

		Interview.create(array, function(err,models) {

			Interview.remove({ _id: models[0]._id} , function(err) {

				Interview.count(function(err,count) {
					assert.equal(count,size-1) // check if one item was removed
					done();
				});
			});
		});
	})

	it('should be able to delete an interview', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'test'
			}
		});

		Interview.create(array, function(err,models) {

			var interview = new Interview({ _id : models[0]._id})

			interview.delete(function(err) {
				
				Interview.count(function(err,count) {
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
				name: 'test'
			}
		});

		Interview.create(array, function(err) {
			Interview.list(function(err,models) {
				assert.equal(models.length,size)
				done();
			})
			
		});
	});
});

/* ATTACHMENT TESTS */

describe('Database Attachment Test', function(){


  	beforeEach(function(done) {

  		var data = {
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		}

		Interview.create(data, function(err, model) {
			if (err) throw err;
			
			//copy test file
			fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
				if (err) throw(err);
				
				var db = r_require('models/database');
				db.disconnect(done);
			});
		});
  	});

  	afterEach(function(done) {
  		var db = r_require('models/database');
  		async.parallel([
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	db.disconnect(done);
        }); 
    });



	it('should create an attachment without file', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err, attachment) => {
				if (err) throw err;
				done();
			})
		})
	});

	it('should create an attachment without file and add it to an interview', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				var interview = new Interview(models[0]);

				interview.addAttachment( attachment.id, (err, interview) => {
					if (err) throw err;

					Interview.get(models[0]._id, (err, model) => {
						assert.equal(attachment.id, model.attachments[0]);
						done();
					});
				});
			})
		})
	});

	it('should create an attachment and delete it', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				var interview = new Interview(models[0]);

				interview.addAttachment( attachment._id, (err, interview) => {
					if (err) throw err;
					
					attachment.delete((err) => {
						if (err) throw err;

						// check if attachment exists
						Attachment.get(attachment.data._id, (err, model) => {
							if (err) throw err;

							assert.equal(null,model);

							done();
						})
					});
				});
			})

		})
	});

	it('should create an attachment with a file', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				var interview = new Interview(models[0]);

				interview.addAttachment(attachment._id, (err, interview) => {
					if (err) throw err;

					attachment.attachFile(TEST_IMAGE_FILE, (err) => {
						if (err) throw err;

						// check if file exists
						fs.access(attachment.data.file.url, fs.F_OK, (err) => {
							if (err) throw err;
							done();
						});
					})
				});
			});
		});
	});
});

describe('Database Populate Test', function(){


  	beforeEach(function(done) {

  		var data = [
	  		{
				name : "Letterbox",
				tags : [ 'tag_1', 'tag_2'],
				text : 'Test Nachricht',
			},
			{
				name : "Letterbox2",
				tags : [ 'tag_3'],
				text : 'Test Nachricht 2',
			}
		]

		Interview.create(data, function(err) {
			if (err) throw err;
			
			//copy test file
			fs.copy(TEST_IMAGE_PATH, TEST_IMAGE_FILE.path, (err) => {
				if (err) throw(err);
				
				var db = r_require('models/database');
				db.disconnect(done);
			});
		});
  	});

  	afterEach(function(done) {
  		var db = r_require('models/database');
  		async.parallel([
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	db.disconnect(done);
        }); 
    });



	it('should create an attachment and populate attachment (static)', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				Attachment.populate([attachment.data], (err) => {
					if (err) throw err;
					assert.equal(models[0].text,attachment.data.interview.text)
					done();
				})

				
			})
		})
	});

	it('should create an attachment and populate attachment (non static)', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				attachment.populate((err) => {
					if (err) throw err;
					assert.equal(models[0].text,attachment.data.interview.text)
					done();
				})

				
			})
		})
	});

	it('should add several attachments to interview and populate interview ', function(done){

		Interview.list((err, models) => {

			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			});

			attachment.save((err) => {
				if (err) throw err;

				var interview = new Interview(models[0]);

				interview.addAttachment(attachment.id, (err) => {

					interview.populate((err) => {
						if (err) throw err;
						assert.equal(interview.data.attachments[0]._id,attachment.id)
						done();
					})
				});
			})
		})
	});

	it('should add several attachments to several interviews and populate interviews ', function(done){

		Interview.list((err, models) => {

			async.each(models, (model,asyncCb) => {
				var attachment = new Attachment({
					tags : [ "test1", "test2" ],
					text : "lorem ipsum",
					interview : models[0]._id
				});
				attachment.save((err) => {
					if (err) throw err;

					var interview = new Interview(model);
					interview.addAttachment(attachment.id, asyncCb);
				});
			}, (err) => {
				if (err) throw err;

				Interview.populate(models, (err, populatedModels) => {
					assert.equal(typeof populatedModels[0].attachments[0],'object');
					assert.equal(typeof populatedModels[1].attachments[0],'object');
					done();
				})
			})
		})
	});
});