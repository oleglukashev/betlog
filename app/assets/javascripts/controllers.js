/* Controllers */

angular.module('betlog.controllers', [])
	.controller('SportsLists', function( $scope, $http, $location, $state, $stateParams ) {
		$scope.activeSportTab = function( $event ) {
			console.dir($event);
		}
	});
