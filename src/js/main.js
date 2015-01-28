window.App = window.App || {};

WakaController = function(options) {
  this.options = options || {};
}

WakaController.prototype.flaka = function() {
  $('body').css('background-color', '#c0c0c0');
}