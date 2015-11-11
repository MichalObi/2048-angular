/**
* Keyboard Module
*
* Description
*/

'use strict';

angular.module('Keyboard', [])

// $document wrap all window.document into service
.service('KeyboardService', function($document){

	var UP = 'up',
		RIGHT = 'right',
		DOWN  = 'down', 
		LEFT = 'left';

	var keyboardMap = {
		37: LEFT,
		38: UP,
		39: RIGHT,
		40: DOWN
	};
	
	// start listening for keyboard event
	this.init = function() {
		var self = this;
		// capture keyboard event 
		this.keyEventHandlers = [];
		$document.bind('keydown', function(evt) {
			var key = keyboardMap[evt.which];
			if (key) {
				evt.preventDefault();
				self._handleKeyEvent(key,evt);
			}
		});
	};

	// callback
	this.on = function(cb) {
		this.keyEventHandlers.push(cb);
	};

	//start pushing to array

	this._handleKeyEvent = function(key,evt) {

		var callbacks = this.keyEventHandlers;

		if (!callbacks) {
		    return;
		}

		evt.preventDefault();

		if (callbacks) {
			for (var x = 0; x < callbacks.length; x++) {
				var cb = callbacks[x];
				cb (key,evt);
			}
		}
	};

});