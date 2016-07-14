'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:15:18
*/

import Marionette from 'marionette';
import _ from 'underscore';
import TagCollection from 'models/tag_collection';

import template from 'text!templates/tag_list_tmpl.html';
import itemTemplate from 'text!templates/tag_item_tmpl.html';

class TagListView extends Marionette.CompositeView {

	/* properties */

    get className() { return 'tags-page' }

    get tagName() { return 'div' }

    get childView() { 
        return Marionette.ItemView.extend({
            template: _.template(itemTemplate)
        }); 
    }

    get template() {
        return _.template(template)
    }

    get childViewContainer() { return '#tags' }

    /* methods */
    initialize(options) {

        this.collection = new TagCollection();
        this.collection.fetch();
    }
}

export default TagListView