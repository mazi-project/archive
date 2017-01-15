define(['exports', 'backbone', 'marionette', 'config', 'views/main_view', 'views/menu_view', 'views/interview_list_view', 'views/interview_view'], function (exports, _backbone, _marionette, _config, _main_view, _menu_view, _interview_list_view, _interview_view) {
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
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJhcHAiLCJhZGRSZWdpb25zIiwiY29udGFpbmVyUmVnaW9uIiwibW9kYWxSZWdpb24iLCJtYWluVmlldyIsInNob3ciLCJtZW51UmVnaW9uIiwiaGlnaGxpZ2h0IiwiY29udGVudFJlZ2lvbiIsImlkIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQk1BLFU7OztBQUVKLHNCQUFZQyxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDs7QUFFQUEsT0FBSUMsVUFBSixDQUFlO0FBQ2RDLHFCQUFpQixZQURIO0FBRWRDLGlCQUFhO0FBRkMsSUFBZjs7QUFLUztBQUNBLFNBQUtDLFFBQUwsR0FBZ0IseUJBQWhCO0FBQ0EsU0FBS0osR0FBTCxDQUFTRSxlQUFULENBQXlCRyxJQUF6QixDQUE4QixNQUFLRCxRQUFuQzs7QUFiTztBQWVoQjs7QUFFRDs7Ozt1Q0FFb0I7O0FBRW5CLFNBQUtBLFFBQUwsQ0FBY0UsVUFBZCxDQUF5QkQsSUFBekIsQ0FBOEIsd0JBQWEsRUFBRUUsV0FBVyxRQUFiLEVBQWIsQ0FBOUI7QUFDQSxTQUFLSCxRQUFMLENBQWNJLGFBQWQsQ0FBNEJILElBQTVCLENBQWlDLG1DQUFqQztBQUNBOzs7aUNBRWFJLEUsRUFBSTtBQUNqQixTQUFLTCxRQUFMLENBQWNFLFVBQWQsQ0FBeUJELElBQXpCLENBQThCLHdCQUFhLEVBQUVFLFdBQVcsUUFBYixFQUFiLENBQTlCO0FBQ0EsU0FBS0gsUUFBTCxDQUFjSSxhQUFkLENBQTRCSCxJQUE1QixDQUFpQyw2QkFBa0IsRUFBRUksSUFBSUEsRUFBTixFQUFsQixDQUFqQztBQUNBOzs7O0dBOUJzQixxQkFBV1YsVTs7QUFnQ25DOzttQkFFY0EsVSIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDAwOjE0OjIxXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IE1lbnVWaWV3IGZyb20gJ3ZpZXdzL21lbnVfdmlldyc7XG5pbXBvcnQgSW50ZXJ2aWV3TGlzdFZpZXcgZnJvbSAndmlld3MvaW50ZXJ2aWV3X2xpc3Rfdmlldyc7XG5pbXBvcnQgSW50ZXJ2aWV3VmlldyBmcm9tIFwidmlld3MvaW50ZXJ2aWV3X3ZpZXdcIjtcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlciB7XG5cdFx0XG5cdFx0Y29uc3RydWN0b3IoYXBwKSB7XG5cblx0XHRcdHN1cGVyKCk7XG5cblx0XHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdFx0XG5cdFx0XHRhcHAuYWRkUmVnaW9ucyh7XG5cdFx0XHRcdGNvbnRhaW5lclJlZ2lvbjogXCIjY29udGFpbmVyXCIsXG5cdFx0XHRcdG1vZGFsUmVnaW9uOiBcIiNtb2RhbC1jb250YWluZXJcIlxuXHRcdFx0fSk7XG5cdFx0XHRcbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dJbnRlcnZpZXdMaXN0KCkge1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3Lm1lbnVSZWdpb24uc2hvdyhuZXcgTWVudVZpZXcoeyBoaWdobGlnaHQ6ICcjbGluazEnIH0pKVxuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEludGVydmlld0xpc3RWaWV3KCkpO1xuXHRcdH1cblxuXHRcdGVkaXRJbnRlcnZpZXcoaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcubWVudVJlZ2lvbi5zaG93KG5ldyBNZW51Vmlldyh7IGhpZ2hsaWdodDogJyNsaW5rMScgfSkpXG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgSW50ZXJ2aWV3Vmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0fVxuXHRcdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXHQiXX0=