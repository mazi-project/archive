define(['exports', 'marionette', 'underscore', 'models/tag_collection', 'text!templates/tag_list_tmpl.html', 'text!templates/tag_item_tmpl.html'], function (exports, _marionette, _underscore, _tag_collection, _tag_list_tmpl, _tag_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 00:15:18
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _tag_collection2 = _interopRequireDefault(_tag_collection);

    var _tag_list_tmpl2 = _interopRequireDefault(_tag_list_tmpl);

    var _tag_item_tmpl2 = _interopRequireDefault(_tag_item_tmpl);

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
            key: 'initialize',
            value: function initialize(options) {

                this.collection = new _tag_collection2.default();
                this.collection.fetch();
            }
        }, {
            key: 'className',
            get: function get() {
                return 'tags-page';
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
                    template: _underscore2.default.template(_tag_item_tmpl2.default)
                });
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_tag_list_tmpl2.default);
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#tags';
            }
        }]);

        return TagListView;
    }(_marionette2.default.CompositeView);

    exports.default = TagListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbIlRhZ0xpc3RWaWV3Iiwib3B0aW9ucyIsImNvbGxlY3Rpb24iLCJmZXRjaCIsIkl0ZW1WaWV3IiwiZXh0ZW5kIiwidGVtcGxhdGUiLCJDb21wb3NpdGVWaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWNNQSxXOzs7Ozs7Ozs7Ozt1Q0FxQlNDLE8sRUFBUzs7QUFFaEIscUJBQUtDLFVBQUwsR0FBa0IsOEJBQWxCO0FBQ0EscUJBQUtBLFVBQUwsQ0FBZ0JDLEtBQWhCO0FBQ0g7OztnQ0FyQmU7QUFBRSx1QkFBTyxXQUFQO0FBQW9COzs7Z0NBRXhCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOzs7Z0NBRWQ7QUFDWix1QkFBTyxxQkFBV0MsUUFBWCxDQUFvQkMsTUFBcEIsQ0FBMkI7QUFDOUJDLDhCQUFVLHFCQUFFQSxRQUFGO0FBRG9CLGlCQUEzQixDQUFQO0FBR0g7OztnQ0FFYztBQUNYLHVCQUFPLHFCQUFFQSxRQUFGLHlCQUFQO0FBQ0g7OztnQ0FFd0I7QUFBRSx1QkFBTyxPQUFQO0FBQWdCOzs7O01BbEJyQixxQkFBV0MsYTs7c0JBNEJ0QlAsVyIsImZpbGUiOiJ0YWdfbGlzdF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDAwOjE1OjE4XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFRhZ0NvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3RhZ19jb2xsZWN0aW9uJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RhZ19saXN0X3RtcGwuaHRtbCc7XG5pbXBvcnQgaXRlbVRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RhZ19pdGVtX3RtcGwuaHRtbCc7XG5cbmNsYXNzIFRhZ0xpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3RhZ3MtcGFnZScgfVxuXG4gICAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnZGl2JyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkgeyBcbiAgICAgICAgcmV0dXJuIE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKGl0ZW1UZW1wbGF0ZSlcbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpXG4gICAgfVxuXG4gICAgZ2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjdGFncycgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBUYWdDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5mZXRjaCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdFZpZXciXX0=