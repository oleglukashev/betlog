betlog_controllers.controller('Sports', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {

    $scope.getSports = function() {
      return Storage.getSports()
    }

    $scope.isActive = function(sport) {
      return sport.id === parseInt($routeParams.sportId);
    }



    /* on */

    $scope.$on('reloadSports', function() {
      Storage.getSports();
    });
   
  
  }])