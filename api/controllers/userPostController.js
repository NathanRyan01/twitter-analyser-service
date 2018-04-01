var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 
//file which is a js file which contains the keys ans tokens

var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it
const util = require('util');
var sentiment = require('sentiment');
var tweet = [];
var positive = 'positive', negative = 'negative', celebrity = 'celebrity';

function userSearch(err, data, response) {
    console.log(data);
} // searchedData function is a callback function which 

exports.searchUser = function(req, res) {
    
    //console.log(util.inspect(req.body.data, false, null))

    var params = {
        screen_name: req.body.data, // sample search term
        count: 5,
        lang: 'en'
    } 
   // console.log(params)
    T.get('statuses/user_timeline', params, function(err, data, response) {
          
    if (err)
       res.send(err);
    else{
        for (var i in data) {
              var s = sentiment(data[i].text);
                if (data[i].user.followers_count > 10000){
                    tweet[i] = celebrity;
                }
                else{
                    if (s.score >= 0){
                        tweet[i] = positive;
                    }
                    else{
                        tweet[i] = negative;
                    }
                }
                tweet[i] += '+' + data[i].user.screen_name + '+' + data[i].text + '+' + s.score; 
        }  
        res.json(tweet);
      }
  });

    
};
