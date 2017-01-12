define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/interview_list_view', 'views/interview_view', 'views/menu_view', 'views/audioplayer_view', 'views/tag_list_view', 'views/question_list_view', 'views/track_list_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _interview_list_view, _interview_view, _menu_view, _audioplayer_view, _tag_list_view, _question_list_view, _track_list_view, _header_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-15 00:14:21
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _socketio2 = _interopRequireDefault(_socketio);

	var _config2 = _interopRequireDefault(_config);

	var _main_view2 = _interopRequireDefault(_main_view);

	var _interview_list_view2 = _interopRequireDefault(_interview_list_view);

	var _interview_view2 = _interopRequireDefault(_interview_view);

	var _menu_view2 = _interopRequireDefault(_menu_view);

	var _audioplayer_view2 = _interopRequireDefault(_audioplayer_view);

	var _tag_list_view2 = _interopRequireDefault(_tag_list_view);

	var _question_list_view2 = _interopRequireDefault(_question_list_view);

	var _track_list_view2 = _interopRequireDefault(_track_list_view);

	var _header_tmpl2 = _interopRequireDefault(_header_tmpl);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Controller = function (_Marionette$Controlle) {
		_inherits(Controller, _Marionette$Controlle);

		function Controller(app) {
			_classCallCheck(this, Controller);

			var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

			_this.app = app;

			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});

			//register client events
			_backbone2.default.on('show:audioplayer', _this.showPlayer, _this);

			//register socket events
			var socket = (0, _socketio2.default)(_config2.default.web_socket_url);
			socket.on('interview:changed', function (data) {
				_backbone2.default.trigger('interview:changed', data);
			});
			socket.on('interview:new', function (data) {
				_backbone2.default.trigger('interview:new', data);
			});
			socket.on('interview:removed', function (data) {
				_backbone2.default.trigger('interview:new', data);
			});

			//load mainview
			_this.mainView = new _main_view2.default();
			_this.app.containerRegion.show(_this.mainView);

			return _this;
		}

		/* ROUTES */

		_createClass(Controller, [{
			key: 'showInterviewList',
			value: function showInterviewList() {

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link1' }));
				this.mainView.contentRegion.show(new _interview_list_view2.default());
			}
		}, {
			key: 'showInterview',
			value: function showInterview(id) {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default());
				this.mainView.contentRegion.show(new _interview_view2.default({ id: id }));
			}
		}, {
			key: 'showTagList',
			value: function showTagList() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link3' }));
				this.mainView.contentRegion.show(new _tag_list_view2.default());
			}
		}, {
			key: 'showQuestionList',
			value: function showQuestionList() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link2' }));
				this.mainView.contentRegion.show(new _question_list_view2.default());
			}
		}, {
			key: 'showTagTrackList',
			value: function showTagTrackList() {
				var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default());
				this.mainView.contentRegion.show(new _track_list_view2.default({ tag: tag }));
			}
		}, {
			key: 'showQuestionTrackList',
			value: function showQuestionTrackList() {
				var question = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default());
				this.mainView.contentRegion.show(new _track_list_view2.default({ question: question }));
			}
		}, {
			key: 'showPlayer',
			value: function showPlayer(id) {
				this.mainView.playerRegion.show(new _audioplayer_view2.default({ id: id }));
			}
		}, {
			key: 'hidePlayer',
			value: function hidePlayer() {
				this.mainView.playerRegion.reset();
			}
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJhcHAiLCJhZGRSZWdpb25zIiwiY29udGFpbmVyUmVnaW9uIiwibW9kYWxSZWdpb24iLCJvbiIsInNob3dQbGF5ZXIiLCJzb2NrZXQiLCJ3ZWJfc29ja2V0X3VybCIsImRhdGEiLCJ0cmlnZ2VyIiwibWFpblZpZXciLCJzaG93IiwiaGVhZGVyUmVnaW9uIiwiSXRlbVZpZXciLCJ0ZW1wbGF0ZSIsIl8iLCJtZW51UmVnaW9uIiwiaGlnaGxpZ2h0IiwiY29udGVudFJlZ2lvbiIsImlkIiwidGFnIiwicXVlc3Rpb24iLCJwbGF5ZXJSZWdpb24iLCJyZXNldCJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJNQSxVOzs7QUFFSixzQkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7O0FBRUFBLE9BQUlDLFVBQUosQ0FBZTtBQUNkQyxxQkFBaUIsWUFESDtBQUVkQyxpQkFBYTtBQUZDLElBQWY7O0FBS0E7QUFDQSxzQkFBU0MsRUFBVCxDQUFZLGtCQUFaLEVBQStCLE1BQUtDLFVBQXBDOztBQUVBO0FBQ0EsT0FBSUMsU0FBUyx3QkFBSSxpQkFBT0MsY0FBWCxDQUFiO0FBQ1NELFVBQU9GLEVBQVAsQ0FBVSxtQkFBVixFQUErQixVQUFTSSxJQUFULEVBQWU7QUFDN0MsdUJBQVNDLE9BQVQsQ0FBaUIsbUJBQWpCLEVBQXFDRCxJQUFyQztBQUNBLElBRkQ7QUFHQUYsVUFBT0YsRUFBUCxDQUFVLGVBQVYsRUFBMkIsVUFBU0ksSUFBVCxFQUFlO0FBQ3pDLHVCQUFTQyxPQUFULENBQWlCLGVBQWpCLEVBQWlDRCxJQUFqQztBQUNBLElBRkQ7QUFHQUYsVUFBT0YsRUFBUCxD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QVosRUFBbEIsQ0FBakM7QUFDQTs7OzhCQUlVRixFLEVBQUk7QUFDZCxTQUFLVCxRQUFMLENBQWNZLFlBQWQsQ0FBMkJYLElBQTNCLENBQWdDLCtCQUFvQixFQUFFUSxJQUFJQSxFQUFOLEVBQXBCLENBQWhDO0FBQ0E7OztnQ0FFWTtBQUNaLFNBQUtULFFBQUwsQ0FBY1ksWUFBZCxDQUEyQkMsS0FBM0I7QUFDQTs7OztHQTdGc0IscUJBQVd4QixVOztBQStGbkM7O21CQUVjQSxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MTQ6MjFcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBTSU8gZnJvbSAnc29ja2V0aW8nO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgTWFpblZpZXcgZnJvbSAndmlld3MvbWFpbl92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdMaXN0VmlldyBmcm9tICd2aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdWaWV3IGZyb20gJ3ZpZXdzL2ludGVydmlld192aWV3JztcbmltcG9ydCBNZW51VmlldyBmcm9tICd2aWV3cy9tZW51X3ZpZXcnXG5pbXBvcnQgQXVkaW9QbGF5ZXJWaWV3IGZyb20gJ3ZpZXdzL2F1ZGlvcGxheWVyX3ZpZXcnO1xuaW1wb3J0IFRhZ0xpc3RWaWV3IGZyb20gJ3ZpZXdzL3RhZ19saXN0X3ZpZXcnO1xuaW1wb3J0IFF1ZXN0aW9uTGlzdFZpZXcgZnJvbSAndmlld3MvcXVlc3Rpb25fbGlzdF92aWV3JztcbmltcG9ydCBUcmFja0xpc3RWaWV3IGZyb20gJ3ZpZXdzL3RyYWNrX2xpc3Rfdmlldyc7XG5cbmltcG9ydCBoZWFkZXJUZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9oZWFkZXJfdG1wbC5odG1sJztcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlciB7XG5cdFx0XG5cdFx0Y29uc3RydWN0b3IoYXBwKSB7XG5cblx0XHRcdHN1cGVyKCk7XG5cblx0XHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdFx0XG5cdFx0XHRhcHAuYWRkUmVnaW9ucyh7XG5cdFx0XHRcdGNvbnRhaW5lclJlZ2lvbjogXCIjY29udGFpbmVyXCIsXG5cdFx0XHRcdG1vZGFsUmVnaW9uOiBcIiNtb2RhbC1jb250YWluZXJcIlxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vcmVnaXN0ZXIgY2xpZW50IGV2ZW50c1xuXHRcdFx0QmFja2JvbmUub24oJ3Nob3c6YXVkaW9wbGF5ZXInLHRoaXMuc2hvd1BsYXllciwgdGhpcyk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgc29ja2V0IGV2ZW50c1xuXHRcdFx0dmFyIHNvY2tldCA9IFNJTyhDb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdpbnRlcnZpZXc6Y2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignaW50ZXJ2aWV3OmNoYW5nZWQnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2ludGVydmlldzpuZXcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ2ludGVydmlldzpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2ludGVydmlldzpyZW1vdmVkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdpbnRlcnZpZXc6bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2xvYWQgbWFpbnZpZXdcbiAgICAgICAgICAgIHRoaXMubWFpblZpZXcgPSBuZXcgTWFpblZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRhaW5lclJlZ2lvbi5zaG93KHRoaXMubWFpblZpZXcpO1xuXHRcdFx0XG5cdFx0fVxuXHRcdFx0XG5cdFx0LyogUk9VVEVTICovXG5cblx0XHRzaG93SW50ZXJ2aWV3TGlzdCgpIHtcblxuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5tZW51UmVnaW9uLnNob3cobmV3IE1lbnVWaWV3KHsgaGlnaGxpZ2h0OiAnI2xpbmsxJyB9KSlcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBJbnRlcnZpZXdMaXN0VmlldygpKTtcblx0XHR9XG5cblx0XHRzaG93SW50ZXJ2aWV3KGlkKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdCBcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5tZW51UmVnaW9uLnNob3cobmV3IE1lbnVWaWV3KCkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3Vmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1RhZ0xpc3QoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3Lm1lbnVSZWdpb24uc2hvdyhuZXcgTWVudVZpZXcoeyBoaWdobGlnaHQ6ICcjbGluazMnIH0pKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFRhZ0xpc3RWaWV3KCkpO1xuXHRcdH1cblxuXHRcdHNob3dRdWVzdGlvbkxpc3QoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3Lm1lbnVSZWdpb24uc2hvdyhuZXcgTWVudVZpZXcoeyBoaWdobGlnaHQ6ICcjbGluazInIH0pKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFF1ZXN0aW9uTGlzdFZpZXcoKSk7XG5cdFx0fVxuXG5cdFx0c2hvd1RhZ1RyYWNrTGlzdCh0YWcgPSBudWxsKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3Lm1lbnVSZWdpb24uc2hvdyhuZXcgTWVudVZpZXcoKSlcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBUcmFja0xpc3RWaWV3KHsgdGFnOiB0YWcgfSkpO1xuXHRcdH1cblxuXHRcdHNob3dRdWVzdGlvblRyYWNrTGlzdChxdWVzdGlvbiA9IG51bGwpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51VmlldygpKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFRyYWNrTGlzdFZpZXcoeyBxdWVzdGlvbjogcXVlc3Rpb24gfSkpO1xuXHRcdH1cblxuXHRcdC8qIEFVRElPIFBMQVlFUiAqL1xuXG5cdFx0c2hvd1BsYXllcihpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24uc2hvdyhuZXcgQXVkaW9QbGF5ZXJWaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHR9XG5cblx0XHRoaWRlUGxheWVyKCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==