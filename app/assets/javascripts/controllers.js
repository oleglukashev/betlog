/* Controllers */

angular.module('betlog.controllers', [])
	.controller('SportsLists', function( $scope, $http, $element ) {

		$scope.activeSportTab = function( $event ) {
			$element.find('ul > li')
				.removeClass('active')
				.find('.sport-submenu')
					.addClass('hide');

			angular.element($event.target)
				.closest('li')
					.addClass('active')
					.find('.sport-submenu')
						.removeClass('hide');
		}

		/* get dates */
		$http({method: 'GET', url: '/'}).
  		success(function(data, status, headers, config) {
  			$scope.sport_lists = data.sports;
  			$scope.championships = data.championships;
  	}).
  	error(function(data, status, headers, config) {

  	});
	});
