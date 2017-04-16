define(['exports', 'marionette', 'underscore', 'text!templates/menu_tmpl.html'], function (exports, _marionette, _underscore, _menu_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-11 23:58:17
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _menu_tmpl2 = _interopRequireDefault(_menu_tmpl);

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

  var MenuView = function (_Marionette$ItemView) {
    _inherits(MenuView, _Marionette$ItemView);

    function MenuView() {
      _classCallCheck(this, MenuView);

      return _possibleConstructorReturn(this, (MenuView.__proto__ || Object.getPrototypeOf(MenuView)).apply(this, arguments));
    }

    _createClass(MenuView, [{
      key: 'initialize',
      value: function initialize(options) {
        this.options = options;
      }
    }, {
      key: 'onShow',
      value: function onShow() {
        if (_underscore2.default.has(this.options, 'highlight')) {
          this.$(this.options.highlight).addClass("selected");
        }
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_menu_tmpl2.default);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'menu';
      }
    }]);

    return MenuView;
  }(_marionette2.default.ItemView);

  exports.default = MenuView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9tZW51X3ZpZXcuanMiXSwibmFtZXMiOlsiTWVudVZpZXciLCJvcHRpb25zIiwiaGFzIiwiJCIsImhpZ2hsaWdodCIsImFkZENsYXNzIiwidGVtcGxhdGUiLCJJdGVtVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQVlNQSxROzs7Ozs7Ozs7OztpQ0FRU0MsTyxFQUFTO0FBQ25CLGFBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNBOzs7K0JBRVE7QUFDUixZQUFJLHFCQUFFQyxHQUFGLENBQU0sS0FBS0QsT0FBWCxFQUFtQixXQUFuQixDQUFKLEVBQXFDO0FBQ3BDLGVBQUtFLENBQUwsQ0FBTyxLQUFLRixPQUFMLENBQWFHLFNBQXBCLEVBQStCQyxRQUEvQixDQUF3QyxVQUF4QztBQUNBO0FBQ0Q7OzswQkFiYztBQUFFLGVBQU8scUJBQUVDLFFBQUYscUJBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLE1BQVA7QUFBZTs7OztJQUxkLHFCQUFXQyxROztvQkFvQm5CUCxRIiwiZmlsZSI6Im1lbnVfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xMSAyMzo1ODoxN1xuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9tZW51X3RtcGwuaHRtbCc7XG5cbmNsYXNzIE1lbnVWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ21lbnUnIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICBcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgIFx0aWYgKF8uaGFzKHRoaXMub3B0aW9ucywnaGlnaGxpZ2h0JykpIHtcbiAgICBcdFx0dGhpcy4kKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgXHR9XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBNZW51VmlldyJdfQ==