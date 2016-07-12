define(['exports', 'backbone', 'marionette', 'underscore', 'moment', 'config', 'models/interview_model', 'text!templates/interview_tmpl.html', 'moment_en_gb'], function (exports, _backbone, _marionette, _underscore, _moment, _config, _interview_model, _interview_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-12 10:18:11
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

  var SubmissionView = function (_Marionette$LayoutVie) {
    _inherits(SubmissionView, _Marionette$LayoutVie);

    function SubmissionView() {
      _classCallCheck(this, SubmissionView);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionView).apply(this, arguments));
    }

    _createClass(SubmissionView, [{
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
          }
        };
      }
    }]);

    return SubmissionView;
  }(_marionette2.default.LayoutView);

  exports.default = SubmissionView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CTSxjOzs7Ozs7Ozs7OzsrQkFnQk87QUFDUCxlQUFPO0FBQ0wsK0JBQXNCLHFCQURqQjtBQUVMLGdDQUF1QjtBQUZsQixTQUFQO0FBSUQ7OztpQ0FHVSxPLEVBQVM7QUFDaEIsYUFBSyxLQUFMLEdBQWEsOEJBQW1CLEVBQUUsS0FBSyxRQUFRLEVBQWYsRUFBbkIsQ0FBYjtBQUNBLGFBQUssS0FBTCxDQUFXLEtBQVg7OztBQUdBLGFBQUssUUFBTCxDQUFjLEtBQUssS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBSyxNQUF2QztBQUNIOzs7MENBRW1CLEssRUFBTztBQUN6QixVQUFFLE1BQU0sTUFBUixFQUFnQixXQUFoQixDQUE0QixRQUE1QjtBQUNEOzs7MENBRXFCLEMsRUFBRztBQUNyQixZQUFJLGVBQWUsRUFBRSxNQUFGLENBQVMsVUFBVCxDQUFvQixTQUFwQixFQUErQixLQUFsRDtBQUNBLDJCQUFTLE9BQVQsQ0FBaUIsa0JBQWpCLEVBQW9DLFlBQXBDO0FBQ0g7OzswQkFwQ2M7QUFBRSxlQUFPLHFCQUFFLFFBQUYsMEJBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLFlBQVA7QUFBcUI7OzswQkFFakI7QUFDdEIsZUFBTztBQUNMLG9CQUFXLGlCQUFPLFNBQVAsR0FBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEakQ7QUFFSCxzQkFBYSxvQkFBUyxJQUFULEVBQWU7QUFDMUIsbUJBQU8sc0JBQU8sSUFBUCxFQUFhLE1BQWIsQ0FBb0IsVUFBcEIsQ0FBUDtBQUNEO0FBSkUsU0FBUDtBQU1DOzs7O0lBZHdCLHFCQUFXLFU7O29CQTRDekIsYyIsImZpbGUiOiJpbnRlcnZpZXdfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xMiAxMDoxODoxMVxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBNb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnbW9tZW50X2VuX2diJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld190bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0VmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3NpbmdsZXZpZXcnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0ICByZXR1cm4ge1xuXHRcdCAgICBmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgIGZvcm1hdERhdGUgOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgcmV0dXJuIE1vbWVudChkYXRlKS5mb3JtYXQoXCJELk0uWVlZWVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdjbGljayAuYXR0YWNobWVudCcgOiAnb25BdHRhY2htZW50Q2xpY2tlZCcsXG4gICAgICAgICdjbGljayAucGxheS1idXR0b24nIDogJ29uUGxheUJ1dHRvbkNsaWNrZWQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IEludGVydmlld01vZGVsKHsgX2lkOiBvcHRpb25zLmlkIH0pO1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMucmVuZGVyKTtcbiAgICB9XG5cbiAgICBvbkF0dGFjaG1lbnRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAkKGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoXCJleHBhbmRcIik7XG4gICAgfVxuXG4gICAgICBvblBsYXlCdXR0b25DbGlja2VkKGUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRJZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbJ2RhdGEtaWQnXS52YWx1ZVxuICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzaG93OmF1ZGlvcGxheWVyJyxhdHRhY2htZW50SWQpO1xuICAgIH1cblxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uVmlldyJdfQ==