/* Controllers */

angular.module('betlog.controllers', [])
	.controller('Authorization', function( $scope, $http, $element ) {
		$scope.hideLogin = function(){
			$.fancybox.close();
		}

		$scope.loginSubmit = function( $event ) {
      /*var request = $http.post('/users', {email: $scope.user.email, password: $scope.user.password});
      
      return request.then(function(response) {
        
      });*/
    }
	})
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
