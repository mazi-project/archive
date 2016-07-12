'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-11 23:58:17
*/

import Marionette from 'marionette'
import _ from 'underscore'

import template from 'text!templates/menu_tmpl.html';

class MenuView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'menu' }

    /* methods */
    initialize(options) {
    	this.options = options;
    }

    onShow() {
    	if (_.has(this.options,'highlight')) {
    		this.$(this.options.highlight).addClass("selected");
    	}
    }
    
}

export default MenuView