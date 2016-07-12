define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/interview_list_view', 'views/interview_view', 'views/menu_view', 'views/audioplayer_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _interview_list_view, _interview_view, _menu_view, _audioplayer_view, _header_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-11 23:53:24
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
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link1' }));
				this.mainView.contentRegion.show(new _interview_list_view2.default({ tag: tag }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0JNLFU7OztBQUVKLHNCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFBQTs7QUFJaEIsU0FBSyxHQUFMLEdBQVcsR0FBWDs7QUFFQSxPQUFJLFVBQUosQ0FBZTtBQUNkLHFCQUFpQixZQURIO0FBRWQsaUJBQWE7QUFGQyxJQUFmOzs7QUFNQSxzQkFBUyxFQUFULENBQVksa0JBQVosRUFBK0IsTUFBSyxVQUFwQzs7O0FBR0EsT0FBSSxTQUFTLHdCQUFJLGlCQUFPLGNBQVgsQ0FBYjtBQUNTLFVBQU8sRUFBUCxDQUFVLG1CQUFWLEVBQStCLFVBQVMsSUFBVCxFQUFlO0FBQzdDLHVCQUFTLE9BQVQsQ0FBaUIsbUJBQWpCLEVBQXFDLElBQXJDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLGVBQVYsRUFBMkIsVUFBUyxJQUFULEVBQWU7QUFDekMsdUJBQVMsT0FBVCxDQUFpQixlQUFqQixFQUFpQyxJQUFqQztBQUNBLElBRkQ7QUFHQSxVQUFPLEVBQVAsQ0FBVSxtQkFBVixFQUErQixVQUFTLElBQVQsRUFBZTtBQUM3Qyx1QkFBUyxPQUFULENBQWlCLGVBQWpCLEVBQWlDLElBQWpDO0FBQ0EsSUFGRDs7O0FBS0EsU0FBSyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsSUFBekIsQ0FBOEIsTUFBSyxRQUFuQzs7QUE1Qk87QUE4QmhCOzs7Ozs7dUNBSTJCO0FBQUEsUUFBVixHQUFVLHlEQUFOLElBQU07OztBQUUzQixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRjtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRSxXQUFXLFFBQWIsRUFBYixDQUE5QjtBQUNBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsa0NBQXNCLEVBQUUsS0FBSyxHQUFQLEVBQXRCLENBQWpDO0FBQ0E7OztpQ0FFYSxFLEVBQUk7QUFDakIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdEQsZUFBVSxFQUFFLFFBQUY7QUFENEMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLENBQThCLHlCQUE5QjtBQUNBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsNkJBQWtCLEVBQUUsSUFBSSxFQUFOLEVBQWxCLENBQWpDO0FBQ0E7Ozs4QkFJVSxFLEVBQUk7QUFDZCxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLCtCQUFvQixFQUFFLElBQUksRUFBTixFQUFwQixDQUFoQztBQUNBOzs7Z0NBRVk7QUFDWixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCO0FBQ0E7Ozs7R0E3RHNCLHFCQUFXLFU7O0FBK0RuQzs7bUJBRWMsVSIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTExIDIzOjUzOjI0XG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgU0lPIGZyb20gJ3NvY2tldGlvJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IE1haW5WaWV3IGZyb20gJ3ZpZXdzL21haW5fdmlldyc7XG5pbXBvcnQgSW50ZXJ2aWV3TGlzdFZpZXcgZnJvbSAndmlld3MvaW50ZXJ2aWV3X2xpc3Rfdmlldyc7XG5pbXBvcnQgSW50ZXJ2aWV3VmlldyBmcm9tICd2aWV3cy9pbnRlcnZpZXdfdmlldyc7XG5pbXBvcnQgTWVudVZpZXcgZnJvbSAndmlld3MvbWVudV92aWV3J1xuaW1wb3J0IEF1ZGlvUGxheWVyVmlldyBmcm9tICd2aWV3cy9hdWRpb3BsYXllcl92aWV3JztcblxuaW1wb3J0IGhlYWRlclRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2hlYWRlcl90bXBsLmh0bWwnO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdFx0c3VwZXIoKTtcblxuXHRcdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0XHRcblx0XHRcdGFwcC5hZGRSZWdpb25zKHtcblx0XHRcdFx0Y29udGFpbmVyUmVnaW9uOiBcIiNjb250YWluZXJcIixcblx0XHRcdFx0bW9kYWxSZWdpb246IFwiI21vZGFsLWNvbnRhaW5lclwiXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly9yZWdpc3RlciBjbGllbnQgZXZlbnRzXG5cdFx0XHRCYWNrYm9uZS5vbignc2hvdzphdWRpb3BsYXllcicsdGhpcy5zaG93UGxheWVyLCB0aGlzKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBzb2NrZXQgZXZlbnRzXG5cdFx0XHR2YXIgc29ja2V0ID0gU0lPKENvbmZpZy53ZWJfc29ja2V0X3VybCk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2ludGVydmlldzpjaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdpbnRlcnZpZXc6Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignaW50ZXJ2aWV3Om5ldycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignaW50ZXJ2aWV3Om5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignaW50ZXJ2aWV3OnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ2ludGVydmlldzpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dJbnRlcnZpZXdMaXN0KHRhZz1udWxsKSB7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMScgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3TGlzdFZpZXcoeyB0YWc6IHRhZyB9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd0ludGVydmlldyhpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHQgXHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51VmlldygpKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEludGVydmlld1ZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdH1cblxuXHRcdC8qIEFVRElPIFBMQVlFUiAqL1xuXG5cdFx0c2hvd1BsYXllcihpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24uc2hvdyhuZXcgQXVkaW9QbGF5ZXJWaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHR9XG5cblx0XHRoaWRlUGxheWVyKCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5wbGF5ZXJSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==