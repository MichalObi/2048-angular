'use strict';

angular
.module('twentyfourtyeightApp', ['Game', 'Grid', 'Keyboard', 'ngAnimate', 'ngCookies'])
.config(function(GridServiceProvider) {
  GridServiceProvider.setSize(4);
})
.controller('GameController', function(GameManager, KeyboardService, $scope) {

  this.game = GameManager;

  this.newGame = function() {
    // get the best scores
    var promise = this.game.getFromParseDb();
    // pass scores to $scope, if you have one
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
