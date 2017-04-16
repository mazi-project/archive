define(['exports', 'marionette', 'underscore', 'models/question_collection', 'text!templates/question_list_tmpl.html', 'text!templates/question_item_tmpl.html'], function (exports, _marionette, _underscore, _question_collection, _question_list_tmpl, _question_item_tmpl) {
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

    var _question_collection2 = _interopRequireDefault(_question_collection);

    var _question_list_tmpl2 = _interopRequireDefault(_question_list_tmpl);

    var _question_item_tmpl2 = _interopRequireDefault(_question_item_tmpl);

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

    var QuestionListView = function (_Marionette$Composite) {
        _inherits(QuestionListView, _Marionette$Composite);

        function QuestionListView() {
            _classCallCheck(this, QuestionListView);

            return _possibleConstructorReturn(this, (QuestionListView.__proto__ || Object.getPrototypeOf(QuestionListView)).apply(this, arguments));
        }

        _createClass(QuestionListView, [{
            key: 'initialize',
            value: function initialize(options) {

                this.collection = new _question_collection2.default();
                this.collection.fetch();
            }
        }, {
            key: 'className',
            get: function get() {
                return 'question-page';
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
                    template: _underscore2.default.template(_question_item_tmpl2.default),
                    className: 'item',
                    templateHelpers: {
                        encodeUri: encodeURIComponent
                    }
                });
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_question_list_tmpl2.default);
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#questions';
            }
        }]);

        return QuestionListView;
    }(_marionette2.default.CompositeView);

    exports.default = QuestionListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9xdWVzdGlvbl9saXN0X3ZpZXcuanMiXSwibmFtZXMiOlsiUXVlc3Rpb25MaXN0VmlldyIsIm9wdGlvbnMiLCJjb2xsZWN0aW9uIiwiZmV0Y2giLCJJdGVtVmlldyIsImV4dGVuZCIsInRlbXBsYXRlIiwiY2xhc3NOYW1lIiwidGVtcGxhdGVIZWxwZXJzIiwiZW5jb2RlVXJpIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFjTUEsZ0I7Ozs7Ozs7Ozs7O3VDQXlCU0MsTyxFQUFTOztBQUVoQixxQkFBS0MsVUFBTCxHQUFrQixtQ0FBbEI7QUFDQSxxQkFBS0EsVUFBTCxDQUFnQkMsS0FBaEI7QUFDSDs7O2dDQXpCZTtBQUFFLHVCQUFPLGVBQVA7QUFBd0I7OztnQ0FFNUI7QUFBRSx1QkFBTyxLQUFQO0FBQWM7OztnQ0FFZDtBQUNaLHVCQUFPLHFCQUFXQyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQjtBQUM5QkMsOEJBQVUscUJBQUVBLFFBQUYsOEJBRG9CO0FBRTlCQywrQkFBVyxNQUZtQjtBQUc5QkMscUNBQWlCO0FBQ2JDLG1DQUFZQztBQURDO0FBSGEsaUJBQTNCLENBQVA7QUFPSDs7O2dDQUVjO0FBQ1gsdUJBQU8scUJBQUVKLFFBQUYsOEJBQVA7QUFDSDs7O2dDQUV3QjtBQUFFLHVCQUFPLFlBQVA7QUFBcUI7Ozs7TUF0QnJCLHFCQUFXSyxhOztzQkFnQzNCWCxnQiIsImZpbGUiOiJxdWVzdGlvbl9saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMDA6MTU6MThcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgUXVlc3Rpb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9xdWVzdGlvbl9jb2xsZWN0aW9uJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3F1ZXN0aW9uX2xpc3RfdG1wbC5odG1sJztcbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvcXVlc3Rpb25faXRlbV90bXBsLmh0bWwnO1xuXG5jbGFzcyBRdWVzdGlvbkxpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3F1ZXN0aW9uLXBhZ2UnIH1cblxuICAgIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ2RpdicgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHsgXG4gICAgICAgIHJldHVybiBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShpdGVtVGVtcGxhdGUpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbScsXG4gICAgICAgICAgICB0ZW1wbGF0ZUhlbHBlcnM6IHtcbiAgICAgICAgICAgICAgICBlbmNvZGVVcmkgOiBlbmNvZGVVUklDb21wb25lbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpXG4gICAgfVxuXG4gICAgZ2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjcXVlc3Rpb25zJyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbmV3IFF1ZXN0aW9uQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXN0aW9uTGlzdFZpZXciXX0=