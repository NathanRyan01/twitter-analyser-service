'use strict';

var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 
//file which is a js file which contains the keys ans tokens

var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it


const util = require('util')

//console.log(util.inspect(myObject, {showHidden: false, depth: null}))

// alternative shortcut


function searchedData(err, data, response) {
    console.log(data);
} // searchedData function is a callback function which 

exports.searchTwitter = function(req, res) {

    //console.log(req.toJson());
    //console.log(util.inspect(req.body, false, null))

    var params = {
        q: req.body.data, // sample search term
        count: 100
    } 

    T.get('search/tweets', params, function(err, data, response) {
    if (err)
      res.send(err);
      res.json(data);
   // console.log(response);
  });
};
