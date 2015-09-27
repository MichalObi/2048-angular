/*
* Grid Module
*
* Description: Grid directive to provide grid.html template
*
*/
angular.module('Grid', [])
.directive('grid', function(){

	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			ngModel: "=" // isolate scope
		},
		templateUrl: 'scripts/grid/grid.html'
	};

});