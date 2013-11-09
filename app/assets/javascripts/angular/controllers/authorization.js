betlog_controllers.controller('Authorization', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
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