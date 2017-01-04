'use strict';

var express = require('express');
var _ = require('underscore');
var multipart = require('connect-multiparty');
var fse = require('fs-extra');

var appEvents = r_require('/utils/appEvents.js');
var Interview = r_require('/models/interview');
var Attachment = r_require('/models/attachment');
var Utils = r_require('/utils/utils');

var router = express.Router();

var fileUploader = multipart({
    uploadDir: Config.uploadDirTmp,
    autoFiles: true
    //maxFilesSize: Config.maxUploadFileSize
});

/*
 * POST /api/upload/attachment/:attachmentId
 */ 
router.post('/attachment/:attachmentId', fileUploader, function(req,res){


	Attachment.findOne({ _id: req.params.attachmentId }, (err, attachment) => {
        if (Utils.handleError(err,res)) return;

        if (!attachment) {
            Utils.handleError({ message: 'Id not found.' },res);
        	return;
        }

        var file = false;

        if (_.has(req,'files') && _.has(req.files,'file'))
            file = req.files.file;

        if (!file) {
            Utils.handleError({ message: 'No file submitted.' },res);
            return;
        }
        
        //check file size
        if (file.size > Config.maxFileSize) {
            Utils.handleError({ message: 'File is too big. Only '+Config.maxFileSize/1024+'KB allowed.' },res);
            fse.remove(file.path);
            return;
        }

        //check extension
        if (!(_.contains(Config.allowedAudioFileTypes,file.type))) {
            Utils.handleError({ message: 'Only wav and mp3 files are allowed for upload. File is '+file.type },res);
            fse.remove(file.path);
            return;
        }

        // save file to submission folder
        attachment.attach('file', {path: file.path, dir: attachment.interview }, (err) => {
            if (Utils.handleError(err,res)) return;
            print('Uploaded file'+file.originalFilename+' for Attachment: '+req.params.attachmentId);
                    
            // save changes
            attachment.save((err, model) => {
                if (Utils.handleError(err,res)) return;

                appEvents.emit('interview:changed',{ _id: attachment.interview });
                res.send(model);
            });
        });
	});
});

/*
 * POST /api/upload/image/:interviewId
 */ 
router.post('/image/:interviewId', fileUploader, function(req,res){

    var interview = new Interview({ _id: req.params.interviewId });

    interview.fetch( (err) => {
        if (Utils.handleError(err,res)) return;

        var file = false;

        if (_.has(req,'files') && _.has(req.files,'file'))
            file = req.files.file;

        if (!file) {
            Utils.handleError({ message: 'No file submitted.' },res);
            return;
        }
        
        //check file size
        if (file.size > Config.maxFileSize) {
            Utils.handleError({ message: 'File is too big. Only '+Config.maxFileSize/1024+'KB allowed.' },res);
            fse.remove(file.path);
            return;
        }

        //check extension
        if (!(_.contains(Config.allowedImageFileTypes,file.type))) {
            Utils.handleError({ message: 'Only jpg,gif and png images are allowed for upload. File is '+file.type },res);
            fse.remove(file.path);
            return;
        }

        // save file to interview folder
        interview.attachImage(file, (err) => {
            if (Utils.handleError(err,res)) return;
            print('Uploaded file'+file.originalFilename+' for Interview: '+req.params.interviewId);
                    

            appEvents.emit('interview:changed',{ _id: interview.id });
            res.send(interview.data);
        });
    });
});

module.exports = router;