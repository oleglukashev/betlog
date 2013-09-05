/* Controllers */

angular.module('betlog.controllers', [])

	.controller('Navigation', function( $scope, $http, $element, $rootScope ) {
		$scope.showAuthorization = function() {
			$rootScope.$broadcast( 'showAuthorization' );
			$rootScope.$broadcast( 'showOverlay' );
		}
	})
	
	
	.controller('Registration', function( $scope, $http, $element, $rootScope ) {
		$scope.login = '';
		$scope.name = '';
		$scope.password = '';

		$scope.init = function() {
			$scope.resize();

			jQuery(window).resize(function() {
				$scope.resize();
			});
		}

		$scope.show = function() {
			$scope.isActive = true;
			$rootScope.$broadcast('showOverlay');
		}

		$scope.close = function() {
			$scope.isActive = false;
			$rootScope.$broadcast('closeOverlay');
		}

		$scope.resize = function() {
			jQuery('#registration').css( 'left', ( $(document).width() / 2 ) + 205 + 'px' );
		}

		$scope.submit = function( $event ) {

			var data = {
				login: $scope.login,
				name: $scope.name,
				password: $scope.password
			};

			$http({ method: 'POST', url: '/user/', data: data }).
	  		success(function(data, status, headers, config) {
	  			if ( status === 200 && data.id )
	  				$scope.hideLogin();
	  	}).
	  	error(function(data, status, headers, config) {
	  		$scope.login_error = false;
	  		$scope.password_error = false;
	  		$element.find('p.loginbox-input-error').text('');

	  		if ( data.login.length )
	  			$scope.login_error = true;

	  		if ( data.password.length )
	  			$scope.password_error = true;

	  		$element.find('p.loginbox-input-error:eq(' + ( data.login.length ? 0 : 1 ) + ')').text( data.login.length ? data.login : data.password );
	  	});
    }

    $rootScope.$on('showRegistration', function() {
    	$scope.show();
    });

    $rootScope.$on('closeRegistration', function() {
    	$scope.close();
    });

    $scope.init();
	})
	

	.controller('Authorization', function( $scope, $http, $element, $rootScope ) {
		$scope.login = '';
		$scope.password = '';
		$scope.remember_me = false;

		$scope.init = function() {
			$scope.resize();

			jQuery(window).resize(function() {
				$scope.resize();
			});
		}

		$scope.show = function() {
			$scope.isActive = true;
			$rootScope.$broadcast('showOverlay');
		}

		$scope.close = function() {
			$scope.isActive = false;
			$rootScope.$broadcast('closeOverlay');
		},

		$scope.showRegistration = function() {
			$scope.close();
			$rootScope.$broadcast('showRegistration');
		}

		$scope.resize = function() {
			jQuery('#loginbox').css( 'left', ( $(document).width() / 2 ) + 205 + 'px' );
		}

		$scope.submit = function( $event ) {

			var data = {
				'login': $scope.login,
				'password': $scope.password,
				'remember_me': $scope.remember_me
			};

			$http({ method: 'POST', url: '/user_sessions', data: data }).
	  		success(function(data, status, headers, config) {
	  			if ( status === 200 && data.id )
	  				$scope.close();
	  	}).
	  	error(function(data, status, headers, config) {
	  		$scope.login_error = false;
	  		$scope.password_error = false;
	  		$element.find('p.loginbox-input-error').text('');

	  		/*if ( data.login.length )
	  			$scope.login_error = true;

	  		if ( data.password.length )
	  			$scope.password_error = true;

	  		$element.find('p.loginbox-input-error:eq(' + ( data.login.length ? 0 : 1 ) + ')').text( data.login.length ? data.login : data.password );
	  		*/
	  	});
    }

    $rootScope.$on('showAuthorization', function() {
    	$scope.show();
    })

    $rootScope.$on('resizeAuthorization', function() {
    	$scope.resize();
    })

    $rootScope.$on('closeAuthorization', function() {
    	$scope.close();
    })

    $scope.init();
	})
	

	.controller('Sports', function( $scope, $http, $element ) {
		$scope.sports = [];
		$scope.championships = [];

		$scope.init = function() {
			/* get dates */
			$http({method: 'GET', url: '/'}).
	  		success(function(data, status, headers, config) {
	  			if ( status === 200 ) {
	  				if ( data.sports.length ) {

	  					for( var i = 0; i < data.sports.length; i++ ) {
	  						var new_sport = {
	  							id: data.sports[i].id,
	  							name: data.sports[i].name,
	  							isActive: i === 0 ? true : false
	  						}

	  						$scope.sports.push( new_sport );
	  					}
	  				}

	  				if ( data.championships.length ) {

	  					for( var i = 0; i < data.championships.length; i++ ) {
	  						var new_championship = {
	  							id: data.championships[i].id,
	  							name: data.championships[i].name,
	  							sport_id: data.championships[i].sport_id,
	  							active: i === 0 ? true : false
	  						}

	  						$scope.championships.push( new_championship );
	  					}
	  				}
	  			}
	  	}).
	  	error(function(data, status, headers, config) {

	  	});
		}
		
		$scope.active = function( sport ) {
			for( var i = 0; i < $scope.sports.length; i++) {
				$scope.sports[i].isActive = false;
			}

			sport.isActive = true;
		}

		$scope.getChampionshipsBySportId = function( sport_id ) {
			var championships_for_sport = [];

			for( var i = 0; i < $scope.championships.length; i++ ) {
				if ( $scope.championships[i].sport_id === sport_id)
					championships_for_sport.push( $scope.championships[i] );
			}

			return championships_for_sport;
		}

		$scope.init();
	})



	.controller('Overlay', function( $scope, $http, $element, $rootScope ) {
		$scope.isActive = false;
		
		$scope.init = function() {
			jQuery(window).on('resize', function() {
				$scope.resize()
			});			
		}

		$scope.closeWithBlock = function() {
			$rootScope.$broadcast( 'closeAuthorization' );
			$rootScope.$broadcast( 'closeRegistration' );
			$scope.close();
		}

		$scope.close = function() {
			$scope.isActive = false;
		}

		$scope.show = function() {
			$scope.isActive = true;
		}

		$scope.resize = function() {
			$rootScope.$broadcast( 'resizeAuthorization' );
		}

		$rootScope.$on('showOverlay', function() {
    	$scope.show();
    });

    $rootScope.$on('closeOverlay', function() {
    	$scope.close();
    })

		$scope.init();
	});