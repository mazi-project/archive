'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-13 15:05:34
*/

import Marionette from 'marionette'
import _ from 'underscore'
import Config from 'config';
import AttachmentModel from 'models/attachment_model';
import _str from 'underscoreString';

import template from 'text!templates/audioplayer_tmpl.html';

function formatTime(secs) {
    var min = Math.floor(secs / 60);
    var sec = Math.floor(secs % 60);
    
    //if (min < 10) {min = '0' + parseInt(min);}
    if (sec < 10) {sec = '0' + parseInt(sec);}

    return  min + ':' + sec;
}

class AudioPlayerView extends Marionette.ItemView {

	/* properties */
    get template() { return _.template(template) }

    get className() { return 'audioplayer' }

    events() {
        return {
            'click .play-button' : 'onPlayButtonClicked',
            'mouseup .audio-seek-control' : 'onAudioSeek'
        }
    }

    get templateHelpers() {
        return {
            truncate : function(string) {
                return _str.truncate(string,Config.stringTruncateShort)
            }
        }
    }

    /* methods */
    initialize(options) {

        this.model = new AttachmentModel({ _id: options.id} );
        this.model.fetch();

        this.audio = null;

        this.listenTo(this.model,'change',this.onModelFetched);
    }

    onModelFetched() {
        this.render();

        if (this.audio == null) {
            this.audio = document.createElement("audio");

            //bind audio events
            $(this.audio).on('timeupdate',this.onAudioTimeUpdate);
            $(this.audio).on('play',this.onAudioPlay);
            $(this.audio).on('pause',this.onAudioPause);
            $(this.audio).on('loadstart',this.onAudioLoad);
            $(this.audio).on('canplay',this.onAudioLoaded);
        }

        //create audioElement
        if (this.model.get('file')) {
            var filesUrl = Config.files_url + this.model.get('interview')._id + '/';
            var el = $(this.audio)
            el.attr("autoplay","autoplay");
            el.attr("src",filesUrl + this.model.get('file').name);
        }
    }

    onBeforeDestroy() {
        if (this.audio != null) {

            //unbind audio events
            $(this.audio).off('timeupdate',this.onAudioTimeUpdate);
            $(this.audio).off('play',this.onAudioPlay);
            $(this.audio).off('pause',this.onAudioPause);
            $(this.audio).off('loadstart',this.onAudioLoad);
            $(this.audio).off('canplay',this.onAudioLoaded);

            $(this.audio).attr('src',"");
            $(this.audio).remove();
        }
    }

    onAudioTimeUpdate(event) {

        var progress = event.target.currentTime / event.target.duration
        var timeRemaining = event.target.duration - event.target.currentTime

        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining % 60);

        $('.audio-player-progress-bar').width(progress*100+"%");
        $('#time-remaining').html("- "+formatTime(timeRemaining));
    }

    setTimeRemaining() {

    }

    onAudioPlay() {
        $('.play-button').addClass('playing');
    }

    onAudioPause() {
        $('.play-button').removeClass('playing');
    }

    onPlayButtonClicked() {
        if (this.audio.paused)
            this.audio.play();
        else
            this.audio.pause();
    }

    onAudioSeek(event) {
        if (this.audio) {
            var percent = event.offsetX / $(event.target).width();
            this.audio.currentTime = percent * this.audio.duration
        }
    }

    onAudioLoad() {
        $('#time-remaining').html("Loading...");
    }

    onAudioLoaded(event) {
        $('#time-remaining').html("- 0:00");
        $('#time-remaining').html("- "+formatTime(event.target.duration));
    }

}

export default AudioPlayerView