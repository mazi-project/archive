define(['exports', 'marionette', 'underscore', 'config', 'text!templates/attachment_item_tmpl.html'], function (exports, _marionette, _underscore, _config, _attachment_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 00:35:19
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _attachment_item_tmpl2 = _interopRequireDefault(_attachment_item_tmpl);

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

    var AttachmentItemView = function (_Marionette$ItemView) {
        _inherits(AttachmentItemView, _Marionette$ItemView);

        function AttachmentItemView() {
            _classCallCheck(this, AttachmentItemView);

            return _possibleConstructorReturn(this, (AttachmentItemView.__proto__ || Object.getPrototypeOf(AttachmentItemView)).apply(this, arguments));
        }

        _createClass(AttachmentItemView, [{
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'className',
            get: function get() {
                return 'attachment';
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_attachment_item_tmpl2.default);
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                var _this2 = this;

                return {
                    getfileDir: function getfileDir() {
                        var interview = _this2.model.get('interview');
                        if (_underscore2.default.has(interview, '_id')) return _config2.default.files_url + interview._id + '/';else return _config2.default.files_url + interview + '/';
                    },
                    getFileType: function getFileType() {
                        if (_this2.model.get("file")) {
                            var extension = _this2.model.get("file").originalFilename.split('.').pop();
                            if (_underscore2.default.contains(['wav', 'mp3'], extension)) return 'audio';else return 'other';
                        } else {
                            return "none";
                        }
                    },
                    getInterviewName: function getInterviewName() {
                        var interview = _this2.model.get('interview');
                        if (_underscore2.default.has(interview, 'name')) return interview.name;else if (_underscore2.default.has(_this2.options, 'interviewName')) return _this2.options.interviewName;else return "";
                    }
                };
            }
        }]);

        return AttachmentItemView;
    }(_marionette2.default.ItemView);

    exports.default = AttachmentItemView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6WyJBdHRhY2htZW50SXRlbVZpZXciLCJvcHRpb25zIiwidGVtcGxhdGUiLCJnZXRmaWxlRGlyIiwiaW50ZXJ2aWV3IiwibW9kZWwiLCJnZXQiLCJoYXMiLCJmaWxlc191cmwiLCJfaWQiLCJnZXRGaWxlVHlwZSIsImV4dGVuc2lvbiIsIm9yaWdpbmFsRmlsZW5hbWUiLCJzcGxpdCIsInBvcCIsImNvbnRhaW5zIiwiZ2V0SW50ZXJ2aWV3TmFtZSIsIm5hbWUiLCJpbnRlcnZpZXdOYW1lIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWFNQSxrQjs7Ozs7Ozs7Ozs7dUNBMENTQyxPLEVBQVMsQ0FFbkI7OztnQ0F4Q2U7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7Z0NBRXhCO0FBQ1gsdUJBQU8scUJBQUVDLFFBQUYsZ0NBQVA7QUFDSDs7O2dDQUVxQjtBQUFBOztBQUNsQix1QkFBTztBQUNIQyxnQ0FBYSxzQkFBTTtBQUNmLDRCQUFJQyxZQUFZLE9BQUtDLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLFdBQWYsQ0FBaEI7QUFDQSw0QkFBSSxxQkFBRUMsR0FBRixDQUFNSCxTQUFOLEVBQWdCLEtBQWhCLENBQUosRUFDSSxPQUFPLGlCQUFPSSxTQUFQLEdBQW1CSixVQUFVSyxHQUE3QixHQUFtQyxHQUExQyxDQURKLEtBR0ksT0FBTyxpQkFBT0QsU0FBUCxHQUFtQkosU0FBbkIsR0FBK0IsR0FBdEM7QUFDUCxxQkFQRTtBQVFITSxpQ0FBYyx1QkFBTTtBQUNoQiw0QkFBSSxPQUFLTCxLQUFMLENBQVdDLEdBQVgsQ0FBZSxNQUFmLENBQUosRUFBNEI7QUFDeEIsZ0NBQUlLLFlBQVksT0FBS04sS0FBTCxDQUFXQyxHQUFYLENBQWUsTUFBZixFQUF1Qk0sZ0JBQXZCLENBQXdDQyxLQUF4QyxDQUE4QyxHQUE5QyxFQUFtREMsR0FBbkQsRUFBaEI7QUFDQSxnQ0FBSSxxQkFBRUMsUUFBRixDQUFXLENBQUMsS0FBRCxFQUFPLEtBQVAsQ0FBWCxFQUF5QkosU0FBekIsQ0FBSixFQUNJLE9BQU8sT0FBUCxDQURKLEtBR0ksT0FBTyxPQUFQO0FBQ1AseUJBTkQsTUFNTztBQUNILG1DQUFPLE1BQVA7QUFDSDtBQUNKLHFCQWxCRTtBQW1CSEssc0NBQW1CLDRCQUFNO0FBQ3JCLDRCQUFJWixZQUFZLE9BQUtDLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLFdBQWYsQ0FBaEI7QUFDQSw0QkFBSSxxQkFBRUMsR0FBRixDQUFNSCxTQUFOLEVBQWdCLE1BQWhCLENBQUosRUFDSSxPQUFPQSxVQUFVYSxJQUFqQixDQURKLEtBRUssSUFBSSxxQkFBRVYsR0FBRixDQUFNLE9BQUtOLE9BQVgsRUFBbUIsZUFBbkIsQ0FBSixFQUNELE9BQU8sT0FBS0EsT0FBTCxDQUFhaUIsYUFBcEIsQ0FEQyxLQUdELE9BQU8sRUFBUDtBQUNQO0FBM0JFLGlCQUFQO0FBNkJIOzs7O01BeEM0QixxQkFBV0MsUTs7c0JBK0M3Qm5CLGtCIiwiZmlsZSI6ImF0dGFjaG1lbnRfaXRlbV92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDAwOjM1OjE5XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvYXR0YWNobWVudF9pdGVtX3RtcGwuaHRtbCc7XG5cbmNsYXNzIEF0dGFjaG1lbnRJdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnYXR0YWNobWVudCcgfVxuXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0ZmlsZURpciA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJ2aWV3ID0gdGhpcy5tb2RlbC5nZXQoJ2ludGVydmlldycpO1xuICAgICAgICAgICAgICAgIGlmIChfLmhhcyhpbnRlcnZpZXcsJ19pZCcpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29uZmlnLmZpbGVzX3VybCArIGludGVydmlldy5faWQgKyAnLyc7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29uZmlnLmZpbGVzX3VybCArIGludGVydmlldyArICcvJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRGaWxlVHlwZSA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXQoXCJmaWxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSB0aGlzLm1vZGVsLmdldChcImZpbGVcIikub3JpZ2luYWxGaWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5jb250YWlucyhbJ3dhdicsJ21wMyddLGV4dGVuc2lvbikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F1ZGlvJ1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ290aGVyJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJbnRlcnZpZXdOYW1lIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnZpZXcgPSB0aGlzLm1vZGVsLmdldCgnaW50ZXJ2aWV3Jyk7XG4gICAgICAgICAgICAgICAgaWYgKF8uaGFzKGludGVydmlldywnbmFtZScpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJ2aWV3Lm5hbWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXy5oYXModGhpcy5vcHRpb25zLCdpbnRlcnZpZXdOYW1lJykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW50ZXJ2aWV3TmFtZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRJdGVtVmlldyJdfQ==