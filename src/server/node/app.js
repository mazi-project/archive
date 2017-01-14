'use strict';

/* 
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-01-25 11:08:47
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 16:42:36
*/

module.exports = {

	initialize: function() {

		/* use absolute paths for require */
		global.r_require = function(name) {
		    return require(__dirname + name);
		}

		/* register config as global var */
		global.Config = r_require('/config.js');

		/* setup logging */
		var winston = require('winston')
		winston.level = 'info'
		winston.remove(winston.transports.Console);
		winston.add(winston.transports.Console);
		winston.add(winston.transports.File, {'timestamp':true, filename: 'log/console.log'})
		// alias for logging
		global.log = function(string, level, object) {

			var level = (typeof level !== 'undefined') ?  level : 'info';

			if (typeof(object) !== 'undefined')
				winston.log(level,string,object)
			else
				winston.log(level,string)
		}

		/* if startet as test server, change to test database */
		if (process.argv[2] == 'test') { 
			Config.interviewCollection = Config.testInterviewCollection;
			Config.attachmentCollection = Config.testAttachmentCollection;
			Config.port = Config.testPort
			//print = function() {}; //turn of printing
		}

		/*Define dependencies.*/

		var express = require('express');
		var app = express();
		var http = require('http').Server(app);

		/* Load Sockets */

		var sockets = r_require('/sockets')(http);

		/* Load Router */

		var router = r_require('/router')(app);

		/* Run the server */

		http.listen(Config.port,Config.hostname,function(){
		    log("Node Server listening on "+Config.hostname+":"+Config.port);
		});

	}
}

