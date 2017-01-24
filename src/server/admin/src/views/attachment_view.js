'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 14:44:32
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import _ from 'underscore';
import Config from 'config';
import AttachmentModel from 'models/attachment_model';
import utils from 'utils';

import template from 'text!templates/attachment_tmpl.html';

class AttachmentView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    get templateHelpers() {
		  return {
		    fileDir : Config.files_url,
            isNew : this.model.isNew()
      }
    }

    events() {
      return {
        'click #saveButton' : 'onSaveButtonClicked',
        'click #deleteButton' : 'onDeleteButtonClicked',
        'change #input-upload-file' : 'onFileInputChanged'
      }
    }

    /* methods */
    initialize(options) {
        if (_.has(options, 'interview') && _.has(options, 'new')) {
            this.model = new AttachmentModel({ interview : options.interview });
            this.options.id = false;
        }  else {
            this.model = new AttachmentModel({ _id: options.id });
            this.model.fetch();
        }
        
        //listen to model events
        this.listenTo(this.model,'change',this.render);
    }

    onSaveButtonClicked() {
       
        this.saveModel( (error) => {
            if (error)
                alert(error);
        });
    }

    onDeleteButtonClicked() {
        if (confirm("Are you sure you want to delete the interview?")) {
            this.model.destroy();
            window.location.href="#";
        }
    }

    onFileInputChanged() {

        var uploadUrl = Config.web_service_url + 'upload/attachment/' + this.model.id;
        utils.uploadFile(self.$('#input-upload-file'), uploadUrl, (error) => {
            if (error)
                alert("ERROR: " + error);
            else
                alert("File was successfully uploaded");
                this.model.fetch();
        });   
    }

    saveModel(callback) {
         this.model.set({ 
            tags : this.$("#input-tags").val().split(" "),
            text : this.$("#input-text").val()
        });

        this.model.save(null, {
            success: () => {
                callback()
            },
            error: (error) => {
                callback(error)
            }
        });
    }
    
}

export default AttachmentView