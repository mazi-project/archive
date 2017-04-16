define(['exports', 'backbone', 'underscore', 'models/interview_model', 'config', 'utils'], function (exports, _backbone, _underscore, _interview_model, _config, _utils) {
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

	var _underscore2 = _interopRequireDefault(_underscore);

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

			var _this = _possibleConstructorReturn(this, (InterviewCollection.__proto__ || Object.getPrototypeOf(InterviewCollection)).call(this));

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
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


				var paginateOptions = {
					skip: 0,
					limit: this.paginate.recordsPerPage
				};

				this.fetch({ data: _utils2.default.encodeQueryParameters(_underscore2.default.extend(options, paginateOptions)) });
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

				this.fetch({ remove: false, data: _utils2.default.encodeQueryParameters(_underscore2.default.extend(options, paginateOptions)) });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW50ZXJ2aWV3X2NvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiSW50ZXJ2aWV3Q29sbGVjdGlvbiIsInBhZ2luYXRlIiwidG90YWxSZWNvcmRzIiwicGFnZSIsInJlY29yZHNQZXJQYWdlIiwicmVzcG9uc2UiLCJ0b3RhbF9yZWNvcmRzIiwiZG9jcyIsIm9wdGlvbnMiLCJ0cmlnZ2VyIiwiQ29sbGVjdGlvbiIsInByb3RvdHlwZSIsImZldGNoIiwiY2FsbCIsInBhZ2luYXRlT3B0aW9ucyIsInNraXAiLCJsaW1pdCIsImRhdGEiLCJlbmNvZGVRdWVyeVBhcmFtZXRlcnMiLCJleHRlbmQiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBYU1BLG1COzs7QUFFTCxpQ0FBYztBQUFBOztBQUFBOztBQUdiLFNBQUtDLFFBQUwsR0FBZ0I7QUFDZkMsa0JBQWUsS0FEQTtBQUVmQyxVQUFPLENBRlE7QUFHZkMsb0JBQWlCLGlCQUFPQTtBQUhULElBQWhCO0FBSGE7QUFRYjs7Ozt5QkFNS0MsUSxFQUFVO0FBQ2YsU0FBS0osUUFBTCxDQUFjQyxZQUFkLEdBQTZCRyxTQUFTQyxhQUF0QztBQUNNLFdBQU9ELFNBQVNFLElBQWhCO0FBQ047Ozt5QkFFS0MsTyxFQUFTO0FBQ2QsU0FBS0MsT0FBTCxDQUFhLFVBQWI7QUFDQSxXQUFPLG1CQUFTQyxVQUFULENBQW9CQyxTQUFwQixDQUE4QkMsS0FBOUIsQ0FBb0NDLElBQXBDLENBQXlDLElBQXpDLEVBQThDTCxPQUE5QyxDQUFQO0FBQ0c7OztrQ0FFcUI7QUFBQSxRQUFaQSxPQUFZLHVFQUFKLEVBQUk7OztBQUV4QixRQUFJTSxrQkFBa0I7QUFDckJDLFdBQU0sQ0FEZTtBQUVyQkMsWUFBTyxLQUFLZixRQUFMLENBQWNHO0FBRkEsS0FBdEI7O0FBS0EsU0FBS1EsS0FBTCxDQUFXLEVBQUVLLE1BQU8sZ0JBQU1DLHFCQUFOLENBQTRCLHFCQUFFQyxNQUFGLENBQVNYLE9BQVQsRUFBaUJNLGVBQWpCLENBQTVCLENBQVQsRUFBWDtBQUNBOzs7K0JBRVdOLE8sRUFBUzs7QUFFcEIsUUFBSSxLQUFLUCxRQUFMLENBQWNHLGNBQWQsR0FBK0IsS0FBS0gsUUFBTCxDQUFjRSxJQUE3QyxHQUFvRCxLQUFLRixRQUFMLENBQWNDLFlBQXRFLEVBQ0M7O0FBRUQsU0FBS0QsUUFBTCxDQUFjRSxJQUFkOztBQUVBLFFBQUlXLGtCQUFrQjtBQUNyQkMsV0FBTSxLQUFLZCxRQUFMLENBQWNHLGNBQWQsR0FBK0IsS0FBS0gsUUFBTCxDQUFjRSxJQUQ5QjtBQUVyQmEsWUFBTyxLQUFLZixRQUFMLENBQWNHO0FBRkEsS0FBdEI7O0FBS0EsU0FBS1EsS0FBTCxDQUFXLEVBQUVRLFFBQVEsS0FBVixFQUFpQkgsTUFBTyxnQkFBTUMscUJBQU4sQ0FBNEIscUJBQUVDLE1BQUYsQ0FBU1gsT0FBVCxFQUFpQk0sZUFBakIsQ0FBNUIsQ0FBeEIsRUFBWDtBQUNBOzs7dUJBckNXO0FBQUU7QUFBdUI7Ozt1QkFFM0I7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLFlBQWpDO0FBQStDOzs7O0dBZDFCLG1CQUFTSixVOztBQW1EMUM7O21CQUVjVixtQiIsImZpbGUiOiJpbnRlcnZpZXdfY29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wNyAyMjowNzo0M1xuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IEludGVydmlld01vZGVsIGZyb20gJ21vZGVscy9pbnRlcnZpZXdfbW9kZWwnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IFV0aWxzIGZyb20gJ3V0aWxzJztcblxuY2xhc3MgSW50ZXJ2aWV3Q29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb24ge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnBhZ2luYXRlID0ge1xuXHRcdFx0dG90YWxSZWNvcmRzIDogZmFsc2UsXG5cdFx0XHRwYWdlIDogMCxcblx0XHRcdHJlY29yZHNQZXJQYWdlIDogQ29uZmlnLnJlY29yZHNQZXJQYWdlXG5cdFx0fVxuXHR9XG5cblx0Z2V0IG1vZGVsKCkgeyByZXR1cm4gSW50ZXJ2aWV3TW9kZWwgfVxuXG5cdGdldCB1cmwoKSB7IHJldHVybiBDb25maWdbJ3dlYl9zZXJ2aWNlX3VybCddK1wiaW50ZXJ2aWV3c1wiIH1cblxuXHRwYXJzZShyZXNwb25zZSkge1xuXHRcdHRoaXMucGFnaW5hdGUudG90YWxSZWNvcmRzID0gcmVzcG9uc2UudG90YWxfcmVjb3JkcztcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRvY3M7XG5cdH1cblxuXHRmZXRjaChvcHRpb25zKSB7XG5cdFx0dGhpcy50cmlnZ2VyKCdmZXRjaGluZycpO1xuXHRcdHJldHVybiBCYWNrYm9uZS5Db2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaC5jYWxsKHRoaXMsb3B0aW9ucyk7ICAgICAgXG4gICAgfVxuXG5cdGdldEZpcnN0UGFnZShvcHRpb25zPXt9KSB7XG5cblx0XHR2YXIgcGFnaW5hdGVPcHRpb25zID0ge1xuXHRcdFx0c2tpcDogMCxcblx0XHRcdGxpbWl0OiB0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlXG5cdFx0fVxuXG5cdFx0dGhpcy5mZXRjaCh7IGRhdGEgOiBVdGlscy5lbmNvZGVRdWVyeVBhcmFtZXRlcnMoXy5leHRlbmQob3B0aW9ucyxwYWdpbmF0ZU9wdGlvbnMpKSB9KTtcblx0fVxuXG5cdGdldE5leHRQYWdlKG9wdGlvbnMpIHtcblxuXHRcdGlmICh0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlICogdGhpcy5wYWdpbmF0ZS5wYWdlID4gdGhpcy5wYWdpbmF0ZS50b3RhbFJlY29yZHMpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLnBhZ2luYXRlLnBhZ2UgKys7XG5cblx0XHR2YXIgcGFnaW5hdGVPcHRpb25zID0ge1xuXHRcdFx0c2tpcDogdGhpcy5wYWdpbmF0ZS5yZWNvcmRzUGVyUGFnZSAqIHRoaXMucGFnaW5hdGUucGFnZSxcblx0XHRcdGxpbWl0OiB0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlXG5cdFx0fVxuXG5cdFx0dGhpcy5mZXRjaCh7IHJlbW92ZTogZmFsc2UsIGRhdGEgOiBVdGlscy5lbmNvZGVRdWVyeVBhcmFtZXRlcnMoXy5leHRlbmQob3B0aW9ucyxwYWdpbmF0ZU9wdGlvbnMpKSB9KTtcblx0fVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdDb2xsZWN0aW9uIl19