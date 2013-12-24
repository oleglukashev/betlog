betlog_controllers.controller('Registration', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {
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

    $scope.getCurrentUser = function() {
      Storage.getCurrentUser();
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

    $scope.signUp = function() {
      var data = {
        'login': $scope.register.login,
        'name': $scope.register.name,
        'subscribed': $scope.register.subscribed,
        'password': $scope.register.password,
      }

      Storage.signUp(data);
      $scope.register = {};
    }

    $scope.init();

    /*  on  */

    $rootScope.$on('showRegistration', function() {
      $scope.show();
    });

    $rootScope.$on('closeRegistration', function() {
      $scope.close();
    });

    $rootScope.$on('signup_success', function() {
      $scope.close();
      $scope.register = {};
    });

    $rootScope.$on('reloadCurrentUser', function() {
      $scope.getCurrentUser();
    });
  
  }])