/*

Grid Module - our game board

Description: Provide grid service, that handle game board, and game tiles 

*/
angular.module('Grid', [])
// .service('GridService', function(){
	
// 	this.grid = [];
// 	this.tiles = [];

// 	// Size of the board
// 	this.size = 4;

// })
// Factory make TileModel injectable
.factory('TileModel', function() {

	// Tile var need - pos. X Y, that place Tile on Grid and value of Tile
	 var Tile = function(pos, val) {
	    this.x = pos.x;
	    this.y = pos.y;
	    this.value = val || 2;
	  };

	return Tile;
})
.service('GridService', function(TileModel){
	this.tiles = [];
	this.tiles.push(new TileModel({x: 1, y: 1}, 2));
	this.tiles.push(new TileModel({x: 1, y: 2}, 2));

});
