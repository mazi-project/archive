define(['exports', 'marionette', 'backbone', 'underscore', 'underscoreString', 'jquery', 'config', 'text!templates/interview_item_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _underscoreString, _jquery, _config, _interview_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 14:44:41
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

    var _interview_item_tmpl2 = _interopRequireDefault(_interview_item_tmpl);

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

    var SubmissionItemView = function (_Marionette$ItemView) {
        _inherits(SubmissionItemView, _Marionette$ItemView);

        function SubmissionItemView() {
            _classCallCheck(this, SubmissionItemView);

            return _possibleConstructorReturn(this, (SubmissionItemView.__proto__ || Object.getPrototypeOf(SubmissionItemView)).apply(this, arguments));
        }

        _createClass(SubmissionItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .play-button': 'onPlayButtonClicked',
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'getBackgroundImageString',
            value: function getBackgroundImageString() {
                var filesUrl = _config2.default.files_url + this.model.get('_id') + '/';
                if (!this.model.get('image')) return "";else return "style=\"background-image: url('" + filesUrl + this.model.get('image').name + "')\"";
            }
        }, {
            key: 'onClick',
            value: function onClick(event) {
                event.preventDefault();
                window.location.href = "#interview/" + this.model.get('_id');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_item_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'item-view card';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    text_truncated: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateShort, '...'),
                    tags: _underscore2.default.unique(_underscore2.default.flatten(_underscore2.default.pluck(this.model.get('attachments'), "tags"))),
                    backgroundImage: this.getBackgroundImageString(),
                    first: function first(array, n) {
                        return _underscore2.default.first(array, n);
                    }
                };
            }
        }, {
            key: 'modelEvents',
            get: function get() {
                return {
                    'change': 'render'
                };
            }
        }]);

        return SubmissionItemView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionItemView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfaXRlbV92aWV3LmpzIl0sIm5hbWVzIjpbIlN1Ym1pc3Npb25JdGVtVmlldyIsIm9wdGlvbnMiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsIm1vZGVsIiwiZ2V0IiwibmFtZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0ZW1wbGF0ZSIsInRleHRfdHJ1bmNhdGVkIiwidHJ1bmNhdGUiLCJzdHJpbmdUcnVuY2F0ZVNob3J0IiwidGFncyIsInVuaXF1ZSIsImZsYXR0ZW4iLCJwbHVjayIsImJhY2tncm91bmRJbWFnZSIsImdldEJhY2tncm91bmRJbWFnZVN0cmluZyIsImZpcnN0IiwiYXJyYXkiLCJuIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsa0I7Ozs7Ozs7Ozs7O3FDQXlCTztBQUNMLHVCQUFPO0FBQ0gsMENBQXVCLHFCQURwQjtBQUVILDZCQUFVO0FBRlAsaUJBQVA7QUFJSDs7O3VDQUdVQyxPLEVBQVMsQ0FDbkI7Ozt1REFFMEI7QUFDdkIsb0JBQUlDLFdBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS0MsS0FBTCxDQUFXQyxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQUExRDtBQUNBLG9CQUFJLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxHQUFYLENBQWUsT0FBZixDQUFMLEVBQ0ksT0FBTyxFQUFQLENBREosS0FHSSxPQUFPLG9DQUFrQ0gsUUFBbEMsR0FBMkMsS0FBS0UsS0FBTCxDQUFXQyxHQUFYLENBQWUsT0FBZixFQUF3QkMsSUFBbkUsR0FBd0UsTUFBL0U7QUFDUDs7O29DQUVPQyxLLEVBQU87QUFDWEEsc0JBQU1DLGNBQU47QUFDQUMsdUJBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLGdCQUFjLEtBQUtQLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLEtBQWYsQ0FBckM7QUFDSDs7O2dDQTVDYztBQUFFLHVCQUFPLHFCQUFFTyxRQUFGLCtCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFckI7QUFDeEIsdUJBQU87QUFDR0Msb0NBQWlCLDJCQUFLQyxRQUFMLENBQWMsS0FBS1YsS0FBTCxDQUFXQyxHQUFYLENBQWUsTUFBZixDQUFkLEVBQXFDLGlCQUFPVSxtQkFBNUMsRUFBZ0UsS0FBaEUsQ0FEcEI7QUFFR0MsMEJBQU8scUJBQUVDLE1BQUYsQ0FBUyxxQkFBRUMsT0FBRixDQUFVLHFCQUFFQyxLQUFGLENBQVEsS0FBS2YsS0FBTCxDQUFXQyxHQUFYLENBQWUsYUFBZixDQUFSLEVBQXNDLE1BQXRDLENBQVYsQ0FBVCxDQUZWO0FBR0dlLHFDQUFrQixLQUFLQyx3QkFBTCxFQUhyQjtBQUlHQywyQkFBUSxlQUFTQyxLQUFULEVBQWVDLENBQWYsRUFBa0I7QUFDdEIsK0JBQU8scUJBQUVGLEtBQUYsQ0FBUUMsS0FBUixFQUFjQyxDQUFkLENBQVA7QUFDSDtBQU5KLGlCQUFQO0FBUUc7OztnQ0FFaUI7QUFDZCx1QkFBTztBQUNILDhCQUFXO0FBRFIsaUJBQVA7QUFHSDs7OztNQXRCNEIscUJBQVdDLFE7O3NCQW1EN0J6QixrQiIsImZpbGUiOiJpbnRlcnZpZXdfaXRlbV92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDE0OjQ0OjQxXG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBfc3RyIGZyb20gJ3VuZGVyc2NvcmVTdHJpbmcnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld19pdGVtX3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25JdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2l0ZW0tdmlldyBjYXJkJyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0X3RydW5jYXRlZCA6IF9zdHIudHJ1bmNhdGUodGhpcy5tb2RlbC5nZXQoJ3RleHQnKSxDb25maWcuc3RyaW5nVHJ1bmNhdGVTaG9ydCwnLi4uJyksXG4gICAgICAgICAgICB0YWdzIDogXy51bmlxdWUoXy5mbGF0dGVuKF8ucGx1Y2sodGhpcy5tb2RlbC5nZXQoJ2F0dGFjaG1lbnRzJyksXCJ0YWdzXCIpKSksXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2UgOiB0aGlzLmdldEJhY2tncm91bmRJbWFnZVN0cmluZygpLFxuICAgICAgICAgICAgZmlyc3QgOiBmdW5jdGlvbihhcnJheSxuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlyc3QoYXJyYXksbikgXG4gICAgICAgICAgICB9XG5cdFx0fVxuICAgIH1cblxuICAgIGdldCBtb2RlbEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjaGFuZ2UnIDogJ3JlbmRlcidcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrIC5wbGF5LWJ1dHRvbicgOiAnb25QbGF5QnV0dG9uQ2xpY2tlZCcsXG4gICAgICAgICAgICAnY2xpY2snIDogJ29uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgfVxuXG4gICAgZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKCkge1xuICAgICAgICB2YXIgZmlsZXNVcmwgPSBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nO1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwuZ2V0KCdpbWFnZScpKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcInN0eWxlPVxcXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ1wiK2ZpbGVzVXJsK3RoaXMubW9kZWwuZ2V0KCdpbWFnZScpLm5hbWUrXCInKVxcXCJcIjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjaW50ZXJ2aWV3L1wiK3RoaXMubW9kZWwuZ2V0KCdfaWQnKVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uSXRlbVZpZXc7Il19