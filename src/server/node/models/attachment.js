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
        //dont allow false or null tags
        if (data.tags == null || data.tags == false)
            data.tags = "";

        data.interview = _.has(data,'interview') ? data.interview : false ;
        data.text = _.has(data,'text') ? data.text : "" ;
        data.file = _.has(data,'file') ? data.file : false ;
        data.interview = _.has(data,'interview') ? data.interview : false ;

        // create new date
        data.createdAt = _.has(data,'createdAt') ? data.createdAt : new Date();

        return data;
    }

    static remove(id, callback) {
        var db = this.getDb();

        return new Promise( (resolve, reject) => {
            this.get(id).then( doc => {
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
            console.log("has tags");
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
                this.save().then(resolve).catch(reject);
            });

        });
    }
}

module.exports = Attachment;