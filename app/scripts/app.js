'use strict';

angular
.module('twentyfourtyeightApp', ['Game', 'Grid', 'Keyboard', 'ngAnimate', 'ngCookies'])
.config(function(GridServiceProvider) {
  GridServiceProvider.setSize(4);
})
.controller('GameController', function(GameManager, KeyboardService, $scope) {

  this.game = GameManager;

  this.newGame = function() {
    // the best scores
    var promise = this.game.getFromParseDb();
    promise.then(function(scores) {
      $scope.scores = scores;
    });
    KeyboardService.init();
    this.game.newGame();
    this.startGame();
  };

  this.startGame = function() {
    var self = this;
    KeyboardService.on(function(key) {
      self.game.move(key);
    });
  };

  this.newGame();
});
