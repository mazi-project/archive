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
import AttachmentItemView from 'views/attachment_item_view';

import template from 'text!templates/attachment_list_tmpl.html';

class TagListView extends Marionette.CompositeView {

	/* properties */

    //get className() { return 'track-list' }

    get tagName() { return 'div' }

    get childView() { 
        return AttachmentItemView;
    }

    get template() {
        return _.template(template)
    }

    get templateHelpers() {
        return {
            searchString : () => {
                if (_.has(this.options,'tag')) 
                    return '#'+this.options.tag;
                else if (_.has(this.options,'question'))
                    return this.options.question;
                else return "nothing"
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

    /* methods */
    initialize(options) {

        this.options = options

        this.collection = new AttachmentCollection();

        if (_.has(options,'tag'))
            this.collection.fetch({ data: $.param({ tag : options.tag}) });

        if (_.has(options,'question'))
            this.collection.fetch({ data: $.param({ text : options.question}) });

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