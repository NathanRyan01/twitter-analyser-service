

var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 
//file which is a js file which contains the keys ans tokens

var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it

var sentiment = require('sentiment');
const util = require('util')
var tweet = [];
var positive = 'positive', negative = 'negative', celebrity = 'celebrity', message = 'success';

//console.log(util.inspect(myObject, {showHidden: false, depth: null}))

// alternative shortcut


function searchedData(err, data, response) {
    console.log(data);
} // searchedData function is a callback function which 

exports.searchTwitter = function(req, res) {
  
    //console.log(util.inspect(req.body.data, false, null))

    var params = {
        q: req.body.data, // sample search term
        count: 5,
        lang: 'en'
    } 

   // console.log(params)
    T.get('search/tweets', params, function(err, data, response) {
    if (err)
       res.send(err);
      else{
        for (var i in data.statuses) {
              var s = sentiment(data.statuses[i].text);
                if (data.statuses[i].user.followers_count > 10000){
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
                tweet[i] += '+' + data.statuses[i].user.screen_name + '+' + data.statuses[i].text + '+' + s.score; 
        }  
        res.json(tweet);
      }
  });

    
};
