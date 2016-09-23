'use strict';

/* 
*	Script for adding interviews manually
* /

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

var INTERVIEW = {
	name : "Philip Klaus",
	role : "Cooperative dweller, geographer and urban networker",
	text : "Philip lives in the successfull Kraftwerk1 cooperative in Zürich housing several hundred people. He is very experienced in collective and self-organized living.",
	filePath : "interviews/philip/img.jpg"
};

var ATTACHMENTS = [
	{
		text : "What are the topics you are interested in or working with?",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_01.wav"
	},
	{
		text : "What is the strongest tool/method/practice you work with?",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_02.wav"
	},
	{
		text : "What public/shared/open space in your city do you love?",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_03.wav"
	},
	{
		text : "Describe a context/conversation/situation that you have been part of, that you were satisfied with.",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_04.wav"
	},
	{
		text : "What was you biggest insight in the time we have spent together?",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_05.wav"
	},
	{
		text : "What problem would you like to solve next?",
		tags: ["kraftwerk1","cooperative","river","zuerich","technology","lake","housing"],
		filePath: "interviews/philip/Philip_06.wav"
	}
]

var addInterview = function(data,callback) {
	var interview = new Interview(data)

	// save interview
	interview.save(function(err, model) {
		if (err) throw err;

		// attach image
		model.attach('image', { path: data.filePath, dir: model._id }, (err) => {
			if (err) throw err;

			// save interview
			model.save(function(err, model) {
				if (err) throw err;

				print("interview added");
				callback(model);
			});

		});
	});
}

var addAttachment = function(interview, data, callback) {

	var attachment = new Attachment(data);

	interview.addAttachment(attachment, (err, model) => {
		if (err) throw(err);

		model.attach('file', { path: data.filePath, dir: model.interview }, (err) => {
			
			model.save((err, model) => {
				if (err) throw err;

				print("attachment added");
				callback();
			});
		});
	});

}

// remove all data
var Database = r_require('database/database')

Database.connect((err) => {
	if (err)
		throw err;

	//create Interview
	addInterview(INTERVIEW,(interview) => {

		/*addAttachment(interview,ATTACHMENTS[0], () => {
			print("finished");
		});*/

		async.eachSeries(
			ATTACHMENTS, 
			function(item,callback) { 
				addAttachment(interview,item, () => {
					callback();
				})
			},
			function() {
        		r_require('database/database').disconnect();
        		print("finished");
        	}
        );

	})
	
});