var Twit = require('twit'); // this is how we import the twit package
var config = require('./config') //this is we import the config 
//file which is a js file which contains the keys ans tokens


var T = new Twit(config); //this is the object of twit which 
//will help us to call functions inside it

var params;


T.post('statuses/update', params,searchedData); // get is the 
//function to search the tweet which three paramaters 'search/tweets'
//,params and a callback function.


function postData(err, data, response) {
    console.log(data);
} // searchedData function is a callback function which 