'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:17:03
*/

import Backbone from 'backbone';
import Config from 'config';
import AttachmentModel from 'models/attachment_model';

class AttachmentCollection extends Backbone.Collection {

	get url() { return Config['web_service_url']+"attachments" }

	get model() { return AttachmentModel }
};

export default AttachmentCollection