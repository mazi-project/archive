define(['exports', 'backbone', 'marionette', 'underscore', 'config', 'models/attachment_model', 'utils', 'text!templates/attachment_tmpl.html'], function (exports, _backbone, _marionette, _underscore, _config, _attachment_model, _utils, _attachment_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 14:44:32
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _attachment_model2 = _interopRequireDefault(_attachment_model);

    var _utils2 = _interopRequireDefault(_utils);

    var _attachment_tmpl2 = _interopRequireDefault(_attachment_tmpl);

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

    var AttachmentView = function (_Marionette$ItemView) {
        _inherits(AttachmentView, _Marionette$ItemView);

        function AttachmentView() {
            _classCallCheck(this, AttachmentView);

            return _possibleConstructorReturn(this, (AttachmentView.__proto__ || Object.getPrototypeOf(AttachmentView)).apply(this, arguments));
        }

        _createClass(AttachmentView, [{
            key: 'events',
            value: function events() {
                return {
                    'click #saveButton': 'onSaveButtonClicked',
                    'click #deleteButton': 'onDeleteButtonClicked',
                    'change #input-upload-file': 'onFileInputChanged'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                if (_underscore2.default.has(options, 'interview') && _underscore2.default.has(options, 'new')) {
                    this.model = new _attachment_model2.default({ interview: options.interview });
                    this.options.id = false;
                } else {
                    this.model = new _attachment_model2.default({ _id: options.id });
                    this.model.fetch();
                }

                //listen to model events
                this.listenTo(this.model, 'change', this.render);
            }
        }, {
            key: 'onSaveButtonClicked',
            value: function onSaveButtonClicked() {
                var _this2 = this;

                this.model.set({
                    tags: this.$("#input-tags").val().split(" "),
                    text: this.$("#input-text").val()
                });

                this.model.save(null, {
                    success: function success() {
                        if (_underscore2.default.has(_this2.options, 'interview')) window.location.href = "#/interview/" + _this2.options.interview;
                    }
                });
            }
        }, {
            key: 'onDeleteButtonClicked',
            value: function onDeleteButtonClicked() {
                if (confirm("Are you sure you want to delete the interview?")) {
                    this.model.destroy();
                    window.location.href = "#";
                }
            }
        }, {
            key: 'onFileInputChanged',
            value: function onFileInputChanged() {

                var uploadUrl = _config2.default.web_service_url + 'upload/attachment/' + this.model.id;

                _utils2.default.uploadFile(this.$('#input-upload-file'), uploadUrl, function (error) {
                    if (error) alert("ERROR: " + error);else alert("File was successfully uploaded");
                });
            }
        }, {
            key: 'submitFile',
            value: function submitFile() {

                Utils.uploadFile();
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_attachment_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'singleview';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    fileDir: _config2.default.files_url
                };
            }
        }]);

        return AttachmentView;
    }(_marionette2.default.ItemView);

    exports.default = AttachmentView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X3ZpZXcuanMiXSwibmFtZXMiOlsiQXR0YWNobWVudFZpZXciLCJvcHRpb25zIiwiaGFzIiwibW9kZWwiLCJpbnRlcnZpZXciLCJpZCIsIl9pZCIsImZldGNoIiwibGlzdGVuVG8iLCJyZW5kZXIiLCJzZXQiLCJ0YWdzIiwiJCIsInZhbCIsInNwbGl0IiwidGV4dCIsInNhdmUiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiY29uZmlybSIsImRlc3Ryb3kiLCJ1cGxvYWRVcmwiLCJ3ZWJfc2VydmljZV91cmwiLCJ1cGxvYWRGaWxlIiwiZXJyb3IiLCJhbGVydCIsIlV0aWxzIiwidGVtcGxhdGUiLCJmaWxlRGlyIiwiZmlsZXNfdXJsIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsYzs7Ozs7Ozs7Ozs7cUNBYU87QUFDUCx1QkFBTztBQUNMLHlDQUFzQixxQkFEakI7QUFFTCwyQ0FBd0IsdUJBRm5CO0FBR0wsaURBQThCO0FBSHpCLGlCQUFQO0FBS0Q7Ozt1Q0FHVUMsTyxFQUFTO0FBQ2hCLG9CQUFJLHFCQUFFQyxHQUFGLENBQU1ELE9BQU4sRUFBZSxXQUFmLEtBQStCLHFCQUFFQyxHQUFGLENBQU1ELE9BQU4sRUFBZSxLQUFmLENBQW5DLEVBQTBEO0FBQ3RELHlCQUFLRSxLQUFMLEdBQWEsK0JBQW9CLEVBQUVDLFdBQVlILFFBQVFHLFNBQXRCLEVBQXBCLENBQWI7QUFDQSx5QkFBS0gsT0FBTCxDQUFhSSxFQUFiLEdBQWtCLEtBQWxCO0FBQ0gsaUJBSEQsTUFHUTtBQUNKLHlCQUFLRixLQUFMLEdBQWEsK0JBQW9CLEVBQUVHLEtBQUtMLFFBQVFJLEVBQWYsRUFBcEIsQ0FBYjtBQUNBLHlCQUFLRixLQUFMLENBQVdJLEtBQVg7QUFDSDs7QUFFRDtBQUNBLHFCQUFLQyxRQUFMLENBQWMsS0FBS0wsS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBS00sTUFBdkM7QUFDSDs7O2tEQUVxQjtBQUFBOztBQUNsQixxQkFBS04sS0FBTCxDQUFXTyxHQUFYLENBQWU7QUFDWEMsMEJBQU8sS0FBS0MsQ0FBTCxDQUFPLGFBQVAsRUFBc0JDLEdBQXRCLEdBQTRCQyxLQUE1QixDQUFrQyxHQUFsQyxDQURJO0FBRVhDLDBCQUFPLEtBQUtILENBQUwsQ0FBTyxhQUFQLEVBQXNCQyxHQUF0QjtBQUZJLGlCQUFmOztBQUtBLHFCQUFLVixLQUFMLENBQVdhLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDbEJDLDZCQUFTLG1CQUFNO0FBQ1gsNEJBQUkscUJBQUVmLEdBQUYsQ0FBTSxPQUFLRCxPQUFYLEVBQW9CLFdBQXBCLENBQUosRUFDSWlCLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXFCLGlCQUFpQixPQUFLbkIsT0FBTCxDQUFhRyxTQUFuRDtBQUNQO0FBSmlCLGlCQUF0QjtBQVFIOzs7b0RBRXVCO0FBQ3BCLG9CQUFJaUIsUUFBUSxnREFBUixDQUFKLEVBQStEO0FBQzNELHlCQUFLbEIsS0FBTCxDQUFXbUIsT0FBWDtBQUNBSiwyQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBcUIsR0FBckI7QUFDSDtBQUNKOzs7aURBRW9COztBQUVqQixvQkFBSUcsWUFBWSxpQkFBT0MsZUFBUCxHQUF5QixvQkFBekIsR0FBZ0QsS0FBS3JCLEtBQUwsQ0FBV0UsRUFBM0U7O0FBRUEsZ0NBQU1vQixVQUFOLENBQWlCLEtBQUtiLENBQUwsQ0FBTyxvQkFBUCxDQUFqQixFQUErQ1csU0FBL0MsRUFBMEQsVUFBQ0csS0FBRCxFQUFXO0FBQ2pFLHdCQUFJQSxLQUFKLEVBQ0lDLE1BQU0sWUFBWUQsS0FBbEIsRUFESixLQUdJQyxNQUFNLGdDQUFOO0FBQ1AsaUJBTEQ7QUFNSDs7O3lDQUVZOztBQUVUQyxzQkFBTUgsVUFBTjtBQUVIOzs7Z0NBdkVjO0FBQUUsdUJBQU8scUJBQUVJLFFBQUYsMkJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7Z0NBRWpCO0FBQ3RCLHVCQUFPO0FBQ0xDLDZCQUFVLGlCQUFPQztBQURaLGlCQUFQO0FBR0M7Ozs7TUFYd0IscUJBQVdDLFE7O3NCQThFekJoQyxjIiwiZmlsZSI6ImF0dGFjaG1lbnRfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAxNDo0NDozMlxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQXR0YWNobWVudE1vZGVsIGZyb20gJ21vZGVscy9hdHRhY2htZW50X21vZGVsJztcbmltcG9ydCB1dGlscyBmcm9tICd1dGlscyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9hdHRhY2htZW50X3RtcGwuaHRtbCc7XG5cbmNsYXNzIEF0dGFjaG1lbnRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3NpbmdsZXZpZXcnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0ICByZXR1cm4ge1xuXHRcdCAgICBmaWxlRGlyIDogQ29uZmlnLmZpbGVzX3VybFxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAjc2F2ZUJ1dHRvbicgOiAnb25TYXZlQnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjbGljayAjZGVsZXRlQnV0dG9uJyA6ICdvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAnY2hhbmdlICNpbnB1dC11cGxvYWQtZmlsZScgOiAnb25GaWxlSW5wdXRDaGFuZ2VkJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCAnaW50ZXJ2aWV3JykgJiYgXy5oYXMob3B0aW9ucywgJ25ldycpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbmV3IEF0dGFjaG1lbnRNb2RlbCh7IGludGVydmlldyA6IG9wdGlvbnMuaW50ZXJ2aWV3IH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlkID0gZmFsc2U7XG4gICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBBdHRhY2htZW50TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsdGhpcy5yZW5kZXIpO1xuICAgIH1cblxuICAgIG9uU2F2ZUJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2V0KHsgXG4gICAgICAgICAgICB0YWdzIDogdGhpcy4kKFwiI2lucHV0LXRhZ3NcIikudmFsKCkuc3BsaXQoXCIgXCIpLFxuICAgICAgICAgICAgdGV4dCA6IHRoaXMuJChcIiNpbnB1dC10ZXh0XCIpLnZhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaGFzKHRoaXMub3B0aW9ucywgJ2ludGVydmlldycpKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cIiMvaW50ZXJ2aWV3L1wiICsgdGhpcy5vcHRpb25zLmludGVydmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBpbnRlcnZpZXc/XCIpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiI1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25GaWxlSW5wdXRDaGFuZ2VkKCkge1xuXG4gICAgICAgIHZhciB1cGxvYWRVcmwgPSBDb25maWcud2ViX3NlcnZpY2VfdXJsICsgJ3VwbG9hZC9hdHRhY2htZW50LycgKyB0aGlzLm1vZGVsLmlkO1xuXG4gICAgICAgIHV0aWxzLnVwbG9hZEZpbGUodGhpcy4kKCcjaW5wdXQtdXBsb2FkLWZpbGUnKSwgdXBsb2FkVXJsLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICBhbGVydChcIkVSUk9SOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhbGVydChcIkZpbGUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3VibWl0RmlsZSgpIHtcblxuICAgICAgICBVdGlscy51cGxvYWRGaWxlKClcblxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0YWNobWVudFZpZXciXX0=