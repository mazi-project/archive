'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-04-27 11:49:42
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 23:07:52
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + "/../" + name);
}

global.Config = r_require('/config.js');

// change to test database
Config.interviewCollection = Config.testInterviewCollection;
Config.attachmentCollection = Config.testAttachmentCollection;
Config.port = Config.testPort;

// database tests
require("./databaseConnectionTests.js");
require("./databaseInterviewTests.js");
require("./databaseAttachmentTests.js");
require("./databasePaginationTests.js");
require("./databasePopulateTests.js");

// api tests
require("./apiInterviewsTests.js");
require("./apiAttachmentTests.js");
require("./apiTagsTests.js");
require("./apiQuestionsTests.js");

// socket tests
require("./socketTests.js");

// add some test data
require("./createTestDatabase.js");

// import data
// require("./importData.js");