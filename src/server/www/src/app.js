'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-07 19:08:35
*/

import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'marionette';
import Controller from 'controller';

class App extends Backbone.Marionette.Application {

	constructor() {
		super();

		//add app initializer
		this.addInitializer( function(options){
			  Backbone.history.start();
			  
			  // support cross origin sharing
			  $.support.cors=true;
			  
			  Marionette.Behaviors.behaviorsLookup = function() {
			      return window.Behaviors;
			  }
			  
		});

		//init router
		this.Router = new Marionette.AppRouter({
			controller: new Controller(this),
			appRoutes: {
				'tag/:tag' : 'showInterviewList',
				'interview/:id' : 'showInterview',
				'*actions': 'showInterviewList'
			}
		});
	}
}

export default App;
