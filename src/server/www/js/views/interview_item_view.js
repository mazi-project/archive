define(['exports', 'marionette', 'backbone', 'underscore', 'underscoreString', 'jquery', 'config', 'text!templates/interview_item_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _underscoreString, _jquery, _config, _interview_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-15 14:44:41
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _config2 = _interopRequireDefault(_config);

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

    var SubmissionItemView = function (_Marionette$ItemView) {
        _inherits(SubmissionItemView, _Marionette$ItemView);

        function SubmissionItemView() {
            _classCallCheck(this, SubmissionItemView);

            return _possibleConstructorReturn(this, (SubmissionItemView.__proto__ || Object.getPrototypeOf(SubmissionItemView)).apply(this, arguments));
        }

        _createClass(SubmissionItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .play-button': 'onPlayButtonClicked',
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                //console.log(this.model);
            }
        }, {
            key: 'getBackgroundImageString',
            value: function getBackgroundImageString() {
                var filesUrl = _config2.default.files_url + this.model.get('_id') + '/';
                if (!this.model.get('image')) return "";else return "style=\"background-image: url('" + filesUrl + this.model.get('image').name + "')\"";
            }
        }, {
            key: 'onClick',
            value: function onClick(event) {
                event.preventDefault();
                window.location.href = "#interview/" + this.model.get('_id');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_interview_item_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'item-view card';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    text_truncated: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateShort, '...'),
                    tags: _underscore2.default.unique(_underscore2.default.flatten(_underscore2.default.pluck(this.model.get('attachments'), "tags"))),
                    backgroundImage: this.getBackgroundImageString(),
                    first: function first(array, n) {
                        return _underscore2.default.first(array, n);
                    }
                };
            }
        }, {
            key: 'modelEvents',
            get: function get() {
                return {
                    'change': 'render'
                };
            }
        }]);

        return SubmissionItemView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionItemView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9pbnRlcnZpZXdfaXRlbV92aWV3LmpzIl0sIm5hbWVzIjpbIlN1Ym1pc3Npb25JdGVtVmlldyIsIm9wdGlvbnMiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsIm1vZGVsIiwiZ2V0IiwibmFtZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0ZW1wbGF0ZSIsInRleHRfdHJ1bmNhdGVkIiwidHJ1bmNhdGUiLCJzdHJpbmdUcnVuY2F0ZVNob3J0IiwidGFncyIsInVuaXF1ZSIsImZsYXR0ZW4iLCJwbHVjayIsImJhY2tncm91bmRJbWFnZSIsImdldEJhY2tncm91bmRJbWFnZVN0cmluZyIsImZpcnN0IiwiYXJyYXkiLCJuIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsa0I7Ozs7Ozs7Ozs7O3FDQXlCTztBQUNMLHVCQUFPO0FBQ0gsMENBQXVCLHFCQURwQjtBQUVILDZCQUFVO0FBRlAsaUJBQVA7QUFJSDs7O3VDQUdVQyxPLEVBQVM7QUFDaEI7QUFDSDs7O3VEQUUwQjtBQUN2QixvQkFBSUMsV0FBVyxpQkFBT0MsU0FBUCxHQUFtQixLQUFLQyxLQUFMLENBQVdDLEdBQVgsQ0FBZSxLQUFmLENBQW5CLEdBQTJDLEdBQTFEO0FBQ0Esb0JBQUksQ0FBQyxLQUFLRCxLQUFMLENBQVdDLEdBQVgsQ0FBZSxPQUFmLENBQUwsRUFDSSxPQUFPLEVBQVAsQ0FESixLQUdJLE9BQU8sb0NBQWtDSCxRQUFsQyxHQUEyQyxLQUFLRSxLQUFMLENBQVdDLEdBQVgsQ0FBZSxPQUFmLEVBQXdCQyxJQUFuRSxHQUF3RSxNQUEvRTtBQUNQOzs7b0NBRU9DLEssRUFBTztBQUNYQSxzQkFBTUMsY0FBTjtBQUNBQyx1QkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsZ0JBQWMsS0FBS1AsS0FBTCxDQUFXQyxHQUFYLENBQWUsS0FBZixDQUFyQztBQUNIOzs7Z0NBN0NjO0FBQUUsdUJBQU8scUJBQUVPLFFBQUYsK0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVyQjtBQUN4Qix1QkFBTztBQUNHQyxvQ0FBaUIsMkJBQUtDLFFBQUwsQ0FBYyxLQUFLVixLQUFMLENBQVdDLEdBQVgsQ0FBZSxNQUFmLENBQWQsRUFBcUMsaUJBQU9VLG1CQUE1QyxFQUFnRSxLQUFoRSxDQURwQjtBQUVHQywwQkFBTyxxQkFBRUMsTUFBRixDQUFTLHFCQUFFQyxPQUFGLENBQVUscUJBQUVDLEtBQUYsQ0FBUSxLQUFLZixLQUFMLENBQVdDLEdBQVgsQ0FBZSxhQUFmLENBQVIsRUFBc0MsTUFBdEMsQ0FBVixDQUFULENBRlY7QUFHR2UscUNBQWtCLEtBQUtDLHdCQUFMLEVBSHJCO0FBSUdDLDJCQUFRLGVBQVNDLEtBQVQsRUFBZUMsQ0FBZixFQUFrQjtBQUN0QiwrQkFBTyxxQkFBRUYsS0FBRixDQUFRQyxLQUFSLEVBQWNDLENBQWQsQ0FBUDtBQUNIO0FBTkosaUJBQVA7QUFRRzs7O2dDQUVpQjtBQUNkLHVCQUFPO0FBQ0gsOEJBQVc7QUFEUixpQkFBUDtBQUdIOzs7O01BdEI0QixxQkFBV0MsUTs7c0JBb0Q3QnpCLGtCIiwiZmlsZSI6ImludGVydmlld19pdGVtX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTUgMTQ6NDQ6NDFcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IF9zdHIgZnJvbSAndW5kZXJzY29yZVN0cmluZyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaW50ZXJ2aWV3X2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgU3VibWlzc2lvbkl0ZW1WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnaXRlbS12aWV3IGNhcmQnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIHRleHRfdHJ1bmNhdGVkIDogX3N0ci50cnVuY2F0ZSh0aGlzLm1vZGVsLmdldCgndGV4dCcpLENvbmZpZy5zdHJpbmdUcnVuY2F0ZVNob3J0LCcuLi4nKSxcbiAgICAgICAgICAgIHRhZ3MgOiBfLnVuaXF1ZShfLmZsYXR0ZW4oXy5wbHVjayh0aGlzLm1vZGVsLmdldCgnYXR0YWNobWVudHMnKSxcInRhZ3NcIikpKSxcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZSA6IHRoaXMuZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKCksXG4gICAgICAgICAgICBmaXJzdCA6IGZ1bmN0aW9uKGFycmF5LG4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maXJzdChhcnJheSxuKSBcbiAgICAgICAgICAgIH1cblx0XHR9XG4gICAgfVxuXG4gICAgZ2V0IG1vZGVsRXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NoYW5nZScgOiAncmVuZGVyJ1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2xpY2sgLnBsYXktYnV0dG9uJyA6ICdvblBsYXlCdXR0b25DbGlja2VkJyxcbiAgICAgICAgICAgICdjbGljaycgOiAnb25DbGljaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBnZXRCYWNrZ3JvdW5kSW1hZ2VTdHJpbmcoKSB7XG4gICAgICAgIHZhciBmaWxlc1VybCA9IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLyc7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbC5nZXQoJ2ltYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwic3R5bGU9XFxcImJhY2tncm91bmQtaW1hZ2U6IHVybCgnXCIrZmlsZXNVcmwrdGhpcy5tb2RlbC5nZXQoJ2ltYWdlJykubmFtZStcIicpXFxcIlwiO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNpbnRlcnZpZXcvXCIrdGhpcy5tb2RlbC5nZXQoJ19pZCcpXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pc3Npb25JdGVtVmlldzsiXX0=