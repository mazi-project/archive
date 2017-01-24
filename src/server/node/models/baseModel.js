'use strict';

var uuid = require('node-uuid');
var _ = require('underscore')
var async = require('async');

var Database = r_require('/models/database');

class BaseModel {

	constructor(data) {

		if (!this.collection)
			throw new Error("Need to specify collection.");

		this.data = data;
	}

	static get collection() {
		return false;
	}

	static get reference() {
		return false;
	}

	static validate(data) {
		return data;
	}

	
	get collection() {
		return this.constructor.collection;
	}

	get id() {
		return this.data._id;
	}

	save() {
		var db = this.getDb();

		return new Promise( (resolve, reject) => {
			if (_.has(this.data,'_id')) {
				this.constructor.update(this.data).then( doc => {
					this.data = doc
					resolve(doc);
				}).catch( error => {	
					reject(err);
				});
			} else {
				this.constructor.create(this.data).then( doc => {
					this.data = doc[0]
					resolve(doc[0]);
				}).catch( error => {	
					reject(err);
				});
			}
		});	
	}

	fetch() {
		return new Promise( (resolve, reject) => {
			this.constructor.get(this.data._id).then( doc => {
				this.data = doc;
				resolve(doc);
			}).catch( error => {	
				reject(err);
			});
		});
	}

	delete() {
		return this.constructor.remove(this.data._id);
	}

	populate() {
		return new Promise( (resolve, reject) => {
			this.constructor.populate([this.data]).then( (populatedData) => {
				this.data = populatedData[0];
				resolve(this.data);
			}).catch(reject);
		});
	}

	static getDb() {
		Database.connect();
    	return Database.db;
	}

	getDb() {
		return this.constructor.getDb();
	}

	static create(data, importData=false) {
	    var db = this.getDb()

	    var self = this;

	    // turn to array if it isnt already
	    if (!_.isArray(data)) {
	    	data = [ data ];
	    }

    	data = _.map(data, (element) => {
	        // validate fields
	        let attributes = self.validate(element);
	        
	        // create new id
	        if (!importData)
	        	attributes._id = uuid.v4();
	    	
	    	return attributes;
	    });

	    return new Promise( (resolve, reject) => {
        	db[this.collection].insert(data, (err, doc) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(doc);
        		}
        	});
        });
	}

	static update(data, callback) {
        var db = this.getDb()

        // validate fields
	    data = this.validate(data);

		//unpopulate if populated
		if (this.reference) {
			if (_.isArray(data[this.reference.field]) && typeof data[this.reference.field][0] != 'string') {
				data[this.reference.field] = _.pluck(data[this.reference.field],'_id');
			} else if (!_.isArray(data[this.reference.field]) && typeof data[this.reference.field] != 'string') {
				data[this.reference.field] = data[this.reference.field]._id;
			}
		}

	    return new Promise( (resolve, reject) => {
        	db[this.collection].update({ _id : data._id}, data, (err) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(data);
        		}
        	});
        });
    }

	static remove(id, callback) {
		var db = this.getDb()

		return new Promise( (resolve, reject) => {
        	db[this.collection].remove({ _id : id}, (err, result) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(result);
        		}
        	});
        });
	}

	static get(id) {
        var db = this.getDb();

        return new Promise( (resolve, reject) => {
        	db[this.collection].findOne({ _id : id }, (err, doc) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(doc);
        		}
        	});
        });
    }

	static list(options) {
        var db = this.getDb()

        if (_.isUndefined(options))
        	options = {};

        // build pagination options
        var paginateOptions = { skip : 0, limit : 0 };
        if (_.has(options,'limit')) {
        	paginateOptions.limit = options.limit;
        	delete options['limit'];
        }
        if (_.has(options,'skip')) {
        	paginateOptions.skip = options.skip;
        	delete options['skip'];
        }

        // make query
        return new Promise( (resolve, reject) => {
        	db[this.collection].find(options).skip(paginateOptions.skip).limit(paginateOptions.limit).toArray( (err, docs) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(docs);
        		}
        	});
        });
    }

    static count(callback) {
        var db = this.getDb()

        return new Promise( (resolve, reject) => {
        	db[this.collection].count( (err, count) => {
        		if (err) {
        			reject(err);
        		} else {
        			resolve(count);
        		}
        	});
        });
    }

    static removeAll(callback) {
        var db = this.getDb();

        return new Promise( (resolve, reject) => {
	        db[this.collection].find().toArray( (err, models) => {
	        	if (err) {
        			reject(err);
        			return;
        		}

	            var removePromises = _.map(models, (model) => {
					return this.remove(model._id);
				});

				Promise.all(removePromises).then(() => {
					resolve();
				}).catch(reject);
	        });
    	});
    }

    static populate(docs) {
    	var db = this.getDb();

    	var populatePromises = _.map(docs, (doc) => {
    		return new Promise( (resolve, reject) => {

    			if (!_.has(doc,this.reference.field)) {
    				resolve(doc);
    				return;
    			}

    			var ids = doc[this.reference.field];

    			// populate single element
	            if (!_.isArray(ids)) {
	            	db[this.reference.collection].findOne( { _id : ids }, (err, element) => {

	            		if (err)
	            			reject(err);
	            		else {
	            			doc[this.reference.field] = element;
	            			resolve(doc);
	            		}
	            	})
	            // populate list
	            } else {
	            	db[this.reference.collection].find( { _id : { $in: ids}} ).toArray( (err, elements) => {
	            		if (err)
	            			reject(err);
	            		else {
	            			if (!_.isUndefined(elements))
	            				doc[this.reference.field] = elements;
	            			resolve(doc);
	            		}
	            	});
	            }
    		});
    	});

    	return Promise.all(populatePromises);
    }
}

module.exports = BaseModel;