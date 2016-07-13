'use strict';

var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fse = require('fs-extra');
var crate = require('mongoose-crate');
var LocalFS = require('mongoose-crate-localfs');
var path = require('path');

var Utils = r_require('/utils/utils');
var Interview = r_require('/models/interview');

// Define Model Schema
var attachmentSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid
	interview: { type: String, ref: 'Interview', required: true },
    text : { type: String, required: true, maxlength: '800' },
    tags : [ { type: String, match: /^\w+$/ } ] //only allow numbers and chars and _ without spaces
}, { timestamps: true });

attachmentSchema.plugin(crate, {
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
        file: {}
    }
})

attachmentSchema.pre('save', function(next) {

    //Utils.escapePath(this,'text');
    return next();

});

attachmentSchema.pre('remove', function(next) {

    //remove file
    if (this.file)
	    fse.remove(this.file, (err) => {
	        next(err);
	    });
});

// Remove All entries
attachmentSchema.statics.removeAll = function(callback) {
	this.remove({}, callback);
};

module.exports = mongoose.model('Attachment', attachmentSchema, Config.attachmentCollection);