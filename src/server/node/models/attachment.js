'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fsp = require('fs-promise');
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

    static get reference() {
        return { field : 'interview', collection: 'interviews' };
    }

    static validate(data) {
        // dont allow false or null tags
        if (data.tags == null || data.tags == false)
            data.tags = [];

        // tags must be array
        if (!_.isArray(data.tags)) {
            data.tags = data.tags.split(' ');
        }

        // set attributes
        var attributes = {}
        attributes._id = data._id;
        attributes.text = _.has(data,'text') ? data.text : "" ;
        attributes.file = _.has(data,'file') ? data.file : false ;
        attributes.interview = _.has(data,'interview') ? data.interview : false ;
        attributes.tags = _.has(data,'tags') ? data.tags : [] ;

        // create new date
        attributes.createdAt = _.has(data,'createdAt') ? data.createdAt : new Date();

        // escape html chars
        attributes.text = _.escape(attributes.text);
        attributes.tags = _.map(attributes.tags,_.escape);

        return attributes;
    }

    static remove(id, callback) {
        var db = this.getDb();

        return new Promise( (resolve, reject) => {
            this.get(id).then( doc => {
                if (!doc) {
                    reject(new Error('Did not find document id to delete'));
                    return;
                }

                if (doc.file) {
                    //remove file
                    return fsp.remove(doc.file.url);
                } else {
                    return Promise.resolve();
                }
            }).then( () => {
                db[this.collection].remove({ _id : id}, function(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(result)
                    }
                });
            });
        });
    }

    static list(options) {
        var db = this.getDb()

        // handle tag option
        if (_.has(options,'tag')) {
            var tag = options.tag;
            delete options['tag'];
            
            // filter out results that contain tag
            return super.list(options).then( (docs) => {
                docs = _.reject(docs, (doc) => {
                    return !_.contains(doc.tags,tag);
                })
                return Promise.resolve(docs);
            });
        } else {
            return super.list(options)
        }

    }

    attachFile(file, callback) {
        return new Promise( (resolve, reject) => {
            if (!this.id) {
                reject(Error("Need to save model first"));
                return;
            }

            var fileurl = Config.fileDir + this.data.interview + '/' + file.originalFilename;

            //copy image
            fs.move(file.path, fileurl, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.data.file = file;
                this.data.file.url = fileurl
                this.data.file.name = file.originalFilename;

                // save interview
                resolve();
            });
        }).then( () => {
            // save interview
            return this.save()
        });
    }

    deleteFile() {
        if (!this.data.file) {
            return Promise.resolve();
        }

        return new Promise( (resolve, reject) => {
            fs.remove(this.data.file.url, (err) => {
                if (err)
                    reject(err);
                else {
                    this.data.file = false;
                    resolve();
                }
            });
        }).then( () => {
            // save interview
            return this.save()
        });
    }
}

module.exports = Attachment;