/* Controllers */

angular.module('betlog.controllers', [])
	.controller('Authorization', function( $scope, $http, $element ) {
		$scope.login = '';
		$scope.password = '';
		$scope.remember_me = false;

		$scope.hideLogin = function(){
			$.fancybox.close();
		}

		$scope.loginSubmit = function( $event ) {

			/*$http({
          url: '/user_sessions',
          method: "POST",
          data: { 
						'user_session[login]': $scope.user.login,
						'user_session[password]': $scope.user.password,
						'remember_me': $scope.remember_me 
					},
          headers: {'Content-Type': 'application/json'}
      }).success(function (data, status, headers, config) {
      	$scope.users = data.users; // assign  $scope.persons here as promise is resolved here 
      }).error(function (data, status, headers, config) {
        console.dir(headers);
      });*/

			console.log($scope.login);
			console.log($scope.password);

			var data = {
				'user_session[login]': $scope.login,
				'user_session[password]': $scope.password,
				'user_session[remember_me]': $scope.remember_me
			};

			$.ajax({
      	url: '/user_sessions',
        type: "POST",
        dataType: "json",
        data: data,
				success: function( data )
				{
					if ( data.id )
						$scope.hideLogin();
					//else
				}
			});
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
