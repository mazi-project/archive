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
			
			Database.disconnect();
			done();
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
  		Interview.removeAll(function(err) {
  			if (err) throw(err);
  			db.disconnect();
  			done();
  		});
    });

	it('should create a database file and add one interview', function(done){

		var data = {
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		}

		Interview.create(data, function(err, model) {
			if (err) throw err;
			done();
		});
	})

	it('should add a interview and return it', function(done){

		var message = require('node-uuid').v4()

		var data = {
			text: message,
			name: 'test'
		};

		Interview.create(data, function(err, models) {
			if (err) throw err;
			var objectId = models[0]._id;

			// check if model exists
			Interview.get(objectId, function(err, model) {
				if (err) throw err;
	        	assert.equal(message,model.text)
	        	done();
			});

		});
	})

	it('should add one interview and attach an image', function(done){

		var data = {
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		};

		// save interview
		Interview.create(data, function(err, model) {
			if (err) throw err;

			// attach image
			Interview.attachImage(model[0]._id, TEST_IMAGE_FILE, (err,model) => {
				if (err) throw err;

				//check if file exists
				fs.access(model.image.url, fs.F_OK, (err) => {
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
				done();
			});
		});
  	});

  	afterEach(function(done) {
  		var db = r_require('models/database');
  		async.parallel([
			(callback) => { Interview.removeAll(callback) },
			(callback) => { Attachment.removeAll(callback) },
		],() => {
        	db.disconnect();
        	done();
        }); 
    });



	it('should create an attachment without file', function(done){

		Interview.list((err, models) => {

			var attachment = {
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			}

			Attachment.create(attachment, (err, attachment) => {
				Interview.addAttachment(models[0]._id, attachment._id, (err, interview) => {
					if (err) throw err;
					assert.equal(attachment._id, interview.attachments[0]);
					done();
				});
			})

			

		})
	});

	it('should create an attachment and delete it', function(done){

		Interview.list((err, models) => {

			var attachment = {
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			}

			Attachment.create(attachment, (err, attachment) => {
				if (err) throw err;


				Interview.addAttachment(models[0]._id, attachment[0]._id, (err, interview) => {
					if (err) throw err;
					
					Attachment.remove(attachment[0]._id, (err) => {
						if (err) throw err;

						Attachment.get(attachment[0]._id, (err, model) => {
							if (err) throw err;

							assert.equal(null,model);

							done();
						})

					});
				});
			})

		})
	});

	/*it('should create an attachment with a file', function(done){

		Interview.list((err, models) => {

			var attachmentData = {
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : models[0]._id
			};

			Attachment.create(attachmentData, (err, attachment) => {
				Interview.addAttachment(models[0]._id, attachment._id, (err, interview) => {
					if (err) throw err;

					Attachment.attachFile(attachment._id, TEST_IMAGE_FILE, (err,attachment) => {
						// check if file exists
						fs.access(attachment.file.url, fs.F_OK, (err) => {
							if (err) throw err;
							done();
						});
					})
				});
			});
		});
	});*/
});