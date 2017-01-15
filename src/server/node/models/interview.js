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

    static validate(data) {

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
}

module.exports = Interview;