define(['exports', 'marionette', 'underscore', 'jquery', 'config', 'models/attachment_collection', 'text!templates/attachment_item_tmpl.html', 'text!templates/attachment_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _config, _attachment_collection, _attachment_item_tmpl, _attachment_list_tmpl) {
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

    var _attachment_collection2 = _interopRequireDefault(_attachment_collection);

    var _attachment_item_tmpl2 = _interopRequireDefault(_attachment_item_tmpl);

    var _attachment_list_tmpl2 = _interopRequireDefault(_attachment_list_tmpl);

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

    var AttachmentListView = function (_Marionette$Composite) {
        _inherits(AttachmentListView, _Marionette$Composite);

        function AttachmentListView() {
            _classCallCheck(this, AttachmentListView);

            return _possibleConstructorReturn(this, (AttachmentListView.__proto__ || Object.getPrototypeOf(AttachmentListView)).apply(this, arguments));
        }

        _createClass(AttachmentListView, [{
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

                if (options.interview != null) this.fetchParams.interview = options.interview;

                this.collection = new _attachment_collection2.default();

                this.collection.fetch({ data: _jquery2.default.param(this.fetchParams) });
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_attachment_list_tmpl2.default);
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#attachment-list';
            }
        }, {
            key: 'className',
            get: function get() {
                return 'composite-view';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _marionette2.default.ItemView.extend({
                    template: _underscore2.default.template(_attachment_item_tmpl2.default),
                    className: 'attachment',
                    tagName: 'li',
                    events: {
                        'click #deleteButton': 'onDeleteButtonClicked',
                        'click #editButton': 'onEditButtonClicked'
                    },
                    templateHelpers: {
                        fileDir: _config2.default.files_url
                    },
                    onDeleteButtonClicked: function onDeleteButtonClicked() {
                        if (confirm("Are you sure you want to delete the attachment?")) {
                            this.model.destroy();
                        }
                    },
                    onEditButtonClicked: function onEditButtonClicked() {
                        window.location.href = "#attachment/" + this.model.id;
                    }
                });
            }
        }]);

        return AttachmentListView;
    }(_marionette2.default.CompositeView);

    ;

    exports.default = AttachmentListView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdHRhY2htZW50X2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6WyJBdHRhY2htZW50TGlzdFZpZXciLCJvcHRpb25zIiwiZmV0Y2hQYXJhbXMiLCJpbnRlcnZpZXciLCJjb2xsZWN0aW9uIiwiZmV0Y2giLCJkYXRhIiwicGFyYW0iLCJ0ZW1wbGF0ZSIsIkl0ZW1WaWV3IiwiZXh0ZW5kIiwiY2xhc3NOYW1lIiwidGFnTmFtZSIsImV2ZW50cyIsInRlbXBsYXRlSGVscGVycyIsImZpbGVEaXIiLCJmaWxlc191cmwiLCJvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQiLCJjb25maXJtIiwibW9kZWwiLCJkZXN0cm95Iiwib25FZGl0QnV0dG9uQ2xpY2tlZCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImlkIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JNQSxrQjs7Ozs7Ozs7Ozs7cUNBK0JPO0FBQ0wsdUJBQU87QUFDSCwrQ0FBNEI7QUFEekIsaUJBQVA7QUFHSDs7O3VDQUdPQyxPLEVBQVM7O0FBRW5CLHFCQUFLQyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJRCxRQUFRRSxTQUFSLElBQXFCLElBQXpCLEVBQ0MsS0FBS0QsV0FBTCxDQUFpQkMsU0FBakIsR0FBNkJGLFFBQVFFLFNBQXJDOztBQUVELHFCQUFLQyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFTSxxQkFBS0EsVUFBTCxDQUFnQkMsS0FBaEIsQ0FBc0IsRUFBRUMsTUFBTSxpQkFBRUMsS0FBRixDQUFRLEtBQUtMLFdBQWIsQ0FBUixFQUF0QjtBQUVOOzs7Z0NBL0NpQjtBQUFFLHVCQUFPLHFCQUFFTSxRQUFGLGdDQUFQO0FBQTZCOzs7Z0NBRXJCO0FBQUUsdUJBQU8sa0JBQVA7QUFBMkI7OztnQ0FFekM7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUUzQjtBQUNULHVCQUFPLHFCQUFXQyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQjtBQUM5QkYsOEJBQVUscUJBQUVBLFFBQUYsZ0NBRG9CO0FBRTlCRywrQkFBWSxZQUZrQjtBQUc5QkMsNkJBQVMsSUFIcUI7QUFJOUJDLDRCQUFTO0FBQ0wsK0NBQXdCLHVCQURuQjtBQUVMLDZDQUFzQjtBQUZqQixxQkFKcUI7QUFROUJDLHFDQUFpQjtBQUNiQyxpQ0FBVSxpQkFBT0M7QUFESixxQkFSYTtBQVc5QkMsMkNBQXdCLGlDQUFXO0FBQy9CLDRCQUFJQyxRQUFRLGlEQUFSLENBQUosRUFBZ0U7QUFDNUQsaUNBQUtDLEtBQUwsQ0FBV0MsT0FBWDtBQUNIO0FBQ0oscUJBZjZCO0FBZ0I5QkMseUNBQXNCLCtCQUFXO0FBQzdCQywrQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsaUJBQWUsS0FBS0wsS0FBTCxDQUFXTSxFQUFqRDtBQUNIO0FBbEI2QixpQkFBM0IsQ0FBUDtBQW9CSDs7OztNQTdCNEIscUJBQVdDLGE7O0FBb0QzQzs7c0JBRWMxQixrQiIsImZpbGUiOiJhdHRhY2htZW50X2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNCAxMjowMDowNFxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQXR0YWNobWVudENvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL2F0dGFjaG1lbnRfY29sbGVjdGlvbic7XG5cbmltcG9ydCBpdGVtVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvYXR0YWNobWVudF9pdGVtX3RtcGwuaHRtbCc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvYXR0YWNobWVudF9saXN0X3RtcGwuaHRtbCc7XG5cbmNsYXNzIEF0dGFjaG1lbnRMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNhdHRhY2htZW50LWxpc3QnIH1cblxuXHRnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2NvbXBvc2l0ZS12aWV3JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgXG4gICAgICAgIHJldHVybiBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZShpdGVtVGVtcGxhdGUpLFxuICAgICAgICAgICAgY2xhc3NOYW1lIDogJ2F0dGFjaG1lbnQnLFxuICAgICAgICAgICAgdGFnTmFtZTogJ2xpJyxcbiAgICAgICAgICAgIGV2ZW50cyA6IHtcbiAgICAgICAgICAgICAgICAnY2xpY2sgI2RlbGV0ZUJ1dHRvbicgOiAnb25EZWxldGVCdXR0b25DbGlja2VkJyxcbiAgICAgICAgICAgICAgICAnY2xpY2sgI2VkaXRCdXR0b24nIDogJ29uRWRpdEJ1dHRvbkNsaWNrZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGVIZWxwZXJzOiB7XG4gICAgICAgICAgICAgICAgZmlsZURpciA6IENvbmZpZy5maWxlc191cmxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkRlbGV0ZUJ1dHRvbkNsaWNrZWQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIGF0dGFjaG1lbnQ/XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVkaXRCdXR0b25DbGlja2VkIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNhdHRhY2htZW50L1wiK3RoaXMubW9kZWwuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcbiAgICB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2xpY2sgI2xvYWQtbW9yZS1idXR0b24nIDogJ29uTG9hZE1vcmVCdXR0b25DbGljaydcbiAgICAgICAgfVxuICAgIH1cblxuXHQvKiBtZXRob2RzICovXG5cdGluaXRpYWxpemUob3B0aW9ucykge1xuXG5cdFx0dGhpcy5mZXRjaFBhcmFtcyA9IHt9O1xuXG5cdFx0aWYgKG9wdGlvbnMuaW50ZXJ2aWV3ICE9IG51bGwpXG5cdFx0XHR0aGlzLmZldGNoUGFyYW1zLmludGVydmlldyA9IG9wdGlvbnMuaW50ZXJ2aWV3XG5cdFx0XG5cdFx0dGhpcy5jb2xsZWN0aW9uID0gbmV3IEF0dGFjaG1lbnRDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKHsgZGF0YTogJC5wYXJhbSh0aGlzLmZldGNoUGFyYW1zKSB9KTtcblxuXHR9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXR0YWNobWVudExpc3RWaWV3OyJdfQ==