var User = require('../js/scripts.js').userModule;

var fetchUser = function(new_user) {
  user = new User(new_user);
  $('.alert-box').empty();
  user.fetchUser();
  user.getRepos();
  user.getFollowers();
  user.getFollowing();
};

$(function() {
  $('#user-search').submit(function(event) {
    event.preventDefault();
    fetchUser($('#username-field').val());
  });

  $('div').on('click', 'a.following, a.follower', function() {
    fetchUser($(this).text());
  });
});
