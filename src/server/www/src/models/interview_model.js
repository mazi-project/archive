'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-11 19:01:22
*/

import Backbone from 'backbone';
import Config from 'config';

class InterviewModel extends Backbone.Model {

	get urlRoot() { return Config['web_service_url']+"interviews" }

	get idAttribute() { return '_id' }

	get defaults() { 
		return {
	    	image: false,
	    	text: '',
	    	name: '',
	    	role: '',
	    	attachments: [],
	    	createdAt: 0
		}
	}

	parse(response) {
		if (_.has(response,'attachments'))
			response.interview["attachments"] = response.attachments;
        return response.interview;
	}

    save(attrs, options) {
        attrs = _.omit(attrs,'attachments');
        return Backbone.Model.prototype.save.call(this, attrs, options);
    }
}

export default InterviewModel