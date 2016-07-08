'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-08 00:54:35
*/

import Backbone from 'backbone';
import Config from 'config';

class AttachmentModel extends Backbone.Model {

	get urlRoot() { return Config['web_service_url']+"attachments" }

	get idAttribute() { return '_id' }

	get defaults() { 
		return {
	    	file: false,
	    	text: '',
	    	tags: []
		}
	}
}

export default AttachmentModel