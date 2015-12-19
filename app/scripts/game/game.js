/*
* Game Module
*
* Description: Main Game Module
*/
'use strict';

angular.module('Game', ['Grid', 'Parsedb', 'ngCookies'])
.service('GameManager', function(GridService, Parsedbmanager, $q, $timeout, $cookieStore, $log){

	this.getHighScore = function() {
	  return parseInt($cookieStore.get('highScore')) || 0;
	};

	// initialize parse 
	this.parsedbInitialised = function() {
	  Parsedbmanager.parseInit();
	  $log.log('Parse initialized');
	}
	this.parsedbInitialised();

    // need to explicite declaration
	this.grid = GridService.grid;
	this.tiles = GridService.tiles;
	this.gameSize = GridService.getSize();

	this.winningValue = 2048;

	this.reinit = function() {
		this.gameOver = false;
		this.win = false;
		this.currentScore = 0;
		this.highScore = this.getHighScore(); // to fix this later
	}
	this.reinit();

	// Create a new game
	this.newGame = function() {
    	// main method for start new game
		GridService.buildEmptyGameBoard();
    	GridService.buildStartingPosition();
    	this.reinit();
	};

	// Handle the move anction - key from KeyboardService.on
	this.move = function(key) {

    // reference to GameManager
    var self = this;
    var f = function() {
    	// if win no move left
		if (self.win) { return false; }
		//all possible movements coord
		var positions = GridService.traversalDirections(key);
    	var hasMoved = false;
    	var hasWon = false;

    	GridService.prepareTiles();

    	positions.x.forEach(function(x){
			positions.y.forEach(function(y) {
				// for every position save orginal coord
				var orginalPosition = {x:x, y:y};
				// get the tile (coord + value) of curent tile on board
				var tile = GridService.getCellAt(orginalPosition);
	
				// if we found tile 
				if (tile) {
					// GridService return info about coord of next position and about tile to merge (if exist)
					var cell = GridService.calculateNextPosition(tile, key),
						  next = cell.next;

					if (next && 
						next.value === tile.value && 
						!next.merged) {
						
						/* Do the merge */ 
						var newValue = tile.value * 2;

						// create new merged tile
						var merged = GridService.newTile(tile, newValue);

						//merged property - prevent merging merged tile (?)
						merged.merged = [tile, cell.next];

						//insert tile with newValue
						GridService.insertTile(merged);
						//remove old tile, that has to be merged
						GridService.removeTile(tile);
						// move new Tile to old Tile position
						GridService.moveTile(merged, next);

						// update current score
						self.updateScore(self.currentScore + cell.next.value);

						//check if winind
						if (merged.value >= self.winningValue) {
							hasWon = true;
						} 
            			hasMoved = true;
					} 
					else {
            			// handle moving tile
            			GridService.moveTile(tile, cell.newPosition);
          			}

		          if (!GridService.samePositions(orginalPosition,cell.newPosition)) {
		            hasMoved = true;
		          }
				}
			});
		});

	    if (hasWon && !self.win) {
	      self.win = true;
	    }

	    if (hasMoved) {
	      GridService.randomlyInsertNewTile();

	      if (self.win || !self.movesAvailable()) {
	        	self.gameOver = true;
	        	Parsedbmanager.updateParsedb(self.currentScore);
	        }
	      }
		};
		return $q.when(f());
	};


	// Are there moves left ? - the end of the game 
 	this.movesAvailable = function() {
 	 	return GridService.anyCellsAvailable() || GridService.tileMatchesAvailable();
 	};

 	// Update the score
	this.updateScore = function(newScore) {
		this.currentScore = newScore;
	    if(this.currentScore > this.getHighScore()) {
	      this.highScore = newScore;
	      $cookieStore.put('highScore', newScore);
	    }
	};

});
