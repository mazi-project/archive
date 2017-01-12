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

	it('should unpopulate single reference before saving', function(done){

		var attachment = null;

		Interview.list().then( (docs) => {
			var interview = new Interview(docs[0]);
			attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save();
		}).then( () => {
			// populate interview
			return attachment.populate();
		}).then( (populatedInterviews) => {
			// save populated interview
			return attachment.save()
		}).then( () => {
			// fetch from database
			attachment.fetch();
		}).then( () => {
			assert.equal(typeof attachment.data.interview,'string');
			done();
		}).catch(done);
	});

	it('should unpopulate reference array before saving', function(done){

		var interview = null;

		Interview.list().then( (docs) => {
			interview = new Interview(docs[0]);
		}).then( () => {
			// add first attachment
			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum",
				interview : interview.id
			});
			return attachment.save().then( () => {
				return interview.addAttachment(attachment.id);
			});
		}).then( () => {
			// add second attachment
			var attachment = new Attachment({
				tags : [ "test1", "test2" ],
				text : "lorem ipsum 2",
				interview : interview.id
			});
			return attachment.save().then( () => {
				return interview.addAttachment(attachment.id);
			});
		}).then( () => {
			// populate interview
			return interview.populate();
		}).then( (populatedInterviews) => {
			// save populated interview
			return interview.save()
		}).then( () => {
			// fetch from database
			interview.fetch();
		}).then( () => {
			assert.equal(typeof interview.data.attachments[0],'string');
			assert.equal(typeof interview.data.attachments[1],'string');
			done();
		}).catch(done);
	});
});