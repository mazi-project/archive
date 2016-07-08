define(['exports', 'backbone', 'marionette', 'underscore', 'moment', 'config', 'models/submission_model', 'text!templates/submission_tmpl.html', 'moment_en_gb'], function (exports, _backbone, _marionette, _underscore, _moment, _config, _submission_model, _submission_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-07 18:51:02
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _backbone2 = _interopRequireDefault(_backbone);

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _moment2 = _interopRequireDefault(_moment);

  var _config2 = _interopRequireDefault(_config);

  var _submission_model2 = _interopRequireDefault(_submission_model);

  var _submission_tmpl2 = _interopRequireDefault(_submission_tmpl);

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

  var SubmissionView = function (_Marionette$LayoutVie) {
    _inherits(SubmissionView, _Marionette$LayoutVie);

    function SubmissionView() {
      _classCallCheck(this, SubmissionView);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionView).apply(this, arguments));
    }

    _createClass(SubmissionView, [{
      key: 'regions',
      value: function regions() {
        return {
          commentInputRegion: '#comment-input'
        };
      }
    }, {
      key: 'initialize',
      value: function initialize(options) {
        this.model = new _submission_model2.default({ _id: options.id });
        this.model.fetch();

        //listen to model events
        this.listenTo(this.model, 'change', this.onModelChanged);

        //listen to socket events
        this.listenTo(_backbone2.default, 'submission:changed', this.onSubmissionChanged);
      }
    }, {
      key: 'onSubmissionChanged',
      value: function onSubmissionChanged(data) {
        if (data.model._id == this.model.get('_id')) this.model.fetch();
      }
    }, {
      key: 'onModelChanged',
      value: function onModelChanged() {
        if (_underscore2.default.isUndefined(this.commentInputRegion.currentView)) {
          this.render();
          this.commentInputRegion.show(new CommentInputView({ submissionId: this.model.get('_id') }));
        } else {
          var state = this.commentInputRegion.currentView.getState();
          this.render();
          this.commentInputRegion.show(new CommentInputView({ submissionId: this.model.get('_id'), state: state }));
        }
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_submission_tmpl2.default);
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
            return (0, _moment2.default)(date).format('LLL');
          },
          fromNow: function fromNow(date) {
            return (0, _moment2.default)(date).fromNow();
          },
          createdAt: this.model.has('createdAt') ? this.model.get('createdAt') : 0
        };
      }
    }]);

    return SubmissionView;
  }(_marionette2.default.LayoutView);

  exports.default = SubmissionView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CTSxjOzs7Ozs7Ozs7OztnQ0FPUTtBQUNULGVBQU87QUFDSCw4QkFBb0I7QUFEakIsU0FBUDtBQUdIOzs7aUNBaUJhLE8sRUFBUztBQUNoQixhQUFLLEtBQUwsR0FBYSwrQkFBb0IsRUFBRSxLQUFLLFFBQVEsRUFBZixFQUFwQixDQUFiO0FBQ0EsYUFBSyxLQUFMLENBQVcsS0FBWDs7O0FBR0EsYUFBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLLGNBQXZDOzs7QUFHQSxhQUFLLFFBQUwscUJBQXVCLG9CQUF2QixFQUE2QyxLQUFLLG1CQUFsRDtBQUNIOzs7MENBRW1CLEksRUFBTTtBQUN6QixZQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBa0IsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBdEIsRUFDQyxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0Q7Ozt1Q0FFZ0I7QUFDbkIsWUFBSSxxQkFBRSxXQUFGLENBQWMsS0FBSyxrQkFBTCxDQUF3QixXQUF0QyxDQUFKLEVBQXdEO0FBQ3ZELGVBQUssTUFBTDtBQUNBLGVBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsSUFBSSxnQkFBSixDQUFxQixFQUFFLGNBQWUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBakIsRUFBckIsQ0FBN0I7QUFDQSxTQUhELE1BR087QUFDTixjQUFJLFFBQVEsS0FBSyxrQkFBTCxDQUF3QixXQUF4QixDQUFvQyxRQUFwQyxFQUFaO0FBQ0EsZUFBSyxNQUFMO0FBQ0EsZUFBSyxrQkFBTCxDQUF3QixJQUF4QixDQUE2QixJQUFJLGdCQUFKLENBQXFCLEVBQUUsY0FBZSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUFqQixFQUF3QyxPQUFPLEtBQS9DLEVBQXJCLENBQTdCO0FBQ0E7QUFDRTs7OzBCQWxEYztBQUFFLGVBQU8scUJBQUUsUUFBRiwyQkFBUDtBQUE2Qjs7OzBCQUU5QjtBQUFFLGVBQU8sWUFBUDtBQUFxQjs7OzBCQVFqQjtBQUN4QixlQUFPO0FBQ04sb0JBQVcsaUJBQU8sU0FBUCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQURoRDtBQUVHLHNCQUFZLG9CQUFTLElBQVQsRUFBZTtBQUMxQixtQkFBTyxzQkFBTyxJQUFQLEVBQWEsTUFBYixDQUFvQixLQUFwQixDQUFQO0FBQ0EsV0FKSjtBQUtHLG1CQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN2QixtQkFBTyxzQkFBTyxJQUFQLEVBQWEsT0FBYixFQUFQO0FBQ0EsV0FQSjtBQVFHLHFCQUFXLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLElBQThCLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLENBQTlCLEdBQTREO0FBUjFFLFNBQVA7QUFVRzs7OztJQXhCd0IscUJBQVcsVTs7b0JBeUR6QixjIiwiZmlsZSI6ImludGVydmlld192aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTA3IDE4OjUxOjAyXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdtb21lbnRfZW5fZ2InO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9zdWJtaXNzaW9uX3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgcmVnaW9ucygpIHsgXG4gICAgXHRyZXR1cm4ge1xuICAgICAgICBcdGNvbW1lbnRJbnB1dFJlZ2lvbjogJyNjb21tZW50LWlucHV0J1xuXHQgICAgfVxuXHR9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgICAgIFx0Zm9ybWF0RGF0ZTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ0xMTCcpO1xuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0ZnJvbU5vdzogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mcm9tTm93KCk7IFxuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0Y3JlYXRlZEF0OiB0aGlzLm1vZGVsLmhhcygnY3JlYXRlZEF0JykgPyB0aGlzLm1vZGVsLmdldCgnY3JlYXRlZEF0JykgOiAwXG5cdFx0fVxuICAgIH1cblxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IFN1Ym1pc3Npb25Nb2RlbCh7IF9pZDogb3B0aW9ucy5pZCB9KTtcbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0ZW4gdG8gbW9kZWwgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLm9uTW9kZWxDaGFuZ2VkKTtcblxuICAgICAgICAvL2xpc3RlbiB0byBzb2NrZXQgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIHRoaXMub25TdWJtaXNzaW9uQ2hhbmdlZCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uQ2hhbmdlZChkYXRhKSB7XG4gICAgXHRpZiAoZGF0YS5tb2RlbC5faWQgPT0gdGhpcy5tb2RlbC5nZXQoJ19pZCcpKVxuICAgIFx0XHR0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25Nb2RlbENoYW5nZWQoKSB7XG5cdFx0aWYgKF8uaXNVbmRlZmluZWQodGhpcy5jb21tZW50SW5wdXRSZWdpb24uY3VycmVudFZpZXcpKSB7XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFx0dGhpcy5jb21tZW50SW5wdXRSZWdpb24uc2hvdyhuZXcgQ29tbWVudElucHV0Vmlldyh7IHN1Ym1pc3Npb25JZCA6IHRoaXMubW9kZWwuZ2V0KCdfaWQnKSB9KSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBzdGF0ZSA9IHRoaXMuY29tbWVudElucHV0UmVnaW9uLmN1cnJlbnRWaWV3LmdldFN0YXRlKCk7XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFx0dGhpcy5jb21tZW50SW5wdXRSZWdpb24uc2hvdyhuZXcgQ29tbWVudElucHV0Vmlldyh7IHN1Ym1pc3Npb25JZCA6IHRoaXMubW9kZWwuZ2V0KCdfaWQnKSwgc3RhdGU6IHN0YXRlIH0pKTtcblx0XHR9XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uVmlldyJdfQ==