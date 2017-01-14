'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:14:21
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import Config from 'config';

import MainView from 'views/main_view';
import MenuView from 'views/menu_view';
import InterviewListView from 'views/interview_list_view';

class Controller extends Marionette.Controller {
		
		constructor(app) {

			super();

			this.app = app;
			
			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});
			
            //load mainview
            this.mainView = new MainView();
            this.app.containerRegion.show(this.mainView);
			
		}
			
		/* ROUTES */

		showInterviewList() {

			this.mainView.menuRegion.show(new MenuView({ highlight: '#link1' }))
			this.mainView.contentRegion.show(new InterviewListView());
		}

		showInterview(id) {
			// this.mainView.headerRegion.show(new Marionette.ItemView({
			//  	template: _.template(headerTemplate)
			// }));
			// this.mainView.menuRegion.show(new MenuView())
			// this.mainView.contentRegion.show(new InterviewView({ id: id }));
		}
		
};

export default Controller
	