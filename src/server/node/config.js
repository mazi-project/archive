/* CONFIG FILE */

var Config = {

	/* DATABASE */
	database: "mongodb://localhost/princess",
	interviewCollection: "interviews",
	attachmentCollection: "attachments",

	/* FILE UPLOAD */
	uploadDirTmp: '_tmp/',
	fileDir: __dirname + '/files/',
	maxFileSize: 1024*1024*200, //allowed file size for attached files
	allowedImageFileTypes: ['image/jpeg','image/jpg','image/png','image/gif'],
	allowedAudioFileTypes: ['audio/wav','audio/x-wav','audio/mpeg3','audio/x-mpeg3','audio/wave'],

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