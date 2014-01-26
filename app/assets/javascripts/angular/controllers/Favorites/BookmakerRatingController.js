betlog_controllers.controller('BookmakerRating', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams', 
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    
    $scope.getBookmakers = function() {
      return Storage.getBookmakers();
    }

  }])