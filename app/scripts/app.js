'use strict';

var app = angular.module('twentyfourtyeightApp', ['Game', 'Grid', 'Keyboard', 'ngAnimate', 'ngCookies', 'ui.bootstrap']);

app.config(function(GridServiceProvider) {})

app.controller('GameController', ['$scope', '$modal', 'GameManager', 'KeyboardService', function($scope, $modal, GameManager, KeyboardService) {

  this.game = GameManager;

  this.openModal = function() {
    $modal.open({
        templateUrl: 'views/BootstrapModal.html',
        controller: function($scope, $modalInstance, GameManager) {
          $scope.registerUser = function(user) {
            GameManager.registerUser(user);
          }
          $scope.loginUser = function(user) {
            GameManager.loginUser(user);
          }
        }
    });
  }

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
}]);
