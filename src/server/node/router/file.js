'use strict';

var express = require('express');
var _ = require('underscore');
var multipart = require('connect-multiparty');
var fse = require('fs-extra');

var appEvents = r_require('/utils/appEvents.js');
var Interview = r_require('/models/interview');
var Utils = r_require('/utils/utils');

var router = express.Router();

var fileUploader = multipart({
    uploadDir: Config.uploadDirTmp,
    autoFiles: true
    //maxFilesSize: Config.maxUploadFileSize
});

/*
 * POST /api/file/attach/:interviewId
 */ 
router.post('/attach/:interviewId', fileUploader, function(req,res){

    print('attaching file');

	Interview.findOne({ _id: req.params.interviewId }, (err, interview) => {
		if (Utils.handleError(err,res)) return;

        if (!interview) {
            Utils.handleError({ message: 'Id not found.' },res);
        	return;
        }

        if (!req.files.file) {
            Utils.handleError({ message: 'No file submitted.' },res);
            return;
        }

        var file = req.files.file;
        
        //check file size
        if (file.size > Config.maxFileSize) {
            Utils.handleError({ message: 'File is too big, only '+Config.maxFileSize/1024+'KB allowed.' },res);
            fse.remove(file.path);
            return;
        }

        //check extension
        if (!(_.contains(Config.allowedFileTypes,file.type))) {
            Utils.handleError({ message: 'Only jpg,gif and png images are allowed for upload. File is '+file.type },res);
            fse.remove(file.path);
            return;
        }

        interview.addAttachment(file, (err,model) => {
        	if (Utils.handleError(err,res)) return;

            print('Uploaded file'+file.originalFilename+' for '+req.params.interviewId);

            appEvents.emit('interview:changed',interview);
			res.send(model);
        });
	});
});

module.exports = router;