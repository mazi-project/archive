'use strict';

var assert = require('assert');
var _ = require('underscore');
var async = require('async');

var Interview = r_require('models/interview');
var Attachment = r_require('models/attachment');

var SOCKET_SERVER_URL = "http://localhost:"+Config.port
var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var MODEL_NUMBER = 10
var TEST_FILES = ['tests/files/img1.jpg','tests/files/img2.png']

describe('Socket Tests', function(){

    // sets thest timeout to 500 ms
    this.timeout(2000);

    var randomNumber = Math.floor(Math.random() * 1000);

    before(function(done) {

        // Add some Models
        var size = Math.floor(5 + Math.random() * 10)
        var array = _.map(_.range(size), function(i) {
            return {
                text: 'model'+i,
                name: 'Test Peter'
            }
        });

        Interview.create(array).then( () => {
            var db = r_require('models/database');
            db.disconnect(done);
        }).catch(done);
    });

    after(function(done) {

        var db = r_require('models/database');
        
        Interview.removeAll()
        .then( () => {
            return Attachment.removeAll()
        }).then( () => {
            db.disconnect(done);
        }).catch(done);
        
    });

    it("should connect to socket server", function(done) {

        var socketIoClient = require('socket.io-client')

        var socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('connect', function () { 
          socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });
    });

    it("should receive interview:new message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('interview:new', function (model) {
            assert.equal(randomNumber, model.text)
            socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });

        // post message
        request(BASE_URL).post('api/interviews').send({ text: randomNumber, name: 'Test Peter' }).end(function(err, res) {
        	if (err) throw err;
        });
    });

    it("should receive interview:removed message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        request(BASE_URL).get('api/interviews/').end(function(err, res) {
            if (err) throw err;
            
            var interviewId = res.body.docs[0].interview._id;

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('interview:removed', function (data) {

                assert.equal(data._id, interviewId)
                socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            // delete interview
            request(BASE_URL).delete('api/interviews/'+interviewId).auth(Config.authName, Config.authPassword).end(function(err, res) {
               if (err) throw err;
            });
        });
    });


    it("should receive interview:changed message on new attachment", function(done) {
        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        // create interview
        request(BASE_URL).get('api/interviews/').end(function(err, res) {
            if (err) throw err;

            var InterviewId = res.body.docs[0].interview._id;

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('interview:changed', function (data) {
                assert.equal(data._id, InterviewId);
                socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            var data = {
                text: "Lorem ipsum",
                interview: InterviewId
            }

            request(BASE_URL).post('api/attachments/').send(data).expect(200).end(function(err, res) {
                if (err) throw err;
            });
        });
    });

})
