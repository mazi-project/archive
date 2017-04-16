define(['exports', 'marionette', 'underscore', 'config', 'models/attachment_model', 'underscoreString', 'text!templates/audioplayer_tmpl.html'], function (exports, _marionette, _underscore, _config, _attachment_model, _underscoreString, _audioplayer_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-13 15:05:34
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _attachment_model2 = _interopRequireDefault(_attachment_model);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

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

            return _possibleConstructorReturn(this, (AudioPlayerView.__proto__ || Object.getPrototypeOf(AudioPlayerView)).apply(this, arguments));
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
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    truncate: function truncate(string) {
                        return _underscoreString2.default.truncate(string, _config2.default.stringTruncateShort);
                    }
                };
            }
        }]);

        return AudioPlayerView;
    }(_marionette2.default.ItemView);

    exports.default = AudioPlayerView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hdWRpb3BsYXllcl92aWV3LmpzIl0sIm5hbWVzIjpbImZvcm1hdFRpbWUiLCJzZWNzIiwibWluIiwiTWF0aCIsImZsb29yIiwic2VjIiwicGFyc2VJbnQiLCJBdWRpb1BsYXllclZpZXciLCJvcHRpb25zIiwibW9kZWwiLCJfaWQiLCJpZCIsImZldGNoIiwiYXVkaW8iLCJsaXN0ZW5UbyIsIm9uTW9kZWxGZXRjaGVkIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiJCIsIm9uIiwib25BdWRpb1RpbWVVcGRhdGUiLCJvbkF1ZGlvUGxheSIsIm9uQXVkaW9QYXVzZSIsIm9uQXVkaW9Mb2FkIiwib25BdWRpb0xvYWRlZCIsImdldCIsImZpbGVzVXJsIiwiZmlsZXNfdXJsIiwiZWwiLCJhdHRyIiwibmFtZSIsIm9mZiIsInJlbW92ZSIsImV2ZW50IiwicHJvZ3Jlc3MiLCJ0YXJnZXQiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwidGltZVJlbWFpbmluZyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwid2lkdGgiLCJodG1sIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInBhdXNlZCIsInBsYXkiLCJwYXVzZSIsInBlcmNlbnQiLCJvZmZzZXRYIiwidGVtcGxhdGUiLCJ0cnVuY2F0ZSIsInN0cmluZyIsInN0cmluZ1RydW5jYXRlU2hvcnQiLCJJdGVtVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLGFBQVNBLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO0FBQ3RCLFlBQUlDLE1BQU1DLEtBQUtDLEtBQUwsQ0FBV0gsT0FBTyxFQUFsQixDQUFWO0FBQ0EsWUFBSUksTUFBTUYsS0FBS0MsS0FBTCxDQUFXSCxPQUFPLEVBQWxCLENBQVY7O0FBRUE7QUFDQSxZQUFJSSxN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QUFDSDs7O2dDQWpIYztBQUFFLHVCQUFPLHFCQUFFYSxRQUFGLDRCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sYUFBUDtBQUFzQjs7O2dDQVNsQjtBQUNsQix1QkFBTztBQUNIQyw4QkFBVyxrQkFBU0MsTUFBVCxFQUFpQjtBQUN4QiwrQkFBTywyQkFBS0QsUUFBTCxDQUFjQyxNQUFkLEVBQXFCLGlCQUFPQyxtQkFBNUIsQ0FBUDtBQUNIO0FBSEUsaUJBQVA7QUFLSDs7OztNQXBCeUIscUJBQVdDLFE7O3NCQXdIMUJoRCxlIiwiZmlsZSI6ImF1ZGlvcGxheWVyX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTMgMTU6MDU6MzRcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IEF0dGFjaG1lbnRNb2RlbCBmcm9tICdtb2RlbHMvYXR0YWNobWVudF9tb2RlbCc7XG5pbXBvcnQgX3N0ciBmcm9tICd1bmRlcnNjb3JlU3RyaW5nJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2F1ZGlvcGxheWVyX3RtcGwuaHRtbCc7XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjcykge1xuICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHNlY3MgLyA2MCk7XG4gICAgdmFyIHNlYyA9IE1hdGguZmxvb3Ioc2VjcyAlIDYwKTtcbiAgICBcbiAgICAvL2lmIChtaW4gPCAxMCkge21pbiA9ICcwJyArIHBhcnNlSW50KG1pbik7fVxuICAgIGlmIChzZWMgPCAxMCkge3NlYyA9ICcwJyArIHBhcnNlSW50KHNlYyk7fVxuXG4gICAgcmV0dXJuICBtaW4gKyAnOicgKyBzZWM7XG59XG5cbmNsYXNzIEF1ZGlvUGxheWVyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2F1ZGlvcGxheWVyJyB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2xpY2sgLnBsYXktYnV0dG9uJyA6ICdvblBsYXlCdXR0b25DbGlja2VkJyxcbiAgICAgICAgICAgICdtb3VzZXVwIC5hdWRpby1zZWVrLWNvbnRyb2wnIDogJ29uQXVkaW9TZWVrJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRydW5jYXRlIDogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdHIudHJ1bmNhdGUoc3RyaW5nLENvbmZpZy5zdHJpbmdUcnVuY2F0ZVNob3J0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgQXR0YWNobWVudE1vZGVsKHsgX2lkOiBvcHRpb25zLmlkfSApO1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG5cbiAgICAgICAgdGhpcy5hdWRpbyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMub25Nb2RlbEZldGNoZWQpO1xuICAgIH1cblxuICAgIG9uTW9kZWxGZXRjaGVkKCkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1ZGlvID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG5cbiAgICAgICAgICAgIC8vYmluZCBhdWRpbyBldmVudHNcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub24oJ3RpbWV1cGRhdGUnLHRoaXMub25BdWRpb1RpbWVVcGRhdGUpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vbigncGxheScsdGhpcy5vbkF1ZGlvUGxheSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9uKCdwYXVzZScsdGhpcy5vbkF1ZGlvUGF1c2UpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vbignbG9hZHN0YXJ0Jyx0aGlzLm9uQXVkaW9Mb2FkKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub24oJ2NhbnBsYXknLHRoaXMub25BdWRpb0xvYWRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NyZWF0ZSBhdWRpb0VsZW1lbnRcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0KCdmaWxlJykpIHtcbiAgICAgICAgICAgIHZhciBmaWxlc1VybCA9IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnaW50ZXJ2aWV3JykuX2lkICsgJy8nO1xuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzLmF1ZGlvKVxuICAgICAgICAgICAgZWwuYXR0cihcImF1dG9wbGF5XCIsXCJhdXRvcGxheVwiKTtcbiAgICAgICAgICAgIGVsLmF0dHIoXCJzcmNcIixmaWxlc1VybCArIHRoaXMubW9kZWwuZ2V0KCdmaWxlJykubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvICE9IG51bGwpIHtcblxuICAgICAgICAgICAgLy91bmJpbmQgYXVkaW8gZXZlbnRzXG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigndGltZXVwZGF0ZScsdGhpcy5vbkF1ZGlvVGltZVVwZGF0ZSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigncGxheScsdGhpcy5vbkF1ZGlvUGxheSk7XG4gICAgICAgICAgICAkKHRoaXMuYXVkaW8pLm9mZigncGF1c2UnLHRoaXMub25BdWRpb1BhdXNlKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykub2ZmKCdsb2Fkc3RhcnQnLHRoaXMub25BdWRpb0xvYWQpO1xuICAgICAgICAgICAgJCh0aGlzLmF1ZGlvKS5vZmYoJ2NhbnBsYXknLHRoaXMub25BdWRpb0xvYWRlZCk7XG5cbiAgICAgICAgICAgICQodGhpcy5hdWRpbykuYXR0cignc3JjJyxcIlwiKTtcbiAgICAgICAgICAgICQodGhpcy5hdWRpbykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkF1ZGlvVGltZVVwZGF0ZShldmVudCkge1xuXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IGV2ZW50LnRhcmdldC5jdXJyZW50VGltZSAvIGV2ZW50LnRhcmdldC5kdXJhdGlvblxuICAgICAgICB2YXIgdGltZVJlbWFpbmluZyA9IGV2ZW50LnRhcmdldC5kdXJhdGlvbiAtIGV2ZW50LnRhcmdldC5jdXJyZW50VGltZVxuXG4gICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lUmVtYWluaW5nIC8gNjApO1xuICAgICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZyAlIDYwKTtcblxuICAgICAgICAkKCcuYXVkaW8tcGxheWVyLXByb2dyZXNzLWJhcicpLndpZHRoKHByb2dyZXNzKjEwMCtcIiVcIik7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIFwiK2Zvcm1hdFRpbWUodGltZVJlbWFpbmluZykpO1xuICAgIH1cblxuICAgIHNldFRpbWVSZW1haW5pbmcoKSB7XG5cbiAgICB9XG5cbiAgICBvbkF1ZGlvUGxheSgpIHtcbiAgICAgICAgJCgnLnBsYXktYnV0dG9uJykuYWRkQ2xhc3MoJ3BsYXlpbmcnKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvUGF1c2UoKSB7XG4gICAgICAgICQoJy5wbGF5LWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdwbGF5aW5nJyk7XG4gICAgfVxuXG4gICAgb25QbGF5QnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXVkaW8ucGF1c2VkKVxuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvU2VlayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hdWRpbykge1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBldmVudC5vZmZzZXRYIC8gJChldmVudC50YXJnZXQpLndpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lID0gcGVyY2VudCAqIHRoaXMuYXVkaW8uZHVyYXRpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXVkaW9Mb2FkKCkge1xuICAgICAgICAkKCcjdGltZS1yZW1haW5pbmcnKS5odG1sKFwiTG9hZGluZy4uLlwiKTtcbiAgICB9XG5cbiAgICBvbkF1ZGlvTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIDA6MDBcIik7XG4gICAgICAgICQoJyN0aW1lLXJlbWFpbmluZycpLmh0bWwoXCItIFwiK2Zvcm1hdFRpbWUoZXZlbnQudGFyZ2V0LmR1cmF0aW9uKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvUGxheWVyVmlldyJdfQ==