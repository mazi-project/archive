'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-15 00:14:21
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import SIO from 'socketio';
import Config from 'config';

import MainView from 'views/main_view';
import InterviewListView from 'views/interview_list_view';
import InterviewView from 'views/interview_view';
import MenuView from 'views/menu_view'
import AudioPlayerView from 'views/audioplayer_view';
import TagListView from 'views/tag_list_view';
import QuestionListView from 'views/question_list_view';
import AttachmentListView from 'views/attachment_list_view';

import headerTemplate from 'text!templates/header_tmpl.html';

class Controller extends Marionette.Controller {
		
		constructor(app) {

			super();

			this.app = app;
			
			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});
			
			//register client events
			Backbone.on('show:audioplayer',this.showPlayer, this);

			//register socket events
			var socket = SIO(Config.web_socket_url);
            socket.on('interview:changed', function(data) {
            	Backbone.trigger('interview:changed',data);
            });
            socket.on('interview:new', function(data) {
            	Backbone.trigger('interview:new',data);
            });
            socket.on('interview:removed', function(data) {
            	Backbone.trigger('interview:new',data);
            });

            //load mainview
            this.mainView = new MainView();
            this.app.containerRegion.show(this.mainView);
			
		}
			
		/* ROUTES */

		showInterviewList() {

			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link1' }))
			this.mainView.contentRegion.show(new InterviewListView());
		}

		showInterview(id) {
			this.mainView.headerRegion.show(new Marionette.ItemView({
			 	template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link1' }))
			this.mainView.contentRegion.show(new InterviewView({ id: id }));
		}

		showTagList() {
			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link3' }))
			this.mainView.contentRegion.show(new TagListView());
		}

		showQuestionList() {
			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link2' }))
			this.mainView.contentRegion.show(new QuestionListView());
		}

		showTagTrackList(tag = null) {
			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link3' }))
			this.mainView.contentRegion.show(new AttachmentListView({ tag: tag }));
		}

		showQuestionTrackList(question = null) {
			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));
			this.mainView.menuRegion.show(new MenuView({ highlight: '#link2' }))
			this.mainView.contentRegion.show(new AttachmentListView({ question: question }));
		}

		/* AUDIO PLAYER */

		showPlayer(id) {
			this.mainView.playerRegion.show(new AudioPlayerView({ id: id }));
		}

		hidePlayer() {
			this.mainView.playerRegion.reset();
		}
		
};

export default Controller
	