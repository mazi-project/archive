'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:35:19
*/

import Marionette from 'marionette';
import _ from 'underscore';
import Config from 'config';

import template from 'text!templates/attachment_item_tmpl.html';

class AttachmentItemView extends Marionette.ItemView {

	/* properties */

    get className() { return 'attachment' }

    get template() {
        return _.template(template)
    }

    get templateHelpers() {
        return {
            getfileDir : () => {
                var interview = this.model.get('interview');
                if (_.has(interview,'_id'))
                    return Config.files_url + interview._id + '/';
                else
                    return Config.files_url + interview + '/';
            },
            getFileType : () => {
                if (this.model.get("file")) {
                    var extension = this.model.get("file").name.split('.').pop();
                    if (_.contains(['wav','mp3'],extension))
                        return 'audio'
                    else
                        return 'other'
                } else {
                    return "none"
                }
            },
            getInterviewName : () => {
                var interview = this.model.get('interview');
                if (_.has(interview,'name'))
                    return interview.name;
                else if (_.has(this.options,'interviewName'))
                    return this.options.interviewName;
                else
                    return ""
            } 
        }
    }

    initialize(options) {

    }
}

export default AttachmentItemView