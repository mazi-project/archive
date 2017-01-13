'use strict';

var express = require('express');
var _ = require('underscore');

var router = express.Router();

var Auth = r_require('/router/_authentification');

/*
 * GET /login/
 */ 
router.get('/', Auth.authentificate, function(req,res){
	res.send("login succesfull.");
});

module.exports = router;