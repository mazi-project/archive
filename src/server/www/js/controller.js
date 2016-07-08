define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/interview_list_view', 'views/tag_list_view', 'views/audioplayer_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _interview_list_view, _tag_list_view, _audioplayer_view, _header_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-08 01:07:58
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

	var _tag_list_view2 = _interopRequireDefault(_tag_list_view);

	var _audioplayer_view2 = _interopRequireDefault(_audioplayer_view);

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

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).call(this));

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
				var tag = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));

				//update list view
				this.mainView.contentRegion.show(new _interview_list_view2.default({ tag: tag }));
			}
		}, {
			key: 'showInterview',
			value: function showInterview(id) {}
			// this.mainView.headerRegion.show(new Marionette.ItemView({
			// 	template: _.template(headerTemplate)
			// }));
			// this.mainView.contentRegion.show(new InterviewView({ id: id }));


			/* AUDIO PLAYER */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXNCTSxVOzs7QUFFSixzQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsT0FBSSxVQUFKLENBQWU7QUFDZCxxQkFBaUIsWUFESDtBQUVkLGlCQUFhO0FBRkMsSUFBZjs7O0FBTUEsc0JBQVMsRUFBVCxDQUFZLGtCQUFaLEVBQStCLE1BQUssVUFBcEM7OztBQUdBLE9BQUksU0FBUyx3QkFBSSxpQkFBTyxjQUFYLENBQWI7QUFDUyxVQUFPLEVBQVAsQ0FBVSxtQkFBVixFQUErQixVQUFTLElBQVQsRUFBZTtBQUM3Qyx1QkFBUyxPQUFULENBQWlCLG1CQUFqQixFQUFxQyxJQUFyQztBQUNBLElBRkQ7QUFHQSxVQUFPLEVBQVAsQ0FBVSxlQUFWLEVBQTJCLFVBQVMsSUFBVCxFQUFlO0FBQ3pDLHVCQUFTLE9BQVQsQ0FBaUIsZUFBakIsRUFBaUMsSUFBakM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsbUJBQVYsRUFBK0IsVUFBUyxJQUFULEVBQWU7QUFDN0MsdUJBQVMsT0FBVCxDQUFpQixlQUFqQixFQUFpQyxJQUFqQztBQUNBLElBRkQ7OztBQUtBLFNBQUssUUFBTCxHQUFnQix5QkFBaEI7QUFDQSxTQUFLLEdBQUwsQ0FBUyxlQUFULENBQXlCLElBQXpCLENBQThCLE1BQUssUUFBbkM7O0FBNUJPO0FBOEJoQjs7Ozs7O3VDQUkyQjtBQUFBLFFBQVYsR0FBVSx5REFBTixJQUFNOzs7QUFFM0IsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUY7QUFENkMsS0FBeEIsQ0FBaEM7OztBQUtBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsa0NBQXNCLEVBQUUsS0FBSyxHQUFQLEVBQXRCLENBQWpDO0FBQ0E7OztpQ0FFYSxFLEVBQUksQ0FLakI7Ozs7Ozs7Ozs7OzhCQUlVLEUsRUFBSTtBQUNkLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsK0JBQW9CLEVBQUUsSUFBSSxFQUFOLEVBQXBCLENBQWhDO0FBQ0E7OztnQ0FFWTtBQUNaLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0I7QUFDQTs7OztHQTdEc0IscUJBQVcsVTs7QUErRG5DOzttQkFFYyxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDggMDE6MDc6NThcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBTSU8gZnJvbSAnc29ja2V0aW8nO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgTWFpblZpZXcgZnJvbSAndmlld3MvbWFpbl92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdMaXN0VmlldyBmcm9tICd2aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3JztcbmltcG9ydCBUYWdMaXN0VmlldyBmcm9tICd2aWV3cy90YWdfbGlzdF92aWV3Jztcbi8vaW1wb3J0IEludGVydmlld1ZpZXcgZnJvbSAndmlld3MvaW50ZXJ2aWV3X3ZpZXcnO1xuaW1wb3J0IEF1ZGlvUGxheWVyVmlldyBmcm9tICd2aWV3cy9hdWRpb3BsYXllcl92aWV3JztcblxuaW1wb3J0IGhlYWRlclRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2hlYWRlcl90bXBsLmh0bWwnO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdFx0c3VwZXIoKTtcblxuXHRcdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0XHRcblx0XHRcdGFwcC5hZGRSZWdpb25zKHtcblx0XHRcdFx0Y29udGFpbmVyUmVnaW9uOiBcIiNjb250YWluZXJcIixcblx0XHRcdFx0bW9kYWxSZWdpb246IFwiI21vZGFsLWNvbnRhaW5lclwiXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly9yZWdpc3RlciBjbGllbnQgZXZlbnRzXG5cdFx0XHRCYWNrYm9uZS5vbignc2hvdzphdWRpb3BsYXllcicsdGhpcy5zaG93UGxheWVyLCB0aGlzKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBzb2NrZXQgZXZlbnRzXG5cdFx0XHR2YXIgc29ja2V0ID0gU0lPKENvbmZpZy53ZWJfc29ja2V0X3VybCk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2ludGVydmlldzpjaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdpbnRlcnZpZXc6Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignaW50ZXJ2aWV3Om5ldycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignaW50ZXJ2aWV3Om5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignaW50ZXJ2aWV3OnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ2ludGVydmlldzpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dJbnRlcnZpZXdMaXN0KHRhZz1udWxsKSB7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblxuXHRcdFx0Ly91cGRhdGUgbGlzdCB2aWV3XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3TGlzdFZpZXcoeyB0YWc6IHRhZyB9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd0ludGVydmlldyhpZCkge1xuXHRcdFx0Ly8gdGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHQvLyBcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0Ly8gfSkpO1xuXHRcdFx0Ly8gdGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEludGVydmlld1ZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdH1cblxuXHRcdC8qIEFVRElPIFBMQVlFUiAqL1xuXG5cdFx0c2hvd1BsYXllcihpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24uc2hvdyhuZXcgQXVkaW9QbGF5ZXJWaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHR9XG5cblx0XHRoaWRlUGxheWVyKCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==