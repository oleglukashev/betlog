/* Controllers */

angular.module('betlog.controllers', [])

	.controller('Navigation', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
		$scope.showAuthorization = function() {
			$rootScope.$broadcast( 'showAuthorization' );
			$rootScope.$broadcast( 'showOverlay' );
		}
	}])
	.controller('Registration', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
		$scope.register = {
			login: '',
			password: '',
			name: '',
			subscribed: false
		}

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

		$scope.submit = function() {

			var data = {
				'login': $scope.register.login,
				'name': $scope.register.name,
				'password': $scope.register.password,
				'subscribed': $scope.register.subscribed
			}

			$http({ method: 'POST', url: '/users', data: data })
				.success(function(data, status, headers, config) {
	  			if ( status === 200 && data.status === "ok" ) {
	  				$scope.register = {
							login: '',
							password: '',
							name: '',
							subscribed: false
						}
	  				
	  				$scope.close();
	  			}
	  		})
				.error(function(data, status, headers, config) {
	  			
	  		});
    }

    $rootScope.$on('showRegistration', function() {
    	$scope.show();
    });

    $rootScope.$on('closeRegistration', function() {
    	$scope.close();
    });

    $scope.init();
	
	}])
	.controller('Authorization', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
		$scope.login = {
			login: '',
			password: '',
			remember_me: false
		}

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

		$scope.submit = function() {

			var data = {
				'login': $scope.login.login,
				'password': $scope.login.password,
				'remember_me': $scope.login.remember_me
			};

			$http({ method: 'POST', url: '/user_sessions', data: data }).
	  		success(function(data, status, headers, config) {
	  			if ( status === 200 && data.id ) {
	  				$scope.login = {
							login: '',
							password: '',
							remember_me: false
						}
	  				
	  				$scope.close();
	  			}
	  	}).
	  	error(function(data, status, headers, config) {
	  		$scope.lgNotFound = false;
	  		$scope.pwdError = false;

	  		if ( data.login.length )
	  			$scope.lgNotFound = true;

	  		if ( data.password.length )
	  			$scope.pwdError = true;

	  		$element.find('p.loginbox-input-error:eq(' + ( data.login.length ? 0 : 1 ) + ')').text( data.login.length ? data.login : data.password );
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
	
	}])
	.controller('Sports', ['$scope', '$http', '$element', function( $scope, $http, $element ) {
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
	
	}])
	.controller('Overlay', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
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
    	});

		$scope.init();
	}]);