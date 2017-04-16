define(['exports', 'marionette', 'underscore', 'models/attachment_collection', 'views/attachment_item_view', 'text!templates/attachment_list_tmpl.html'], function (exports, _marionette, _underscore, _attachment_collection, _attachment_item_view, _attachment_list_tmpl) {
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

    var _attachment_item_view2 = _interopRequireDefault(_attachment_item_view);

    var _attachment_list_tmpl2 = _interopRequireDefault(_attachment_list_tmpl);

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
            key: 'tagName',
            get: function get() {
                return 'div';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _attachment_item_view2.default;
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_attachment_list_tmpl2.default);
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
                return '#attachment-list';
            }
        }]);

        return TagListView;
    }(_marionette2.default.CompositeView);

    exports.default = TagListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6WyJUYWdMaXN0VmlldyIsIm9wdGlvbnMiLCJjb2xsZWN0aW9uIiwiaGFzIiwiZmV0Y2giLCJkYXRhIiwiJCIsInBhcmFtIiwidGFnIiwidGV4dCIsInF1ZXN0aW9uIiwibGlzdGVuVG8iLCJvbkNvbGxlY3Rpb25Mb2FkZWQiLCJldmVudCIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiZSIsImF0dGFjaG1lbnRJZCIsImF0dHJpYnV0ZXMiLCJ2YWx1ZSIsIkJhY2tib25lIiwidHJpZ2dlciIsInRlbXBsYXRlIiwic2VhcmNoU3RyaW5nIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFjTUEsVzs7Ozs7Ozs7Ozs7cUNBNEJPO0FBQ1AsdUJBQU87QUFDTCx5Q0FBc0IscUJBRGpCO0FBRUwsMENBQXVCO0FBRmxCLGlCQUFQO0FBSUQ7Ozt1Q0FLVUMsTyxFQUFTOztBQUVoQixxQkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHFCQUFLQyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFQSxvQkFBSSxxQkFBRUMsR0FBRixDQUFNRixPQUFOLEVBQWMsS0FBZCxDQUFKLEVBQ0ksS0FBS0MsVUFBTCxDQUFnQkUsS0FBaEIsQ0FBc0IsRUFBRUMsTUFBTUMsRUFBRUMsS0FBRixDQUFRLEVBQUVDLEtBQU1QLFFBQVFPLEdBQWhCLEVBQVIsQ0FBUixFQUF0Qjs7QUFFSixvQkFBSSxxQkFBRUwsR0FBRixDQUFNRixPQUFOLEVBQWMsVUFBZCxDQUFKLEVBQ0ksS0FBS0MsVUFBTCxDQUFnQkUsS0FBaEIsQ0FBc0IsRUFBRUMsTUFBTUMsRUFBRUMsS0FBRixDQUFRLEVBQUVFLE1BQU9SLFFBQVFTLFFBQWpCLEVBQVIsQ0FBUixFQUF0Qjs7QUFFSjtBQUNBLHFCQUFLQyxRQUFMLENBQWMsS0FBS1QsVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBS1Usa0JBQTFDO0FBQ0g7OztnREFFbUJDLEssRUFBTztBQUN6QlAsa0JBQUVPLE1BQU1DLE1BQVIsRUFBZ0JDLFdBQWhCLENBQTRCLFFBQTVCO0FBQ0Q7OztnREFFbUJDLEMsRUFBRztBQUNuQixvQkFBSUMsZUFBZUQsRUFBRUYsTUFBRixDQUFTSSxVQUFULENBQW9CLFNBQXBCLEVBQStCQyxLQUFsRDtBQUNBQyx5QkFBU0MsT0FBVCxDQUFpQixrQkFBakIsRUFBb0NKLFlBQXBDO0FBQ0g7OztnQ0F2RGE7QUFBRSx1QkFBTyxLQUFQO0FBQWM7OztnQ0FFZDtBQUNaO0FBQ0g7OztnQ0FFYztBQUNYLHVCQUFPLHFCQUFFSyxRQUFGLGdDQUFQO0FBQ0g7OztnQ0FFcUI7QUFBQTs7QUFDbEIsdUJBQU87QUFDSEMsa0NBQWUsd0JBQU07QUFDakIsNEJBQUkscUJBQUVwQixHQUFGLENBQU0sT0FBS0YsT0FBWCxFQUFtQixLQUFuQixDQUFKLEVBQ0ksT0FBTyxNQUFJLE9BQUtBLE9BQUwsQ0FBYU8sR0FBeEIsQ0FESixLQUVLLElBQUkscUJBQUVMLEdBQUYsQ0FBTSxPQUFLRixPQUFYLEVBQW1CLFVBQW5CLENBQUosRUFDRCxPQUFPLE9BQUtBLE9BQUwsQ0FBYVMsUUFBcEIsQ0FEQyxLQUVBLE9BQU8sU0FBUDtBQUNSO0FBUEUsaUJBQVA7QUFTSDs7O2dDQVN3QjtBQUFFLHVCQUFPLGtCQUFQO0FBQTJCOzs7O01BbkNoQyxxQkFBV2MsYTs7c0JBZ0V0QnhCLFciLCJmaWxlIjoiYXR0YWNobWVudF9saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MzU6MTlcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQXR0YWNobWVudENvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL2F0dGFjaG1lbnRfY29sbGVjdGlvbic7XG5pbXBvcnQgQXR0YWNobWVudEl0ZW1WaWV3IGZyb20gJ3ZpZXdzL2F0dGFjaG1lbnRfaXRlbV92aWV3JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2F0dGFjaG1lbnRfbGlzdF90bXBsLmh0bWwnO1xuXG5jbGFzcyBUYWdMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXG4gICAgLy9nZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3RyYWNrLWxpc3QnIH1cblxuICAgIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHsgXG4gICAgICAgIHJldHVybiBBdHRhY2htZW50SXRlbVZpZXc7XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VhcmNoU3RyaW5nIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfLmhhcyh0aGlzLm9wdGlvbnMsJ3RhZycpKSBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcjJyt0aGlzLm9wdGlvbnMudGFnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKF8uaGFzKHRoaXMub3B0aW9ucywncXVlc3Rpb24nKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBcIm5vdGhpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NsaWNrIC5hdHRhY2htZW50JyA6ICdvbkF0dGFjaG1lbnRDbGlja2VkJyxcbiAgICAgICAgJ2NsaWNrIC5wbGF5LWJ1dHRvbicgOiAnb25QbGF5QnV0dG9uQ2xpY2tlZCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNhdHRhY2htZW50LWxpc3QnIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbmV3IEF0dGFjaG1lbnRDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKF8uaGFzKG9wdGlvbnMsJ3RhZycpKVxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKHsgZGF0YTogJC5wYXJhbSh7IHRhZyA6IG9wdGlvbnMudGFnfSnCoH0pO1xuXG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCdxdWVzdGlvbicpKVxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKHsgZGF0YTogJC5wYXJhbSh7IHRleHQgOiBvcHRpb25zLnF1ZXN0aW9ufSnCoH0pO1xuXG4gICAgICAgIC8vIHNldHVwIGNvbGxlY3Rpb24gZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLm9uQ29sbGVjdGlvbkxvYWRlZClcbiAgICB9XG5cbiAgICBvbkF0dGFjaG1lbnRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAkKGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoXCJleHBhbmRcIik7XG4gICAgfVxuXG4gICAgb25QbGF5QnV0dG9uQ2xpY2tlZChlKSB7XG4gICAgICAgIHZhciBhdHRhY2htZW50SWQgPSBlLnRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLWlkJ10udmFsdWVcbiAgICAgICAgQmFja2JvbmUudHJpZ2dlcignc2hvdzphdWRpb3BsYXllcicsYXR0YWNobWVudElkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhZ0xpc3RWaWV3Il19