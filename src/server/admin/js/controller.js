define(['exports', 'backbone', 'marionette', 'config', 'views/main_view', 'views/menu_view', 'views/interview_list_view', 'views/interview_view', 'views/attachment_list_view', 'views/attachment_view'], function (exports, _backbone, _marionette, _config, _main_view, _menu_view, _interview_list_view, _interview_view, _attachment_list_view, _attachment_view) {
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

	var _config2 = _interopRequireDefault(_config);

	var _main_view2 = _interopRequireDefault(_main_view);

	var _menu_view2 = _interopRequireDefault(_menu_view);

	var _interview_list_view2 = _interopRequireDefault(_interview_list_view);

	var _interview_view2 = _interopRequireDefault(_interview_view);

	var _attachment_list_view2 = _interopRequireDefault(_attachment_list_view);

	var _attachment_view2 = _interopRequireDefault(_attachment_view);

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

			//load mainview
			_this.mainView = new _main_view2.default();
			_this.app.containerRegion.show(_this.mainView);

			return _this;
		}

		/* ROUTES */

		_createClass(Controller, [{
			key: 'showInterviewList',
			value: function showInterviewList() {

				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link1' }));
				this.mainView.contentRegion.show(new _interview_list_view2.default());
			}
		}, {
			key: 'editInterview',
			value: function editInterview(id) {
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link1' }));
				this.mainView.contentRegion.show(new _interview_view2.default({ id: id }));
			}
		}, {
			key: 'newInterview',
			value: function newInterview(id) {
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link1' }));
				this.mainView.contentRegion.show(new _interview_view2.default({ new: true }));
			}
		}, {
			key: 'showAttachmentList',
			value: function showAttachmentList() {
				var forInterview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link2' }));
				this.mainView.contentRegion.show(new _attachment_list_view2.default({ interview: forInterview }));
			}
		}, {
			key: 'editAttachment',
			value: function editAttachment(id) {
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link2' }));
				this.mainView.contentRegion.show(new _attachment_view2.default({ id: id }));
			}
		}, {
			key: 'addAttachment',
			value: function addAttachment(forInterview) {
				this.mainView.menuRegion.show(new _menu_view2.default({ highlight: '#link2' }));
				this.mainView.contentRegion.show(new _attachment_view2.default({ interview: forInterview, new: true }));
			}
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJhcHAiLCJhZGRSZWdpb25zIiwiY29udGFpbmVyUmVnaW9uIiwibW9kYWxSZWdpb24iLCJtYWluVmlldyIsInNob3ciLCJtZW51UmVnaW9uIiwiaGlnaGxpZ2h0IiwiY29udGVudFJlZ2lvbiIsImlkIiwibmV3IiwiZm9ySW50ZXJ2aWV3IiwiaW50ZXJ2aWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0JNQSxVOzs7QUFFSixzQkFBWUMsR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7O0FBRUFBLE9BQUlDLFVBQUosQ0FBZTtBQUNkQyxxQkFBaUIsWUFESDtBQUVkQyxpQkFBYTtBQUZDLElBQWY7O0FBS1M7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUtKLEdBQUwsQ0FBU0UsZUFBVCxDQUF5QkcsSUFBekIsQ0FBOEIsTUFBS0QsUUFBbkM7O0FBYk87QUFlaEI7O0FBRUQ7Ozs7dUNBRW9COztBQUVuQixTQUFLQSxRQUFMLENBQWNFLFVBQWQsQ0FBeUJELElBQXpCLENBQThCLHdCQUFhLEVBQUVFLFdBQVcsUUFBYixFQUFiLENBQTlCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxhQUFkLENBQTRCSCxJQUE1QixDQUFpQyxtQ0FBakM7QUFDQTs7O2lDQUVhSSxFLEVBQUk7QUFDakIsU0FBS0wsUUFBTCxDQUFjRSxVQUFkLENBQXlCRCxJQUF6QixDQUE4Qix3QkFBYSxFQUFFRSxXQUFXLFFBQWIsRUFBYixDQUE5QjtBQUNBLFNBQUtILFFBQUwsQ0FBY0ksYUFBZCxDQUE0QkgsSUFBNUIsQ0FBaUMsNkJBQWtCLEVBQUVJLElBQUlBLEVBQU4sRUFBbEIsQ0FBakM7QUFDQTs7O2dDQUVZQSxFLEVBQUk7QUFDaEIsU0FBS0wsUUFBTCxDQUFjRSxVQUFkLENBQXlCRCxJQUF6QixDQUE4Qix3QkFBYSxFQUFFRSxXQUFXLFFBQWIsRUFBYixDQUE5QjtBQUNBLFNBQUtILFFBQUwsQ0FBY0ksYUFBZCxDQUE0QkgsSUFBNUIsQ0FBaUMsNkJBQWtCLEVBQUVLLEtBQUssSUFBUCxFQUFsQixDQUFqQztBQUNBOzs7d0NBRXVDO0FBQUEsUUFBckJDLFlBQXFCLHVFQUFOLElBQU07O0FBQ3ZDLFNBQUtQLFFBQUwsQ0FBY0UsVUFBZCxDQUF5QkQsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLSCxRQUFMLENBQWNJLGFBQWQsQ0FBNEJILElBQTVCLENBQWlDLG1DQUF1QixFQUFFTyxXQUFZRCxZQUFkLEVBQXZCLENBQWpDO0FBQ0E7OztrQ0FFY0YsRSxFQUFJO0FBQ2xCLFNBQUtMLFFBQUwsQ0FBY0UsVUFBZCxDQUF5QkQsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLSCxRQUFMLENBQWNJLGFBQWQsQ0FBNEJILElBQTVCLENBQWlDLDhCQUFtQixFQUFFSSxJQUFJQSxFQUFOLEVBQW5CLENBQWpDO0FBQ0E7OztpQ0FFYUUsWSxFQUFjO0FBQzNCLFNBQUtQLFFBQUwsQ0FBY0UsVUFBZCxDQUF5QkQsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLSCxRQUFMLENBQWNJLGFBQWQsQ0FBNEJILElBQTVCLENBQWlDLDhCQUFtQixFQUFFTyxXQUFXRCxZQUFiLEVBQTJCRCxLQUFNLElBQWpDLEVBQW5CLENBQWpDO0FBQ0E7Ozs7R0FsRHNCLHFCQUFXWCxVOztBQW9EbkM7O21CQUVjQSxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MTQ6MjFcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IE1haW5WaWV3IGZyb20gJ3ZpZXdzL21haW5fdmlldyc7XG5pbXBvcnQgTWVudVZpZXcgZnJvbSAndmlld3MvbWVudV92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdMaXN0VmlldyBmcm9tICd2aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdWaWV3IGZyb20gXCJ2aWV3cy9pbnRlcnZpZXdfdmlld1wiO1xuaW1wb3J0IEF0dGFjaG1lbnRMaXN0VmlldyBmcm9tICd2aWV3cy9hdHRhY2htZW50X2xpc3Rfdmlldyc7XG5pbXBvcnQgQXR0YWNobWVudFZpZXcgZnJvbSBcInZpZXdzL2F0dGFjaG1lbnRfdmlld1wiO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdFx0c3VwZXIoKTtcblxuXHRcdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0XHRcblx0XHRcdGFwcC5hZGRSZWdpb25zKHtcblx0XHRcdFx0Y29udGFpbmVyUmVnaW9uOiBcIiNjb250YWluZXJcIixcblx0XHRcdFx0bW9kYWxSZWdpb246IFwiI21vZGFsLWNvbnRhaW5lclwiXG5cdFx0XHR9KTtcblx0XHRcdFxuICAgICAgICAgICAgLy9sb2FkIG1haW52aWV3XG4gICAgICAgICAgICB0aGlzLm1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250YWluZXJSZWdpb24uc2hvdyh0aGlzLm1haW5WaWV3KTtcblx0XHRcdFxuXHRcdH1cblx0XHRcdFxuXHRcdC8qIFJPVVRFUyAqL1xuXG5cdFx0c2hvd0ludGVydmlld0xpc3QoKSB7XG5cblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMScgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3TGlzdFZpZXcoKSk7XG5cdFx0fVxuXG5cdFx0ZWRpdEludGVydmlldyhpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5tZW51UmVnaW9uLnNob3cobmV3IE1lbnVWaWV3KHsgaGlnaGxpZ2h0OiAnI2xpbmsxJyB9KSlcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBJbnRlcnZpZXdWaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHR9XG5cblx0XHRuZXdJbnRlcnZpZXcoaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMScgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3Vmlldyh7IG5ldzogdHJ1ZSB9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd0F0dGFjaG1lbnRMaXN0KGZvckludGVydmlldyA9IG51bGwpIHtcdFxuXHRcdFx0dGhpcy5tYWluVmlldy5tZW51UmVnaW9uLnNob3cobmV3IE1lbnVWaWV3KHsgaGlnaGxpZ2h0OiAnI2xpbmsyJyB9KSlcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBBdHRhY2htZW50TGlzdFZpZXcoeyBpbnRlcnZpZXcgOiBmb3JJbnRlcnZpZXd9KSk7XG5cdFx0fVxuXG5cdFx0ZWRpdEF0dGFjaG1lbnQoaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMicgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgQXR0YWNobWVudFZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdH1cblxuXHRcdGFkZEF0dGFjaG1lbnQoZm9ySW50ZXJ2aWV3KSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3Lm1lbnVSZWdpb24uc2hvdyhuZXcgTWVudVZpZXcoeyBoaWdobGlnaHQ6ICcjbGluazInIH0pKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEF0dGFjaG1lbnRWaWV3KHsgaW50ZXJ2aWV3OiBmb3JJbnRlcnZpZXcsIG5ldyA6IHRydWUgfSkpO1xuXHRcdH1cblx0XHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcblx0Il19