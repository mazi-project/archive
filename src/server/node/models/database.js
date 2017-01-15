'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 12:55:03
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 17:41:19
*/

var Tingodb = require('tingodb')({searchInArray:true});

module.exports = {

	db : false,

	connect : function() {
		if (this.db == false) {
			// open database
			this.db = new Tingodb.Db(Config.databaseDirectory, {});
			this.db.interviews = this.db.collection(Config.interviewCollection);
			this.db.attachments = this.db.collection(Config.attachmentCollection);
		}
	},

	disconnect: function(callback) {
		if (this.db) {
			this.db.close(callback);
			this.db = false;
		} else {
			if (callback) callback();
		}
	}
}
