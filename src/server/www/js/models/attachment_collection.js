define(['exports', 'backbone', 'config', 'models/attachment_model'], function (exports, _backbone, _config, _attachment_model) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-15 00:17:03
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config2 = _interopRequireDefault(_config);

	var _attachment_model2 = _interopRequireDefault(_attachment_model);

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

	var AttachmentCollection = function (_Backbone$Collection) {
		_inherits(AttachmentCollection, _Backbone$Collection);

		function AttachmentCollection() {
			_classCallCheck(this, AttachmentCollection);

			return _possibleConstructorReturn(this, (AttachmentCollection.__proto__ || Object.getPrototypeOf(AttachmentCollection)).apply(this, arguments));
		}

		_createClass(AttachmentCollection, [{
			key: 'url',
			get: function get() {
				return _config2.default['web_service_url'] + "attachments";
			}
		}, {
			key: 'model',
			get: function get() {
				return _attachment_model2.default;
			}
		}]);

		return AttachmentCollection;
	}(_backbone2.default.Collection);

	;

	exports.default = AttachmentCollection;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYXR0YWNobWVudF9jb2xsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkF0dGFjaG1lbnRDb2xsZWN0aW9uIiwiQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVdNQSxvQjs7Ozs7Ozs7Ozs7dUJBRUs7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLGFBQWpDO0FBQWdEOzs7dUJBRWhEO0FBQUU7QUFBd0I7Ozs7R0FKSixtQkFBU0MsVTs7QUFLM0M7O21CQUVjRCxvQiIsImZpbGUiOiJhdHRhY2htZW50X2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MTc6MDNcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQXR0YWNobWVudE1vZGVsIGZyb20gJ21vZGVscy9hdHRhY2htZW50X21vZGVsJztcblxuY2xhc3MgQXR0YWNobWVudENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uIHtcblxuXHRnZXQgdXJsKCkgeyByZXR1cm4gQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcImF0dGFjaG1lbnRzXCIgfVxuXG5cdGdldCBtb2RlbCgpIHsgcmV0dXJuIEF0dGFjaG1lbnRNb2RlbCB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50Q29sbGVjdGlvbiJdfQ==