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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X21vZGVsLmpzIl0sIm5hbWVzIjpbIkludGVydmlld01vZGVsIiwiaW1hZ2UiLCJ0ZXh0IiwibmFtZSIsInJvbGUiLCJhdHRhY2htZW50cyIsImNyZWF0ZWRBdCIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVVNQSxjOzs7Ozs7Ozs7Ozt1QkFFUztBQUFFLFdBQU8saUJBQU8saUJBQVAsSUFBMEIsWUFBakM7QUFBK0M7Ozt1QkFFN0M7QUFBRSxXQUFPLEtBQVA7QUFBYzs7O3VCQUVuQjtBQUNkLFdBQU87QUFDSEMsWUFBTyxLQURKO0FBRUhDLFdBQU0sRUFGSDtBQUdIQyxXQUFNLEVBSEg7QUFJSEMsV0FBTSxFQUpIO0FBS0hDLGtCQUFhLEVBTFY7QUFNSEMsZ0JBQVc7QUFOUixLQUFQO0FBUUE7Ozs7R0FmMkIsbUJBQVNDLEs7O21CQWtCdkJQLGMiLCJmaWxlIjoiaW50ZXJ2aWV3X21vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTExIDE5OjAxOjIyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5jbGFzcyBJbnRlcnZpZXdNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblxuXHRnZXQgdXJsUm9vdCgpIHsgcmV0dXJuIENvbmZpZ1snd2ViX3NlcnZpY2VfdXJsJ10rXCJpbnRlcnZpZXdzXCIgfVxuXG5cdGdldCBpZEF0dHJpYnV0ZSgpIHsgcmV0dXJuICdfaWQnIH1cblxuXHRnZXQgZGVmYXVsdHMoKSB7IFxuXHRcdHJldHVybiB7XG5cdCAgICBcdGltYWdlOiBmYWxzZSxcblx0ICAgIFx0dGV4dDogJycsXG5cdCAgICBcdG5hbWU6ICcnLFxuXHQgICAgXHRyb2xlOiAnJyxcblx0ICAgIFx0YXR0YWNobWVudHM6IFtdLFxuXHQgICAgXHRjcmVhdGVkQXQ6IDBcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJ2aWV3TW9kZWwiXX0=