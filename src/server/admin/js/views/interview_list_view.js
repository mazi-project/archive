define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'models/interview_collection', 'text!templates/interview_list_tmpl.html', 'text!templates/interview_item_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _interview_collection, _interview_list_tmpl, _interview_item_tmpl) {
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
                    'click #load-more-button': 'onLoadMoreButtonClick',
                    'click #add-interview-button': 'onAddInterviewButtonClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.fetchParams = {};

                if (options.tag != null) this.fetchParams.tag = options.tag;

                this.collection = new _interview_collection2.default();

                this.collection.fetch();
            }
        }, {
            key: 'onAddInterviewButtonClick',
            value: function onAddInterviewButtonClick() {
                window.location.href = '#interview/new';
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
                    tagName: 'li',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbIkludGVydmlld0xpc3RWaWV3Iiwib3B0aW9ucyIsImZldGNoUGFyYW1zIiwidGFnIiwiY29sbGVjdGlvbiIsImZldGNoIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidGVtcGxhdGUiLCJJdGVtVmlldyIsImV4dGVuZCIsImNsYXNzTmFtZSIsInRhZ05hbWUiLCJldmVudHMiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQiLCJjb25maXJtIiwibW9kZWwiLCJkZXN0cm95Iiwib25FZGl0QnV0dG9uQ2xpY2tlZCIsImlkIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JNQSxpQjs7Ozs7Ozs7Ozs7cUNBNkJPO0FBQ0wsdUJBQU87QUFDSCwrQ0FBNEIsdUJBRHpCO0FBRUgsbURBQWdDO0FBRjdCLGlCQUFQO0FBSUg7Ozt1Q0FHT0MsTyxFQUFTOztBQUVuQixxQkFBS0MsV0FBTCxHQUFtQixFQUFuQjs7QUFFQSxvQkFBSUQsUUFBUUUsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBS0QsV0FBTCxDQUFpQkMsR0FBakIsR0FBdUJGLFFBQVFFLEdBQS9COztBQUVELHFCQUFLQyxVQUFMLEdBQWtCLG9DQUFsQjs7QUFFTSxxQkFBS0EsVUFBTCxDQUFnQkMsS0FBaEI7QUFDTjs7O3dEQUU4QjtBQUN4QkMsdUJBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLGdCQUF2QjtBQUNIOzs7Z0NBaERXO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYsK0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVsQjtBQUFFLHVCQUFPLGlCQUFQO0FBQTBCOzs7Z0NBRXJDO0FBQ1QsdUJBQU8scUJBQVdDLFFBQVgsQ0FBb0JDLE1BQXBCLENBQTJCO0FBQzlCRiw4QkFBVSxxQkFBRUEsUUFBRiwrQkFEb0I7QUFFOUJHLCtCQUFZLFlBRmtCO0FBRzlCQyw2QkFBVSxJQUhvQjtBQUk5QkMsNEJBQVM7QUFDTCwrQ0FBd0IsdUJBRG5CO0FBRUwsNkNBQXNCO0FBRmpCLHFCQUpxQjtBQVE5QkMsMkNBQXdCLGlDQUFXO0FBQy9CLDRCQUFJQyxRQUFRLGdEQUFSLENBQUosRUFBK0Q7QUFDM0QsaUNBQUtDLEtBQUwsQ0FBV0MsT0FBWDtBQUNIO0FBQ0oscUJBWjZCO0FBYTlCQyx5Q0FBc0IsK0JBQVc7QUFDN0JiLCtCQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixnQkFBYyxLQUFLUyxLQUFMLENBQVdHLEVBQWhEO0FBQ0g7QUFmNkIsaUJBQTNCLENBQVA7QUFpQkg7Ozs7TUEzQjJCLHFCQUFXQyxhOztBQXNEMUM7O3NCQUVjckIsaUIiLCJmaWxlIjoiaW50ZXJ2aWV3X2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNCAxMjowMDowNFxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgSW50ZXJ2aWV3Q29sbGVjdGlvbiBmcm9tICdtb2RlbHMvaW50ZXJ2aWV3X2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X2xpc3RfdG1wbC5odG1sJztcbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgSW50ZXJ2aWV3TGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG5cdGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnY29tcG9zaXRlLXZpZXcnIH1cblxuXHRnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNpbnRlcnZpZXctbGlzdCcgfVxuXG5cdGdldCBjaGlsZFZpZXcoKSB7IFxuICAgICAgICByZXR1cm4gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoaXRlbVRlbXBsYXRlKSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdhdHRhY2htZW50JyxcbiAgICAgICAgICAgIHRhZ05hbWUgOiAnbGknLFxuICAgICAgICAgICAgZXZlbnRzIDoge1xuICAgICAgICAgICAgICAgICdjbGljayAjZGVsZXRlQnV0dG9uJyA6ICdvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQnLFxuICAgICAgICAgICAgICAgICdjbGljayAjZWRpdEJ1dHRvbicgOiAnb25FZGl0QnV0dG9uQ2xpY2tlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIGludGVydmlldz9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRWRpdEJ1dHRvbkNsaWNrZWQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiI2ludGVydmlldy9cIit0aGlzLm1vZGVsLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrICNsb2FkLW1vcmUtYnV0dG9uJyA6ICdvbkxvYWRNb3JlQnV0dG9uQ2xpY2snLFxuICAgICAgICAgICAgJ2NsaWNrICNhZGQtaW50ZXJ2aWV3LWJ1dHRvbicgOiAnb25BZGRJbnRlcnZpZXdCdXR0b25DbGljaydcbiAgICAgICAgfVxuICAgIH1cblxuXHQvKiBtZXRob2RzICovXG5cdGluaXRpYWxpemUob3B0aW9ucykge1xuXG5cdFx0dGhpcy5mZXRjaFBhcmFtcyA9IHt9O1xuXG5cdFx0aWYgKG9wdGlvbnMudGFnICE9IG51bGwpXG5cdFx0XHR0aGlzLmZldGNoUGFyYW1zLnRhZyA9IG9wdGlvbnMudGFnXG5cdFx0XG5cdFx0dGhpcy5jb2xsZWN0aW9uID0gbmV3IEludGVydmlld0NvbGxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZmV0Y2goKTtcblx0fVxuXG4gICAgb25BZGRJbnRlcnZpZXdCdXR0b25DbGljaygpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnI2ludGVydmlldy9uZXcnO1xuICAgIH1cblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZpZXdMaXN0VmlldzsiXX0=