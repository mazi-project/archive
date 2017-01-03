'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fs = require('fs-extra');
var async = require('async');
var path = require('path');

var Database = r_require('models/database');

// Define Model Schema
var Interview = {

    create : function(data, callback) {
        Database.connect();
        var db = Database.db;

        _.each(data, function(element) {

            // create fields
            data._id = uuid.v4();
            data.attachments = [];
        });

        db.interviews.insert(data, callback);
    },

    get : function(id, callback) {
        Database.connect();
        var db = Database.db;

        db.interviews.findOne({ _id : id }, callback);
    },

    list : function(callback) {
        Database.connect();
        var db = Database.db;

        db.interviews.find({}).toArray(callback);
    },

    remove : function(id, callback) {
        Database.connect();
        var db = Database.db;

        db.interviews.remove({ _id : id}, function(err) {

            //TODO: remove attachments

            //remove file directory
            var dir = Config.fileDir + '/' + id + '/';
            fs.remove(dir, callback);
        });
    },

    validate : function(data) {
        //dont allow false or null tags
        if (data.tags == null || data.tags == false)
            data.tags = [];
    },

    removeAll : function(callback) {
        Database.connect();
        var db = Database.db;

        var self = this;
        db.interviews.find().toArray(function(err, models) {
            async.each(models, function(model, cb) {
                self.remove(model._id, cb);
            }, callback);
        });
    },

    count : function(callback) {
        Database.connect();
        var db = Database.db;

        db.interviews.find({}).count(callback);
    },

    addImage : function(id, image, callback) {
        Database.connect();
        var db = Database.db;

        //get interview
        db.interviews.findOne({ _id : id }, function(err,doc) {
            if (err) callback(err);
            if (_.isNull(doc)) callback(new Error("No document found"));

            var fileurl = Config.fileDir + id + '/' + image.originalFilename;

            //copy image
            fs.move(image.path, fileurl, (err) => {
                if (err) throw(err);

                doc.image = image;
                doc.image.url = fileurl

                // save interview
                db.interviews.update({ _id : id}, doc, function(err) {
                    callback(err,doc);
                });
            });

        });
    },

    addAttachment : function(id, attachment, callback) {
        Database.connect();
        var db = Database.db;

        // get interview
        db.interviews.findOne({ _id : id }, function(err,doc) {
            if (err) callback(err);

        });

        /*attachment.interview = id;

        //save attachment
        attachment.save((err,attachment) => {
            if (err) {
                callback(err)
                return;
            }

            //add ref to model
            this.attachments.push(attachment._id);
            
            this.save((err) => {
                if (err) {
                    callback(err)
                    return;
                } 
                callback(null,attachment);
            });
        });*/
    },

    removeAttachment : function(attachment_id, callback) {
        Database.connect();
        var db = Database.db;

        // first remove comment from database
        /*Attachment.remove({ _id : attachment_id}, function(err) {
            if (err) {
                callback(err)
                return;
            }

            // remove attachment ref from model
            self.attachments = _.reject(self.attachments, function(attachment) {
                return attachment == attachment_id;
            });

            //save model
            self.save(callback)
        });*/
    }
}

module.exports = Interview;