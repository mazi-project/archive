'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fs = require('fs-extra');
var async = require('async');

var Utils = r_require('/utils/utils');

var Database = r_require('/models/database');
var Interview = r_require('/models/interview')
var BaseModel = r_require('/models/baseModel');

// Define Model Schema
class Attachment extends BaseModel {

    static get collection() {
        return 'attachments';
    }

    static validate(data) {
        //dont allow false or null tags
        if (data.tags == null || data.tags == false)
            data.tags = [];

        data.text = _.has(data,'text') ? data.text : "" ;
        data.file = _.has(data,'file') ? data.file : false ;

        // create new date
        data.createdAt = _.has(data,'createdAt') ? data.createdAt : new Date();

        return data;
    }

    attachFile(file, callback) {
        if (!this.id)
            throw new Error("Need to save model first");

        var db = this.getDb();

        var fileurl = Config.fileDir + this.data.interview + '/' + file.originalFilename;

        //copy image
        fs.move(file.path, fileurl, (err) => {
            if (err) {
                callback(err);
                return;
            }

            this.data.file = file;
            this.data.file.url = fileurl

            // save attachment
            this.save(callback);
        });
    }
}

module.exports = Attachment;