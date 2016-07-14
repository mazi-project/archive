'use strict';

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + "/../" + name);
}

global.print = function(string) {
	console.log(string);
}

global.Config = r_require('/config.js');

var async = require('async')
var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

// remove all data
var Database = r_require('database/database')

		Database.connect((err) => {
			if (err)
				throw err;

			async.parallel([
				(callback) => { Interview.removeAll(callback) },
				(callback) => { Attachment.removeAll(callback) },
			],() => {
	        	Database.disconnect();
	        	print("All Interviews removed from Database")
	        }); 
		});