'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-07 22:55:54
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
	    	tags: [],
	    	author: '',
	    	role: ''
		}
	}
}

export default InterviewModel