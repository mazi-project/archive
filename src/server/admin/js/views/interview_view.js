define(['exports', 'backbone', 'marionette', 'underscore', 'config', 'models/interview_model', 'underscoreString', 'text!templates/interview_tmpl.html'], function (exports, _backbone, _marionette, _underscore, _config, _interview_model, _underscoreString, _interview_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-15 14:44:32
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _backbone2 = _interopRequireDefault(_backbone);

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _config2 = _interopRequireDefault(_config);

  var _interview_model2 = _interopRequireDefault(_interview_model);

  var _underscoreString2 = _interopRequireDefault(_underscoreString);

  var _interview_tmpl2 = _interopRequireDefault(_interview_tmpl);

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

  var InterviewView = function (_Marionette$LayoutVie) {
    _inherits(InterviewView, _Marionette$LayoutVie);

    function InterviewView() {
      _classCallCheck(this, InterviewView);

      return _possibleConstructorReturn(this, (InterviewView.__proto__ || Object.getPrototypeOf(InterviewView)).apply(this, arguments));
    }

    _createClass(InterviewView, [{
      key: 'events',
      value: function events() {
        return {
          'click #saveButton': 'onSaveButtonClicked'
        };
      }
    }, {
      key: 'initialize',
      value: function initialize(options) {
        this.model = new _interview_model2.default({ _id: options.id });
        this.model.fetch();

        //listen to model events
        this.listenTo(this.model, 'change', this.render);
      }
    }, {
      key: 'onSaveButtonClicked',
      value: function onSaveButtonClicked() {
        this.model.set('name', $("#input-name").val());

        console.log(this.model);
        this.model.save();
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_interview_tmpl2.default);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'singleview';
      }
    }, {
      key: 'templateHelpers',
      get: function get() {
        return {
          filesUrl: _config2.default.files_url + this.model.get('_id') + '/'
        };
      }
    }]);

    return InterviewView;
  }(_marionette2.default.LayoutView);

  exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3Iiwib3B0aW9ucyIsIm1vZGVsIiwiX2lkIiwiaWQiLCJmZXRjaCIsImxpc3RlblRvIiwicmVuZGVyIiwic2V0IiwiJCIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJzYXZlIiwidGVtcGxhdGUiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsImdldCIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWdCTUEsYTs7Ozs7Ozs7Ozs7K0JBYU87QUFDUCxlQUFPO0FBQ0wsK0JBQXNCO0FBRGpCLFNBQVA7QUFHRDs7O2lDQUdVQyxPLEVBQVM7QUFDaEIsYUFBS0MsS0FBTCxHQUFhLDhCQUFtQixFQUFFQyxLQUFLRixRQUFRRyxFQUFmLEVBQW5CLENBQWI7QUFDQSxhQUFLRixLQUFMLENBQVdHLEtBQVg7O0FBRUE7QUFDQSxhQUFLQyxRQUFMLENBQWMsS0FBS0osS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBS0ssTUFBdkM7QUFDSDs7OzRDQUVxQjtBQUNwQixhQUFLTCxLQUFMLENBQVdNLEdBQVgsQ0FBZSxNQUFmLEVBQXVCQyxFQUFFLGFBQUYsRUFBaUJDLEdBQWpCLEVBQXZCOztBQUVBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtWLEtBQWpCO0FBQ0EsYUFBS0EsS0FBTCxDQUFXVyxJQUFYO0FBQ0Q7OzswQkE5QmM7QUFBRSxlQUFPLHFCQUFFQyxRQUFGLDBCQUFQO0FBQTZCOzs7MEJBRTlCO0FBQUUsZUFBTyxZQUFQO0FBQXFCOzs7MEJBRWpCO0FBQ3RCLGVBQU87QUFDTEMsb0JBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS2QsS0FBTCxDQUFXZSxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQztBQURqRCxTQUFQO0FBR0M7Ozs7SUFYdUIscUJBQVdDLFU7O29CQXFDeEJsQixhIiwiZmlsZSI6ImludGVydmlld192aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDE0OjQ0OjMyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcbmltcG9ydCBfc3RyIGZyb20gJ3VuZGVyc2NvcmVTdHJpbmcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X3RtcGwuaHRtbCc7XG5cbmNsYXNzIEludGVydmlld1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdzaW5nbGV2aWV3JyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdCAgcmV0dXJuIHtcblx0XHQgICAgZmlsZXNVcmwgOiBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NsaWNrICNzYXZlQnV0dG9uJyA6ICdvblNhdmVCdXR0b25DbGlja2VkJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBJbnRlcnZpZXdNb2RlbCh7IF9pZDogb3B0aW9ucy5pZCB9KTtcbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0ZW4gdG8gbW9kZWwgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLnJlbmRlcik7XG4gICAgfVxuXG4gICAgb25TYXZlQnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgIHRoaXMubW9kZWwuc2V0KCduYW1lJywgJChcIiNpbnB1dC1uYW1lXCIpLnZhbCgpKTtcblxuICAgICAgY29uc29sZS5sb2codGhpcy5tb2RlbCk7XG4gICAgICB0aGlzLm1vZGVsLnNhdmUoKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld1ZpZXciXX0=