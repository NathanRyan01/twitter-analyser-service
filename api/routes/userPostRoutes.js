'use strict';
module.exports = function(app) {
  var userPost = require('../controllers/userPostController');
  // todoList Routes
  app.route('/userPost')
    .post(userPost.searchUser)
};
