betlog_controllers.controller('Navigation', ['$scope', '$http', '$element', '$rootScope', function( $scope, $http, $element, $rootScope ) {
    $scope.showAuthorization = function() {
      $rootScope.$broadcast( 'showAuthorization' );
      $rootScope.$broadcast( 'showOverlay' );
    }
  }])