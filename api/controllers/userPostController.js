var Twit = require('twit'); // this is how we import the twit package
var config = require('../config') //this is we import the config 
//file which is a js file which contains the keys ans tokens

var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it
const util = require('util');
var tweet = [];
var positive = 'positive', negative = 'negative', celebrity = 'celebrity';

function userSearch(err, data, response) {
    console.log(data);
} // searchedData function is a callback function which 

exports.searchUser = function(req, res) {
    console.log('test');
    //console.log(util.inspect(req.body.data, false, null))

    var params = {
        q: req.body.data, // sample search term
        count: 10,
        lang: 'en'
    } 

   // console.log(params)
    T.get('statuses/user_timeline', params, function(err, data, response) {
           console.log('test');
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
