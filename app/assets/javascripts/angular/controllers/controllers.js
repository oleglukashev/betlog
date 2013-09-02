/* Controllers */

angular.module('betlog.controllers', [])
	.controller('Registration', function( $scope, $http, $element ) {
		$scope.login = '';
		$scope.name = '';
		$scope.password = '';

		$scope.showRegister = function() {
			
		}

		$scope.hideRegister = function(){
			$.fancybox.close();
		}

		$scope.registerSubmit = function( $event ) {

			var data = {
				login: $scope.login,
				name: $scope.name,
				password: $scope.password
			};

			$.ajax({
      	url: '/user/',
        type: "POST",
        dataType: "json",
        data: data,
				success: function( data )
				{
					if ( data.id )
						$scope.hideLogin();
		
				},
				error: function( xhr, status, errorThrown )
				{
					if ( xhr.status == 422 )
						$element.find('p.loginbox-input-error').text( xhr.responseJSON.login[0] ).removeClass('hide');
				}
			});
    }
	})
	

	.controller('Authorization', function( $scope, $http, $element ) {
		$scope.login = '';
		$scope.password = '';
		$scope.remember_me = false;

		$scope.hideLogin = function(){
			$.fancybox.close();
		}

		$scope.loginSubmit = function( $event ) {

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
		
				},
				error: function( xhr, status, errorThrown )
				{
					if ( xhr.status == 422 )
						$element.find('p.loginbox-input-error').text( xhr.responseJSON.login[0] ).removeClass('hide');
				}
			});
    }
	})
	

	.controller('Sports', function( $scope, $http, $element ) {

		$scope.init = function() {
			/* get dates */
			$http({method: 'GET', url: '/'}).
	  		success(function(data, status, headers, config) {
	  			$scope.sport_lists = data.sports;
	  			$scope.championships = data.championships;
	  	}).
	  	error(function(data, status, headers, config) {

	  	});
		}
		
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

		$scope.init();
	})
