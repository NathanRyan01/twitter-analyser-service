'use strict';
module.exports = function(app) {
  var search = require('../controllers/searchController');

  // todoList Routes
  app.route('/search')
    .post(search.searchTwitter)
};
