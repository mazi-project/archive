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