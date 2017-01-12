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
import InterviewItemView from 'views/interview_item_view';
import InterviewCollection from 'models/interview_collection';
import InterviewModel from 'models/interview_model';

import template from 'text!templates/interview_list_tmpl.html';

class SubmissionListView extends Marionette.CompositeView {

	/* properties */
	get template() { return _.template(template) }

	get className() { return 'composite-view' }

	get childViewContainer() { return '#interview-list' }

	get childView() { return InterviewItemView }

	childEvents() {
    	return {
    		'show-details' : 'onChildShowDetails',
    	}
    }

    events() {
        return {
            'click #load-more-button' : 'onLoadMoreButtonClick'
        }
    }

	/* methods */
	initialize(options) {

		this.fetchParams = {};

		if (options.tag != null)
			this.fetchParams.tag = options.tag
		
		this.collection = new InterviewCollection();

        this.listenTo(this.collection,'sync',this.hideSpinner);
        this.listenTo(this.collection,'fetching',this.showSpinner);

        this.listenTo(Backbone,'interview:changed', this.onInterviewChanged);
        this.listenTo(Backbone,'interview:new', this.onInterviewAdded);
        this.listenTo(Backbone,'interview:removed', this.OnInterviewRemoved);

        this.collection.getFirstPage(this.fetchParams);
	}

    onAttach() {
        //bind scroll handler
        this.winowScrollListener =  _.throttle(() => {
            this.onWindowScroll();
        },500);
        $(window).on('scroll',this.winowScrollListener);
    }

    onBeforeDestroy() {
        //unbind scroll handler
        $(window).off("scroll", this.winowScrollListener);
    }


	// update model on data change
    onInterviewChanged(data) {
    	var model = this.collection.get(data._id);
    	if (model)
    		model.fetch();
    }

    onInterviewAdded(data) {
        //console.log(data);
    	var interview = new InterviewModel(data);
    	interview.fetch();
    	 // add to front of collection
		this.collection.add(interview, { at: 0});
    }

    onInterviewRemoved(data) {
        //console.log(data);
        this.collection.remove(data);
    }

    onLoadMoreButtonClick(event) {
        event.preventDefault();
        this.collection.getNextPage(this.fetchParams);
    }

    onWindowScroll() {

        var scrollPos = $(window).scrollTop();
        var triggerPos =  $(document).height() - $(window).height() * 1.2;

        if (scrollPos > triggerPos) {
            this.collection.getNextPage(this.fetchParams);
        }
    }

    showSpinner() {
        this.$('#fetch-spinner').removeClass('hidden');
    }
    
    hideSpinner() {
        this.$('#fetch-spinner').addClass('hidden');
    }


};

export default SubmissionListView