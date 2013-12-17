betlog_controllers.controller('Overlay', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
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
      $rootScope.$broadcast( 'resizeProfile' );
    }

    $rootScope.$on('showOverlay', function() {
        $scope.show();
      });

      $rootScope.$on('closeOverlay', function() {
        $scope.close();
      });

    $scope.init();
  }]);