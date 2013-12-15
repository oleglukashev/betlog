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

    $scope.active = function(sport) {
      $scope.getSports().map(function(sport, i) {
        sport.isActive = false;  
      })

      sport.isActive = true;
    }



    /* on */

    $scope.$on('countCountries', function(event, count_countries_by_sport_id) {
      $scope.getSports().map(function(sport) {
        sport.count_of_countries = count_countries_by_sport_id[sport.id];
      });
    });

    $scope.$on('activeSport', function(event, sport_id) {
      var sport = filterFilter( Storage.getSports(), { id: sport_id }, true )[0];
      $scope.active( sport );
    });

    $scope.$on('reloadSports', function() {
      Storage.getSports();
    });
   
  
  }])