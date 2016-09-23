define(['exports', 'backbone', 'marionette', 'underscore', 'moment', 'config', 'models/interview_model', 'underscoreString', 'text!templates/interview_tmpl.html', 'moment_en_gb'], function (exports, _backbone, _marionette, _underscore, _moment, _config, _interview_model, _underscoreString, _interview_tmpl) {
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

  var _moment2 = _interopRequireDefault(_moment);

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

      return _possibleConstructorReturn(this, Object.getPrototypeOf(InterviewView).apply(this, arguments));
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
            return (0, _moment2.default)(date).format("D.M.YYYY");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0JNLGE7Ozs7Ozs7Ozs7OytCQW1CTztBQUNQLGVBQU87QUFDTCwrQkFBc0IscUJBRGpCO0FBRUwsZ0NBQXVCO0FBRmxCLFNBQVA7QUFJRDs7O2lDQUdVLE8sRUFBUztBQUNoQixhQUFLLEtBQUwsR0FBYSw4QkFBbUIsRUFBRSxLQUFLLFFBQVEsRUFBZixFQUFuQixDQUFiO0FBQ0EsYUFBSyxLQUFMLENBQVcsS0FBWDs7O0FBR0EsYUFBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLLE1BQXZDO0FBQ0g7OzswQ0FFbUIsSyxFQUFPO0FBQ3pCLFVBQUUsTUFBTSxNQUFSLEVBQWdCLFdBQWhCLENBQTRCLFFBQTVCO0FBQ0Q7OzswQ0FFbUIsQyxFQUFHO0FBQ25CLFlBQUksZUFBZSxFQUFFLE1BQUYsQ0FBUyxVQUFULENBQW9CLFNBQXBCLEVBQStCLEtBQWxEO0FBQ0EsMkJBQVMsT0FBVCxDQUFpQixrQkFBakIsRUFBb0MsWUFBcEM7QUFDSDs7OzBCQXZDYztBQUFFLGVBQU8scUJBQUUsUUFBRiwwQkFBUDtBQUE2Qjs7OzBCQUU5QjtBQUFFLGVBQU8sWUFBUDtBQUFxQjs7OzBCQUVqQjtBQUN0QixlQUFPO0FBQ0wsb0JBQVcsaUJBQU8sU0FBUCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQURqRDtBQUVILHNCQUFhLG9CQUFTLElBQVQsRUFBZTtBQUMxQixtQkFBTyxzQkFBTyxJQUFQLEVBQWEsTUFBYixDQUFvQixVQUFwQixDQUFQO0FBQ0QsV0FKRTtBQUtILG9CQUFXLGtCQUFTLE1BQVQsRUFBaUI7QUFDMUIsbUJBQU8sMkJBQUssUUFBTCxDQUFjLE1BQWQsRUFBcUIsaUJBQU8sbUJBQTVCLENBQVA7QUFDRDtBQVBFLFNBQVA7QUFTQzs7OztJQWpCdUIscUJBQVcsVTs7b0JBK0N4QixhIiwiZmlsZSI6ImludGVydmlld192aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE1IDE0OjQ0OjMyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IE1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdtb21lbnRfZW5fZ2InO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IEludGVydmlld01vZGVsIGZyb20gJ21vZGVscy9pbnRlcnZpZXdfbW9kZWwnO1xuaW1wb3J0IF9zdHIgZnJvbSAndW5kZXJzY29yZVN0cmluZyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9pbnRlcnZpZXdfdG1wbC5odG1sJztcblxuY2xhc3MgSW50ZXJ2aWV3VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3NpbmdsZXZpZXcnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0ICByZXR1cm4ge1xuXHRcdCAgICBmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgIGZvcm1hdERhdGUgOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgcmV0dXJuIE1vbWVudChkYXRlKS5mb3JtYXQoXCJELk0uWVlZWVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJ1bmNhdGUgOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gX3N0ci50cnVuY2F0ZShzdHJpbmcsQ29uZmlnLnN0cmluZ1RydW5jYXRlU2hvcnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnY2xpY2sgLmF0dGFjaG1lbnQnIDogJ29uQXR0YWNobWVudENsaWNrZWQnLFxuICAgICAgICAnY2xpY2sgLnBsYXktYnV0dG9uJyA6ICdvblBsYXlCdXR0b25DbGlja2VkJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBJbnRlcnZpZXdNb2RlbCh7IF9pZDogb3B0aW9ucy5pZCB9KTtcbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0ZW4gdG8gbW9kZWwgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLnJlbmRlcik7XG4gICAgfVxuXG4gICAgb25BdHRhY2htZW50Q2xpY2tlZChldmVudCkge1xuICAgICAgJChldmVudC50YXJnZXQpLnRvZ2dsZUNsYXNzKFwiZXhwYW5kXCIpO1xuICAgIH1cblxuICAgIG9uUGxheUJ1dHRvbkNsaWNrZWQoZSkge1xuICAgICAgICB2YXIgYXR0YWNobWVudElkID0gZS50YXJnZXQuYXR0cmlidXRlc1snZGF0YS1pZCddLnZhbHVlXG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIoJ3Nob3c6YXVkaW9wbGF5ZXInLGF0dGFjaG1lbnRJZCk7XG4gICAgfVxuXG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld1ZpZXciXX0=