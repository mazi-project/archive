'use strict';

var uuid = require('node-uuid');
var _ = require('underscore')
var async = require('async');

var Database = r_require('models/database');

class BaseModel {

	constructor(data) {

		if (!this.collection)
			throw new Error("Need to specify collection.");

		this.data = data;

	}

	get scheme() {
		return {
			_id : 'id',
			createdAt : 'now'
		}
	}

	static get collection() {
		return false;
	}

	static validate(data) {
		return data;
	}

	get collection() {
		return this.constructor.collection;
	}


	save(callback) {
		var db = this.getDb();

		// update
		if (_.has(this.data,'_id')) {
			this.constructor.update(this.data, (err, doc) => {
				if (err) {
	                callback(err);
	                return;
	            }
	            callback(err,doc);
	        });

		// create new entry
		} else {
			this.constructor.create(this.data, (err,docs) => {
				if (err) {
	                callback(err);
	                return;
	            }
				callback(err, docs[0]);
			});
		}
	}

	fetch(callback) {
		var db = this.getDb();

		this.constructor.get( this.data._id, (err, doc) => {
			if (err) {
                callback(err);
                return;
            }
			this.data = doc;
			callback(err,doc);
		});
	}

	delete(callback) {
		var db = this.getDb();

		this.constructor.remove(this.data._id,callback);
	}

	static getDb() {
		Database.connect();
    	return Database.db;
	}

	getDb() {
		return this.constructor.getDb();
	}

	static create(data, callback) {
	    var db = this.getDb()

	    var self = this;

	    // turn to array if it isnt already
	    if (!_.isArray(data)) {
	    	data = [ data ];
	    }

    	_.each(data, (element) => {

	        // create new id
	        element._id = uuid.v4();

	        // create new date
	        element.createdAt = new Date();

	        // validate fields
	        element = self.validate(element);
	    });

	    db[this.collection].insert(data, callback);
	}

	static update(data, callback) {
        var db = this.getDb()

        // validate fields
	    data = this.validate(data);

        db[this.collection].update({ _id : data._id}, data, function(err) {
            callback(err,data);
        });
    }

	static remove(id, callback) {
		var db = this.getDb()

		db[this.collection].remove({ _id : id}, callback);
	}

	static get(id, callback) {
        var db = this.getDb();

        db[this.collection].findOne({ _id : id }, callback);
    }

	static list(callback) {
        var db = this.getDb()

        db[this.collection].find({}).toArray(callback);
    }

    static count(callback) {
        var db = this.getDb()

        db.interviews.find({}).count(callback);
    }

    static removeAll(callback) {
        var db = this.getDb();

        var self = this;
        db[this.collection].find().toArray( (err, models) => {
            if (err) {
                callback(err);
                return;
            }

            async.each(models, (model, cb) => {
                self.remove(model._id, cb);
            }, callback);
        });
    }

}

module.exports = BaseModel;