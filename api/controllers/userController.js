'use strict';

var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 

var T = new Twit(config);

exports.createUser = function(req, res) {
    console.log(req);
    // todo:
};