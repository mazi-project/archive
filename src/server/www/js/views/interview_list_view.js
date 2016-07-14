define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'views/interview_item_view', 'models/interview_collection', 'models/interview_model', 'text!templates/interview_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _interview_item_view, _interview_collection, _interview_model, _interview_list_tmpl) {
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

                this.listenTo(Backbone, 'interview:changed', this.onInterviewChanged);
                this.listenTo(Backbone, 'interview:new', this.onInterviewAdded);
                this.listenTo(Backbone, 'interview:removed', this.OnInterviewRemoved);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQk0sa0I7Ozs7Ozs7Ozs7OzBDQVdTO0FBQ1YsdUJBQU87QUFDTixvQ0FBaUI7QUFEWCxpQkFBUDtBQUdBOzs7cUNBRVE7QUFDTCx1QkFBTztBQUNILCtDQUE0QjtBQUR6QixpQkFBUDtBQUdIOzs7dUNBR08sTyxFQUFTOztBQUVuQixxQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJLFFBQVEsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLFFBQVEsR0FBL0I7O0FBRUssb0JBQUksUUFBUSxPQUFSLElBQW1CLElBQXZCLEVBQ0ksS0FBSyxXQUFMLENBQWlCLE9BQWpCLEdBQTJCLFFBQVEsT0FBbkM7O0FBRVYscUJBQUssVUFBTCxHQUFrQixvQ0FBbEI7O0FBRU0scUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBSyxXQUExQztBQUNBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUssV0FBOUM7O0FBRUEscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsbUJBQXZCLEVBQTRDLEtBQUssa0JBQWpEO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsZUFBdkIsRUFBd0MsS0FBSyxnQkFBN0M7QUFDQSxxQkFBSyxRQUFMLENBQWMsUUFBZCxFQUF1QixtQkFBdkIsRUFBNEMsS0FBSyxrQkFBakQ7O0FBRUEscUJBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixLQUFLLFdBQWxDO0FBQ047Ozt1Q0FFYTtBQUFBOzs7QUFFUCxxQkFBSyxtQkFBTCxHQUE0QixxQkFBRSxRQUFGLENBQVcsWUFBTTtBQUN6QywyQkFBSyxjQUFMO0FBQ0gsaUJBRjJCLEVBRTFCLEdBRjBCLENBQTVCO0FBR0Esc0NBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXNCLEtBQUssbUJBQTNCO0FBQ0g7Ozs4Q0FFaUI7O0FBRWQsc0NBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxRQUFkLEVBQXdCLEtBQUssbUJBQTdCO0FBQ0g7OzsrQ0FJa0IsSSxFQUFNO0FBQ3hCLG9CQUFJLFFBQVEsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLEtBQUssR0FBekIsQ0FBWjtBQUNBLG9CQUFJLEtBQUosRUFDQyxNQUFNLEtBQU47QUFDRDs7OzZDQUVnQixJLEVBQU07O0FBRXRCLG9CQUFJLFlBQVksOEJBQW1CLElBQW5CLENBQWhCO0FBQ0EsMEJBQVUsS0FBVjs7QUFFSCxxQkFBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLEVBQUUsSUFBSSxDQUFOLEVBQS9CO0FBQ0c7OzsrQ0FFa0IsSSxFQUFNOztBQUVyQixxQkFBSyxVQUFMLENBQWdCLE1BQWhCLENBQXVCLElBQXZCO0FBQ0g7OztrREFFcUIsSyxFQUFPO0FBQ3pCLHNCQUFNLGNBQU47QUFDQSxxQkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssV0FBakM7QUFDSDs7OzZDQUVnQjs7QUFFYixvQkFBSSxZQUFZLHNCQUFFLE1BQUYsRUFBVSxTQUFWLEVBQWhCO0FBQ0Esb0JBQUksYUFBYyxzQkFBRSxRQUFGLEVBQVksTUFBWixLQUF1QixzQkFBRSxNQUFGLEVBQVUsTUFBVixLQUFxQixHQUE5RDs7QUFFQSxvQkFBSSxZQUFZLFVBQWhCLEVBQTRCO0FBQ3hCLHlCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsS0FBSyxXQUFqQztBQUNIO0FBQ0o7OzswQ0FFYTtBQUNWLHFCQUFLLENBQUwsQ0FBTyxnQkFBUCxFQUF5QixXQUF6QixDQUFxQyxRQUFyQztBQUNIOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sZ0JBQVAsRUFBeUIsUUFBekIsQ0FBa0MsUUFBbEM7QUFDSDs7O2dDQWxHVztBQUFFLHVCQUFPLHFCQUFFLFFBQUYsK0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVsQjtBQUFFLHVCQUFPLGlCQUFQO0FBQTBCOzs7Z0NBRXJDO0FBQUU7QUFBMEI7Ozs7TUFUWixxQkFBVyxhOztBQXdHM0M7O3NCQUVjLGtCIiwiZmlsZSI6ImludGVydmlld19saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTI6MDA6MDRcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IEludGVydmlld0l0ZW1WaWV3IGZyb20gJ3ZpZXdzL2ludGVydmlld19pdGVtX3ZpZXcnO1xuaW1wb3J0IEludGVydmlld0NvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL2ludGVydmlld19jb2xsZWN0aW9uJztcbmltcG9ydCBJbnRlcnZpZXdNb2RlbCBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2ludGVydmlld19saXN0X3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25MaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cblx0Z2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdjb21wb3NpdGUtdmlldycgfVxuXG5cdGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI2ludGVydmlldy1saXN0JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIEludGVydmlld0l0ZW1WaWV3IH1cblxuXHRjaGlsZEV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdzaG93LWRldGFpbHMnIDogJ29uQ2hpbGRTaG93RGV0YWlscycsXG4gICAgXHR9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrICNsb2FkLW1vcmUtYnV0dG9uJyA6ICdvbkxvYWRNb3JlQnV0dG9uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cblx0LyogbWV0aG9kcyAqL1xuXHRpbml0aWFsaXplKG9wdGlvbnMpIHtcblxuXHRcdHRoaXMuZmV0Y2hQYXJhbXMgPSB7fTtcblxuXHRcdGlmIChvcHRpb25zLnRhZyAhPSBudWxsKVxuXHRcdFx0dGhpcy5mZXRjaFBhcmFtcy50YWcgPSBvcHRpb25zLnRhZ1xuXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGFzZXQgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hQYXJhbXMuZGF0YXNldCA9IG9wdGlvbnMuZGF0YXNldFxuXHRcdFxuXHRcdHRoaXMuY29sbGVjdGlvbiA9IG5ldyBJbnRlcnZpZXdDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMuaGlkZVNwaW5uZXIpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnZmV0Y2hpbmcnLHRoaXMuc2hvd1NwaW5uZXIpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ2ludGVydmlldzpjaGFuZ2VkJywgdGhpcy5vbkludGVydmlld0NoYW5nZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdpbnRlcnZpZXc6bmV3JywgdGhpcy5vbkludGVydmlld0FkZGVkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnaW50ZXJ2aWV3OnJlbW92ZWQnLCB0aGlzLk9uSW50ZXJ2aWV3UmVtb3ZlZCk7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcblx0fVxuXG4gICAgb25BdHRhY2goKSB7XG4gICAgICAgIC8vYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIgPSAgXy50aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICAgIH0sNTAwKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgb25CZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAvL3VuYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICAkKHdpbmRvdykub2ZmKFwic2Nyb2xsXCIsIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG5cblx0Ly8gdXBkYXRlIG1vZGVsIG9uIGRhdGEgY2hhbmdlXG4gICAgb25JbnRlcnZpZXdDaGFuZ2VkKGRhdGEpIHtcbiAgICBcdHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5nZXQoZGF0YS5faWQpO1xuICAgIFx0aWYgKG1vZGVsKVxuICAgIFx0XHRtb2RlbC5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uSW50ZXJ2aWV3QWRkZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgIFx0dmFyIGludGVydmlldyA9IG5ldyBJbnRlcnZpZXdNb2RlbChkYXRhKTtcbiAgICBcdGludGVydmlldy5mZXRjaCgpO1xuICAgIFx0IC8vIGFkZCB0byBmcm9udCBvZiBjb2xsZWN0aW9uXG5cdFx0dGhpcy5jb2xsZWN0aW9uLmFkZChpbnRlcnZpZXcsIHsgYXQ6IDB9KTtcbiAgICB9XG5cbiAgICBvbkludGVydmlld1JlbW92ZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24ucmVtb3ZlKGRhdGEpO1xuICAgIH1cblxuICAgIG9uTG9hZE1vcmVCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dTY3JvbGwoKSB7XG5cbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHRyaWdnZXJQb3MgPSAgJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAxLjI7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvcyA+IHRyaWdnZXJQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICBcbiAgICBoaWRlU3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcjZmV0Y2gtc3Bpbm5lcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkxpc3RWaWV3Il19