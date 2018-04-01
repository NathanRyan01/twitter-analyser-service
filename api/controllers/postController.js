var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 
//file which is a js file which contains the keys ans tokens

var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it

const util = require('util')
var message = 'success';

function postData(err, data, response) {
    console.log(data);
} 

exports.postTwitter = function(req, res) {
    T.post('statuses/update', {status: req.body.data},  function(error, tweet, response){
        if(error){
            console.log(error);
        }
        else{
            res.json(message);
        }
    });
}