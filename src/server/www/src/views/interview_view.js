'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 14:44:32
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import _ from 'underscore'
import Moment from 'moment';
import 'moment_en_gb';
import Config from 'config';
import InterviewModel from 'models/interview_model';
import AttachmentCollection from 'models/attachment_collection';
import _str from 'underscoreString';

import AttachmentItemView from 'views/attachment_item_view';

import template from 'text!templates/interview_tmpl.html';

class InterviewView extends Marionette.CompositeView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    get templateHelpers() {
		  return {
		    filesUrl : Config.files_url + this.model.get('_id') + '/',
        formatDate : function(date) {
          return Moment(date).format("D.M.YYYY");
        },
        truncate : function(string) {
          return _str.truncate(string,Config.stringTruncateShort)
        }
      }
    }

    events() {
      return {
        'click .attachment' : 'onAttachmentClicked',
        'click .play-button' : 'onPlayButtonClicked'
      }
    }

    get childViewContainer() { return '#attachment-list' }

    get childView() { return AttachmentItemView }

    get childViewOptions() {
        return {
            interviewName : this.model.get('name')
        }
    } 

    /* methods */
    initialize(options) {
        this.model = new InterviewModel({ _id: options.id });
        this.model.fetch();

        this.collection = new AttachmentCollection();
        
        //listen to model events
        this.listenTo(this.model,'change', this.onModelChanged);
    }


    onModelChanged() {
        this.collection.reset(this.model.get('attachments'));
        this.render();
    }

    onAttachmentClicked(event) {
      $(event.target).toggleClass("expand");
    }

    onPlayButtonClicked(e) {
        var attachmentId = e.target.attributes['data-id'].value
        Backbone.trigger('show:audioplayer',attachmentId);
    }

    
}

export default InterviewView