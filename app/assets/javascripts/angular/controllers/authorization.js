betlog_controllers.controller('Authorization', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {    
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
    }

    $scope.showRegistration = function() {
      $scope.close();
      $rootScope.$broadcast('showRegistration');
    }

    $scope.resize = function() {
      jQuery('#loginbox').css( 'left', ( $(document).width() / 2 ) + 205 + 'px' );
    }

    $scope.getCurrentUser = function() {
      Storage.getCurrentUser();
    }

    $scope.getCurrentUserName = function() {
      var current_user = Storage.getCurrentUser();

      if ( current_user ) {
        return current_user.name;
      }
    }

    $scope.signIn = function() {
      var data = {
        'login': $scope.login.login,
        'password': $scope.login.password,
        'remember_me': $scope.login.remember_me
      };

      Storage.signIn(data);
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

    $rootScope.$on('authorization_success', function() {
      $scope.close();
      $scope.login = {};
    });

    $rootScope.$on('signout_success', function() {
      $scope.close();
    });

    $rootScope.$on('authorization_error', function(event, data) {
      $scope.lgNotFound = false;
      $scope.pwdError = false;

      if ( data.login )
        $scope.lgNotFound = true;

      if ( data.password )
        $scope.pwdError = true;

      $element.find('p.loginbox-input-error:eq(' + ( data.login ? 0 : 1 ) + ')').text( data.login ? data.login : data.password );
    });

    $rootScope.$on('reloadCurrentUser', function() {
      $scope.getCurrentUser();
    });

    $scope.init();
  
  }])