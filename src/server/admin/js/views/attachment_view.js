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

                this.saveModel(function (error) {
                    if (error) alert(error);
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
                var _this2 = this;

                var uploadUrl = _config2.default.web_service_url + 'upload/attachment/' + this.model.id;
                _utils2.default.uploadFile(self.$('#input-upload-file'), uploadUrl, function (error) {
                    if (error) alert("ERROR: " + error);else alert("File was successfully uploaded");
                    _this2.model.fetch();
                });
            }
        }, {
            key: 'saveModel',
            value: function saveModel(callback) {
                this.model.set({
                    tags: this.$("#input-tags").val().split(" "),
                    text: this.$("#input-text").val()
                });

                this.model.save(null, {
                    success: function success() {
                        callback();
                    },
                    error: function error(_error) {
                        callback(_error);
                    }
                });
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
                    fileDir: _config2.default.files_url,
                    isNew: this.model.isNew()
                };
            }
        }]);

        return AttachmentView;
    }(_marionette2.default.ItemView);

    exports.default = AttachmentView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X3ZpZXcuanMiXSwibmFtZXMiOlsiQXR0YWNobWVudFZpZXciLCJvcHRpb25zIiwiaGFzIiwibW9kZWwiLCJpbnRlcnZpZXciLCJpZCIsIl9pZCIsImZldGNoIiwibGlzdGVuVG8iLCJyZW5kZXIiLCJzYXZlTW9kZWwiLCJlcnJvciIsImFsZXJ0IiwiY29uZmlybSIsImRlc3Ryb3kiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ1cGxvYWRVcmwiLCJ3ZWJfc2VydmljZV91cmwiLCJ1cGxvYWRGaWxlIiwic2VsZiIsIiQiLCJjYWxsYmFjayIsInNldCIsInRhZ3MiLCJ2YWwiLCJzcGxpdCIsInRleHQiLCJzYXZlIiwic3VjY2VzcyIsInRlbXBsYXRlIiwiZmlsZURpciIsImZpbGVzX3VybCIsImlzTmV3IiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsYzs7Ozs7Ozs7Ozs7cUNBY087QUFDUCx1QkFBTztBQUNMLHlDQUFzQixxQkFEakI7QUFFTCwyQ0FBd0IsdUJBRm5CO0FBR0wsaURBQThCO0FBSHpCLGlCQUFQO0FBS0Q7Ozt1Q0FHVUMsTyxFQUFTO0FBQ2hCLG9CQUFJLHFCQUFFQyxHQUFGLENBQU1ELE9BQU4sRUFBZSxXQUFmLEtBQStCLHFCQUFFQyxHQUFGLENBQU1ELE9BQU4sRUFBZSxLQUFmLENBQW5DLEVBQTBEO0FBQ3RELHlCQUFLRSxLQUFMLEdBQWEsK0JBQW9CLEVBQUVDLFdBQVlILFFBQVFHLFNBQXRCLEVBQXBCLENBQWI7QUFDQSx5QkFBS0gsT0FBTCxDQUFhSSxFQUFiLEdBQWtCLEtBQWxCO0FBQ0gsaUJBSEQsTUFHUTtBQUNKLHlCQUFLRixLQUFMLEdBQWEsK0JBQW9CLEVBQUVHLEtBQUtMLFFBQVFJLEVBQWYsRUFBcEIsQ0FBYjtBQUNBLHlCQUFLRixLQUFMLENBQVdJLEtBQVg7QUFDSDs7QUFFRDtBQUNBLHFCQUFLQyxRQUFMLENBQWMsS0FBS0wsS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBS00sTUFBdkM7QUFDSDs7O2tEQUVxQjs7QUFFbEIscUJBQUtDLFNBQUwsQ0FBZ0IsVUFBQ0MsS0FBRCxFQUFXO0FBQ3ZCLHdCQUFJQSxLQUFKLEVBQ0lDLE1BQU1ELEtBQU47QUFDUCxpQkFIRDtBQUlIOzs7b0RBRXVCO0FBQ3BCLG9CQUFJRSxRQUFRLGdEQUFSLENBQUosRUFBK0Q7QUFDM0QseUJBQUtWLEtBQUwsQ0FBV1csT0FBWDtBQUNBQywyQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBcUIsR0FBckI7QUFDSDtBQUNKOzs7aURBRW9CO0FBQUE7O0FBRWpCLG9CQUFJQyxZQUFZLGlCQUFPQyxlQUFQLEdBQXlCLG9CQUF6QixHQUFnRCxLQUFLaEIsS0FBTCxDQUFXRSxFQUEzRTtBQUNBLGdDQUFNZSxVQUFOLENBQWlCQyxLQUFLQyxDQUFMLENBQU8sb0JBQVAsQ0FBakIsRUFBK0NKLFNBQS9DLEVBQTBELFVBQUNQLEtBQUQsRUFBVztBQUNqRSx3QkFBSUEsS0FBSixFQUNJQyxNQUFNLFlBQVlELEtBQWxCLEVBREosS0FHSUMsTUFBTSxnQ0FBTjtBQUNBLDJCQUFLVCxLQUFMLENBQVdJLEtBQVg7QUFDUCxpQkFORDtBQU9IOzs7c0NBRVNnQixRLEVBQVU7QUFDZixxQkFBS3BCLEtBQUwsQ0FBV3FCLEdBQVgsQ0FBZTtBQUNaQywwQkFBTyxLQUFLSCxDQUFMLENBQU8sYUFBUCxFQUFzQkksR0FBdEIsR0FBNEJDLEtBQTVCLENBQWtDLEdBQWxDLENBREs7QUFFWkMsMEJBQU8sS0FBS04sQ0FBTCxDQUFPLGFBQVAsRUFBc0JJLEdBQXRCO0FBRkssaUJBQWY7O0FBS0QscUJBQUt2QixLQUFMLENBQVcwQixJQUFYLENBQWdCLElBQWhCLEVBQXNCO0FBQ2xCQyw2QkFBUyxtQkFBTTtBQUNYUDtBQUNILHFCQUhpQjtBQUlsQlosMkJBQU8sZUFBQ0EsTUFBRCxFQUFXO0FBQ2RZLGlDQUFTWixNQUFUO0FBQ0g7QUFOaUIsaUJBQXRCO0FBUUg7OztnQ0ExRWM7QUFBRSx1QkFBTyxxQkFBRW9CLFFBQUYsMkJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7Z0NBRWpCO0FBQ3RCLHVCQUFPO0FBQ0xDLDZCQUFVLGlCQUFPQyxTQURaO0FBRUNDLDJCQUFRLEtBQUsvQixLQUFMLENBQVcrQixLQUFYO0FBRlQsaUJBQVA7QUFJQzs7OztNQVp3QixxQkFBV0MsUTs7c0JBaUZ6Qm5DLGMiLCJmaWxlIjoiYXR0YWNobWVudF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDE0OjQ0OjMyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSAnbW9kZWxzL2F0dGFjaG1lbnRfbW9kZWwnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ3V0aWxzJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2F0dGFjaG1lbnRfdG1wbC5odG1sJztcblxuY2xhc3MgQXR0YWNobWVudFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHQgIHJldHVybiB7XG5cdFx0ICAgIGZpbGVEaXIgOiBDb25maWcuZmlsZXNfdXJsLFxuICAgICAgICAgICAgaXNOZXcgOiB0aGlzLm1vZGVsLmlzTmV3KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnY2xpY2sgI3NhdmVCdXR0b24nIDogJ29uU2F2ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgI2RlbGV0ZUJ1dHRvbicgOiAnb25EZWxldGVCdXR0b25DbGlja2VkJyxcbiAgICAgICAgJ2NoYW5nZSAjaW5wdXQtdXBsb2FkLWZpbGUnIDogJ29uRmlsZUlucHV0Q2hhbmdlZCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCAnaW50ZXJ2aWV3JykgJiYgXy5oYXMob3B0aW9ucywgJ25ldycpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbmV3IEF0dGFjaG1lbnRNb2RlbCh7IGludGVydmlldyA6IG9wdGlvbnMuaW50ZXJ2aWV3IH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlkID0gZmFsc2U7XG4gICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBBdHRhY2htZW50TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsdGhpcy5yZW5kZXIpO1xuICAgIH1cblxuICAgIG9uU2F2ZUJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgXG4gICAgICAgIHRoaXMuc2F2ZU1vZGVsKCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBpbnRlcnZpZXc/XCIpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiI1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25GaWxlSW5wdXRDaGFuZ2VkKCkge1xuXG4gICAgICAgIHZhciB1cGxvYWRVcmwgPSBDb25maWcud2ViX3NlcnZpY2VfdXJsICsgJ3VwbG9hZC9hdHRhY2htZW50LycgKyB0aGlzLm1vZGVsLmlkO1xuICAgICAgICB1dGlscy51cGxvYWRGaWxlKHNlbGYuJCgnI2lucHV0LXVwbG9hZC1maWxlJyksIHVwbG9hZFVybCwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFUlJPUjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGaWxlIHdhcyBzdWNjZXNzZnVsbHkgdXBsb2FkZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuICAgICAgICB9KTsgICBcbiAgICB9XG5cbiAgICBzYXZlTW9kZWwoY2FsbGJhY2spIHtcbiAgICAgICAgIHRoaXMubW9kZWwuc2V0KHsgXG4gICAgICAgICAgICB0YWdzIDogdGhpcy4kKFwiI2lucHV0LXRhZ3NcIikudmFsKCkuc3BsaXQoXCIgXCIpLFxuICAgICAgICAgICAgdGV4dCA6IHRoaXMuJChcIiNpbnB1dC10ZXh0XCIpLnZhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50VmlldyJdfQ==