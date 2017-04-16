define(['exports', 'marionette', 'underscore', 'text!templates/main_tmpl.html'], function (exports, _marionette, _underscore, _main_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-08 00:40:26
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _main_tmpl2 = _interopRequireDefault(_main_tmpl);

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

    var MainView = function (_Marionette$LayoutVie) {
        _inherits(MainView, _Marionette$LayoutVie);

        function MainView() {
            _classCallCheck(this, MainView);

            return _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).apply(this, arguments));
        }

        _createClass(MainView, [{
            key: 'regions',
            value: function regions() {
                return {
                    headerRegion: '#header',
                    menuRegion: '#menu',
                    contentRegion: '#content',
                    playerRegion: '#player'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_main_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'page';
            }
        }]);

        return MainView;
    }(_marionette2.default.LayoutView);

    exports.default = MainView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9tYWluX3ZpZXcuanMiXSwibmFtZXMiOlsiTWFpblZpZXciLCJoZWFkZXJSZWdpb24iLCJtZW51UmVnaW9uIiwiY29udGVudFJlZ2lvbiIsInBsYXllclJlZ2lvbiIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFZTUEsUTs7Ozs7Ozs7Ozs7c0NBT1E7QUFBRSx1QkFBTztBQUNmQyxrQ0FBYyxTQURDO0FBRWZDLGdDQUFZLE9BRkc7QUFHbEJDLG1DQUFlLFVBSEc7QUFJZkMsa0NBQWM7QUFKQyxpQkFBUDtBQUtWOzs7dUNBR1NDLE8sRUFBUyxDQUVuQjs7O2dDQWRjO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYscUJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxNQUFQO0FBQWU7Ozs7TUFMZCxxQkFBV0MsVTs7c0JBcUJuQlAsUSIsImZpbGUiOiJtYWluX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDggMDA6NDA6MjZcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvbWFpbl90bXBsLmh0bWwnO1xuXG5jbGFzcyBNYWluVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAncGFnZScgfVxuXG4gICAgcmVnaW9ucygpIHsgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyUmVnaW9uOiAnI2hlYWRlcicsXG4gICAgICAgIG1lbnVSZWdpb246ICcjbWVudScsXG4gICAgXHRjb250ZW50UmVnaW9uOiAnI2NvbnRlbnQnLFxuICAgICAgICBwbGF5ZXJSZWdpb246ICcjcGxheWVyJ1xuICAgIH19XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5WaWV3Il19