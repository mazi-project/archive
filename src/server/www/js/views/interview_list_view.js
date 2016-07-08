define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'views/interview_item_view', 'models/interview_collection', 'models/interview_model', 'text!templates/interview_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _interview_item_view, _interview_collection, _interview_model, _interview_list_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-07 22:58:19
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

    var _interview_item_view2 = _interopRequireDefault(_interview_item_view);

    var _interview_collection2 = _interopRequireDefault(_interview_collection);

    var _interview_model2 = _interopRequireDefault(_interview_model);

    var _interview_list_tmpl2 = _interopRequireDefault(_interview_list_tmpl);

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

    var SubmissionListView = function (_Marionette$Composite) {
        _inherits(SubmissionListView, _Marionette$Composite);

        function SubmissionListView() {
            _classCallCheck(this, SubmissionListView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionListView).apply(this, arguments));
        }

        _createClass(SubmissionListView, [{
            key: 'childEvents',
            value: function childEvents() {
                return {
                    'show-details': 'onChildShowDetails'
                };
            }
        }, {
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

                if (options.dataset != null) this.fetchParams.dataset = options.dataset;

                this.collection = new _interview_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.listenTo(Backbone, 'submission:changed', this.onSubmissionChanged);
                this.listenTo(Backbone, 'submission:new', this.onSubmissionAdded);
                this.listenTo(Backbone, 'submission:removed', this.onSubmissionRemoved);

                this.collection.getFirstPage(this.fetchParams);
            }
        }, {
            key: 'onAttach',
            value: function onAttach() {
                var _this2 = this;

                //bind scroll handler
                this.winowScrollListener = _underscore2.default.throttle(function () {
                    _this2.onWindowScroll();
                }, 500);
                (0, _jquery2.default)(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                (0, _jquery2.default)(window).off("scroll", this.winowScrollListener);
            }
        }, {
            key: 'onSubmissionChanged',
            value: function onSubmissionChanged(data) {
                var model = this.collection.get(data.model._id);
                if (model) model.fetch();
            }
        }, {
            key: 'onSubmissionAdded',
            value: function onSubmissionAdded(data) {
                //console.log(data);
                var submission = new _interview_model2.default(data.model);
                submission.fetch();
                // add to front of collection
                this.collection.add(submission, { at: 0 });
            }
        }, {
            key: 'onSubmissionRemoved',
            value: function onSubmissionRemoved(data) {
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
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                var scrollPos = (0, _jquery2.default)(window).scrollTop();
                var triggerPos = (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('#fetch-spinner').removeClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('#fetch-spinner').addClass('hidden');
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
                return _interview_item_view2.default;
            }
        }]);

        return SubmissionListView;
    }(_marionette2.default.CompositeView);

    ;

    exports.default = SubmissionListView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQk0sa0I7Ozs7Ozs7Ozs7OzBDQVdTO0FBQ1YsdUJBQU87QUFDTixvQ0FBaUI7QUFEWCxpQkFBUDtBQUdBOzs7cUNBRVE7QUFDTCx1QkFBTztBQUNILCtDQUE0QjtBQUR6QixpQkFBUDtBQUdIOzs7dUNBR08sTyxFQUFTOztBQUVuQixxQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJLFFBQVEsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLFFBQVEsR0FBL0I7O0FBRUssb0JBQUksUUFBUSxPQUFSLElBQW1CLElBQXZCLEVBQ0ksS0FBSyxXQUFMLENBQWlCLE9BQWpCLEdBQTJCLFFBQVEsT0FBbkM7O0FBRVYscUJBQUssVUFBTCxHQUFrQixvQ0FBbEI7O0FBRU0scUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBSyxXQUExQztBQUNBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUssV0FBOUM7O0FBRUEscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsZ0JBQXZCLEVBQXlDLEtBQUssaUJBQTlDO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEOztBQUVBLHFCQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsS0FBSyxXQUFsQztBQUNOOzs7dUNBRWE7QUFBQTs7O0FBRVAscUJBQUssbUJBQUwsR0FBNEIscUJBQUUsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUssY0FBTDtBQUNILGlCQUYyQixFQUUxQixHQUYwQixDQUE1QjtBQUdBLHNDQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLLG1CQUEzQjtBQUNIOzs7OENBRWlCOztBQUVkLHNDQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsUUFBZCxFQUF3QixLQUFLLG1CQUE3QjtBQUNIOzs7Z0RBSW1CLEksRUFBTTtBQUN6QixvQkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixLQUFLLEtBQUwsQ0FBVyxHQUEvQixDQUFaO0FBQ0Esb0JBQUksS0FBSixFQUNDLE1BQU0sS0FBTjtBQUNEOzs7OENBRWlCLEksRUFBTTs7QUFFdkIsb0JBQUksYUFBYSw4QkFBbUIsS0FBSyxLQUF4QixDQUFqQjtBQUNBLDJCQUFXLEtBQVg7O0FBRUgscUJBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixVQUFwQixFQUFnQyxFQUFFLElBQUksQ0FBTixFQUFoQztBQUNHOzs7Z0RBRW1CLEksRUFBTTs7QUFFdEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNIOzs7a0RBRXFCLEssRUFBTztBQUN6QixzQkFBTSxjQUFOO0FBQ0EscUJBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixLQUFLLFdBQWpDO0FBQ0g7Ozs2Q0FFZ0I7O0FBRWIsb0JBQUksWUFBWSxzQkFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjtBQUNBLG9CQUFJLGFBQWMsc0JBQUUsUUFBRixFQUFZLE1BQVosS0FBdUIsc0JBQUUsTUFBRixFQUFVLE1BQVYsS0FBcUIsR0FBOUQ7O0FBRUEsb0JBQUksWUFBWSxVQUFoQixFQUE0QjtBQUN4Qix5QkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssV0FBakM7QUFDSDtBQUNKOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sZ0JBQVAsRUFBeUIsV0FBekIsQ0FBcUMsUUFBckM7QUFDSDs7OzBDQUVhO0FBQ1YscUJBQUssQ0FBTCxDQUFPLGdCQUFQLEVBQXlCLFFBQXpCLENBQWtDLFFBQWxDO0FBQ0g7OztnQ0FsR1c7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLCtCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFbEI7QUFBRSx1QkFBTyxpQkFBUDtBQUEwQjs7O2dDQUVyQztBQUFFO0FBQTBCOzs7O01BVFoscUJBQVcsYTs7QUF3RzNDOztzQkFFYyxrQiIsImZpbGUiOiJpbnRlcnZpZXdfbGlzdF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTA3IDIyOjU4OjE5XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBJbnRlcnZpZXdJdGVtVmlldyBmcm9tICd2aWV3cy9pbnRlcnZpZXdfaXRlbV92aWV3JztcbmltcG9ydCBJbnRlcnZpZXdDb2xsZWN0aW9uIGZyb20gJ21vZGVscy9pbnRlcnZpZXdfY29sbGVjdGlvbic7XG5pbXBvcnQgSW50ZXJ2aWV3TW9kZWwgZnJvbSAnbW9kZWxzL2ludGVydmlld19tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9pbnRlcnZpZXdfbGlzdF90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG5cdGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnY29tcG9zaXRlLXZpZXcnIH1cblxuXHRnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNpbnRlcnZpZXctbGlzdCcgfVxuXG5cdGdldCBjaGlsZFZpZXcoKSB7IHJldHVybiBJbnRlcnZpZXdJdGVtVmlldyB9XG5cblx0Y2hpbGRFdmVudHMoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHQnc2hvdy1kZXRhaWxzJyA6ICdvbkNoaWxkU2hvd0RldGFpbHMnLFxuICAgIFx0fVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljayAjbG9hZC1tb3JlLWJ1dHRvbicgOiAnb25Mb2FkTW9yZUJ1dHRvbkNsaWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG5cdC8qIG1ldGhvZHMgKi9cblx0aW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cblx0XHR0aGlzLmZldGNoUGFyYW1zID0ge307XG5cblx0XHRpZiAob3B0aW9ucy50YWcgIT0gbnVsbClcblx0XHRcdHRoaXMuZmV0Y2hQYXJhbXMudGFnID0gb3B0aW9ucy50YWdcblxuICAgICAgICBpZiAob3B0aW9ucy5kYXRhc2V0ICE9IG51bGwpXG4gICAgICAgICAgICB0aGlzLmZldGNoUGFyYW1zLmRhdGFzZXQgPSBvcHRpb25zLmRhdGFzZXRcblx0XHRcblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgSW50ZXJ2aWV3Q29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOmNoYW5nZWQnLCB0aGlzLm9uU3VibWlzc2lvbkNoYW5nZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOm5ldycsIHRoaXMub25TdWJtaXNzaW9uQWRkZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOnJlbW92ZWQnLCB0aGlzLm9uU3VibWlzc2lvblJlbW92ZWQpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG5cdH1cblxuICAgIG9uQXR0YWNoKCkge1xuICAgICAgICAvL2JpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyID0gIF8udGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICB9LDUwMCk7XG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJyx0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uQmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZihcInNjcm9sbFwiLCB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuXG5cdC8vIHVwZGF0ZSBtb2RlbCBvbiBkYXRhIGNoYW5nZVxuICAgIG9uU3VibWlzc2lvbkNoYW5nZWQoZGF0YSkge1xuICAgIFx0dmFyIG1vZGVsID0gdGhpcy5jb2xsZWN0aW9uLmdldChkYXRhLm1vZGVsLl9pZCk7XG4gICAgXHRpZiAobW9kZWwpXG4gICAgXHRcdG1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uQWRkZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgIFx0dmFyIHN1Ym1pc3Npb24gPSBuZXcgSW50ZXJ2aWV3TW9kZWwoZGF0YS5tb2RlbCk7XG4gICAgXHRzdWJtaXNzaW9uLmZldGNoKCk7XG4gICAgXHQgLy8gYWRkIHRvIGZyb250IG9mIGNvbGxlY3Rpb25cblx0XHR0aGlzLmNvbGxlY3Rpb24uYWRkKHN1Ym1pc3Npb24sIHsgYXQ6IDB9KTtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25SZW1vdmVkKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLnJlbW92ZShkYXRhKTtcbiAgICB9XG5cbiAgICBvbkxvYWRNb3JlQnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgIH1cblxuICAgIG9uV2luZG93U2Nyb2xsKCkge1xuXG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIHZhciB0cmlnZ2VyUG9zID0gICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpICogMS4yO1xuXG4gICAgICAgIGlmIChzY3JvbGxQb3MgPiB0cmlnZ2VyUG9zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93U3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcjZmV0Y2gtc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgXG4gICAgaGlkZVNwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnI2ZldGNoLXNwaW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pc3Npb25MaXN0VmlldyJdfQ==