betlog_controllers.controller('Registration', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
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
        'password': $scope.register.password
        //'subscribed': $scope.register.subscribed
      }

      $http({ method: 'POST', url: '/users', data: data })
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.status === "ok" ) {
            $scope.register = {
              login: '',
              password: '',
              name: ''
              //subscribed: false
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