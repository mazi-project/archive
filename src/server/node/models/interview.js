'use strict';

var _ = require('underscore')
var uuid = require('node-uuid');
var fs = require('fs-extra');
var async = require('async');

var BaseModel = r_require('/models/baseModel');
var Database = r_require('/models/database');


class Interview extends BaseModel {

    static get collection() {
        return 'interviews';
    }

    static get reference() {
        return { field : 'attachments', collection: 'attachments' };
    }

    static validate(data) {

        data.attachments = _.has(data,'attachments') ? data.attachments : [];
        data.text = _.has(data,'text') ? data.text : "";
        data.name = _.has(data,'name') ? data.name : "";
        data.role = _.has(data,'role') ? data.role : "";

        // create new date
        data.createdAt = _.has(data,'createdAt') ? data.createdAt : new Date();

        // escape html chars
        data.text = _.escape(data.text);
        data.name = _.escape(data.name);
        data.role = _.escape(data.role);

        return data;
    }

    static remove(id, callback) {
        var db = this.getDb()

        return new Promise( (resolve, reject) => {
            db[this.collection].remove({ _id : id}, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                //remove file directory
                var dir = Config.fileDir + '/' + id + '/';
                fs.remove(dir, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
            });
        });

        
    }

    attachImage(image) {
        var db = this.getDb()

        return new Promise( (resolve, reject) => {
            if (!this.id) {
                reject(Error("Need to save model first"));
                return;
            }

            var fileurl = Config.fileDir + this.data._id + '/' + image.originalFilename;

            //copy image
            fs.move(image.path, fileurl, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.data.image = image;
                this.data.image.url = fileurl;
                this.data.image.name = image.originalFilename;

                // save interview
                this.save().then(resolve).catch(reject);
            });

        });
        


        
    }

    // adds attachment reference
    addAttachment(attachmentId) {
        var db = this.getDb()

        //add ref to model
        this.data.attachments.push(attachmentId);

        // update model
        return this.save();
    }

    // removes attachment reference
    removeAttachment(attachmentId) {
        var db = this.getDb()

        // remove attachment ref from model
        this.data.attachments = _.reject(this.data.attachments, function(attachment) {
            return attachment == attachmentId;
        });

        //save model
        return self.save()
    }
}

module.exports = Interview;