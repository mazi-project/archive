'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-07 18:51:59
*/

import Backbone from 'backbone';
import Config from 'config';

class TagCollection extends Backbone.Collection {

	get url() { return Config['web_service_url']+"tags" }
};

export default TagCollection