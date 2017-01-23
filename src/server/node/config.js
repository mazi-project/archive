/* CONFIG FILE */

var Config = {

	/* DATABASE */
	databaseDirectory: __dirname + "/data",
	interviewCollection: "interviews.db",
	attachmentCollection: "attachments.db",

	/* FILE UPLOAD */
	uploadDirTmp: '_tmp/',
	fileDir: __dirname + '/files/',
	maxFileSize: 1024*1024*200, //allowed file size for attached files
	allowedImageFileTypes: ['image/jpeg','image/jpg','image/png','image/gif'],
	allowedAttachmentFileTypes: ['audio/wav','audio/x-wav','audio/mpeg3','audio/x-mpeg3','audio/wave','image/jpeg','image/jpg','application/pdf'],

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : '../www/',
	adminDir : '../admin/',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081',

	/* AUTH DATA */
	authName: 'admin',
	authPassword: 'password',

	/* TEST CONFIG */
	testPort: '8881',
	testInterviewCollection: "interviews-test.db",
	testAttachmentCollection: "attachments-test.db",

};

module.exports = Config;