window.App = window.App || {};

var WakaController = function(options) {
  this.options = options || {};
}

WakaController.prototype.flaka = function() {
  alert('you did something!');
}