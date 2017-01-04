'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fs = require('fs-extra');
var async = require('async');

var Database = r_require('models/database');
var Attachment = r_require('models/attachment');

  //TODO: make propper validation
function validate(data) {
    //dont allow false or null tags
    if (data.tags == null || data.tags == false)
        data.tags = [];

    data.attachments = _.has(data,'attachments') ? data.attachments : [];
    data.text = _.has(data,'text') ? data.text : "";
    data.name = _.has(data,'name') ? data.name : "";
    data.role = _.has(data,'role') ? data.role : "";

    return data;
};

// Define Model Schema
var Interview = {

    create : function(data, callback) {
        Database.connect();
        var db = Database.db;

        _.each(data, function(element) {

            // create fields
            data._id = uuid.v4();
            data.createdAt = new Date();

            // validate fields
            data = validate(data);
        });

        db.interviews.insert(data, callback);
    },

    update : function(data, callback) {
        Database.connect();
        var db = Database.db;

        db.interviews.update({ _id : data._id}, data, function(err) {
            callback(err,data);
        });
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

            // remove attachments
            db.attachments.remove({ interview: id }, (err) => {
                if (err) {
                    callback(err);
                    return;
                }

                //remove file directory
                var dir = Config.fileDir + '/' + id + '/';
                fs.remove(dir, callback);
            })
        });
    },

    removeAll : function(callback) {
        Database.connect();
        var db = Database.db;

        var self = this;
        db.interviews.find().toArray(function(err, models) {
            if (err) {
                callback(err);
                return;
            }

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

    attachImage : function(id, image, callback) {
        Database.connect();
        var db = Database.db;

        var self = this;
        //get interview
        db.interviews.findOne({ _id : id }, function(err,doc) {
            if (err) {
                callback(err);
                return;
            }

            if (_.isNull(doc)) {
                callback(new Error("No document found"));
                return;
            }

            var fileurl = Config.fileDir + id + '/' + image.originalFilename;

            //copy image
            fs.move(image.path, fileurl, (err) => {
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
    },

    // adds attachment reference
    addAttachment : function(id, attachmentId, callback) {
        Database.connect();
        var db = Database.db;

        var self = this;
        // get interview
        db.interviews.findOne({ _id : id }, (err,doc) => {
            if (err) {
                callback(err);
                return;
            }
            if (_.isNull(doc)) { 
                callback(new Error('No document found.'));
                return;
            }

            //add ref to model
            doc.attachments.push(attachmentId);

            // update model
            self.update(doc, callback);
        });
    },

    // removes attachment reference
    removeAttachment : function(id, attachment_id, callback) {
        Database.connect();
        var db = Database.db;

        var self = this;
        // get interview
        db.interviews.findOne({ _id : id }, (err,doc) => {
            if (err) {
                callback(err);
                return;
            }

            // remove attachment ref from model
            doc.attachments = _.reject(doc.attachments, function(attachment) {
                return attachment == attachment_id;
            });

            //save model
            self.update(doc, callback)
        });
    }
}

module.exports = Interview;