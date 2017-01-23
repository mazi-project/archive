define(['exports', 'jquery', 'backbone', 'marionette', 'controller'], function (exports, _jquery, _backbone, _marionette, _controller) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-15 00:15:39
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jquery2 = _interopRequireDefault(_jquery);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _controller2 = _interopRequireDefault(_controller);

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

	var App = function (_Backbone$Marionette$) {
		_inherits(App, _Backbone$Marionette$);

		function App() {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

			//add app initializer
			_this.addInitializer(function (options) {
				_backbone2.default.history.start();

				// support cross origin sharing
				_jquery2.default.support.cors = true;

				_marionette2.default.Behaviors.behaviorsLookup = function () {
					return window.Behaviors;
				};
			});

			//init router
			_this.Router = new _marionette2.default.AppRouter({
				controller: new _controller2.default(_this),
				appRoutes: {
					'interview/new': 'newInterview',
					'interview/:id': 'editInterview',
					'attachments': 'showAttachmentList',
					'attachment/add/:interviewId': 'addAttachment',
					'attachments/:interviewId': 'showAttachmentList',
					'attachment/:id': 'editAttachment',
					'*actions': 'showInterviewList'
				}
			});
			return _this;
		}

		return App;
	}(_backbone2.default.Marionette.Application);

	exports.default = App;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwiYWRkSW5pdGlhbGl6ZXIiLCJvcHRpb25zIiwiaGlzdG9yeSIsInN0YXJ0Iiwic3VwcG9ydCIsImNvcnMiLCJCZWhhdmlvcnMiLCJiZWhhdmlvcnNMb29rdXAiLCJ3aW5kb3ciLCJSb3V0ZXIiLCJBcHBSb3V0ZXIiLCJjb250cm9sbGVyIiwiYXBwUm91dGVzIiwiTWFyaW9uZXR0ZSIsIkFwcGxpY2F0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FZTUEsRzs7O0FBRUwsaUJBQWM7QUFBQTs7QUFBQTs7QUFHYjtBQUNBLFNBQUtDLGNBQUwsQ0FBcUIsVUFBU0MsT0FBVCxFQUFpQjtBQUNuQyx1QkFBU0MsT0FBVCxDQUFpQkMsS0FBakI7O0FBRUE7QUFDQSxxQkFBRUMsT0FBRixDQUFVQyxJQUFWLEdBQWUsSUFBZjs7QUFFQSx5QkFBV0MsU0FBWCxDQUFxQkMsZUFBckIsR0FBdUMsWUFBVztBQUM5QyxZQUFPQyxPQUFPRixTQUFkO0FBQ0gsS0FGRDtBQUlGLElBVkQ7O0FBWUE7QUFDQSxTQUFLRyxNQUFMLEdBQWMsSUFBSSxxQkFBV0MsU0FBZixDQUF5QjtBQUN0Q0MsZ0JBQVksK0JBRDBCO0FBRXRDQyxlQUFXO0FBQ1Ysc0JBQWtCLGNBRFI7QUFFVixzQkFBa0IsZUFGUjtBQUdWLG9CQUFnQixvQkFITjtBQUlWLG9DQUFnQyxlQUp0QjtBQUtWLGlDQUE2QixvQkFMbkI7QUFNVix1QkFBbUIsZ0JBTlQ7QUFPVixpQkFBWTtBQVBGO0FBRjJCLElBQXpCLENBQWQ7QUFqQmE7QUE2QmI7OztHQS9CZ0IsbUJBQVNDLFVBQVQsQ0FBb0JDLFc7O21CQWtDdkJmLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDAwOjE1OjM5XG4qL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnY29udHJvbGxlcic7XG5cbmNsYXNzIEFwcCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQXBwbGljYXRpb24ge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvL2FkZCBhcHAgaW5pdGlhbGl6ZXJcblx0XHR0aGlzLmFkZEluaXRpYWxpemVyKCBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRcdCAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpO1xuXHRcdFx0ICBcblx0XHRcdCAgLy8gc3VwcG9ydCBjcm9zcyBvcmlnaW4gc2hhcmluZ1xuXHRcdFx0ICAkLnN1cHBvcnQuY29ycz10cnVlO1xuXHRcdFx0ICBcblx0XHRcdCAgTWFyaW9uZXR0ZS5CZWhhdmlvcnMuYmVoYXZpb3JzTG9va3VwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgICByZXR1cm4gd2luZG93LkJlaGF2aW9ycztcblx0XHRcdCAgfVxuXHRcdFx0ICBcblx0XHR9KTtcblxuXHRcdC8vaW5pdCByb3V0ZXJcblx0XHR0aGlzLlJvdXRlciA9IG5ldyBNYXJpb25ldHRlLkFwcFJvdXRlcih7XG5cdFx0XHRjb250cm9sbGVyOiBuZXcgQ29udHJvbGxlcih0aGlzKSxcblx0XHRcdGFwcFJvdXRlczoge1xuXHRcdFx0XHQnaW50ZXJ2aWV3L25ldycgOiAnbmV3SW50ZXJ2aWV3Jyxcblx0XHRcdFx0J2ludGVydmlldy86aWQnIDogJ2VkaXRJbnRlcnZpZXcnLFxuXHRcdFx0XHQnYXR0YWNobWVudHMnIDogJ3Nob3dBdHRhY2htZW50TGlzdCcsXG5cdFx0XHRcdCdhdHRhY2htZW50L2FkZC86aW50ZXJ2aWV3SWQnIDogJ2FkZEF0dGFjaG1lbnQnLFxuXHRcdFx0XHQnYXR0YWNobWVudHMvOmludGVydmlld0lkJyA6ICdzaG93QXR0YWNobWVudExpc3QnLFxuXHRcdFx0XHQnYXR0YWNobWVudC86aWQnIDogJ2VkaXRBdHRhY2htZW50Jyxcblx0XHRcdFx0JyphY3Rpb25zJzogJ3Nob3dJbnRlcnZpZXdMaXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==