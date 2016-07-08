define(['exports', 'jquery', 'backbone', 'marionette', 'controller'], function (exports, _jquery, _backbone, _marionette, _controller) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-07 19:08:35
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

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

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
					'tag/:tag': 'showInterviewList',
					'interview/:id': 'showInterview',
					'*actions': 'showInterviewList'
				}
			});
			return _this;
		}

		return App;
	}(_backbone2.default.Marionette.Application);

	exports.default = App;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FjTSxHOzs7QUFFTCxpQkFBYztBQUFBOztBQUFBOzs7QUFJYixTQUFLLGNBQUwsQ0FBcUIsVUFBUyxPQUFULEVBQWlCO0FBQ25DLHVCQUFTLE9BQVQsQ0FBaUIsS0FBakI7OztBQUdBLHFCQUFFLE9BQUYsQ0FBVSxJQUFWLEdBQWUsSUFBZjs7QUFFQSx5QkFBVyxTQUFYLENBQXFCLGVBQXJCLEdBQXVDLFlBQVc7QUFDOUMsWUFBTyxPQUFPLFNBQWQ7QUFDSCxLQUZEO0FBSUYsSUFWRDs7O0FBYUEsU0FBSyxNQUFMLEdBQWMsSUFBSSxxQkFBVyxTQUFmLENBQXlCO0FBQ3RDLGdCQUFZLCtCQUQwQjtBQUV0QyxlQUFXO0FBQ1YsaUJBQWEsbUJBREg7QUFFVixzQkFBa0IsZUFGUjtBQUdWLGlCQUFZO0FBSEY7QUFGMkIsSUFBekIsQ0FBZDtBQWpCYTtBQXlCYjs7O0dBM0JnQixtQkFBUyxVQUFULENBQW9CLFc7O21CQThCdkIsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDcgMTk6MDg6MzVcbiovXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICdjb250cm9sbGVyJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5BcHBsaWNhdGlvbiB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdC8vYWRkIGFwcCBpbml0aWFsaXplclxuXHRcdHRoaXMuYWRkSW5pdGlhbGl6ZXIoIGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdFx0ICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCk7XG5cdFx0XHQgIFxuXHRcdFx0ICAvLyBzdXBwb3J0IGNyb3NzIG9yaWdpbiBzaGFyaW5nXG5cdFx0XHQgICQuc3VwcG9ydC5jb3JzPXRydWU7XG5cdFx0XHQgIFxuXHRcdFx0ICBNYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdCAgICAgIHJldHVybiB3aW5kb3cuQmVoYXZpb3JzO1xuXHRcdFx0ICB9XG5cdFx0XHQgIFxuXHRcdH0pO1xuXG5cdFx0Ly9pbml0IHJvdXRlclxuXHRcdHRoaXMuUm91dGVyID0gbmV3IE1hcmlvbmV0dGUuQXBwUm91dGVyKHtcblx0XHRcdGNvbnRyb2xsZXI6IG5ldyBDb250cm9sbGVyKHRoaXMpLFxuXHRcdFx0YXBwUm91dGVzOiB7XG5cdFx0XHRcdCd0YWcvOnRhZycgOiAnc2hvd0ludGVydmlld0xpc3QnLFxuXHRcdFx0XHQnaW50ZXJ2aWV3LzppZCcgOiAnc2hvd0ludGVydmlldycsXG5cdFx0XHRcdCcqYWN0aW9ucyc6ICdzaG93SW50ZXJ2aWV3TGlzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=