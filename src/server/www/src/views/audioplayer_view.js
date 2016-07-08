'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-08 01:06:09
*/

import Marionette from 'marionette'
import _ from 'underscore'
import Config from 'config';
import AttachmentModel from 'models/attachment_model';

import template from 'text!templates/audioplayer_tmpl.html';

class AudioPlayerView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

   	get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('interview') + '/',
		}
	}

   	get className() { return 'audioplayer' }

    /* methods */
    initialize(options) {
        
        this.model = new AttachmentModel({ _id: options.id} );
        this.model.fetch();

        this.listenTo(this.model,'change',this.render);
    }
}

export default AudioPlayerView