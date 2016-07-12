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

      return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuView).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9tZW51X3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BY00sUTs7Ozs7Ozs7Ozs7aUNBUVMsTyxFQUFTO0FBQ25CLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQTs7OytCQUVRO0FBQ1IsWUFBSSxxQkFBRSxHQUFGLENBQU0sS0FBSyxPQUFYLEVBQW1CLFdBQW5CLENBQUosRUFBcUM7QUFDcEMsZUFBSyxDQUFMLENBQU8sS0FBSyxPQUFMLENBQWEsU0FBcEIsRUFBK0IsUUFBL0IsQ0FBd0MsVUFBeEM7QUFDQTtBQUNEOzs7MEJBYmM7QUFBRSxlQUFPLHFCQUFFLFFBQUYscUJBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLE1BQVA7QUFBZTs7OztJQUxkLHFCQUFXLFE7O29CQW9CbkIsUSIsImZpbGUiOiJtZW51X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTEgMjM6NTg6MTdcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvbWVudV90bXBsLmh0bWwnO1xuXG5jbGFzcyBNZW51VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdtZW51JyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgXHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICBcdGlmIChfLmhhcyh0aGlzLm9wdGlvbnMsJ2hpZ2hsaWdodCcpKSB7XG4gICAgXHRcdHRoaXMuJCh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIFx0fVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVudVZpZXciXX0=