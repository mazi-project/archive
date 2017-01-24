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
import InterviewModel from 'models/interview_model';
import AttachmentListView from 'views/attachment_list_view';
import utils from 'utils';

import template from 'text!templates/interview_tmpl.html';

class InterviewView extends Marionette.LayoutView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    get templateHelpers() {
		  return {
		    filesUrl : Config.files_url + this.model.get('_id') + '/',
            isNew : this.model.isNew()
      }
    }

   regions() { 
      return {
        attachments : '#interview-attachments'
      }
    }

    events() {
      return {
        'click #saveButton' : 'onSaveButtonClicked',
        'click #deleteButton' : 'onDeleteButtonClicked',
        'click #add-attachment-button' : 'onAddAttachmentButtonClicked',
        'change #input-upload-file' : 'onFileInputChanged'
      }
    }

    /* methods */
    initialize(options) {

        if (_.has(options, 'new')) {
            this.model = new InterviewModel();
            this.options.id = false;
        }  else {
            this.model = new InterviewModel({ _id: options.id });
            this.model.fetch();
        }
        
        //listen to model events
        this.listenTo(this.model,'change',this.render);
    }

    onRender() {
        this.getRegion('attachments').show( new AttachmentListView({ interview : this.options.id }) );
    }

    onSaveButtonClicked() {
        this.saveModel( (error) => {
            if (error)
                alert(error);
            else 
                window.location.href = "#interview/"+this.model.id;

        });
    }

    onDeleteButtonClicked() {
        if (confirm("Are you sure you want to delete the interview?")) {
            this.model.destroy();
            window.location.href="#";
        }
    }

    onAddAttachmentButtonClicked() {
        window.location.href = '#attachment/add/' + this.options.id;
    }

    onFileInputChanged() {

        var uploadUrl = Config.web_service_url + 'upload/image/' + this.model.id;
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
            name : this.$("#input-name").val(),
            role : this.$("#input-role").val(),
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

export default InterviewView