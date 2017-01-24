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

    var attachment = new Attachment({ _id: req.params.attachmentId });

    var file = false;
    if (_.has(req,'files') && _.has(req.files,'file'))
        file = req.files.file;

	attachment.fetch().then( () => {
        if (!file) {
            return Promise.reject(new Error('No file submitted.'));
        }
        
        //check file size
        if (file.size > Config.maxFileSize) {
            fse.remove(file.path);
            return Promise.reject(new Error('File is too big. Only '+Config.maxFileSize/1024+'KB allowed.'));
            
        }

        //check extension
        if (!(_.contains(Config.allowedAttachmentFileTypes,file.type))) {
            fse.remove(file.path);
            return Promise.reject(new Error('Only wav,mp3,jpg and pdf files are allowed for upload. File is '+file.type));
        }

        // delete old file
        return attachment.deleteFile();
    }).then( () => {
        return attachment.attachFile(file);
    }).then( () => {
        log('Uploaded file'+file.originalFilename+' for Attachment: '+req.params.attachmentId);
        appEvents.emit('interview:changed',{ _id: attachment.data.interview });
        res.send(attachment.data);
    }).catch( err => {
        Utils.handleError(err,res);
    });
});

/*
 * POST /api/upload/image/:interviewId
 */ 
router.post('/image/:interviewId', fileUploader, function(req,res){

    var interview = new Interview({ _id: req.params.interviewId });

    var file = false;
    if (_.has(req,'files') && _.has(req.files,'file'))
        file = req.files.file;

    interview.fetch().then( () => {

        if (!file) {
            return Promise.reject(new Error('No file submitted.'));
        }
        
        //check file size
        if (file.size > Config.maxFileSize) {
            fse.remove(file.path);
            return Promise.reject(new Error('File is too big. Only '+Config.maxFileSize/1024+'KB allowed.'));
            
        }

        //check extension
        if (!(_.contains(Config.allowedImageFileTypes,file.type))) {
            fse.remove(file.path);
            return Promise.reject(new Error('Only jpg,gif and png images are allowed for upload. File is '+file.type));
        }

        // delete old image
        return interview.deleteImage();
    }).then( () => {
        // save file to interview folder
        return interview.attachImage(file);
    }).then( () => {
        log('Uploaded file'+file.originalFilename+' for Interview: '+req.params.interviewId);
        appEvents.emit('interview:changed',{ _id: interview.id });
        res.send(interview.data);
    }).catch( err => {
        Utils.handleError(err,res);
    });
});

module.exports = router;