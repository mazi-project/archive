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

	var TagCollection = function (_Backbone$Collection) {
		_inherits(TagCollection, _Backbone$Collection);

		function TagCollection() {
			_classCallCheck(this, TagCollection);

			return _possibleConstructorReturn(this, (TagCollection.__proto__ || Object.getPrototypeOf(TagCollection)).apply(this, arguments));
		}

		_createClass(TagCollection, [{
			key: 'url',
			get: function get() {
				return _config2.default['web_service_url'] + "tags";
			}
		}]);

		return TagCollection;
	}(_backbone2.default.Collection);

	;

	exports.default = TagCollection;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGFnX2NvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiVGFnQ29sbGVjdGlvbiIsIkNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBVU1BLGE7Ozs7Ozs7Ozs7O3VCQUVLO0FBQUUsV0FBTyxpQkFBTyxpQkFBUCxJQUEwQixNQUFqQztBQUF5Qzs7OztHQUYxQixtQkFBU0MsVTs7QUFHcEM7O21CQUVjRCxhIiwiZmlsZSI6InRhZ19jb2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTA3IDE4OjUxOjU5XG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5jbGFzcyBUYWdDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvbiB7XG5cblx0Z2V0IHVybCgpIHsgcmV0dXJuIENvbmZpZ1snd2ViX3NlcnZpY2VfdXJsJ10rXCJ0YWdzXCIgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFnQ29sbGVjdGlvbiJdfQ==