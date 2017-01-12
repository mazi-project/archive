define(['exports', 'marionette', 'underscore', 'models/attachment_collection', 'text!templates/track_list_tmpl.html', 'text!templates/track_item_tmpl.html'], function (exports, _marionette, _underscore, _attachment_collection, _track_list_tmpl, _track_item_tmpl) {
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

    var _attachment_collection2 = _interopRequireDefault(_attachment_collection);

    var _track_list_tmpl2 = _interopRequireDefault(_track_list_tmpl);

    var _track_item_tmpl2 = _interopRequireDefault(_track_item_tmpl);

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

    var TagListView = function (_Marionette$Composite) {
        _inherits(TagListView, _Marionette$Composite);

        function TagListView() {
            _classCallCheck(this, TagListView);

            return _possibleConstructorReturn(this, (TagListView.__proto__ || Object.getPrototypeOf(TagListView)).apply(this, arguments));
        }

        _createClass(TagListView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .attachment': 'onAttachmentClicked',
                    'click .play-button': 'onPlayButtonClicked'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.options = options;

                this.collection = new _attachment_collection2.default();

                if (_underscore2.default.has(options, 'tag')) this.collection.fetch({ data: $.param({ tag: options.tag }) });

                if (_underscore2.default.has(options, 'question')) this.collection.fetch({ data: $.param({ text: options.question }) });

                // setup collection events
                this.listenTo(this.collection, 'sync', this.onCollectionLoaded);
            }
        }, {
            key: 'onAttachmentClicked',
            value: function onAttachmentClicked(event) {
                $(event.target).toggleClass("expand");
            }
        }, {
            key: 'onPlayButtonClicked',
            value: function onPlayButtonClicked(e) {
                var attachmentId = e.target.attributes['data-id'].value;
                Backbone.trigger('show:audioplayer', attachmentId);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'track-list';
            }
        }, {
            key: 'tagName',
            get: function get() {
                return 'div';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _marionette2.default.ItemView.extend({
                    template: _underscore2.default.template(_track_item_tmpl2.default),
                    className: 'attachment'
                });
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_track_list_tmpl2.default);
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                var _this2 = this;

                return {
                    searchString: function searchString() {
                        if (_underscore2.default.has(_this2.options, 'tag')) return '#' + _this2.options.tag;else if (_underscore2.default.has(_this2.options, 'question')) return _this2.options.question;else return "nothing";
                    }
                };
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#track-list';
            }
        }]);

        return TagListView;
    }(_marionette2.default.CompositeView);

    exports.default = TagListView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90cmFja19saXN0X3ZpZXcuanMiXSwibmFtZXMiOlsiVGFnTGlzdFZpZXciLCJvcHRpb25zIiwiY29sbGVjdGlvbiIsImhhcyIsImZldGNoIiwiZGF0YSIsIiQiLCJwYXJhbSIsInRhZyIsInRleHQiLCJxdWVzdGlvbiIsImxpc3RlblRvIiwib25Db2xsZWN0aW9uTG9hZGVkIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImUiLCJhdHRhY2htZW50SWQiLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJCYWNrYm9uZSIsInRyaWdnZXIiLCJJdGVtVmlldyIsImV4dGVuZCIsInRlbXBsYXRlIiwiY2xhc3NOYW1lIiwic2VhcmNoU3RyaW5nIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFjTUEsVzs7Ozs7Ozs7Ozs7cUNBK0JPO0FBQ1AsdUJBQU87QUFDTCx5Q0FBc0IscUJBRGpCO0FBRUwsMENBQXVCO0FBRmxCLGlCQUFQO0FBSUQ7Ozt1Q0FLVUMsTyxFQUFTOztBQUVoQixxQkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHFCQUFLQyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFQSxvQkFBSSxxQkFBRUMsR0FBRixDQUFNRixPQUFOLEVBQWMsS0FBZCxDQUFKLEVBQ0ksS0FBS0MsVUFBTCxDQUFnQkUsS0FBaEIsQ0FBc0IsRUFBRUMsTUFBTUMsRUFBRUMsS0FBRixDQUFRLEVBQUVDLEtBQU1QLFFBQVFPLEdBQWhCLEVBQVIsQ0FBUixFQUF0Qjs7QUFFSixvQkFBSSxxQkFBRUwsR0FBRixDQUFNRixPQUFOLEVBQWMsVUFBZCxDQUFKLEVBQ0ksS0FBS0MsVUFBTCxDQUFnQkUsS0FBaEIsQ0FBc0IsRUFBRUMsTUFBTUMsRUFBRUMsS0FBRixDQUFRLEVBQUVFLE1BQU9SLFFBQVFTLFFBQWpCLEVBQVIsQ0FBUixFQUF0Qjs7QUFFSjtBQUNBLHFCQUFLQyxRQUFMLENBQWMsS0FBS1QsVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBS1Usa0JBQTFDO0FBQ0g7OztnREFFbUJDLEssRUFBTztBQUN6QlAsa0JBQUVPLE1BQU1DLE1BQVIsRUFBZ0JDLFdBQWhCLENBQTRCLFFBQTVCO0FBQ0Q7OztnREFFbUJDLEMsRUFBRztBQUNuQixvQkFBSUMsZUFBZUQsRUFBRUYsTUFBRixDQUFTSSxVQUFULENBQW9CLFNBQXBCLEVBQStCQyxLQUFsRDtBQUNBQyx5QkFBU0MsT0FBVCxDQUFpQixrQkFBakIsRUFBb0NKLFlBQXBDO0FBQ0g7OztnQ0E1RGU7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7Z0NBRXpCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOzs7Z0NBRWQ7QUFDWix1QkFBTyxxQkFBV0ssUUFBWCxDQUFvQkMsTUFBcEIsQ0FBMkI7QUFDOUJDLDhCQUFVLHFCQUFFQSxRQUFGLDJCQURvQjtBQUU5QkMsK0JBQVk7QUFGa0IsaUJBQTNCLENBQVA7QUFJSDs7O2dDQUVjO0FBQ1gsdUJBQU8scUJBQUVELFFBQUYsMkJBQVA7QUFDSDs7O2dDQUVxQjtBQUFBOztBQUNsQix1QkFBTztBQUNIRSxrQ0FBZSx3QkFBTTtBQUNqQiw0QkFBSSxxQkFBRXZCLEdBQUYsQ0FBTSxPQUFLRixPQUFYLEVBQW1CLEtBQW5CLENBQUosRUFDSSxPQUFPLE1BQUksT0FBS0EsT0FBTCxDQUFhTyxHQUF4QixDQURKLEtBRUssSUFBSSxxQkFBRUwsR0FBRixDQUFNLE9BQUtGLE9BQVgsRUFBbUIsVUFBbkIsQ0FBSixFQUNELE9BQU8sT0FBS0EsT0FBTCxDQUFhUyxRQUFwQixDQURDLEtBRUEsT0FBTyxTQUFQO0FBQ1I7QUFQRSxpQkFBUDtBQVNIOzs7Z0NBU3dCO0FBQUUsdUJBQU8sYUFBUDtBQUFzQjs7OztNQXRDM0IscUJBQVdpQixhOztzQkFtRXRCM0IsVyIsImZpbGUiOiJ0cmFja19saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MzU6MTlcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQXR0YWNobWVudENvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL2F0dGFjaG1lbnRfY29sbGVjdGlvbic7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy90cmFja19saXN0X3RtcGwuaHRtbCc7XG5pbXBvcnQgaXRlbVRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RyYWNrX2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgVGFnTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAndHJhY2stbGlzdCcgfVxuXG4gICAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnZGl2JyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkgeyBcbiAgICAgICAgcmV0dXJuIE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGl0ZW1UZW1wbGF0ZSksXG4gICAgICAgICAgICBjbGFzc05hbWUgOiAnYXR0YWNobWVudCdcbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpXG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlYXJjaFN0cmluZyA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5oYXModGhpcy5vcHRpb25zLCd0YWcnKSkgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnIycrdGhpcy5vcHRpb25zLnRhZztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChfLmhhcyh0aGlzLm9wdGlvbnMsJ3F1ZXN0aW9uJykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gXCJub3RoaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAuYXR0YWNobWVudCcgOiAnb25BdHRhY2htZW50Q2xpY2tlZCcsXG4gICAgICAgICdjbGljayAucGxheS1idXR0b24nIDogJ29uUGxheUJ1dHRvbkNsaWNrZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjdHJhY2stbGlzdCcgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBuZXcgQXR0YWNobWVudENvbGxlY3Rpb24oKTtcblxuICAgICAgICBpZiAoXy5oYXMob3B0aW9ucywndGFnJykpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goeyBkYXRhOiAkLnBhcmFtKHsgdGFnIDogb3B0aW9ucy50YWd9KcKgfSk7XG5cbiAgICAgICAgaWYgKF8uaGFzKG9wdGlvbnMsJ3F1ZXN0aW9uJykpXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goeyBkYXRhOiAkLnBhcmFtKHsgdGV4dCA6IG9wdGlvbnMucXVlc3Rpb259KcKgfSk7XG5cbiAgICAgICAgLy8gc2V0dXAgY29sbGVjdGlvbiBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMub25Db2xsZWN0aW9uTG9hZGVkKVxuICAgIH1cblxuICAgIG9uQXR0YWNobWVudENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICQoZXZlbnQudGFyZ2V0KS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9XG5cbiAgICBvblBsYXlCdXR0b25DbGlja2VkKGUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRJZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzaG93OmF1ZGlvcGxheWVyJyxhdHRhY2htZW50SWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdFZpZXciXX0=