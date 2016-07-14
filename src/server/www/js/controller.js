define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/interview_list_view', 'views/interview_view', 'views/menu_view', 'views/audioplayer_view', 'views/tag_list_view', 'views/track_list_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _interview_list_view, _interview_view, _menu_view, _audioplayer_view, _tag_list_view, _track_list_view, _header_tmpl) {
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
			key: 'showTrackList',
			value: function showTrackList() {
				var tag = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link3' }));
				this.mainView.contentRegion.show(new _track_list_view2.default({ tag: tag }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdCTSxVOzs7QUFFSixzQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsT0FBSSxVQUFKLENBQWU7QUFDZCxxQkFBaUIsWUFESDtBQUVkLGlCQUFhO0FBRkMsSUFBZjs7O0FBTUEsc0JBQVMsRUFBVCxDQUFZLGtCQUFaLEVBQStCLE1BQUssVUFBcEM7OztBQUdBLE9BQUksU0FBUyx3QkFBSSxpQkFBTyxjQUFYLENBQWI7QUFDUyxVQUFPLEVBQVAsQ0FBVSxtQkFBVixFQUErQixVQUFTLElBQVQsRUFBZTtBQUM3Qyx1QkFBUyxPQUFULENBQWlCLG1CQUFqQixFQUFxQyxJQUFyQztBQUNBLElBRkQ7QUFHQSxVQUFPLEVBQVAsQ0FBVSxlQUFWLEVBQTJCLFVBQVMsSUFBVCxFQUFlO0FBQ3pDLHVCQUFTLE9BQVQsQ0FBaUIsZUFBakIsRUFBaUMsSUFBakM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsbUJBQVYsRUFBK0IsVUFBUyxJQUFULEVBQWU7QUFDN0MsdUJBQVMsT0FBVCxDQUFpQixlQUFqQixFQUFpQyxJQUFqQztBQUNBLElBRkQ7OztBQUtBLFNBQUssUUFBTCxHQUFnQix5QkFBaEI7QUFDQSxTQUFLLEdBQUwsQ0FBUyxlQUFULENBQXlCLElBQXpCLENBQThCLE1BQUssUUFBbkM7O0FBNUJPO0FBOEJoQjs7Ozs7O3VDQUltQjs7QUFFbkIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUY7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLENBQThCLHdCQUFhLEVBQUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLG1DQUFqQztBQUNBOzs7aUNBRWEsRSxFQUFJO0FBQ2pCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3RELGVBQVUsRUFBRSxRQUFGO0FBRDRDLEtBQXhCLENBQWhDO0FBR0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixJQUF6QixDQUE4Qix5QkFBOUI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDZCQUFrQixFQUFFLElBQUksRUFBTixFQUFsQixDQUFqQztBQUNBOzs7aUNBRWE7QUFDYixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRjtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRSxXQUFXLFFBQWIsRUFBYixDQUE5QjtBQUNBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsNkJBQWpDO0FBQ0E7OzttQ0FFeUI7QUFBQSxRQUFaLEdBQVkseURBQU4sSUFBTTs7QUFDekIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUY7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLENBQThCLHdCQUFhLEVBQUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDhCQUFrQixFQUFFLEtBQUssR0FBUCxFQUFsQixDQUFqQztBQUNBOzs7OEJBSVUsRSxFQUFJO0FBQ2QsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQywrQkFBb0IsRUFBRSxJQUFJLEVBQU4sRUFBcEIsQ0FBaEM7QUFDQTs7O2dDQUVZO0FBQ1osU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQjtBQUNBOzs7O0dBN0VzQixxQkFBVyxVOztBQStFbkM7O21CQUVjLFUiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAwMDoxNDoyMVxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IFNJTyBmcm9tICdzb2NrZXRpbyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IEludGVydmlld0xpc3RWaWV3IGZyb20gJ3ZpZXdzL2ludGVydmlld19saXN0X3ZpZXcnO1xuaW1wb3J0IEludGVydmlld1ZpZXcgZnJvbSAndmlld3MvaW50ZXJ2aWV3X3ZpZXcnO1xuaW1wb3J0IE1lbnVWaWV3IGZyb20gJ3ZpZXdzL21lbnVfdmlldydcbmltcG9ydCBBdWRpb1BsYXllclZpZXcgZnJvbSAndmlld3MvYXVkaW9wbGF5ZXJfdmlldyc7XG5pbXBvcnQgVGFnTGlzdFZpZXcgZnJvbSAndmlld3MvdGFnX2xpc3Rfdmlldyc7XG5pbXBvcnQgVHJhY2tMaXN0VmlldyBmcm9tICd2aWV3cy90cmFja19saXN0X3ZpZXcnO1xuXG5pbXBvcnQgaGVhZGVyVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaGVhZGVyX3RtcGwuaHRtbCc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250YWluZXJSZWdpb246IFwiI2NvbnRhaW5lclwiLFxuXHRcdFx0XHRtb2RhbFJlZ2lvbjogXCIjbW9kYWwtY29udGFpbmVyXCJcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvL3JlZ2lzdGVyIGNsaWVudCBldmVudHNcblx0XHRcdEJhY2tib25lLm9uKCdzaG93OmF1ZGlvcGxheWVyJyx0aGlzLnNob3dQbGF5ZXIsIHRoaXMpO1xuXG5cdFx0XHQvL3JlZ2lzdGVyIHNvY2tldCBldmVudHNcblx0XHRcdHZhciBzb2NrZXQgPSBTSU8oQ29uZmlnLndlYl9zb2NrZXRfdXJsKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignaW50ZXJ2aWV3OmNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ2ludGVydmlldzpjaGFuZ2VkJyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdpbnRlcnZpZXc6bmV3JywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdpbnRlcnZpZXc6bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdpbnRlcnZpZXc6cmVtb3ZlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignaW50ZXJ2aWV3Om5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9sb2FkIG1haW52aWV3XG4gICAgICAgICAgICB0aGlzLm1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250YWluZXJSZWdpb24uc2hvdyh0aGlzLm1haW5WaWV3KTtcblx0XHRcdFxuXHRcdH1cblx0XHRcdFxuXHRcdC8qIFJPVVRFUyAqL1xuXG5cdFx0c2hvd0ludGVydmlld0xpc3QoKSB7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMScgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3TGlzdFZpZXcoKSk7XG5cdFx0fVxuXG5cdFx0c2hvd0ludGVydmlldyhpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHQgXHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51VmlldygpKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEludGVydmlld1ZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdH1cblxuXHRcdHNob3dUYWdMaXN0KCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5tZW51UmVnaW9uLnNob3cobmV3IE1lbnVWaWV3KHsgaGlnaGxpZ2h0OiAnI2xpbmszJyB9KSlcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBUYWdMaXN0VmlldygpKTtcblx0XHR9XG5cblx0XHRzaG93VHJhY2tMaXN0KHRhZyA9IG51bGwpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShoZWFkZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMycgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgVHJhY2tMaXN0Vmlldyh7IHRhZzogdGFnIH0pKTtcblx0XHR9XG5cblx0XHQvKiBBVURJTyBQTEFZRVIgKi9cblxuXHRcdHNob3dQbGF5ZXIoaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcucGxheWVyUmVnaW9uLnNob3cobmV3IEF1ZGlvUGxheWVyVmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0fVxuXG5cdFx0aGlkZVBsYXllcigpIHtcblx0XHRcdHRoaXMubWFpblZpZXcucGxheWVyUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXHRcdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXHQiXX0=