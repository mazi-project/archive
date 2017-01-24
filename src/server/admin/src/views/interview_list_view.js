'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 12:00:04
*/

import Marionette from 'marionette';
import _ from 'underscore';
import $ from 'jquery';
import Config from 'config';
import InterviewCollection from 'models/interview_collection';

import template from 'text!templates/interview_list_tmpl.html';
import itemTemplate from 'text!templates/interview_item_tmpl.html';

class InterviewListView extends Marionette.CompositeView {

	/* properties */
	get template() { return _.template(template) }

	get className() { return 'composite-view' }

	get childViewContainer() { return '#interview-list' }

	get childView() { 
        return Marionette.ItemView.extend({
            template: _.template(itemTemplate),
            className : 'attachment',
            tagName : 'li',
            events : {
                'click #deleteButton' : 'onDeleteButtonClicked',
                'click #editButton' : 'onEditButtonClicked'
            },
            onDeleteButtonClicked : function() {
                if (confirm("Are you sure you want to delete the interview?")) {
                    this.model.destroy();
                }
            },
            onEditButtonClicked : function() {
                window.location.href = "#interview/"+this.model.id;
            }
        }); 
    }

    events() {
        return {
            'click #load-more-button' : 'onLoadMoreButtonClick',
            'click #add-interview-button' : 'onAddInterviewButtonClick'
        }
    }

	/* methods */
	initialize(options) {

		this.fetchParams = {};

		if (options.tag != null)
			this.fetchParams.tag = options.tag
		
		this.collection = new InterviewCollection();

        this.collection.fetch();
	}

    onAddInterviewButtonClick() {
        window.location.href = '#interview/new';
    }


};

export default InterviewListView;