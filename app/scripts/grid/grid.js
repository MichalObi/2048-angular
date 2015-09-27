/*

Grid Module - our game board

Description: Provide grid service, that handle game board, and game tiles 

*/
angular.module('Grid', [])
.service('GridService', ['', function(){
	
	this.grid = [];
	this.tiles = [];

	// Size of the board
	this.size = 4;

}]);