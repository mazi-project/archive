define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-07 22:55:54
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

			return _possibleConstructorReturn(this, Object.getPrototypeOf(InterviewModel).apply(this, arguments));
		}

		_createClass(InterviewModel, [{
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
					tags: [],
					author: '',
					role: ''
				};
			}
		}]);

		return InterviewModel;
	}(_backbone2.default.Model);

	exports.default = InterviewModel;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X21vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FZTSxjOzs7Ozs7Ozs7Ozt1QkFFUztBQUFFLFdBQU8saUJBQU8saUJBQVAsSUFBMEIsWUFBakM7QUFBK0M7Ozt1QkFFN0M7QUFBRSxXQUFPLEtBQVA7QUFBYzs7O3VCQUVuQjtBQUNkLFdBQU87QUFDSCxZQUFPLEtBREo7QUFFSCxXQUFNLEVBRkg7QUFHSCxXQUFNLEVBSEg7QUFJSCxhQUFRLEVBSkw7QUFLSCxXQUFNO0FBTEgsS0FBUDtBQU9BOzs7O0dBZDJCLG1CQUFTLEs7O21CQWlCdkIsYyIsImZpbGUiOiJpbnRlcnZpZXdfbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDcgMjI6NTU6NTRcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIEludGVydmlld01vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG5cdGdldCB1cmxSb290KCkgeyByZXR1cm4gQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcImludGVydmlld3NcIiB9XG5cblx0Z2V0IGlkQXR0cmlidXRlKCkgeyByZXR1cm4gJ19pZCcgfVxuXG5cdGdldCBkZWZhdWx0cygpIHsgXG5cdFx0cmV0dXJuIHtcblx0ICAgIFx0aW1hZ2U6IGZhbHNlLFxuXHQgICAgXHR0ZXh0OiAnJyxcblx0ICAgIFx0dGFnczogW10sXG5cdCAgICBcdGF1dGhvcjogJycsXG5cdCAgICBcdHJvbGU6ICcnXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld01vZGVsIl19