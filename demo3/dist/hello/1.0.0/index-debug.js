define("hello/1.0.0/index-debug", [], function(require, exports, module) {
  var hello;
  hello = {
    world: function() {
      alert('hello world!')
    }
  }
  module.exports = hello;
});