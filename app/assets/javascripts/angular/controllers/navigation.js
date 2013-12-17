betlog_controllers.controller('Navigation', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
    
    $scope.getCurrentUser = function() {
      return Storage.getCurrentUser();
    }

    $scope.getCurrentUserName = function() {

      var current_user = $scope.getCurrentUser();

      if ( current_user ) {
        return current_user.name;
      }
    }

    $scope.showAuthorization = function() {
      $rootScope.$broadcast( 'showAuthorization' );
      $rootScope.$broadcast( 'showOverlay' );
    }

    $scope.showProfile = function() {
      $rootScope.$broadcast( 'showProfile' );
      $rootScope.$broadcast( 'showOverlay' );
    }

    /* on */

    $rootScope.$on('reloadCurrentUser', function() {
      $scope.getCurrentUser();
    });
  }])