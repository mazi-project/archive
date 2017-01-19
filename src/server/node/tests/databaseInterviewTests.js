'use strict';

var assert = require('assert');
var fs = require('fs-extra')
var _ = require('underscore')
var async = require('async')
var Interview = r_require('models/interview');

var TEST_IMAGE_PATH = "tests/files/img1.jpg"
var TEST_IMAGE_FILE = {
		path: "tests/files/test.jpg",
		originalFilename: "img1.jpg",
		type: "image/jpeg"
}

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
			// fetch interview
			return interview.fetch()
		}).then( (doc) => {
			//check if image property is set
			assert.equal(interview.data.image.originalFilename,TEST_IMAGE_FILE.originalFilename)
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