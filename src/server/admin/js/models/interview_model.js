define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-11 19:01:22
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config2 = _interopRequireDefault(_config);

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

	var InterviewModel = function (_Backbone$Model) {
		_inherits(InterviewModel, _Backbone$Model);

		function InterviewModel() {
			_classCallCheck(this, InterviewModel);

			return _possibleConstructorReturn(this, (InterviewModel.__proto__ || Object.getPrototypeOf(InterviewModel)).apply(this, arguments));
		}

		_createClass(InterviewModel, [{
			key: 'parse',
			value: function parse(response) {
				var data = response.interview;
				if (_.isEmpty(data)) return data;
				if (_.has(response, 'attachments')) data.attachments = response.attachments;
				return data;
			}
		}, {
			key: 'save',
			value: function save(attrs, options) {
				attrs = _.omit(attrs, 'attachments');
				return _backbone2.default.Model.prototype.save.call(this, attrs, options);
			}
		}, {
			key: 'urlRoot',
			get: function get() {
				return _config2.default['web_service_url'] + "interviews";
			}
		}, {
			key: 'idAttribute',
			get: function get() {
				return '_id';
			}
		}, {
			key: 'defaults',
			get: function get() {
				return {
					image: false,
					text: '',
					name: '',
					role: '',
					attachments: [],
					createdAt: 0
				};
			}
		}]);

		return InterviewModel;
	}(_backbone2.default.Model);

	exports.default = InterviewModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X21vZGVsLmpzIl0sIm5hbWVzIjpbIkludGVydmlld01vZGVsIiwicmVzcG9uc2UiLCJkYXRhIiwiaW50ZXJ2aWV3IiwiXyIsImlzRW1wdHkiLCJoYXMiLCJhdHRhY2htZW50cyIsImF0dHJzIiwib3B0aW9ucyIsIm9taXQiLCJNb2RlbCIsInByb3RvdHlwZSIsInNhdmUiLCJjYWxsIiwiaW1hZ2UiLCJ0ZXh0IiwibmFtZSIsInJvbGUiLCJjcmVhdGVkQXQiXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBVU1BLGM7Ozs7Ozs7Ozs7O3lCQWlCQ0MsUSxFQUFVO0FBQ2YsUUFBSUMsT0FBT0QsU0FBU0UsU0FBcEI7QUFDQSxRQUFJQyxFQUFFQyxPQUFGLENBQVVILElBQVYsQ0FBSixFQUNDLE9BQU9BLElBQVA7QUFDRCxRQUFJRSxFQUFFRSxHQUFGLENBQU1MLFFBQU4sRUFBZSxhQUFmLENBQUosRUFDQ0MsS0FBS0ssV0FBTCxHQUFtQk4sU0FBU00sV0FBNUI7QUFDSyxXQUFPTCxJQUFQO0FBQ047Ozt3QkFFT00sSyxFQUFPQyxPLEVBQVM7QUFDakJELFlBQVFKLEVBQUVNLElBQUYsQ0FBT0YsS0FBUCxFQUFhLGFBQWIsQ0FBUjtBQUNBLFdBQU8sbUJBQVNHLEtBQVQsQ0FBZUMsU0FBZixDQUF5QkMsSUFBekIsQ0FBOEJDLElBQTlCLENBQW1DLElBQW5DLEVBQXlDTixLQUF6QyxFQUFnREMsT0FBaEQsQ0FBUDtBQUNIOzs7dUJBM0JVO0FBQUUsV0FBTyxpQkFBTyxpQkFBUCxJQUEwQixZQUFqQztBQUErQzs7O3VCQUU3QztBQUFFLFdBQU8sS0FBUDtBQUFjOzs7dUJBRW5CO0FBQ2QsV0FBTztBQUNITSxZQUFPLEtBREo7QUFFSEMsV0FBTSxFQUZIO0FBR0hDLFdBQU0sRUFISDtBQUlIQyxXQUFNLEVBSkg7QUFLSFgsa0JBQWEsRUFMVjtBQU1IWSxnQkFBVztBQU5SLEtBQVA7QUFRQTs7OztHQWYyQixtQkFBU1IsSzs7bUJBZ0N2QlgsYyIsImZpbGUiOiJpbnRlcnZpZXdfbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTEgMTk6MDE6MjJcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIEludGVydmlld01vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG5cdGdldCB1cmxSb290KCkgeyByZXR1cm4gQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcImludGVydmlld3NcIiB9XG5cblx0Z2V0IGlkQXR0cmlidXRlKCkgeyByZXR1cm4gJ19pZCcgfVxuXG5cdGdldCBkZWZhdWx0cygpIHsgXG5cdFx0cmV0dXJuIHtcblx0ICAgIFx0aW1hZ2U6IGZhbHNlLFxuXHQgICAgXHR0ZXh0OiAnJyxcblx0ICAgIFx0bmFtZTogJycsXG5cdCAgICBcdHJvbGU6ICcnLFxuXHQgICAgXHRhdHRhY2htZW50czogW10sXG5cdCAgICBcdGNyZWF0ZWRBdDogMFxuXHRcdH1cblx0fVxuXG5cdHBhcnNlKHJlc3BvbnNlKSB7XG5cdFx0dmFyIGRhdGEgPSByZXNwb25zZS5pbnRlcnZpZXc7XG5cdFx0aWYgKF8uaXNFbXB0eShkYXRhKSlcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdGlmIChfLmhhcyhyZXNwb25zZSwnYXR0YWNobWVudHMnKSlcblx0XHRcdGRhdGEuYXR0YWNobWVudHMgPSByZXNwb25zZS5hdHRhY2htZW50cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG5cdH1cblxuICAgIHNhdmUoYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgICAgYXR0cnMgPSBfLm9taXQoYXR0cnMsJ2F0dGFjaG1lbnRzJyk7XG4gICAgICAgIHJldHVybiBCYWNrYm9uZS5Nb2RlbC5wcm90b3R5cGUuc2F2ZS5jYWxsKHRoaXMsIGF0dHJzLCBvcHRpb25zKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld01vZGVsIl19