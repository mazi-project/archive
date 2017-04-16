'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 14:44:41
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import _str from 'underscoreString';
import $ from 'jquery';
import Config from 'config';

import template from 'text!templates/interview_item_tmpl.html';

class SubmissionItemView extends Marionette.ItemView {

	/* properties */
    get template() { return _.template(template) }

    get className() { return 'item-view card' }

    get templateHelpers() {
		return {
            text_truncated : _str.truncate(this.model.get('text'),Config.stringTruncateShort,'...'),
            tags : _.unique(_.flatten(_.pluck(this.model.get('attachments'),"tags"))),
            backgroundImage : this.getBackgroundImageString(),
            first : function(array,n) {
                return _.first(array,n) 
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
            'click .play-button' : 'onPlayButtonClicked',
            'click' : 'onClick'
        }
    }

    /* methods */
    initialize(options) {
    }

    getBackgroundImageString() {
        var filesUrl = Config.files_url + this.model.get('_id') + '/';
        if (!this.model.get('image'))
            return "";
        else
            return "style=\"background-image: url('"+filesUrl+this.model.get('image').name+"')\"";
    }

    onClick(event) {
        event.preventDefault();
        window.location.href = "#interview/"+this.model.get('_id')
    }

}

export default SubmissionItemView;