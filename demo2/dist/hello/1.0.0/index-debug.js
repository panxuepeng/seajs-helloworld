define("hello/1.0.0/index-debug", ["jquery"], function(require, exports, module) {
  var hello;
  exports.user = require("hello/1.0.0/user-debug")
  exports.world = function() {
    alert('hello world!')
  }
});
define("hello/1.0.0/user-debug", ["jquery"], function(require, exports, module) {
  $ = require('jquery')
  exports.username = function() {
    $('body').append('<p>username</p>')
  }
});