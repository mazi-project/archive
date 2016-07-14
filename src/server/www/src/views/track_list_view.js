'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:35:19
*/

import Marionette from 'marionette';
import _ from 'underscore';
import AttachmentCollection from 'models/attachment_collection';

import template from 'text!templates/track_list_tmpl.html';
import itemTemplate from 'text!templates/track_item_tmpl.html';

class TagListView extends Marionette.CompositeView {

	/* properties */

    get className() { return 'track-list' }

    get tagName() { return 'div' }

    get childView() { 
        return Marionette.ItemView.extend({
            template: _.template(itemTemplate),
            className : 'attachment'
        }); 
    }

    get template() {
        return _.template(template)
    }

    get templateHelpers() {
        return {
            tag : this.options.tag
        }
    }

    events() {
      return {
        'click .attachment' : 'onAttachmentClicked',
        'click .play-button' : 'onPlayButtonClicked'
      }
    }

    get childViewContainer() { return '#track-list' }

    /* methods */
    initialize(options) {

        this.options = options

        this.collection = new AttachmentCollection();
        this.collection.fetch({ data: $.param({ tag : options.tag}) });

        // setup collection events
        this.listenTo(this.collection,'sync',this.onCollectionLoaded)
    }

    onAttachmentClicked(event) {
      $(event.target).toggleClass("expand");
    }

    onPlayButtonClicked(e) {
        var attachmentId = e.target.attributes['data-id'].value
        Backbone.trigger('show:audioplayer',attachmentId);
    }
}

export default TagListView