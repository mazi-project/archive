define(['exports', 'backbone', 'models/interview_model', 'config', 'utils'], function (exports, _backbone, _interview_model, _config, _utils) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-07 22:07:43
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _interview_model2 = _interopRequireDefault(_interview_model);

	var _config2 = _interopRequireDefault(_config);

	var _utils2 = _interopRequireDefault(_utils);

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

	var InterviewCollection = function (_Backbone$Collection) {
		_inherits(InterviewCollection, _Backbone$Collection);

		function InterviewCollection() {
			_classCallCheck(this, InterviewCollection);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InterviewCollection).call(this));

			_this.paginate = {
				totalRecords: false,
				page: 0,
				recordsPerPage: _config2.default.recordsPerPage
			};
			return _this;
		}

		_createClass(InterviewCollection, [{
			key: 'parse',
			value: function parse(response) {
				this.paginate.totalRecords = response.total_records;
				return response.docs;
			}
		}, {
			key: 'fetch',
			value: function fetch(options) {
				this.trigger('fetching');
				return _backbone2.default.Collection.prototype.fetch.call(this, options);
			}
		}, {
			key: 'getFirstPage',
			value: function getFirstPage() {
				var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


				var paginateOptions = {
					skip: 0,
					limit: this.paginate.recordsPerPage
				};

				this.fetch({ data: _utils2.default.encodeQueryParameters(_.extend(options, paginateOptions)) });
			}
		}, {
			key: 'getNextPage',
			value: function getNextPage(options) {

				if (this.paginate.recordsPerPage * this.paginate.page > this.paginate.totalRecords) return;

				this.paginate.page++;

				var paginateOptions = {
					skip: this.paginate.recordsPerPage * this.paginate.page,
					limit: this.paginate.recordsPerPage
				};

				this.fetch({ remove: false, data: _utils2.default.encodeQueryParameters(_.extend(options, paginateOptions)) });
			}
		}, {
			key: 'model',
			get: function get() {
				return _interview_model2.default;
			}
		}, {
			key: 'url',
			get: function get() {
				return _config2.default['web_service_url'] + "interviews";
			}
		}]);

		return InterviewCollection;
	}(_backbone2.default.Collection);

	;

	exports.default = InterviewCollection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X2NvbGxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FjTSxtQjs7O0FBRUwsaUNBQWM7QUFBQTs7QUFBQTs7QUFHYixTQUFLLFFBQUwsR0FBZ0I7QUFDZixrQkFBZSxLQURBO0FBRWYsVUFBTyxDQUZRO0FBR2Ysb0JBQWlCLGlCQUFPO0FBSFQsSUFBaEI7QUFIYTtBQVFiOzs7O3lCQU1LLFEsRUFBVTtBQUNmLFNBQUssUUFBTCxDQUFjLFlBQWQsR0FBNkIsU0FBUyxhQUF0QztBQUNNLFdBQU8sU0FBUyxJQUFoQjtBQUNOOzs7eUJBRUssTyxFQUFTO0FBQ2QsU0FBSyxPQUFMLENBQWEsVUFBYjtBQUNBLFdBQU8sbUJBQVMsVUFBVCxDQUFvQixTQUFwQixDQUE4QixLQUE5QixDQUFvQyxJQUFwQyxDQUF5QyxJQUF6QyxFQUE4QyxPQUE5QyxDQUFQO0FBQ0c7OztrQ0FFcUI7QUFBQSxRQUFaLE9BQVkseURBQUosRUFBSTs7O0FBRXhCLFFBQUksa0JBQWtCO0FBQ3JCLFdBQU0sQ0FEZTtBQUVyQixZQUFPLEtBQUssUUFBTCxDQUFjO0FBRkEsS0FBdEI7O0FBS0EsU0FBSyxLQUFMLENBQVcsRUFBRSxNQUFPLGdCQUFNLHFCQUFOLENBQTRCLEVBQUUsTUFBRixDQUFTLE9BQVQsRUFBaUIsZUFBakIsQ0FBNUIsQ0FBVCxFQUFYO0FBQ0E7OzsrQkFFVyxPLEVBQVM7O0FBRXBCLFFBQUksS0FBSyxRQUFMLENBQWMsY0FBZCxHQUErQixLQUFLLFFBQUwsQ0FBYyxJQUE3QyxHQUFvRCxLQUFLLFFBQUwsQ0FBYyxZQUF0RSxFQUNDOztBQUVELFNBQUssUUFBTCxDQUFjLElBQWQ7O0FBRUEsUUFBSSxrQkFBa0I7QUFDckIsV0FBTSxLQUFLLFFBQUwsQ0FBYyxjQUFkLEdBQStCLEtBQUssUUFBTCxDQUFjLElBRDlCO0FBRXJCLFlBQU8sS0FBSyxRQUFMLENBQWM7QUFGQSxLQUF0Qjs7QUFLQSxTQUFLLEtBQUwsQ0FBVyxFQUFFLFFBQVEsS0FBVixFQUFpQixNQUFPLGdCQUFNLHFCQUFOLENBQTRCLEVBQUUsTUFBRixDQUFTLE9BQVQsRUFBaUIsZUFBakIsQ0FBNUIsQ0FBeEIsRUFBWDtBQUNBOzs7dUJBckNXO0FBQUU7QUFBdUI7Ozt1QkFFM0I7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLFlBQWpDO0FBQStDOzs7O0dBZDFCLG1CQUFTLFU7O0FBbUQxQzs7bUJBRWMsbUIiLCJmaWxlIjoiaW50ZXJ2aWV3X2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDcgMjI6MDc6NDNcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgSW50ZXJ2aWV3TW9kZWwgZnJvbSAnbW9kZWxzL2ludGVydmlld19tb2RlbCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAndXRpbHMnO1xuXG5jbGFzcyBJbnRlcnZpZXdDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvbiB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMucGFnaW5hdGUgPSB7XG5cdFx0XHR0b3RhbFJlY29yZHMgOiBmYWxzZSxcblx0XHRcdHBhZ2UgOiAwLFxuXHRcdFx0cmVjb3Jkc1BlclBhZ2UgOiBDb25maWcucmVjb3Jkc1BlclBhZ2Vcblx0XHR9XG5cdH1cblxuXHRnZXQgbW9kZWwoKSB7IHJldHVybiBJbnRlcnZpZXdNb2RlbCB9XG5cblx0Z2V0IHVybCgpIHsgcmV0dXJuIENvbmZpZ1snd2ViX3NlcnZpY2VfdXJsJ10rXCJpbnRlcnZpZXdzXCIgfVxuXG5cdHBhcnNlKHJlc3BvbnNlKSB7XG5cdFx0dGhpcy5wYWdpbmF0ZS50b3RhbFJlY29yZHMgPSByZXNwb25zZS50b3RhbF9yZWNvcmRzO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZG9jcztcblx0fVxuXG5cdGZldGNoKG9wdGlvbnMpIHtcblx0XHR0aGlzLnRyaWdnZXIoJ2ZldGNoaW5nJyk7XG5cdFx0cmV0dXJuIEJhY2tib25lLkNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoLmNhbGwodGhpcyxvcHRpb25zKTsgICAgICBcbiAgICB9XG5cblx0Z2V0Rmlyc3RQYWdlKG9wdGlvbnM9e30pIHtcblxuXHRcdHZhciBwYWdpbmF0ZU9wdGlvbnMgPSB7XG5cdFx0XHRza2lwOiAwLFxuXHRcdFx0bGltaXQ6IHRoaXMucGFnaW5hdGUucmVjb3Jkc1BlclBhZ2Vcblx0XHR9XG5cblx0XHR0aGlzLmZldGNoKHsgZGF0YSA6IFV0aWxzLmVuY29kZVF1ZXJ5UGFyYW1ldGVycyhfLmV4dGVuZChvcHRpb25zLHBhZ2luYXRlT3B0aW9ucykpIH0pO1xuXHR9XG5cblx0Z2V0TmV4dFBhZ2Uob3B0aW9ucykge1xuXG5cdFx0aWYgKHRoaXMucGFnaW5hdGUucmVjb3Jkc1BlclBhZ2UgKiB0aGlzLnBhZ2luYXRlLnBhZ2UgPiB0aGlzLnBhZ2luYXRlLnRvdGFsUmVjb3Jkcylcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMucGFnaW5hdGUucGFnZSArKztcblxuXHRcdHZhciBwYWdpbmF0ZU9wdGlvbnMgPSB7XG5cdFx0XHRza2lwOiB0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlICogdGhpcy5wYWdpbmF0ZS5wYWdlLFxuXHRcdFx0bGltaXQ6IHRoaXMucGFnaW5hdGUucmVjb3Jkc1BlclBhZ2Vcblx0XHR9XG5cblx0XHR0aGlzLmZldGNoKHsgcmVtb3ZlOiBmYWxzZSwgZGF0YSA6IFV0aWxzLmVuY29kZVF1ZXJ5UGFyYW1ldGVycyhfLmV4dGVuZChvcHRpb25zLHBhZ2luYXRlT3B0aW9ucykpIH0pO1xuXHR9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld0NvbGxlY3Rpb24iXX0=