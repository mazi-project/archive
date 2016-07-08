define(['exports', 'marionette', 'underscore', 'config', 'models/attachment_model', 'text!templates/audioplayer_tmpl.html'], function (exports, _marionette, _underscore, _config, _attachment_model, _audioplayer_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-08 01:06:09
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _config2 = _interopRequireDefault(_config);

  var _attachment_model2 = _interopRequireDefault(_attachment_model);

  var _audioplayer_tmpl2 = _interopRequireDefault(_audioplayer_tmpl);

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

  var AudioPlayerView = function (_Marionette$ItemView) {
    _inherits(AudioPlayerView, _Marionette$ItemView);

    function AudioPlayerView() {
      _classCallCheck(this, AudioPlayerView);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioPlayerView).apply(this, arguments));
    }

    _createClass(AudioPlayerView, [{
      key: 'initialize',
      value: function initialize(options) {

        this.model = new _attachment_model2.default({ _id: options.id });
        this.model.fetch();

        this.listenTo(this.model, 'change', this.render);
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_audioplayer_tmpl2.default);
      }
    }, {
      key: 'templateHelpers',
      get: function get() {
        return {
          filesUrl: _config2.default.files_url + this.model.get('interview') + '/'
        };
      }
    }, {
      key: 'className',
      get: function get() {
        return 'audioplayer';
      }
    }]);

    return AudioPlayerView;
  }(_marionette2.default.ItemView);

  exports.default = AudioPlayerView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdWRpb3BsYXllcl92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQk0sZTs7Ozs7Ozs7Ozs7aUNBY1MsTyxFQUFTOztBQUVoQixhQUFLLEtBQUwsR0FBYSwrQkFBb0IsRUFBRSxLQUFLLFFBQVEsRUFBZixFQUFwQixDQUFiO0FBQ0EsYUFBSyxLQUFMLENBQVcsS0FBWDs7QUFFQSxhQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQW5CLEVBQXlCLFFBQXpCLEVBQWtDLEtBQUssTUFBdkM7QUFDSDs7OzBCQWpCYztBQUFFLGVBQU8scUJBQUUsUUFBRiw0QkFBUDtBQUE2Qjs7OzBCQUV4QjtBQUN4QixlQUFPO0FBQ04sb0JBQVcsaUJBQU8sU0FBUCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUFuQixHQUFpRDtBQUR0RCxTQUFQO0FBR0E7OzswQkFFa0I7QUFBRSxlQUFPLGFBQVA7QUFBc0I7Ozs7SUFYZCxxQkFBVyxROztvQkF1QjFCLGUiLCJmaWxlIjoiYXVkaW9wbGF5ZXJfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wOCAwMTowNjowOVxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQXR0YWNobWVudE1vZGVsIGZyb20gJ21vZGVscy9hdHRhY2htZW50X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2F1ZGlvcGxheWVyX3RtcGwuaHRtbCc7XG5cbmNsYXNzIEF1ZGlvUGxheWVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICBcdGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdpbnRlcnZpZXcnKSArICcvJyxcblx0XHR9XG5cdH1cblxuICAgXHRnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2F1ZGlvcGxheWVyJyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IEF0dGFjaG1lbnRNb2RlbCh7IF9pZDogb3B0aW9ucy5pZH0gKTtcbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLnJlbmRlcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb1BsYXllclZpZXciXX0=