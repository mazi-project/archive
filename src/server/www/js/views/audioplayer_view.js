define(['exports', 'marionette', 'underscore', 'config', 'models/attachment_model', 'text!templates/audioplayer_tmpl.html'], function (exports, _marionette, _underscore, _config, _attachment_model, _audioplayer_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-12 17:44:54
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _attachment_model2 = _interopRequireDefault(_attachment_model);

    var _audioplayer_tmpl2 = _interopRequireDefault(_audioplayer_tmpl);

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

    function formatTime(secs) {
        var min = Math.floor(secs / 60);
        var sec = Math.floor(secs % 60);

        //if (min < 10) {min = '0' + parseInt(min);}
        if (sec < 10) {
            sec = '0' + parseInt(sec);
        }

        return min + ':' + sec;
    }

    var AudioPlayerView = function (_Marionette$ItemView) {
        _inherits(AudioPlayerView, _Marionette$ItemView);

        function AudioPlayerView() {
            _classCallCheck(this, AudioPlayerView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioPlayerView).apply(this, arguments));
        }

        _createClass(AudioPlayerView, [{
            key: 'events',
            value: function events() {
                return {
                    'click .play-button': 'onPlayButtonClicked',
                    'mouseup .audio-seek-control': 'onAudioSeek'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.model = new _attachment_model2.default({ _id: options.id });
                this.model.fetch();

                this.audio = null;

                this.listenTo(this.model, 'change', this.onModelFetched);
            }
        }, {
            key: 'onModelFetched',
            value: function onModelFetched() {
                this.render();

                if (this.audio == null) {
                    this.audio = document.createElement("audio");

                    //bind audio events
                    $(this.audio).on('timeupdate', this.onAudioTimeUpdate);
                    $(this.audio).on('play', this.onAudioPlay);
                    $(this.audio).on('pause', this.onAudioPause);
                    $(this.audio).on('loadstart', this.onAudioLoad);
                    $(this.audio).on('canplay', this.onAudioLoaded);
                }

                //create audioElement
                if (this.model.get('file')) {
                    var filesUrl = _config2.default.files_url + this.model.get('interview')._id + '/';
                    var el = $(this.audio);
                    el.attr("autoplay", "autoplay");
                    el.attr("src", filesUrl + this.model.get('file').name);
                }
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                if (this.audio != null) {

                    //unbind audio events
                    $(this.audio).off('timeupdate', this.onAudioTimeUpdate);
                    $(this.audio).off('play', this.onAudioPlay);
                    $(this.audio).off('pause', this.onAudioPause);
                    $(this.audio).off('loadstart', this.onAudioLoad);
                    $(this.audio).off('canplay', this.onAudioLoaded);

                    $(this.audio).attr('src', "");
                    $(this.audio).remove();
                }
            }
        }, {
            key: 'onAudioTimeUpdate',
            value: function onAudioTimeUpdate(event) {

                var progress = event.target.currentTime / event.target.duration;
                var timeRemaining = event.target.duration - event.target.currentTime;

                var minutes = Math.floor(timeRemaining / 60);
                var seconds = Math.floor(timeRemaining % 60);

                $('.audio-player-progress-bar').width(progress * 100 + "%");
                $('#time-remaining').html("- " + formatTime(timeRemaining));
            }
        }, {
            key: 'setTimeRemaining',
            value: function setTimeRemaining() {}
        }, {
            key: 'onAudioPlay',
            value: function onAudioPlay() {
                $('.play-button').addClass('playing');
            }
        }, {
            key: 'onAudioPause',
            value: function onAudioPause() {
                $('.play-button').removeClass('playing');
            }
        }, {
            key: 'onPlayButtonClicked',
            value: function onPlayButtonClicked() {
                if (this.audio.paused) this.audio.play();else this.audio.pause();
            }
        }, {
            key: 'onAudioSeek',
            value: function onAudioSeek(event) {
                if (this.audio) {
                    var percent = event.offsetX / $(event.target).width();
                    this.audio.currentTime = percent * this.audio.duration;
                }
            }
        }, {
            key: 'onAudioLoad',
            value: function onAudioLoad() {
                $('#time-remaining').html("Loading...");
            }
        }, {
            key: 'onAudioLoaded',
            value: function onAudioLoaded(event) {
                $('#time-remaining').html("- 0:00");
                $('#time-remaining').html("- " + formatTime(event.target.duration));
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_audioplayer_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'audioplayer';
            }
        }]);

        return AudioPlayerView;
    }(_marionette2.default.ItemView);

    exports.default = AudioPlayerView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdWRpb3BsYXllcl92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsYUFBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3RCLFlBQUksTUFBTSxLQUFLLEtBQUwsQ0FBVyxPQUFPLEVBQWxCLENBQVY7QUFDQSxZQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsT0FBTyxFQUFsQixDQUFWOzs7QUFHQSxZQUFJLE1BQU0sRUFBVixFQUFjO0FBQUMsa0JBQU0sTUFBTSxTQUFTLEdBQVQsQ0FBWjtBQUEyQjs7QUFFMUMsZUFBUSxNQUFNLEdBQU4sR0FBWSxHQUFwQjtBQUNIOztRQUVLLGU7Ozs7Ozs7Ozs7O3FDQU9PO0FBQ0wsdUJBQU87QUFDSCwwQ0FBdUIscUJBRHBCO0FBRUgsbURBQWdDO0FBRjdCLGlCQUFQO0FBSUg7Ozt1Q0FHVSxPLEVBQVM7O0FBRWhCLHFCQUFLLEtBQUwsR0FBYSwrQkFBb0IsRUFBRSxLQUFLLFFBQVEsRUFBZixFQUFwQixDQUFiO0FBQ0EscUJBQUssS0FBTCxDQUFXLEtBQVg7O0FBRUEscUJBQUssS0FBTCxHQUFhLElBQWI7O0FBRUEscUJBQUssUUFBTCxDQUFjLEtBQUssS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBSyxjQUF2QztBQUNIOzs7NkNBRWdCO0FBQ2IscUJBQUssTUFBTDs7QUFFQSxvQkFBSSxLQUFLLEtBQUwsSUFBYyxJQUFsQixFQUF3QjtBQUNwQix5QkFBSyxLQUFMLEdBQWEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWI7OztBQUdBLHNCQUFFLEtBQUssS0FBUCxFQUFjLEVBQWQsQ0FBaUIsWUFBakIsRUFBOEIsS0FBSyxpQkFBbkM7QUFDQSxzQkFBRSxLQUFLLEtBQVAsRUFBYyxFQUFkLENBQWlCLE1BQWpCLEVBQXdC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QixJQUFyQixDQUEwQixRQUExQjtBQUNBLGtCQUFFLGlCQUFGLEVBQXFCLElBQXJCLENBQTBCLE9BQUssV0FBVyxNQUFNLE1BQU4sQ0FBYSxRQUF4QixDQUEvQjtBQUNIOzs7Z0NBekdjO0FBQUUsdUJBQU8scUJBQUUsUUFBRiw0QkFBUDtBQUE2Qjs7O2dDQUU5QjtBQUFFLHVCQUFPLGFBQVA7QUFBc0I7Ozs7TUFMZCxxQkFBVyxROztzQkFnSDFCLGUiLCJmaWxlIjoiYXVkaW9wbGF5ZXJfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xMiAxNzo0NDo1NFxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQXR0YWNobWVudE1vZGVsIGZyb20gJ21vZGVscy9hdHRhY2htZW50X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2F1ZGlvcGxheWVyX3RtcGwuaHRtbCc7XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjcykge1xuICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHNlY3MgLyA2MCk7XG4gICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc2VjcyAlIDYwKTtcbiAgICBcbiAgICAvL2lmIChtaW4gPCAxMCkge21pbiA9ICcwJyArIHBhcnNlSW50KG1pbik7fVxuICAgIGlmIChzZWMgPCAxMCkge3NlYyA9ICcwJyArIHBhcnNlSW50KHNlYyk7fVxuXG4gICAgcmV0dXJuICBtaW4gKyAnOicgKyBzZWM7XG59XG5cbmNsYXNzIEF1ZGlvUGxheWVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2F1ZGlvcGxheWVyJyB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2xpY2sgLnBsYXktYnV0dG9uJyA6ICdvblBsYXlCdXR0b25DbGlja2VkJyxcbiAgICAgICAgICAgICdtb3VzZXVwIC5hdWRpby1zZWVrLWNvbnRyb2wnIDogJ29uQXVkaW9TZWVrJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgQXR0YWNobWVudE1vZGVsKHsgX2lkOiBvcHRpb25zLmlkfSApO1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG5cbiAgICAgICAgdGhpcy5hdWRpbyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMub25Nb2RlbEZldGNoZWQpO1xuICAgIH1cblxuICAgIG9uTW9kZWxGZXRjaGVkKCkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1ZGlvID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG5cbiAgICAgICAgICAgIC8vYmluZCBhdWRpbyBldmVudHNcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub24oJ3RpbWV1cGRhdGUnLHRoaXMub25BdWRpb1RpbWVVcGRhdGUpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vbigncGxheScsdGhpcy5vbkF1ZGlvUGxheSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9uKCdwYXVzZScsdGhpcy5vbkF1ZGlvUGF1c2UpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vbignbG9hZHN0YXJ0Jyx0aGlzLm9uQXVkaW9Mb2FkKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub24oJ2NhbnBsYXknLHRoaXMub25BdWRpb0xvYWRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NyZWF0ZSBhdWRpb0VsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0KCdmaWxlJykpIHtcbiAgICAgICAgICAgIHZhciBmaWxlc1VybCA9IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnaW50ZXJ2aWV3JykuX2lkICsgJy8nO1xuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzLmF1ZGlvKVxuICAgICAgICAgICAgZWwuYXR0cihcImF1dG9wbGF5XCIsXCJhdXRvcGxheVwiKTtcbiAgICAgICAgICAgIGVsLmF0dHIoXCJzcmNcIixmaWxlc1VybCArIHRoaXMubW9kZWwuZ2V0KCdmaWxlJykubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvICE9IG51bGwpIHtcblxuICAgICAgICAgICAgLy91bmJpbmQgYXVkaW8gZXZlbnRzXG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigndGltZXVwZGF0ZScsdGhpcy5vbkF1ZGlvVGltZVVwZGF0ZSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigncGxheScsdGhpcy5vbkF1ZGlvUGxheSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigncGF1c2UnLHRoaXMub25BdWRpb1BhdXNlKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub2ZmKCdsb2Fkc3RhcnQnLHRoaXMub25BdWRpb0xvYWQpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vZmYoJ2NhbnBsYXknLHRoaXMub25BdWRpb0xvYWRlZCk7XG5cbiAgICAgICAgICAgICQodGhpcy5hdWRpbykuYXR0cignc3JjJyxcIlwiKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkF1ZGlvVGltZVVwZGF0ZShldmVudCkge1xuXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IGV2ZW50LnRhcmdldC5jdXJyZW50VGltZSAvIGV2ZW50LnRhcmdldC5kdXJhdGlvblxuICAgICAgICB2YXIgdGltZVJlbWFpbmluZyA9IGV2ZW50LnRhcmdldC5kdXJhdGlvbiAtIGV2ZW50LnRhcmdldC5jdXJyZW50VGltZVxuXG4gICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lUmVtYWluaW5nIC8gNjApO1xuICAgICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZyAlIDYwKTtcblxuICAgICAgICAkKCcuYXVkaW8tcGxheWVyLXByb2dyZXNzLWJhcicpLndpZHRoKHByb2dyZXNzKjEwMCtcIiVcIik7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIFwiK2Zvcm1hdFRpbWUodGltZVJlbWFpbmluZykpO1xuICAgIH1cblxuICAgIHNldFRpbWVSZW1haW5pbmcoKSB7XG5cbiAgICB9XG5cbiAgICBvbkF1ZGlvUGxheSgpIHtcbiAgICAgICAgJCgnLnBsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvUGF1c2UoKSB7XG4gICAgICAgICQoJy5wbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdwbGF5aW5nJyk7XG4gICAgfVxuXG4gICAgb25QbGF5QnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXVkaW8ucGF1c2VkKVxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvU2VlayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hdWRpbykge1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBldmVudC5vZmZzZXRYIC8gJChldmVudC50YXJnZXQpLndpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gcGVyY2VudCAqIHRoaXMuYXVkaW8uZHVyYXRpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXVkaW9Mb2FkKCkge1xuICAgICAgICAkKCcjdGltZS1yZW1haW5pbmcnKS5odG1sKFwiTG9hZGluZy4uLlwiKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIDA6MDBcIik7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIFwiK2Zvcm1hdFRpbWUoZXZlbnQudGFyZ2V0LmR1cmF0aW9uKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvUGxheWVyVmlldyJdfQ==