var apiKey = require('../.env').apiKey;

function User(username) {
  this.login = username;
}

User.prototype.fetchUser = function() {
  $.get('https://api.github.com/users/' + this.login + "?access_token=" + apiKey).then(function(response) {
    console.log(response);
    $('#user-gravatar').html('<img src="' + response.avatar_url + '">');
    $('#user-info').empty();
    $('#user-info').append('<h3>' + response.login + ' (' + response.name + ')</h3>');
    $('#user-info').append('<h4>Member Since ' + moment(response.created_at).format('YYYY') + '</h4>');
  }).fail(function(error) {
    $('.alert-box').append('<p class="alert alert-warning">User ' + error.responseJSON.message + "</p>");
  });
};

User.prototype.getRepos = function() {
  $.get('https://api.github.com/users/' + this.login + "/repos?access_token=" + apiKey).then(function(response) {
    console.log(response);
    $('.repos').empty();
    response.forEach(function(item) {
      $('.repos').append('<p><a href="' + item.html_url + '">' + item.full_name + '</a> ( ' + moment(item.created_at).format('DD/MM/YYYY') + ')</p>');
    });
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

User.prototype.getFollowers = function() {
  $.get('https://api.github.com/users/' + this.login + "/followers?access_token=" + apiKey).then(function(response) {
    console.log(response);
    $('.follower-section').empty();
    response.forEach(function(item) {
      $('.follower-section').append('<p><a class="follower">' + item.login + '</a></p>');
    });
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

User.prototype.getFollowing = function() {
  $.get('https://api.github.com/users/' + this.login + "/following?access_token=" + apiKey).then(function(response) {
    console.log(response);
    $('.following-section').empty();
    response.forEach(function(item) {
      $('.following-section').append('<p><a class="following">' + item.login + '</a></p>');
    });
  }).fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

exports.userModule = User;
