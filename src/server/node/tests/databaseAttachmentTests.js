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

describe('Database Attachment Test', function(){


  	beforeEach(function(done) {

  		var data = [
  		{
			name : "Test Name",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
		},
		{
			name : "Tet Name 2",
			tags : [ 'fdsfs', 'ja'],
			text : 'orem ipsum',
		}]

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
			// get interview from db
			return Interview.get(interview.id);
		}).then( (doc) => {
			assert.equal(attachment.data.interview, doc._id);
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
			// delete attachment
			return attachment.delete();
		}).then( () => {
			return Attachment.get(attachment.id)
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

	it('should create several attachments and list only the ones with <hybrid> tag', function(done){

		var TAGS = ['test','hybrid','letterbox'];

		var interview = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachments
			return Promise.all([
				new Attachment({
					tags: [TAGS[0]],
					name: 'Test Peter',
					interview: interview.id
				}).save(),
				new Attachment({
					tags: TAGS,
					name: 'Test Peter',
					interview: interview.id
				}).save(),
				new Attachment({
					tags: TAGS,
					name: 'Test Peter',
					interview: interview.id
				}).save()
			]);
		}).then( () => {
			// list attachments

			return Attachment.list({ tag : 'hybrid' })
		}).then( (docs) => {
			assert.equal(docs.length,2);
			done();
		}).catch(done);
	});

	it('should create three attachments and list two by interview id', function(done){

		var TAGS = ['test','hybrid','letterbox'];

		var interview = null;

		Interview.list().then( docs => {
			interview = new Interview(docs[0]);

			//create attachments
			return Promise.all([
				new Attachment({
					tags: [TAGS[0]],
					name: 'Test Peter',
					interview: docs[0]._id
				}).save(),
				new Attachment({
					tags: TAGS,
					name: 'Test Peter',
					interview: docs[0]._id
				}).save(),
				new Attachment({
					tags: TAGS,
					name: 'Test Peter',
					interview: docs[1]._id
				}).save()
			]);
		}).then( () => {
			// list attachments

			return Attachment.list({ interview : interview.id })
		}).then( (docs) => {
			assert.equal(docs.length,2);
			done();
		}).catch(done);
	});
});