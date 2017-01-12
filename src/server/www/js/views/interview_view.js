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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3Iiwib3B0aW9ucyIsIm1vZGVsIiwiX2lkIiwiaWQiLCJmZXRjaCIsImxpc3RlblRvIiwicmVuZGVyIiwiZXZlbnQiLCIkIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJlIiwiYXR0YWNobWVudElkIiwiYXR0cmlidXRlcyIsInZhbHVlIiwidHJpZ2dlciIsInRlbXBsYXRlIiwiZmlsZXNVcmwiLCJmaWxlc191cmwiLCJnZXQiLCJmb3JtYXREYXRlIiwiZGF0ZSIsImZvcm1hdCIsInRydW5jYXRlIiwic3RyaW5nIiwic3RyaW5nVHJ1bmNhdGVTaG9ydCIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Ba0JNQSxhOzs7Ozs7Ozs7OzsrQkFtQk87QUFDUCxlQUFPO0FBQ0wsK0JBQXNCLHFCQURqQjtBQUVMLGdDQUF1QjtBQUZsQixTQUFQO0FBSUQ7OztpQ0FHVUMsTyxFQUFTO0FBQ2hCLGFBQUtDLEtBQUwsR0FBYSw4QkFBbUIsRUFBRUMsS0FBS0YsUUFBUUcsRUFBZixFQUFuQixDQUFiO0FBQ0EsYUFBS0YsS0FBTCxDQUFXRyxLQUFYOztBQUVBO0FBQ0EsYUFBS0MsUUFBTCxDQUFjLEtBQUtKLEtBQW5CLEVBQXlCLFFBQXpCLEVBQWtDLEtBQUtLLE1BQXZDO0FBQ0g7OzswQ0FFbUJDLEssRUFBTztBQUN6QkMsVUFBRUQsTUFBTUUsTUFBUixFQUFnQkMsV0FBaEIsQ0FBNEIsUUFBNUI7QUFDRDs7OzBDQUVtQkMsQyxFQUFHO0FBQ25CLFlBQUlDLGVBQWVELEVBQUVGLE1BQUYsQ0FBU0ksVUFBVCxDQUFvQixTQUFwQixFQUErQkMsS0FBbEQ7QUFDQSwyQkFBU0MsT0FBVCxDQUFpQixrQkFBakIsRUFBb0NILFlBQXBDO0FBQ0g7OzswQkF2Q2M7QUFBRSxlQUFPLHFCQUFFSSxRQUFGLDBCQUFQO0FBQTZCOzs7MEJBRTlCO0FBQUUsZUFBTyxZQUFQO0FBQXFCOzs7MEJBRWpCO0FBQ3RCLGVBQU87QUFDTEMsb0JBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS2pCLEtBQUwsQ0FBV2tCLEdBQVgsQ0FBZSxLQUFmLENBQW5CLEdBQTJDLEdBRGpEO0FBRUhDLHNCQUFhLG9CQUFTQyxJQUFULEVBQWU7QUFDMUIsbUJBQU8sc0JBQU9BLElBQVAsRUFBYUMsTUFBYixDQUFvQixVQUFwQixDQUFQO0FBQ0QsV0FKRTtBQUtIQyxvQkFBVyxrQkFBU0MsTUFBVCxFQUFpQjtBQUMxQixtQkFBTywyQkFBS0QsUUFBTCxDQUFjQyxNQUFkLEVBQXFCLGlCQUFPQyxtQkFBNUIsQ0FBUDtBQUNEO0FBUEUsU0FBUDtBQVNDOzs7O0lBakJ1QixxQkFBV0MsVTs7b0JBK0N4QjNCLGEiLCJmaWxlIjoiaW50ZXJ2aWV3X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMTQ6NDQ6MzJcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgTW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ21vbWVudF9lbl9nYic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgSW50ZXJ2aWV3TW9kZWwgZnJvbSAnbW9kZWxzL2ludGVydmlld19tb2RlbCc7XG5pbXBvcnQgX3N0ciBmcm9tICd1bmRlcnNjb3JlU3RyaW5nJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld190bXBsLmh0bWwnO1xuXG5jbGFzcyBJbnRlcnZpZXdWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHQgIHJldHVybiB7XG5cdFx0ICAgIGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJyxcbiAgICAgICAgZm9ybWF0RGF0ZSA6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICByZXR1cm4gTW9tZW50KGRhdGUpLmZvcm1hdChcIkQuTS5ZWVlZXCIpO1xuICAgICAgICB9LFxuICAgICAgICB0cnVuY2F0ZSA6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBfc3RyLnRydW5jYXRlKHN0cmluZyxDb25maWcuc3RyaW5nVHJ1bmNhdGVTaG9ydClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAuYXR0YWNobWVudCcgOiAnb25BdHRhY2htZW50Q2xpY2tlZCcsXG4gICAgICAgICdjbGljayAucGxheS1idXR0b24nIDogJ29uUGxheUJ1dHRvbkNsaWNrZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IEludGVydmlld01vZGVsKHsgX2lkOiBvcHRpb25zLmlkIH0pO1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMucmVuZGVyKTtcbiAgICB9XG5cbiAgICBvbkF0dGFjaG1lbnRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAkKGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoXCJleHBhbmRcIik7XG4gICAgfVxuXG4gICAgb25QbGF5QnV0dG9uQ2xpY2tlZChlKSB7XG4gICAgICAgIHZhciBhdHRhY2htZW50SWQgPSBlLnRhcmdldC5hdHRyaWJ1dGVzWydkYXRhLWlkJ10udmFsdWVcbiAgICAgICAgQmFja2JvbmUudHJpZ2dlcignc2hvdzphdWRpb3BsYXllcicsYXR0YWNobWVudElkKTtcbiAgICB9XG5cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJ2aWV3VmlldyJdfQ==