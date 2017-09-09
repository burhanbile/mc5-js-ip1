(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "348ff0ecdd4e27548a7e555cf05dd8bd4da77073";

},{}],2:[function(require,module,exports){
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

},{"../.env":1}],3:[function(require,module,exports){
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

},{"../js/scripts.js":2}]},{},[3]);
