'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fs = require('fs-extra');
var async = require('async');

var Utils = r_require('/utils/utils');

var Database = r_require('models/database');
var Interview = r_require('models/interview');

// Define Model Schema
var Attachment = {

    create: function(data, callback) {
        Database.connect();
        var db = Database.db;

        data._id = uuid.v4();
        data.createdAt = new Date();

        db.attachments.insert(data, callback);

    },

    get: function(id, callback) {
        Database.connect();
        var db = Database.db;

        db.attachments.findOne({ _id : id }, callback);
    },

    list: function(callback) {
        Database.connect();
        var db = Database.db;


    },

    remove : function(id, callback) {
        Database.connect();
        var db = Database.db;

        this.get(id, (err, model) => {
            if (err) { 
                callback(err);
                return;
            }

            // remove attachment
            db.attachments.remove({ _id : id }, (err) => {
                if (err) { 
                    callback(err);
                    return;
                }

                 // remove file
                if (model.file) {
                    fs.remove(model.file, callback);
                } else {
                    callback();
                }
            });
        });
    },

    // Remove All entries
    removeAll : function(callback) {
    	Database.connect();
        var db = Database.db;

        var self = this;
        db.attachments.find().toArray(function(err, models) {
            if (err) {
                callback(err);
                return;
            }

            async.each(models, function(model, cb) {
                self.remove(model._id, cb);
            }, callback);
        });
    },

    attachFile : function(id, file, callback) {
        callback();

        var self = this;
        //get interview
        db.attachments.findOne({ _id : id }, function(err,attachment) {
            if (err) {
                callback(err);
                return;
            }
            if (_.isNull(doc)) {
                callback(new Error("No document found"));
                return;
            }

            var fileurl = Config.fileDir + attachment.interview + '/' + file.originalFilename;

            //copy image
            fs.move(file.path, fileurl, (err) => {
                if (err) {
                    callback(err);
                    return;
                }

                doc.image = image;
                doc.image.url = fileurl

                // save interview
                self.update(doc, function(err) {
                    callback(err,doc);
                });
            });

        });
    }
}

module.exports = Attachment;