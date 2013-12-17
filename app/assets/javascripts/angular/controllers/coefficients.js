betlog_controllers.controller('Coefficients', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {    $scope.coefficients = [];

    $scope.getCoefficients = function() {
        return Storage.getCoefficients();
    }

    $scope.getCoefficientsByEventId = function( event_id ) {
      return filterFilter( $scope.getCoefficients(), { 'event_id': event_id }, true );
    }



    /* on */

    $rootScope.$on('reloadCoefficients', function() {
        $scope.getCoefficients();
    });
  
  }])