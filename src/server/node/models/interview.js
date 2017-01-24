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

        var attributes = {}

        // set attributes
        attributes._id = data._id
        attributes.text = _.has(data,'text') ? data.text : "";
        attributes.name = _.has(data,'name') ? data.name : "";
        attributes.role = _.has(data,'role') ? data.role : "";
        attributes.image = _.has(data,'image') ? data.image : false;

        // create new date
        attributes.createdAt = _.has(data,'createdAt') ? data.createdAt : new Date();

        // escape html chars
        attributes.text = _.escape(attributes.text);
        attributes.name = _.escape(attributes.name);
        attributes.role = _.escape(attributes.role);

        return attributes;
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

                resolve();
            })
        }).then( () => {
            // save interview
            return this.save()
        });
    }

    deleteImage() {
        if (!this.data.image) {
            return Promise.resolve();
        }

        return new Promise( (resolve, reject) => {
            fs.remove(this.data.image.url, (err) => {
                if (err)
                    reject(err);
                else {
                    this.data.image = false;
                    resolve();
                }
            });
        }).then( () => {
            // save interview
            return this.save()
        });
    }
}

module.exports = Interview;