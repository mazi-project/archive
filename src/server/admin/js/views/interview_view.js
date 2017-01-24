define(['exports', 'backbone', 'marionette', 'underscore', 'config', 'models/interview_model', 'views/attachment_list_view', 'utils', 'text!templates/interview_tmpl.html'], function (exports, _backbone, _marionette, _underscore, _config, _interview_model, _attachment_list_view, _utils, _interview_tmpl) {
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

    var _utils2 = _interopRequireDefault(_utils);

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
                    'click #add-attachment-button': 'onAddAttachmentButtonClicked',
                    'change #input-upload-file': 'onFileInputChanged'
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
                var _this2 = this;

                this.saveModel(function (error) {
                    if (error) alert(error);else window.location.href = "#interview/" + _this2.model.id;
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
            key: 'onAddAttachmentButtonClicked',
            value: function onAddAttachmentButtonClicked() {
                window.location.href = '#attachment/add/' + this.options.id;
            }
        }, {
            key: 'onFileInputChanged',
            value: function onFileInputChanged() {
                var _this3 = this;

                var uploadUrl = _config2.default.web_service_url + 'upload/image/' + this.model.id;
                _utils2.default.uploadFile(self.$('#input-upload-file'), uploadUrl, function (error) {
                    if (error) alert("ERROR: " + error);else alert("File was successfully uploaded");
                    _this3.model.fetch();
                });
            }
        }, {
            key: 'saveModel',
            value: function saveModel(callback) {
                this.model.set({
                    name: this.$("#input-name").val(),
                    role: this.$("#input-role").val(),
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
                    filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
                    isNew: this.model.isNew()
                };
            }
        }]);

        return InterviewView;
    }(_marionette2.default.LayoutView);

    exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3IiwiYXR0YWNobWVudHMiLCJvcHRpb25zIiwiaGFzIiwibW9kZWwiLCJpZCIsIl9pZCIsImZldGNoIiwibGlzdGVuVG8iLCJyZW5kZXIiLCJnZXRSZWdpb24iLCJzaG93IiwiaW50ZXJ2aWV3Iiwic2F2ZU1vZGVsIiwiZXJyb3IiLCJhbGVydCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImNvbmZpcm0iLCJkZXN0cm95IiwidXBsb2FkVXJsIiwid2ViX3NlcnZpY2VfdXJsIiwidXBsb2FkRmlsZSIsInNlbGYiLCIkIiwiY2FsbGJhY2siLCJzZXQiLCJuYW1lIiwidmFsIiwicm9sZSIsInRleHQiLCJzYXZlIiwic3VjY2VzcyIsInRlbXBsYXRlIiwiZmlsZXNVcmwiLCJmaWxlc191cmwiLCJnZXQiLCJpc05ldyIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUJNQSxhOzs7Ozs7Ozs7OztzQ0FjTztBQUNQLHVCQUFPO0FBQ0xDLGlDQUFjO0FBRFQsaUJBQVA7QUFHRDs7O3FDQUVRO0FBQ1AsdUJBQU87QUFDTCx5Q0FBc0IscUJBRGpCO0FBRUwsMkNBQXdCLHVCQUZuQjtBQUdMLG9EQUFpQyw4QkFINUI7QUFJTCxpREFBOEI7QUFKekIsaUJBQVA7QUFNRDs7O3VDQUdVQyxPLEVBQVM7O0FBRWhCLG9CQUFJLHFCQUFFQyxHQUFGLENBQU1ELE9BQU4sRUFBZSxLQUFmLENBQUosRUFBMkI7QUFDdkIseUJBQUtFLEtBQUwsR0FBYSwrQkFBYjtBQUNBLHlCQUFLRixPQUFMLENBQWFHLEVBQWIsR0FBa0IsS0FBbEI7QUFDSCxpQkFIRCxNQUdRO0FBQ0oseUJBQUtELEtBQUwsR0FBYSw4QkFBbUIsRUFBRUUsS0FBS0osUUFBUUcsRUFBZixFQUFuQixDQUFiO0FBQ0EseUJBQUtELEtBQUwsQ0FBV0csS0FBWDtBQUNIOztBQUVEO0FBQ0EscUJBQUtDLFFBQUwsQ0FBYyxLQUFLSixLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLSyxNQUF2QztBQUNIOzs7dUNBRVU7QUFDUCxxQkFBS0MsU0FBTCxDQUFlLGFBQWYsRUFBOEJDLElBQTlCLENBQW9DLG1DQUF1QixFQUFFQyxXQUFZLEtBQUtWLE9BQUwsQ0FBYUcsRUFBM0IsRUFBdkIsQ0FBcEM7QUFDSDs7O2tEQUVxQjtBQUFBOztBQUNsQixxQkFBS1EsU0FBTCxDQUFnQixVQUFDQyxLQUFELEVBQVc7QUFDdkIsd0JBQUlBLEtBQUosRUFDSUMsTUFBTUQsS0FBTixFQURKLEtBR0lFLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLGdCQUFjLE9BQUtkLEtBQUwsQ0FBV0MsRUFBaEQ7QUFFUCxpQkFORDtBQU9IOzs7b0RBRXVCO0FBQ3BCLG9CQUFJYyxRQUFRLGdEQUFSLENBQUosRUFBK0Q7QUFDM0QseUJBQUtmLEtBQUwsQ0FBV2dCLE9BQVg7QUFDQUosMkJBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXFCLEdBQXJCO0FBQ0g7QUFDSjs7OzJEQUU4QjtBQUMzQkYsdUJBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLHFCQUFxQixLQUFLaEIsT0FBTCxDQUFhRyxFQUF6RDtBQUNIOzs7aURBRW9CO0FBQUE7O0FBRWpCLG9CQUFJZ0IsWUFBWSxpQkFBT0MsZUFBUCxHQUF5QixlQUF6QixHQUEyQyxLQUFLbEIsS0FBTCxDQUFXQyxFQUF0RTtBQUNBLGdDQUFNa0IsVUFBTixDQUFpQkMsS0FBS0MsQ0FBTCxDQUFPLG9CQUFQLENBQWpCLEVBQStDSixTQUEvQyxFQUEwRCxVQUFDUCxLQUFELEVBQVc7QUFDakUsd0JBQUlBLEtBQUosRUFDSUMsTUFBTSxZQUFZRCxLQUFsQixFQURKLEtBR0lDLE1BQU0sZ0NBQU47QUFDQSwyQkFBS1gsS0FBTCxDQUFXRyxLQUFYO0FBQ1AsaUJBTkQ7QUFPSDs7O3NDQUVTbUIsUSxFQUFVO0FBQ2hCLHFCQUFLdEIsS0FBTCxDQUFXdUIsR0FBWCxDQUFlO0FBQ1hDLDBCQUFPLEtBQUtILENBQUwsQ0FBTyxhQUFQLEVBQXNCSSxHQUF0QixFQURJO0FBRVhDLDBCQUFPLEtBQUtMLENBQUwsQ0FBTyxhQUFQLEVBQXNCSSxHQUF0QixFQUZJO0FBR1hFLDBCQUFPLEtBQUtOLENBQUwsQ0FBTyxhQUFQLEVBQXNCSSxHQUF0QjtBQUhJLGlCQUFmOztBQU1BLHFCQUFLekIsS0FBTCxDQUFXNEIsSUFBWCxDQUFnQixJQUFoQixFQUFzQjtBQUNsQkMsNkJBQVMsbUJBQU07QUFDWFA7QUFDSCxxQkFIaUI7QUFJbEJaLDJCQUFPLGVBQUNBLE1BQUQsRUFBVztBQUNkWSxpQ0FBU1osTUFBVDtBQUNIO0FBTmlCLGlCQUF0QjtBQVFIOzs7Z0NBN0ZjO0FBQUUsdUJBQU8scUJBQUVvQixRQUFGLDBCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sWUFBUDtBQUFxQjs7O2dDQUVqQjtBQUN0Qix1QkFBTztBQUNMQyw4QkFBVyxpQkFBT0MsU0FBUCxHQUFtQixLQUFLaEMsS0FBTCxDQUFXaUMsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEakQ7QUFFQ0MsMkJBQVEsS0FBS2xDLEtBQUwsQ0FBV2tDLEtBQVg7QUFGVCxpQkFBUDtBQUlDOzs7O01BWnVCLHFCQUFXQyxVOztzQkFvR3hCdkMsYSIsImZpbGUiOiJpbnRlcnZpZXdfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAxNDo0NDozMlxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgSW50ZXJ2aWV3TW9kZWwgZnJvbSAnbW9kZWxzL2ludGVydmlld19tb2RlbCc7XG5pbXBvcnQgQXR0YWNobWVudExpc3RWaWV3IGZyb20gJ3ZpZXdzL2F0dGFjaG1lbnRfbGlzdF92aWV3JztcbmltcG9ydCB1dGlscyBmcm9tICd1dGlscyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9pbnRlcnZpZXdfdG1wbC5odG1sJztcblxuY2xhc3MgSW50ZXJ2aWV3VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3NpbmdsZXZpZXcnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0ICByZXR1cm4ge1xuXHRcdCAgICBmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgICAgICBpc05ldyA6IHRoaXMubW9kZWwuaXNOZXcoKVxuICAgICAgfVxuICAgIH1cblxuICAgcmVnaW9ucygpIHsgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhdHRhY2htZW50cyA6ICcjaW50ZXJ2aWV3LWF0dGFjaG1lbnRzJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAjc2F2ZUJ1dHRvbicgOiAnb25TYXZlQnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjbGljayAjZGVsZXRlQnV0dG9uJyA6ICdvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgI2FkZC1hdHRhY2htZW50LWJ1dHRvbicgOiAnb25BZGRBdHRhY2htZW50QnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICdjaGFuZ2UgI2lucHV0LXVwbG9hZC1maWxlJyA6ICdvbkZpbGVJbnB1dENoYW5nZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCAnbmV3JykpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pZCA9IGZhbHNlO1xuICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsdGhpcy5yZW5kZXIpO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgICB0aGlzLmdldFJlZ2lvbignYXR0YWNobWVudHMnKS5zaG93KCBuZXcgQXR0YWNobWVudExpc3RWaWV3KHsgaW50ZXJ2aWV3IDogdGhpcy5vcHRpb25zLmlkIH0pICk7XG4gICAgfVxuXG4gICAgb25TYXZlQnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5zYXZlTW9kZWwoIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNpbnRlcnZpZXcvXCIrdGhpcy5tb2RlbC5pZDtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgaW50ZXJ2aWV3P1wiKSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5kZXN0cm95KCk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cIiNcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQWRkQXR0YWNobWVudEJ1dHRvbkNsaWNrZWQoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyNhdHRhY2htZW50L2FkZC8nICsgdGhpcy5vcHRpb25zLmlkO1xuICAgIH1cblxuICAgIG9uRmlsZUlucHV0Q2hhbmdlZCgpIHtcblxuICAgICAgICB2YXIgdXBsb2FkVXJsID0gQ29uZmlnLndlYl9zZXJ2aWNlX3VybCArICd1cGxvYWQvaW1hZ2UvJyArIHRoaXMubW9kZWwuaWQ7XG4gICAgICAgIHV0aWxzLnVwbG9hZEZpbGUoc2VsZi4kKCcjaW5wdXQtdXBsb2FkLWZpbGUnKSwgdXBsb2FkVXJsLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICBhbGVydChcIkVSUk9SOiBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhbGVydChcIkZpbGUgd2FzIHN1Y2Nlc3NmdWxseSB1cGxvYWRlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIH0pOyAgIFxuICAgIH1cblxuICAgIHNhdmVNb2RlbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm1vZGVsLnNldCh7IFxuICAgICAgICAgICAgbmFtZSA6IHRoaXMuJChcIiNpbnB1dC1uYW1lXCIpLnZhbCgpLFxuICAgICAgICAgICAgcm9sZSA6IHRoaXMuJChcIiNpbnB1dC1yb2xlXCIpLnZhbCgpLFxuICAgICAgICAgICAgdGV4dCA6IHRoaXMuJChcIiNpbnB1dC10ZXh0XCIpLnZhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdWaWV3Il19