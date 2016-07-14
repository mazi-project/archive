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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TagListView).apply(this, arguments));
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
                this.collection.fetch({ data: $.param({ tag: options.tag }) });

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
                return {
                    tag: this.options.tag
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90cmFja19saXN0X3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTSxXOzs7Ozs7Ozs7OztxQ0F5Qk87QUFDUCx1QkFBTztBQUNMLHlDQUFzQixxQkFEakI7QUFFTCwwQ0FBdUI7QUFGbEIsaUJBQVA7QUFJRDs7O3VDQUtVLE8sRUFBUzs7QUFFaEIscUJBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEscUJBQUssVUFBTCxHQUFrQixxQ0FBbEI7QUFDQSxxQkFBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLEVBQUUsTUFBTSxFQUFFLEtBQUYsQ0FBUSxFQUFFLEtBQU0sUUFBUSxHQUFoQixFQUFSLENBQVIsRUFBdEI7OztBQUdBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLE1BQTlCLEVBQXFDLEtBQUssa0JBQTFDO0FBQ0g7OztnREFFbUIsSyxFQUFPO0FBQ3pCLGtCQUFFLE1BQU0sTUFBUixFQUFnQixXQUFoQixDQUE0QixRQUE1QjtBQUNEOzs7Z0RBRW1CLEMsRUFBRztBQUNuQixvQkFBSSxlQUFlLEVBQUUsTUFBRixDQUFTLFVBQVQsQ0FBb0IsU0FBcEIsRUFBK0IsS0FBbEQ7QUFDQSx5QkFBUyxPQUFULENBQWlCLGtCQUFqQixFQUFvQyxZQUFwQztBQUNIOzs7Z0NBakRlO0FBQUUsdUJBQU8sWUFBUDtBQUFxQjs7O2dDQUV6QjtBQUFFLHVCQUFPLEtBQVA7QUFBYzs7O2dDQUVkO0FBQ1osdUJBQU8scUJBQVcsUUFBWCxDQUFvQixNQUFwQixDQUEyQjtBQUM5Qiw4QkFBVSxxQkFBRSxRQUFGLDJCQURvQjtBQUU5QiwrQkFBWTtBQUZrQixpQkFBM0IsQ0FBUDtBQUlIOzs7Z0NBRWM7QUFDWCx1QkFBTyxxQkFBRSxRQUFGLDJCQUFQO0FBQ0g7OztnQ0FFcUI7QUFDbEIsdUJBQU87QUFDSCx5QkFBTSxLQUFLLE9BQUwsQ0FBYTtBQURoQixpQkFBUDtBQUdIOzs7Z0NBU3dCO0FBQUUsdUJBQU8sYUFBUDtBQUFzQjs7OztNQWhDM0IscUJBQVcsYTs7c0JBd0R0QixXIiwiZmlsZSI6InRyYWNrX2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAwMDozNToxOVxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBBdHRhY2htZW50Q29sbGVjdGlvbiBmcm9tICdtb2RlbHMvYXR0YWNobWVudF9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RyYWNrX2xpc3RfdG1wbC5odG1sJztcbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvdHJhY2tfaXRlbV90bXBsLmh0bWwnO1xuXG5jbGFzcyBUYWdMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICd0cmFjay1saXN0JyB9XG5cbiAgICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdkaXYnIH1cblxuICAgIGdldCBjaGlsZFZpZXcoKSB7IFxuICAgICAgICByZXR1cm4gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoaXRlbVRlbXBsYXRlKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdhdHRhY2htZW50J1xuICAgICAgICB9KTsgXG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFnIDogdGhpcy5vcHRpb25zLnRhZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NsaWNrIC5hdHRhY2htZW50JyA6ICdvbkF0dGFjaG1lbnRDbGlja2VkJyxcbiAgICAgICAgJ2NsaWNrIC5wbGF5LWJ1dHRvbicgOiAnb25QbGF5QnV0dG9uQ2xpY2tlZCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyN0cmFjay1saXN0JyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBBdHRhY2htZW50Q29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goeyBkYXRhOiAkLnBhcmFtKHsgdGFnIDogb3B0aW9ucy50YWd9KcKgfSk7XG5cbiAgICAgICAgLy8gc2V0dXAgY29sbGVjdGlvbiBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMub25Db2xsZWN0aW9uTG9hZGVkKVxuICAgIH1cblxuICAgIG9uQXR0YWNobWVudENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICQoZXZlbnQudGFyZ2V0KS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9XG5cbiAgICBvblBsYXlCdXR0b25DbGlja2VkKGUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRJZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzaG93OmF1ZGlvcGxheWVyJyxhdHRhY2htZW50SWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdFZpZXciXX0=