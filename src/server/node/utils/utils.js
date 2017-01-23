var fs = require('fs');
var _ = require('underscore');
var extend = require('util')._extend;

module.exports = {

	// handle errors in express routers
	handleError : function(err,res) {
		if(err) {

			var message = ""
			if (_.has(err,'message'))
				message = err.message
			else
				message = err
	        log(message,'error');

	        // if res defined, also give server answer
	        if (res) {
	        	res.setHeader('Content-Type','application/json');
	        	res.status(500).send({ error: message });
	        }

	        return true;
	    }
	    return false;
	},

	// escape paths in mongoose pre save middleware
	escapePath : function(doc, path) {
        elements = doc.get(path);
        if (_.isArray(elements))
            doc.set(path, _.map(elements,_.escape))
        else    
            doc.set(path, _.escape(elements));
    },

    // clones an json object
    clone : function(obj) {
    	if (_.isArray(obj))
    		return extend([],obj);
    	else
    		return extend({},obj);
    }
}