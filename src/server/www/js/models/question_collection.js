define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-07 18:51:59
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

	var QuestionCollection = function (_Backbone$Collection) {
		_inherits(QuestionCollection, _Backbone$Collection);

		function QuestionCollection() {
			_classCallCheck(this, QuestionCollection);

			return _possibleConstructorReturn(this, (QuestionCollection.__proto__ || Object.getPrototypeOf(QuestionCollection)).apply(this, arguments));
		}

		_createClass(QuestionCollection, [{
			key: 'url',
			get: function get() {
				return _config2.default['web_service_url'] + "questions";
			}
		}]);

		return QuestionCollection;
	}(_backbone2.default.Collection);

	;

	exports.default = QuestionCollection;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcXVlc3Rpb25fY29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJRdWVzdGlvbkNvbGxlY3Rpb24iLCJDb2xsZWN0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVVNQSxrQjs7Ozs7Ozs7Ozs7dUJBRUs7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLFdBQWpDO0FBQThDOzs7O0dBRjFCLG1CQUFTQyxVOztBQUd6Qzs7bUJBRWNELGtCIiwiZmlsZSI6InF1ZXN0aW9uX2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDcgMTg6NTE6NTlcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIFF1ZXN0aW9uQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb24ge1xuXG5cdGdldCB1cmwoKSB7IHJldHVybiBDb25maWdbJ3dlYl9zZXJ2aWNlX3VybCddK1wicXVlc3Rpb25zXCIgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUXVlc3Rpb25Db2xsZWN0aW9uIl19