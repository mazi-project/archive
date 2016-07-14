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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TagListView).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFnQk0sVzs7Ozs7Ozs7Ozs7dUNBcUJTLE8sRUFBUzs7QUFFaEIscUJBQUssVUFBTCxHQUFrQiw4QkFBbEI7QUFDQSxxQkFBSyxVQUFMLENBQWdCLEtBQWhCO0FBQ0g7OztnQ0FyQmU7QUFBRSx1QkFBTyxXQUFQO0FBQW9COzs7Z0NBRXhCO0FBQUUsdUJBQU8sS0FBUDtBQUFjOzs7Z0NBRWQ7QUFDWix1QkFBTyxxQkFBVyxRQUFYLENBQW9CLE1BQXBCLENBQTJCO0FBQzlCLDhCQUFVLHFCQUFFLFFBQUY7QUFEb0IsaUJBQTNCLENBQVA7QUFHSDs7O2dDQUVjO0FBQ1gsdUJBQU8scUJBQUUsUUFBRix5QkFBUDtBQUNIOzs7Z0NBRXdCO0FBQUUsdUJBQU8sT0FBUDtBQUFnQjs7OztNQWxCckIscUJBQVcsYTs7c0JBNEJ0QixXIiwiZmlsZSI6InRhZ19saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MTU6MThcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgVGFnQ29sbGVjdGlvbiBmcm9tICdtb2RlbHMvdGFnX2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvdGFnX2xpc3RfdG1wbC5odG1sJztcbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvdGFnX2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgVGFnTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAndGFncy1wYWdlJyB9XG5cbiAgICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICdkaXYnIH1cblxuICAgIGdldCBjaGlsZFZpZXcoKSB7IFxuICAgICAgICByZXR1cm4gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoaXRlbVRlbXBsYXRlKVxuICAgICAgICB9KTsgXG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSlcbiAgICB9XG5cbiAgICBnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyN0YWdzJyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbmV3IFRhZ0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWdMaXN0VmlldyJdfQ==