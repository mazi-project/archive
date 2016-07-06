/* CONFIG FILE */

var Config = {

	/* DATABASE */
	database: "mongodb://localhost/princess",
	interviewCollection: "interviews",
	attachmentCollection: "attachments",

	/* FILE UPLOAD */
	uploadDirTmp: '_tmp/',
	fileDir: __dirname + '/files/',
	maxFileSize: 1024*1024*2, //allowed file size for attached files
	allowedFileTypes: ['image/jpeg','image/jpg','image/png','image/gif'],

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : '../www/',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081',

	/* AUTH DATA */
	authName: 'admin',
	authPassword: 'password',

	/* TEST CONFIG */
	testDatabase :"mongodb://localhost/princess_test",
	testPort: '8881'

};

module.exports = Config;