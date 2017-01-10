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
  		Interview.removeAll().then( () => {
  			db.disconnect(done);
  		}).catch(done);
    });

	it('should create a database file and add one interview', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		});

		interview.save().then( data => {
			done();
		}).catch(done);
	})

	it('should add a interview and return it', function(done){

		var message = require('node-uuid').v4()

		var interview = new Interview({
			text: message,
			name: 'test'
		});

		interview.save().then( () => {
			return Interview.get(interview.id);
		}).then( (data) => {
			assert.equal(message,data.text)
	        done();
		}).catch(done);
	})

	it('should add a interview and be able to fetch it', function(done){

		var message = require('node-uuid').v4()

		var interview = new Interview({
			text: message,
			name: 'test'
		});

		interview.save().then( () => {
			return interview.fetch();
		}).then( (data) => {
			assert.equal(message,interview.data.text)
	        done();
		}).catch(done);
	})

	it('should add one interview and attach an image', function(done){

		var interview = new Interview({
			name : "Letterbox",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		});

		// save interview
		interview.save().then( () => {
			return interview.fetch();
		}).then( () => {
			return interview.attachImage(TEST_IMAGE_FILE)
		}).then( () => {
			//check if file exists
			fs.access(interview.data.image.url, fs.F_OK, (err) => {
				if (err) throw err;
				done();
			});
		}).catch(done);
	});


	it('should match the correct submission count', function(done) {

		// insert some models
		
		var size = Math.floor(2 + Math.random() * 10)
		
		var createPromises = _.map(_.range(size), function(i) {
			return Interview.create({
				text: 'model'+i,
				name: 'test'
			})
		});

		Promise.all(createPromises).then( () => {
			return Interview.count();
		}).then( count => {
			assert.equal(count,size) // check correct size
			done();
		}).catch(done);

	})

	it('should be able to remove an item', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'test'
			}
		});

		Interview.create(array).then( (docs) => {
			return Interview.remove(docs[0]._id);
		}).then( () => {
			return Interview.count();
		}).then( count => {
			assert.equal(count,size-1) // check if one item was removed
			done();
		}).catch(done);
	})

	it('should be able to delete an interview', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'test'
			}
		});

		Interview.create(array).then( (docs) => {
			var interview = new Interview({ _id : docs[0]._id})
			return interview.delete();
		}).then( () => {
			return Interview.count();
		}).then( count => {
			assert.equal(count,size-1) // check if one item was removed
			done();
		}).catch(done);
	})

	it('should list all models', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				name: 'test'
			}
		});

		Interview.create(array).then( () => {
			return Interview.list();
		}).then( (docs) => {
			assert.equal(docs.length,size)
			done();
		}).catch(done);
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

		Interview.create(data).then( () => {
			
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

  		Interview.removeAll()
  		.then( () => {
  			return Attachment.removeAll()
  		}).then( () => {
  			db.disconnect(done);
  		}).catch(done);
    });



	it('should create an attachment without file', function(done){

		Interview.list().then( docs => {
			//create attachment
			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : docs[0]._id
			});
			return attachment.save();
		}).then( () => {
			done();
		}).catch(done);
	});

	it('should create an attachment without file and add it to an interview', function(done){

		var interview = null;
		var attachment = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachment
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			// add attachment to interview
			return interview.addAttachment(attachment.id);
		}).then( () => {
			// get interview from db
			return Interview.get(interview.id);
		}).then( (doc) => {
			assert.equal(attachment.id, doc.attachments[0]);
			done();
		}).catch(done);

				

	});

	it('should create an attachment and delete it', function(done){

		var interview = null;
		var attachment = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachment
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			// add attachment to interview
			return interview.addAttachment(attachment.id);
		}).then( () => {
			// delete attachment
			return attachment.delete();
		}).then( () => {
			Attachment.get(attachment.id)
		}).then( (doc) => {
			assert.equal(null, doc);
			done();
		}).catch(done);
	});

	it('should create an attachment with a file', function(done){

		var interview = null;
		var attachment = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachment
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			// add attachment to interview
			return interview.addAttachment(attachment.id);
		}).then( () => {
			// add attachment
			return attachment.attachFile(TEST_IMAGE_FILE);
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				done(err);
			});
		}).catch(done);
	});

	it('should create an attachment with a file and delete it', function(done){

		var interview = null;
		var attachment = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachment
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			// add attachment
			return attachment.attachFile(TEST_IMAGE_FILE);
		}).then( () => {
			return attachment.delete();
		}).then( () => {
			fs.access(attachment.data.file.url, fs.F_OK, (err) => {
				assert(err != null)
				done();
			});
		}).catch(done);
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

		Interview.create(data).then( () => {
			
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



	it('should create an attachment and populate attachment (static)', function(done){

		var attachment = null;
		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : docs[0]._id
			});
			return attachment.save();
		}).then( () => {
			return Attachment.populate([attachment.data])
		}).then( (populatedAttachments) => {
			assert.equal(interviews[0].text,populatedAttachments[0].interview.text)
			done();
		}).catch(done);

	});

	it('should create an attachment and populate attachment (non static)', function(done){

		var attachment = null;
		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : docs[0]._id
			});
			return attachment.save();
		}).then( () => {
			return attachment.populate();
		}).then( () => {
			assert.equal(interviews[0].text,attachment.data.interview.text)
			done();
		}).catch(done);
	});

	it('should add several attachments to interview and populate interview ', function(done){

		var attachment = null;
		var interview = null;

		Interview.list().then( (docs) => {
			interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			return interview.addAttachment(attachment.id);
		}).then( () => {
			return interview.populate()
		}).then( () => {
			assert.equal(interview.data.attachments[0]._id,attachment.id)
			done();
		}).catch(done);
	});

	it('should add several attachments to several interviews and populate interviews ', function(done){

		var interviews = null;

		Interview.list().then( (docs) => {
			interviews = docs;
			return Promise.all( _.map(docs, (doc) => {
				var attachment = new Attachment({
					tags : [ "test1", "test2" ],
					text : "lorem ipsum",
					interview : doc._id
				});
				return attachment.save().then( () => {
					var interview = new Interview(doc);
				 	return interview.addAttachment(attachment.id);
				})
			}));
		}).then( () => {
			return Interview.populate(interviews);
		}).then( (populatedInterviews) => {
			assert.equal(typeof populatedInterviews[0].attachments[0],'object');
			assert.equal(typeof populatedInterviews[1].attachments[0],'object');
			done();
		}).catch(done);
	});
});