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
          'click .attachment': 'onAttachmentClicked',
          'click .play-button': 'onPlayButtonClicked'
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
      key: 'onAttachmentClicked',
      value: function onAttachmentClicked(event) {
        $(event.target).toggleClass("expand");
      }
    }, {
      key: 'onPlayButtonClicked',
      value: function onPlayButtonClicked(e) {
        var attachmentId = e.target.attributes['data-id'].value;
        _backbone2.default.trigger('show:audioplayer', attachmentId);
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
          filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
          formatDate: function formatDate(date) {
            return Moment(date).format("D.M.YYYY");
          },
          truncate: function truncate(string) {
            return _underscoreString2.default.truncate(string, _config2.default.stringTruncateShort);
          }
        };
      }
    }]);

    return InterviewView;
  }(_marionette2.default.LayoutView);

  exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3Iiwib3B0aW9ucyIsIm1vZGVsIiwiX2lkIiwiaWQiLCJmZXRjaCIsImxpc3RlblRvIiwicmVuZGVyIiwiZXZlbnQiLCIkIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJlIiwiYXR0YWNobWVudElkIiwiYXR0cmlidXRlcyIsInZhbHVlIiwidHJpZ2dlciIsInRlbXBsYXRlIiwiZmlsZXNVcmwiLCJmaWxlc191cmwiLCJnZXQiLCJmb3JtYXREYXRlIiwiZGF0ZSIsIk1vbWVudCIsImZvcm1hdCIsInRydW5jYXRlIiwic3RyaW5nIiwic3RyaW5nVHJ1bmNhdGVTaG9ydCIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQWdCTUEsYTs7Ozs7Ozs7Ozs7K0JBbUJPO0FBQ1AsZUFBTztBQUNMLCtCQUFzQixxQkFEakI7QUFFTCxnQ0FBdUI7QUFGbEIsU0FBUDtBQUlEOzs7aUNBR1VDLE8sRUFBUztBQUNoQixhQUFLQyxLQUFMLEdBQWEsOEJBQW1CLEVBQUVDLEtBQUtGLFFBQVFHLEVBQWYsRUFBbkIsQ0FBYjtBQUNBLGFBQUtGLEtBQUwsQ0FBV0csS0FBWDs7QUFFQTtBQUNBLGFBQUtDLFFBQUwsQ0FBYyxLQUFLSixLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLSyxNQUF2QztBQUNIOzs7MENBRW1CQyxLLEVBQU87QUFDekJDLFVBQUVELE1BQU1FLE1BQVIsRUFBZ0JDLFdBQWhCLENBQTRCLFFBQTVCO0FBQ0Q7OzswQ0FFbUJDLEMsRUFBRztBQUNuQixZQUFJQyxlQUFlRCxFQUFFRixNQUFGLENBQVNJLFVBQVQsQ0FBb0IsU0FBcEIsRUFBK0JDLEtBQWxEO0FBQ0EsMkJBQVNDLE9BQVQsQ0FBaUIsa0JBQWpCLEVBQW9DSCxZQUFwQztBQUNIOzs7MEJBdkNjO0FBQUUsZUFBTyxxQkFBRUksUUFBRiwwQkFBUDtBQUE2Qjs7OzBCQUU5QjtBQUFFLGVBQU8sWUFBUDtBQUFxQjs7OzBCQUVqQjtBQUN0QixlQUFPO0FBQ0xDLG9CQUFXLGlCQUFPQyxTQUFQLEdBQW1CLEtBQUtqQixLQUFMLENBQVdrQixHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQURqRDtBQUVIQyxzQkFBYSxvQkFBU0MsSUFBVCxFQUFlO0FBQzFCLG1CQUFPQyxPQUFPRCxJQUFQLEVBQWFFLE1BQWIsQ0FBb0IsVUFBcEIsQ0FBUDtBQUNELFdBSkU7QUFLSEMsb0JBQVcsa0JBQVNDLE1BQVQsRUFBaUI7QUFDMUIsbUJBQU8sMkJBQUtELFFBQUwsQ0FBY0MsTUFBZCxFQUFxQixpQkFBT0MsbUJBQTVCLENBQVA7QUFDRDtBQVBFLFNBQVA7QUFTQzs7OztJQWpCdUIscUJBQVdDLFU7O29CQStDeEI1QixhIiwiZmlsZSI6ImludGVydmlld192aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDE0OjQ0OjMyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcbmltcG9ydCBfc3RyIGZyb20gJ3VuZGVyc2NvcmVTdHJpbmcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X3RtcGwuaHRtbCc7XG5cbmNsYXNzIEludGVydmlld1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdzaW5nbGV2aWV3JyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdCAgcmV0dXJuIHtcblx0XHQgICAgZmlsZXNVcmwgOiBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nLFxuICAgICAgICBmb3JtYXREYXRlIDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgIHJldHVybiBNb21lbnQoZGF0ZSkuZm9ybWF0KFwiRC5NLllZWVlcIik7XG4gICAgICAgIH0sXG4gICAgICAgIHRydW5jYXRlIDogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIF9zdHIudHJ1bmNhdGUoc3RyaW5nLENvbmZpZy5zdHJpbmdUcnVuY2F0ZVNob3J0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ2NsaWNrIC5hdHRhY2htZW50JyA6ICdvbkF0dGFjaG1lbnRDbGlja2VkJyxcbiAgICAgICAgJ2NsaWNrIC5wbGF5LWJ1dHRvbicgOiAnb25QbGF5QnV0dG9uQ2xpY2tlZCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgIHRoaXMubW9kZWwuZmV0Y2goKTtcbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsdGhpcy5yZW5kZXIpO1xuICAgIH1cblxuICAgIG9uQXR0YWNobWVudENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICQoZXZlbnQudGFyZ2V0KS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9XG5cbiAgICBvblBsYXlCdXR0b25DbGlja2VkKGUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRJZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzaG93OmF1ZGlvcGxheWVyJyxhdHRhY2htZW50SWQpO1xuICAgIH1cblxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdWaWV3Il19