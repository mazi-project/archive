define(['exports', 'backbone', 'marionette', 'underscore', 'moment', 'config', 'models/interview_model', 'models/attachment_collection', 'underscoreString', 'views/attachment_item_view', 'text!templates/interview_tmpl.html', 'moment_en_gb'], function (exports, _backbone, _marionette, _underscore, _moment, _config, _interview_model, _attachment_collection, _underscoreString, _attachment_item_view, _interview_tmpl) {
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

  var _attachment_collection2 = _interopRequireDefault(_attachment_collection);

  var _underscoreString2 = _interopRequireDefault(_underscoreString);

  var _attachment_item_view2 = _interopRequireDefault(_attachment_item_view);

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

  var InterviewView = function (_Marionette$Composite) {
    _inherits(InterviewView, _Marionette$Composite);

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

        this.collection = new _attachment_collection2.default();

        //listen to model events
        this.listenTo(this.model, 'change', this.onModelChanged);
      }
    }, {
      key: 'onModelChanged',
      value: function onModelChanged() {
        this.collection.reset(this.model.get('attachments'));
        this.render();
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
    }, {
      key: 'childViewContainer',
      get: function get() {
        return '#attachment-list';
      }
    }, {
      key: 'childView',
      get: function get() {
        return _attachment_item_view2.default;
      }
    }, {
      key: 'childViewOptions',
      get: function get() {
        return {
          interviewName: this.model.get('name')
        };
      }
    }]);

    return InterviewView;
  }(_marionette2.default.CompositeView);

  exports.default = InterviewView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6WyJJbnRlcnZpZXdWaWV3Iiwib3B0aW9ucyIsIm1vZGVsIiwiX2lkIiwiaWQiLCJmZXRjaCIsImNvbGxlY3Rpb24iLCJsaXN0ZW5UbyIsIm9uTW9kZWxDaGFuZ2VkIiwicmVzZXQiLCJnZXQiLCJyZW5kZXIiLCJldmVudCIsIiQiLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImUiLCJhdHRhY2htZW50SWQiLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJ0cmlnZ2VyIiwidGVtcGxhdGUiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsImZvcm1hdERhdGUiLCJkYXRlIiwiZm9ybWF0IiwidHJ1bmNhdGUiLCJzdHJpbmciLCJzdHJpbmdUcnVuY2F0ZVNob3J0IiwiaW50ZXJ2aWV3TmFtZSIsIkNvbXBvc2l0ZVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXFCTUEsYTs7Ozs7Ozs7Ozs7K0JBbUJPO0FBQ1AsZUFBTztBQUNMLCtCQUFzQixxQkFEakI7QUFFTCxnQ0FBdUI7QUFGbEIsU0FBUDtBQUlEOzs7aUNBYVVDLE8sRUFBUztBQUNoQixhQUFLQyxLQUFMLEdBQWEsOEJBQW1CLEVBQUVDLEtBQUtGLFFBQVFHLEVBQWYsRUFBbkIsQ0FBYjtBQUNBLGFBQUtGLEtBQUwsQ0FBV0csS0FBWDs7QUFFQSxhQUFLQyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFQTtBQUNBLGFBQUtDLFFBQUwsQ0FBYyxLQUFLTCxLQUFuQixFQUF5QixRQUF6QixFQUFtQyxLQUFLTSxjQUF4QztBQUNIOzs7dUNBR2dCO0FBQ2IsYUFBS0YsVUFBTCxDQUFnQkcsS0FBaEIsQ0FBc0IsS0FBS1AsS0FBTCxDQUFXUSxHQUFYLENBQWUsYUFBZixDQUF0QjtBQUNBLGFBQUtDLE1BQUw7QUFDSDs7OzBDQUVtQkMsSyxFQUFPO0FBQ3pCQyxVQUFFRCxNQUFNRSxNQUFSLEVBQWdCQyxXQUFoQixDQUE0QixRQUE1QjtBQUNEOzs7MENBRW1CQyxDLEVBQUc7QUFDbkIsWUFBSUMsZUFBZUQsRUFBRUYsTUFBRixDQUFTSSxVQUFULENBQW9CLFNBQXBCLEVBQStCQyxLQUFsRDtBQUNBLDJCQUFTQyxPQUFULENBQWlCLGtCQUFqQixFQUFvQ0gsWUFBcEM7QUFDSDs7OzBCQXpEYztBQUFFLGVBQU8scUJBQUVJLFFBQUYsMEJBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLFlBQVA7QUFBcUI7OzswQkFFakI7QUFDdEIsZUFBTztBQUNMQyxvQkFBVyxpQkFBT0MsU0FBUCxHQUFtQixLQUFLckIsS0FBTCxDQUFXUSxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQURqRDtBQUVIYyxzQkFBYSxvQkFBU0MsSUFBVCxFQUFlO0FBQzFCLG1CQUFPLHNCQUFPQSxJQUFQLEVBQWFDLE1BQWIsQ0FBb0IsVUFBcEIsQ0FBUDtBQUNELFdBSkU7QUFLSEMsb0JBQVcsa0JBQVNDLE1BQVQsRUFBaUI7QUFDMUIsbUJBQU8sMkJBQUtELFFBQUwsQ0FBY0MsTUFBZCxFQUFxQixpQkFBT0MsbUJBQTVCLENBQVA7QUFDRDtBQVBFLFNBQVA7QUFTQzs7OzBCQVN3QjtBQUFFLGVBQU8sa0JBQVA7QUFBMkI7OzswQkFFdEM7QUFBRTtBQUEyQjs7OzBCQUV0QjtBQUNuQixlQUFPO0FBQ0hDLHlCQUFnQixLQUFLNUIsS0FBTCxDQUFXUSxHQUFYLENBQWUsTUFBZjtBQURiLFNBQVA7QUFHSDs7OztJQWxDdUIscUJBQVdxQixhOztvQkFpRXhCL0IsYSIsImZpbGUiOiJpbnRlcnZpZXdfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNSAxNDo0NDozMlxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBNb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnbW9tZW50X2VuX2diJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcbmltcG9ydCBBdHRhY2htZW50Q29sbGVjdGlvbiBmcm9tICdtb2RlbHMvYXR0YWNobWVudF9jb2xsZWN0aW9uJztcbmltcG9ydCBfc3RyIGZyb20gJ3VuZGVyc2NvcmVTdHJpbmcnO1xuXG5pbXBvcnQgQXR0YWNobWVudEl0ZW1WaWV3IGZyb20gJ3ZpZXdzL2F0dGFjaG1lbnRfaXRlbV92aWV3JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld190bXBsLmh0bWwnO1xuXG5jbGFzcyBJbnRlcnZpZXdWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHQgIHJldHVybiB7XG5cdFx0ICAgIGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJyxcbiAgICAgICAgZm9ybWF0RGF0ZSA6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICByZXR1cm4gTW9tZW50KGRhdGUpLmZvcm1hdChcIkQuTS5ZWVlZXCIpO1xuICAgICAgICB9LFxuICAgICAgICB0cnVuY2F0ZSA6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBfc3RyLnRydW5jYXRlKHN0cmluZyxDb25maWcuc3RyaW5nVHJ1bmNhdGVTaG9ydClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAuYXR0YWNobWVudCcgOiAnb25BdHRhY2htZW50Q2xpY2tlZCcsXG4gICAgICAgICdjbGljayAucGxheS1idXR0b24nIDogJ29uUGxheUJ1dHRvbkNsaWNrZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjYXR0YWNobWVudC1saXN0JyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkgeyByZXR1cm4gQXR0YWNobWVudEl0ZW1WaWV3IH1cblxuICAgIGdldCBjaGlsZFZpZXdPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW50ZXJ2aWV3TmFtZSA6IHRoaXMubW9kZWwuZ2V0KCduYW1lJylcbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgSW50ZXJ2aWV3TW9kZWwoeyBfaWQ6IG9wdGlvbnMuaWQgfSk7XG4gICAgICAgIHRoaXMubW9kZWwuZmV0Y2goKTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBuZXcgQXR0YWNobWVudENvbGxlY3Rpb24oKTtcbiAgICAgICAgXG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsIHRoaXMub25Nb2RlbENoYW5nZWQpO1xuICAgIH1cblxuXG4gICAgb25Nb2RlbENoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZXNldCh0aGlzLm1vZGVsLmdldCgnYXR0YWNobWVudHMnKSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgb25BdHRhY2htZW50Q2xpY2tlZChldmVudCkge1xuICAgICAgJChldmVudC50YXJnZXQpLnRvZ2dsZUNsYXNzKFwiZXhwYW5kXCIpO1xuICAgIH1cblxuICAgIG9uUGxheUJ1dHRvbkNsaWNrZWQoZSkge1xuICAgICAgICB2YXIgYXR0YWNobWVudElkID0gZS50YXJnZXQuYXR0cmlidXRlc1snZGF0YS1pZCddLnZhbHVlXG4gICAgICAgIEJhY2tib25lLnRyaWdnZXIoJ3Nob3c6YXVkaW9wbGF5ZXInLGF0dGFjaG1lbnRJZCk7XG4gICAgfVxuXG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVydmlld1ZpZXciXX0=