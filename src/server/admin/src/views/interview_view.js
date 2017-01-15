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
import _str from 'underscoreString';

import template from 'text!templates/interview_tmpl.html';

class InterviewView extends Marionette.LayoutView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    get templateHelpers() {
		  return {
		    filesUrl : Config.files_url + this.model.get('_id') + '/'
      }
    }

    events() {
      return {
        'click #saveButton' : 'onSaveButtonClicked'
      }
    }

    /* methods */
    initialize(options) {
        this.model = new InterviewModel({ _id: options.id });
        this.model.fetch();
        
        //listen to model events
        this.listenTo(this.model,'change',this.render);
    }

    onSaveButtonClicked() {
      this.model.set('name', $("#input-name").val());

      console.log(this.model);
      this.model.save();
    }
    
}

export default InterviewView