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
	name : "Elizabeth Calderón Lüning",
	role : "Organizer – communities and organizations",
	text : "Elizabeth is co-founder of common grounds e.V. and the Neighborhood Academy. Creating situations where people come together and get active around the topics of social and environmental justice, are the core motivations behind her work.",
	filePath : "interviews/elizabeth/img.jpg"
};

var ATTACHMENTS = [
	{
		text : "What are the topics you are interested in or working with?",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_01.wav"
	},
	{
		text : "What is the strongest tool/method/practice you work with?",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_02.wav"
	},
	{
		text : "What public/shared/open space in your city do you love?",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_03.wav"
	},
	{
		text : "Describe a context/conversation/situation that you have been part of, that you were satisfied with.",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_04.wav"
	},
	{
		text : "What was you biggest insight in the time we have spent together?",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_05.wav"
	},
	{
		text : "What problem would you like to solve next?",
		tags: ["commonGroundsEv","environmentalJustice","urbanGardens","communityBuilding","rightToCity","neighbourhoodAcademy","familyCenter","kreuzberg"],
		filePath: "interviews/elizabeth/Elizabeth_CL_06.wav"
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