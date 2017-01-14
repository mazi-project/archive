'use strict';

var socketio = require('socket.io');

var appEvents = r_require('/utils/appEvents');

module.exports = function (http) {

	var sio = socketio(http);

	sio.on('connection', function(socket){

	    log('Socket client connected');

		socket.on('error', function(err) {
	    	log(err);
		});

	    // Server event handlers
	    
	    /* ALL NAMESPACES */

	    function interviewAddedHandler(data) {
		    sio.emit('interview:new', data, socket.id); // this will send a signal to the interface and central webserver
	    }
		appEvents.on('interview:new', interviewAddedHandler);

		function interviewRemovedHandler(data) {
			sio.emit('interview:removed',data, socket.id);
		}
		appEvents.on('interview:removed', interviewRemovedHandler);

		function interviewChangedHandler(data) {
			sio.emit('interview:changed', data, socket.id);
		}
		appEvents.on('interview:changed', interviewChangedHandler);

	    // Clean up after disconnect
	    socket.on('disconnect', function(){
	        log('Socket client disconnected');

	        //remove server events
	        appEvents.removeListener('interview:new',interviewAddedHandler);
	        appEvents.removeListener('interview:removed',interviewRemovedHandler);
	        appEvents.removeListener('interview:changed',interviewChangedHandler);
	    });

	});

};