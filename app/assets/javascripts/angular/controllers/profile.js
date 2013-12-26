betlog_controllers.controller('Profile', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {

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
      jQuery('#profile').css( 'left', ( $(document).width() / 2 ) + 205 + 'px' );
    }

    $scope.getCurrentUser = function() {
      return Storage.getCurrentUser();
    }

    $scope.signOut = function() {
      Storage.signOut();
    }

    $scope.init();


    /* on */
    
    $rootScope.$on('showProfile', function() {
      $scope.show();
    });

    $rootScope.$on('closeProfile', function() {
      $scope.close();
    });

    $rootScope.$on('resizeProfile', function() {
      $scope.resize();
    });

    $rootScope.$on('reloadCurrentUser', function() {
      $scope.getCurrentUser();
    });

    $rootScope.$on('signout_success', function() {
      $scope.close();
    });
  }]);