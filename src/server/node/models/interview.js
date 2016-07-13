'use strict';

var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fse = require('fs-extra');
var async = require('async');
var crate = require('mongoose-crate');
var LocalFS = require('mongoose-crate-localfs');
var path = require('path');

var Utils = r_require('/utils/utils');
var Attachment = r_require('/models/attachment');

// Define Model Schema
var interviewSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid

    text : { type: String, required: true, maxlength: '1500' },
    name: { type: String, required: true, maxlength: 60 },
    role: { type: String, maxlength: 100 },
    attachments: [ { type: String, ref: 'Attachment'} ],
    location : { type: String } // [ longitude, latitude ]

}, { timestamps: true });

interviewSchema.plugin(crate, {
    storage: new LocalFS({
        directory: Config.fileDir,
        path: (attachment) => {
            var dir = "";
            if (_.has(attachment,'dir'))
                dir = attachment.dir + '/'
            return '/' + dir + path.basename(attachment.path);
        }
    }),
    fields: {
        image: {}
    }
})

interviewSchema.pre('remove', function(next) {

    // also remove all the assigned attachments
    Attachment.remove({ interview: this._id }, (err) => {
        if (err)
            next(err);

        //remove file directory
        var dir = Config.fileDir + '/' + this._id + '/';
        fse.remove(dir, (err) => {
            next(err);
        });
    });
});

interviewSchema.pre('save', function(next) {

    //Utils.escapePath(this,'text');
    //Utils.escapePath(this,'name');
    //Utils.escapePath(this,'role');

    //dont allow false or null tags
    if (this.get('tags') == null || this.get('tags') == false)
        this.set('tags',[]);

    //create attachment dir, if it doesnt exist
    var dir = Config.fileDir + this._id + '/'
    fse.ensureDir(dir, (err) => {
        if (err) {
            next(err)
            return;
        }

        return next();
    });

});

// Remove All entries
interviewSchema.statics.removeAll = function(callback) {
    this.remove({},callback);
};

interviewSchema.statics.remove = function(query,callback) {
	this.find(query, function(err,models) {
        if (err) {
            callback(err);
            return;
        }

        async.each(models, (model,done) => {
            model.remove(done);
        }, (err) => {
            callback(err,{ result: {n: models.length }});
        });
    });
};

interviewSchema.methods.addAttachment = function(attachment, callback) {

    attachment.interview = this._id;

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
    });
}

interviewSchema.methods.removeAttachment = function(attachment_id,callback) {
    var self = this;

    // first remove comment from database
    Attachment.remove({ _id : attachment_id}, function(err) {
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
    });
}

module.exports = mongoose.model('Interview', interviewSchema, Config.interviewCollection);