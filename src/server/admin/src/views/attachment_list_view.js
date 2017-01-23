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
import AttachmentCollection from 'models/attachment_collection';

import itemTemplate from 'text!templates/attachment_item_tmpl.html';
import template from 'text!templates/attachment_list_tmpl.html';

class AttachmentListView extends Marionette.CompositeView {

    get template() { return _.template(template) }

    get childViewContainer() { return '#attachment-list' }

	get className() { return 'composite-view' }

	get childView() { 
        return Marionette.ItemView.extend({
            template: _.template(itemTemplate),
            className : 'attachment',
            tagName: 'li',
            events : {
                'click #deleteButton' : 'onDeleteButtonClicked',
                'click #editButton' : 'onEditButtonClicked'
            },
            templateHelpers: {
                fileDir : Config.files_url
            },
            onDeleteButtonClicked : function() {
                if (confirm("Are you sure you want to delete the attachment?")) {
                    this.model.destroy();
                }
            },
            onEditButtonClicked : function() {
                window.location.href = "#attachment/"+this.model.id;
            }
        }); 
    }

    events() {
        return {
            'click #load-more-button' : 'onLoadMoreButtonClick'
        }
    }

	/* methods */
	initialize(options) {

		this.fetchParams = {};

		if (options.interview != null)
			this.fetchParams.interview = options.interview
		
		this.collection = new AttachmentCollection();

        this.collection.fetch({ data: $.param(this.fetchParams) });

	}


};

export default AttachmentListView;