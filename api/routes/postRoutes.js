'use strict';
module.exports = function(app) {
  var post = require('../controllers/postController');
  // todoList Routes
  app.route('/post')
    .post(post.postTwitter)
};