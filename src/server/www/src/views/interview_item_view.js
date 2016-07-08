'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-08 00:51:39
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import _str from 'underscoreString';
import $ from 'jquery';
import Moment from 'moment';
import 'moment_en_gb';
import Config from 'config';

import template from 'text!templates/interview_item_tmpl.html';

class SubmissionItemView extends Marionette.ItemView {

	/* properties */
    get template() { return _.template(template) }

    get className() { return 'item-view card' }

    get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('_id') + '/',
            isAdmin : false,
            text_truncated : _str.truncate(this.model.get('text'),Config.stringTruncateShort,'...'),
            fromNow: function(date) {
                return Moment(date).fromNow(); 
            }
		}
    }

    get modelEvents() {
        return {
            'change' : 'render'
        }
    }


    events() {
        return {
            'click .play-button' : 'onPlayButtonClicked'
        }
    }

    /* methods */
    initialize(options) {
        //console.log(this.model);
    }

    onPlayButtonClicked(e) {
        var attachmentId = e.target.attributes['data-id'].value
        Backbone.trigger('show:audioplayer',attachmentId);
    }

}

export default SubmissionItemView;