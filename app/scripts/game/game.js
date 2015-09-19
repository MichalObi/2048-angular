/**
* Game Module
*
* Description
*/
angular.module('Game', []);

.service('GameManager', ['', function(){

	// Create a new game

	this.newGame = function() {};

	// Handle the move anction

	this.move = function() {};

	// Update the score

	this.updateScore = function(newScore) {};

	// Are there moves left ? - the end of the game 
 	 this.movesAvailable = function() {};

}]);