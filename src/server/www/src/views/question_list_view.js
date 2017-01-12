'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:15:18
*/

import Marionette from 'marionette';
import _ from 'underscore';
import QuestionCollection from 'models/question_collection';

import template from 'text!templates/question_list_tmpl.html';
import itemTemplate from 'text!templates/question_item_tmpl.html';

class QuestionListView extends Marionette.CompositeView {

	/* properties */

    get className() { return 'question-page' }

    get tagName() { return 'div' }

    get childView() { 
        return Marionette.ItemView.extend({
            template: _.template(itemTemplate),
            className: 'item',
            templateHelpers: {
                encodeUri : encodeURIComponent
            }
        }); 
    }

    get template() {
        return _.template(template)
    }

    get childViewContainer() { return '#questions' }

    /* methods */
    initialize(options) {

        this.collection = new QuestionCollection();
        this.collection.fetch();
    }
}

export default QuestionListView