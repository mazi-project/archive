define(['exports', 'backbone', 'marionette', 'underscore', 'config', 'models/interview_model', 'views/attachment_list_view', 'text!templates/interview_tmpl.html'], function (exports, _backbone, _marionette, _underscore, _config, _interview_model, _attachment_list_view, _interview_tmpl) {
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

    var _interview_model2 = _interopRequireDefault(_interview_model);

    var _attachment_list_view2 = _interopRequireDefault(_attachment_list_view);

    var _interview_tmpl2 = _interopRequireDefault(_interview_tmpl);

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

    var InterviewView = function (_Marionette$LayoutVie) {
        _inherits(InterviewView, _Marionette$LayoutVie);

        function InterviewView() {
            _classCallCheck(this, InterviewView);

            return _possibleConstructorReturn(this, (InterviewView.__proto__ || Object.getPrototypeOf(InterviewView)).apply(this, arguments));
        }

        _createClass(InterviewView, [{
            key: 'regions',
            value: function regions() {
                return {
                    attachments: '#interview-attachments'
                };
            }
        }, {
            key: 'events',
            value: function events() {
                return {
                    'click #saveButton': 'onSaveButtonClicked',
                    'click #deleteButton': 'onDeleteButtonClicked',
                    'click #add-attachment-button': 'onAddAttachmentButtonClicked'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                if (_underscore2.default.has(options, 'new')) {
                    this.model = new _interview_model2.default();
                    this.options.id = false;
                } else {
                    this.model = new _interview_model2.default({ _id: options.id });
                    this.model.fetch();
                }

                //listen to model events
                this.listenTo(this.model, 'change', this.render);
            }
        }, {
            key: 'onRender',
            value: function onRender() {
                this.getRegion('attachments').show(new _attachment_list_view2.default({ interview: this.options.id }));
            }
        }, {
            key: 'onSaveButtonClicked',
            value: function onSaveButtonClicked() {
                this.model.set({
                    name: this.$("#input-name").val(),
                    role: this.$("#input-role").val(),
                    text: this.$("#input-text").val()
                });

                this.model.save();
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
            key: 'onAddAttachmentButtonClicked',
            value: function onAddAttachmentButtonClicked() {
                window.location.href = '#attachment/add/' + this.options.id;
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_tmpl2.default);
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
                    filesUrl: _config2.default.files_url + this.model.get('_id') + '/'
                };
            }
        }]);

        return InterviewView;
    }(_marionette2.default.LayoutView);

    exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3IiwiYXR0YWNobWVudHMiLCJvcHRpb25zIiwiaGFzIiwibW9kZWwiLCJpZCIsIl9pZCIsImZldGNoIiwibGlzdGVuVG8iLCJyZW5kZXIiLCJnZXRSZWdpb24iLCJzaG93IiwiaW50ZXJ2aWV3Iiwic2V0IiwibmFtZSIsIiQiLCJ2YWwiLCJyb2xlIiwidGV4dCIsInNhdmUiLCJjb25maXJtIiwiZGVzdHJveSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRlbXBsYXRlIiwiZmlsZXNVcmwiLCJmaWxlc191cmwiLCJnZXQiLCJMYXlvdXRWaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFnQk1BLGE7Ozs7Ozs7Ozs7O3NDQWFPO0FBQ1AsdUJBQU87QUFDTEMsaUNBQWM7QUFEVCxpQkFBUDtBQUdEOzs7cUNBRVE7QUFDUCx1QkFBTztBQUNMLHlDQUFzQixxQkFEakI7QUFFTCwyQ0FBd0IsdUJBRm5CO0FBR0wsb0RBQWlDO0FBSDVCLGlCQUFQO0FBS0Q7Ozt1Q0FHVUMsTyxFQUFTOztBQUVoQixvQkFBSSxxQkFBRUMsR0FBRixDQUFNRCxPQUFOLEVBQWUsS0FBZixDQUFKLEVBQTJCO0FBQ3ZCLHlCQUFLRSxLQUFMLEdBQWEsK0JBQWI7QUFDQSx5QkFBS0YsT0FBTCxDQUFhRyxFQUFiLEdBQWtCLEtBQWxCO0FBQ0gsaUJBSEQsTUFHUTtBQUNKLHlCQUFLRCxLQUFMLEdBQWEsOEJBQW1CLEVBQUVFLEtBQUtKLFFBQVFHLEVBQWYsRUFBbkIsQ0FBYjtBQUNBLHlCQUFLRCxLQUFMLENBQVdHLEtBQVg7QUFDSDs7QUFFRDtBQUNBLHFCQUFLQyxRQUFMLENBQWMsS0FBS0osS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBS0ssTUFBdkM7QUFDSDs7O3VDQUVVO0FBQ1AscUJBQUtDLFNBQUwsQ0FBZSxhQUFmLEVBQThCQyxJQUE5QixDQUFvQyxtQ0FBdUIsRUFBRUMsV0FBWSxLQUFLVixPQUFMLENBQWFHLEVBQTNCLEVBQXZCLENBQXBDO0FBQ0g7OztrREFFcUI7QUFDcEIscUJBQUtELEtBQUwsQ0FBV1MsR0FBWCxDQUFlO0FBQ2JDLDBCQUFPLEtBQUtDLENBQUwsQ0FBTyxhQUFQLEVBQXNCQyxHQUF0QixFQURNO0FBRWJDLDBCQUFPLEtBQUtGLENBQUwsQ0FBTyxhQUFQLEVBQXNCQyxHQUF0QixFQUZNO0FBR2JFLDBCQUFPLEtBQUtILENBQUwsQ0FBTyxhQUFQLEVBQXNCQyxHQUF0QjtBQUhNLGlCQUFmOztBQU1BLHFCQUFLWixLQUFMLENBQVdlLElBQVg7QUFDRDs7O29EQUV1QjtBQUNwQixvQkFBSUMsUUFBUSxnREFBUixDQUFKLEVBQStEO0FBQzNELHlCQUFLaEIsS0FBTCxDQUFXaUIsT0FBWDtBQUNBQywyQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBcUIsR0FBckI7QUFDSDtBQUNKOzs7MkRBRThCO0FBQzNCRix1QkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIscUJBQXFCLEtBQUt0QixPQUFMLENBQWFHLEVBQXpEO0FBQ0g7OztnQ0E5RGM7QUFBRSx1QkFBTyxxQkFBRW9CLFFBQUYsMEJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7Z0NBRWpCO0FBQ3RCLHVCQUFPO0FBQ0xDLDhCQUFXLGlCQUFPQyxTQUFQLEdBQW1CLEtBQUt2QixLQUFMLENBQVd3QixHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQztBQURqRCxpQkFBUDtBQUdDOzs7O01BWHVCLHFCQUFXQyxVOztzQkFxRXhCN0IsYSIsImZpbGUiOiJpbnRlcnZpZXdfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAxNDo0NDozMlxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgSW50ZXJ2aWV3TW9kZWwgZnJvbSAnbW9kZWxzL2ludGVydmlld19tb2RlbCc7XG5pbXBvcnQgQXR0YWNobWVudExpc3RWaWV3IGZyb20gJ3ZpZXdzL2F0dGFjaG1lbnRfbGlzdF92aWV3JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld190bXBsLmh0bWwnO1xuXG5jbGFzcyBJbnRlcnZpZXdWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHQgIHJldHVybiB7XG5cdFx0ICAgIGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJ1xuICAgICAgfVxuICAgIH1cblxuICAgcmVnaW9ucygpIHsgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhdHRhY2htZW50cyA6ICcjaW50ZXJ2aWV3LWF0dGFjaG1lbnRzJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAjc2F2ZUJ1dHRvbicgOiAnb25TYXZlQnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjbGljayAjZGVsZXRlQnV0dG9uJyA6ICdvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgI2FkZC1hdHRhY2htZW50LWJ1dHRvbicgOiAnb25BZGRBdHRhY2htZW50QnV0dG9uQ2xpY2tlZCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKF8uaGFzKG9wdGlvbnMsICduZXcnKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBJbnRlcnZpZXdNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlkID0gZmFsc2U7XG4gICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBJbnRlcnZpZXdNb2RlbCh7IF9pZDogb3B0aW9ucy5pZCB9KTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZmV0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9saXN0ZW4gdG8gbW9kZWwgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLnJlbmRlcik7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVnaW9uKCdhdHRhY2htZW50cycpLnNob3coIG5ldyBBdHRhY2htZW50TGlzdFZpZXcoeyBpbnRlcnZpZXcgOiB0aGlzLm9wdGlvbnMuaWQgfSkgKTtcbiAgICB9XG5cbiAgICBvblNhdmVCdXR0b25DbGlja2VkKCkge1xuICAgICAgdGhpcy5tb2RlbC5zZXQoeyBcbiAgICAgICAgbmFtZSA6IHRoaXMuJChcIiNpbnB1dC1uYW1lXCIpLnZhbCgpLFxuICAgICAgICByb2xlIDogdGhpcy4kKFwiI2lucHV0LXJvbGVcIikudmFsKCksXG4gICAgICAgIHRleHQgOiB0aGlzLiQoXCIjaW5wdXQtdGV4dFwiKS52YWwoKVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubW9kZWwuc2F2ZSgpO1xuICAgIH1cblxuICAgIG9uRGVsZXRlQnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBpbnRlcnZpZXc/XCIpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiI1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BZGRBdHRhY2htZW50QnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnI2F0dGFjaG1lbnQvYWRkLycgKyB0aGlzLm9wdGlvbnMuaWQ7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdWaWV3Il19