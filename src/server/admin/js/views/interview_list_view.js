define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'models/interview_collection', 'models/interview_model', 'text!templates/interview_list_tmpl.html', 'text!templates/interview_item_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _interview_collection, _interview_model, _interview_list_tmpl, _interview_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-14 12:00:04
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

    var _interview_collection2 = _interopRequireDefault(_interview_collection);

    var _interview_model2 = _interopRequireDefault(_interview_model);

    var _interview_list_tmpl2 = _interopRequireDefault(_interview_list_tmpl);

    var _interview_item_tmpl2 = _interopRequireDefault(_interview_item_tmpl);

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

    var InterviewListView = function (_Marionette$Composite) {
        _inherits(InterviewListView, _Marionette$Composite);

        function InterviewListView() {
            _classCallCheck(this, InterviewListView);

            return _possibleConstructorReturn(this, (InterviewListView.__proto__ || Object.getPrototypeOf(InterviewListView)).apply(this, arguments));
        }

        _createClass(InterviewListView, [{
            key: 'events',
            value: function events() {
                return {
                    'click #load-more-button': 'onLoadMoreButtonClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.fetchParams = {};

                if (options.tag != null) this.fetchParams.tag = options.tag;

                this.collection = new _interview_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.listenTo(Backbone, 'interview:changed', this.onInterviewChanged);
                this.listenTo(Backbone, 'interview:new', this.onInterviewAdded);
                this.listenTo(Backbone, 'interview:removed', this.OnInterviewRemoved);

                this.collection.getFirstPage(this.fetchParams);
            }
        }, {
            key: 'onInterviewChanged',
            value: function onInterviewChanged(data) {
                var model = this.collection.get(data._id);
                if (model) model.fetch();
            }
        }, {
            key: 'onInterviewAdded',
            value: function onInterviewAdded(data) {
                //console.log(data);
                var interview = new _interview_model2.default(data);
                interview.fetch();
                // add to front of collection
                this.collection.add(interview, { at: 0 });
            }
        }, {
            key: 'onInterviewRemoved',
            value: function onInterviewRemoved(data) {
                //console.log(data);
                this.collection.remove(data);
            }
        }, {
            key: 'onLoadMoreButtonClick',
            value: function onLoadMoreButtonClick(event) {
                event.preventDefault();
                this.collection.getNextPage(this.fetchParams);
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_list_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'composite-view';
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#interview-list';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _marionette2.default.ItemView.extend({
                    template: _underscore2.default.template(_interview_item_tmpl2.default),
                    className: 'attachment',
                    events: {
                        'click #deleteButton': 'onDeleteButtonClicked',
                        'click #editButton': 'onEditButtonClicked'
                    },
                    onDeleteButtonClicked: function onDeleteButtonClicked() {
                        if (confirm("Are you sure you want to delete the interview?")) {
                            this.model.destroy();
                        }
                    },
                    onEditButtonClicked: function onEditButtonClicked() {
                        window.location.href = "#interview/" + this.model.id;
                    }
                });
            }
        }]);

        return InterviewListView;
    }(_marionette2.default.CompositeView);

    ;

    exports.default = InterviewListView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbIkludGVydmlld0xpc3RWaWV3Iiwib3B0aW9ucyIsImZldGNoUGFyYW1zIiwidGFnIiwiY29sbGVjdGlvbiIsImxpc3RlblRvIiwiaGlkZVNwaW5uZXIiLCJzaG93U3Bpbm5lciIsIkJhY2tib25lIiwib25JbnRlcnZpZXdDaGFuZ2VkIiwib25JbnRlcnZpZXdBZGRlZCIsIk9uSW50ZXJ2aWV3UmVtb3ZlZCIsImdldEZpcnN0UGFnZSIsImRhdGEiLCJtb2RlbCIsImdldCIsIl9pZCIsImZldGNoIiwiaW50ZXJ2aWV3IiwiYWRkIiwiYXQiLCJyZW1vdmUiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZ2V0TmV4dFBhZ2UiLCJ0ZW1wbGF0ZSIsIkl0ZW1WaWV3IiwiZXh0ZW5kIiwiY2xhc3NOYW1lIiwiZXZlbnRzIiwib25EZWxldGVCdXR0b25DbGlja2VkIiwiY29uZmlybSIsImRlc3Ryb3kiLCJvbkVkaXRCdXR0b25DbGlja2VkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaWQiLCJDb21wb3NpdGVWaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlCTUEsaUI7Ozs7Ozs7Ozs7O3FDQTRCTztBQUNMLHVCQUFPO0FBQ0gsK0NBQTRCO0FBRHpCLGlCQUFQO0FBR0g7Ozt1Q0FHT0MsTyxFQUFTOztBQUVuQixxQkFBS0MsV0FBTCxHQUFtQixFQUFuQjs7QUFFQSxvQkFBSUQsUUFBUUUsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBS0QsV0FBTCxDQUFpQkMsR0FBakIsR0FBdUJGLFFBQVFFLEdBQS9COztBQUVELHFCQUFLQyxVQUFMLEdBQWtCLG9DQUFsQjs7QUFFTSxxQkFBS0MsUUFBTCxDQUFjLEtBQUtELFVBQW5CLEVBQThCLE1BQTlCLEVBQXFDLEtBQUtFLFdBQTFDO0FBQ0EscUJBQUtELFFBQUwsQ0FBYyxLQUFLRCxVQUFuQixFQUE4QixVQUE5QixFQUF5QyxLQUFLRyxXQUE5Qzs7QUFFQSxxQkFBS0YsUUFBTCxDQUFjRyxRQUFkLEVBQXVCLG1CQUF2QixFQUE0QyxLQUFLQyxrQkFBakQ7QUFDQSxxQkFBS0osUUFBTCxDQUFjRyxRQUFkLEVBQXVCLGVBQXZCLEVBQXdDLEtBQUtFLGdCQUE3QztBQUNBLHFCQUFLTCxRQUFMLENBQWNHLFFBQWQsRUFBdUIsbUJBQXZCLEVBQTRDLEtBQUtHLGtCQUFqRDs7QUFFQSxxQkFBS1AsVUFBTCxDQUFnQlEsWUFBaEIsQ0FBNkIsS0FBS1YsV0FBbEM7QUFDTjs7OytDQUdxQlcsSSxFQUFNO0FBQ3hCLG9CQUFJQyxRQUFRLEtBQUtWLFVBQUwsQ0FBZ0JXLEdBQWhCLENBQW9CRixLQUFLRyxHQUF6QixDQUFaO0FBQ0Esb0JBQUlGLEtBQUosRUFDQ0EsTUFBTUcsS0FBTjtBQUNEOzs7NkNBRWdCSixJLEVBQU07QUFDbkI7QUFDSCxvQkFBSUssWUFBWSw4QkFBbUJMLElBQW5CLENBQWhCO0FBQ0FLLDBCQUFVRCxLQUFWO0FBQ0M7QUFDSixxQkFBS2IsVUFBTCxDQUFnQmUsR0FBaEIsQ0FBb0JELFNBQXBCLEVBQStCLEVBQUVFLElBQUksQ0FBTixFQUEvQjtBQUNHOzs7K0NBRWtCUCxJLEVBQU07QUFDckI7QUFDQSxxQkFBS1QsVUFBTCxDQUFnQmlCLE1BQWhCLENBQXVCUixJQUF2QjtBQUNIOzs7a0RBRXFCUyxLLEVBQU87QUFDekJBLHNCQUFNQyxjQUFOO0FBQ0EscUJBQUtuQixVQUFMLENBQWdCb0IsV0FBaEIsQ0FBNEIsS0FBS3RCLFdBQWpDO0FBQ0g7OztnQ0ExRVc7QUFBRSx1QkFBTyxxQkFBRXVCLFFBQUYsK0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVsQjtBQUFFLHVCQUFPLGlCQUFQO0FBQTBCOzs7Z0NBRXJDO0FBQ1QsdUJBQU8scUJBQVdDLFFBQVgsQ0FBb0JDLE1BQXBCLENBQTJCO0FBQzlCRiw4QkFBVSxxQkFBRUEsUUFBRiwrQkFEb0I7QUFFOUJHLCtCQUFZLFlBRmtCO0FBRzlCQyw0QkFBUztBQUNMLCtDQUF3Qix1QkFEbkI7QUFFTCw2Q0FBc0I7QUFGakIscUJBSHFCO0FBTzlCQywyQ0FBd0IsaUNBQVc7QUFDL0IsNEJBQUlDLFFBQVEsZ0RBQVIsQ0FBSixFQUErRDtBQUMzRCxpQ0FBS2pCLEtBQUwsQ0FBV2tCLE9BQVg7QUFDSDtBQUNKLHFCQVg2QjtBQVk5QkMseUNBQXNCLCtCQUFXO0FBQzdCQywrQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsZ0JBQWMsS0FBS3RCLEtBQUwsQ0FBV3VCLEVBQWhEO0FBQ0g7QUFkNkIsaUJBQTNCLENBQVA7QUFnQkg7Ozs7TUExQjJCLHFCQUFXQyxhOztBQWdGMUM7O3NCQUVjdEMsaUIiLCJmaWxlIjoiaW50ZXJ2aWV3X2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNCAxMjowMDowNFxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgSW50ZXJ2aWV3Q29sbGVjdGlvbiBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X2NvbGxlY3Rpb24nO1xuaW1wb3J0IEludGVydmlld01vZGVsIGZyb20gJ21vZGVscy9pbnRlcnZpZXdfbW9kZWwnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X2xpc3RfdG1wbC5odG1sJztcbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgSW50ZXJ2aWV3TGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG5cdGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnY29tcG9zaXRlLXZpZXcnIH1cblxuXHRnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNpbnRlcnZpZXctbGlzdCcgfVxuXG5cdGdldCBjaGlsZFZpZXcoKSB7IFxuICAgICAgICByZXR1cm4gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoaXRlbVRlbXBsYXRlKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdhdHRhY2htZW50JyxcbiAgICAgICAgICAgIGV2ZW50cyA6IHtcbiAgICAgICAgICAgICAgICAnY2xpY2sgI2RlbGV0ZUJ1dHRvbicgOiAnb25EZWxldGVCdXR0b25DbGlja2VkJyxcbiAgICAgICAgICAgICAgICAnY2xpY2sgI2VkaXRCdXR0b24nIDogJ29uRWRpdEJ1dHRvbkNsaWNrZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25EZWxldGVCdXR0b25DbGlja2VkIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBpbnRlcnZpZXc/XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVkaXRCdXR0b25DbGlja2VkIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNpbnRlcnZpZXcvXCIrdGhpcy5tb2RlbC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljayAjbG9hZC1tb3JlLWJ1dHRvbicgOiAnb25Mb2FkTW9yZUJ1dHRvbkNsaWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG5cdC8qIG1ldGhvZHMgKi9cblx0aW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cblx0XHR0aGlzLmZldGNoUGFyYW1zID0ge307XG5cblx0XHRpZiAob3B0aW9ucy50YWcgIT0gbnVsbClcblx0XHRcdHRoaXMuZmV0Y2hQYXJhbXMudGFnID0gb3B0aW9ucy50YWdcblx0XHRcblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgSW50ZXJ2aWV3Q29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdpbnRlcnZpZXc6Y2hhbmdlZCcsIHRoaXMub25JbnRlcnZpZXdDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnaW50ZXJ2aWV3Om5ldycsIHRoaXMub25JbnRlcnZpZXdBZGRlZCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ2ludGVydmlldzpyZW1vdmVkJywgdGhpcy5PbkludGVydmlld1JlbW92ZWQpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG5cdH1cblxuXHQvLyB1cGRhdGUgbW9kZWwgb24gZGF0YSBjaGFuZ2VcbiAgICBvbkludGVydmlld0NoYW5nZWQoZGF0YSkge1xuICAgIFx0dmFyIG1vZGVsID0gdGhpcy5jb2xsZWN0aW9uLmdldChkYXRhLl9pZCk7XG4gICAgXHRpZiAobW9kZWwpXG4gICAgXHRcdG1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25JbnRlcnZpZXdBZGRlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgXHR2YXIgaW50ZXJ2aWV3ID0gbmV3IEludGVydmlld01vZGVsKGRhdGEpO1xuICAgIFx0aW50ZXJ2aWV3LmZldGNoKCk7XG4gICAgXHQgLy8gYWRkIHRvIGZyb250IG9mIGNvbGxlY3Rpb25cblx0XHR0aGlzLmNvbGxlY3Rpb24uYWRkKGludGVydmlldywgeyBhdDogMH0pO1xuICAgIH1cblxuICAgIG9uSW50ZXJ2aWV3UmVtb3ZlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoZGF0YSk7XG4gICAgfVxuXG4gICAgb25Mb2FkTW9yZUJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICB9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJ2aWV3TGlzdFZpZXc7Il19