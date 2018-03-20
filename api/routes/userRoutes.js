'use strict';

var passport = require('passport')
 
module.exports = function(app) {
  var user = require('../controllers/userController');

  // todoList Routes
  app.route('/twitter/login')
    .get(passport.authenticate('twitter'))
  
  app.route('/twitter/return').get(passport.authenticate('twitter', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/')
    })
};
