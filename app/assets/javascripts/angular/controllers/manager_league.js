betlog_controllers.controller('ManagerLeague', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {
    $scope.active_sport = false;

    $scope.getManagedLeagues = function() {
      return Storage.getManagedLeagues();
    }

    $scope.getSports = function() {
      return Storage.getSports();
    }

    $scope.getCountries = function() {
      return Storage.getCountries();
    }

    $scope.toggle = function(sport) {
      $scope.active_sport = $scope.active_sport ? false : sport;
    }

    $scope.getSportsManagedChampionships = function() {
      var sports = [];
      var result = [];

      $scope.getManagedLeagues().map(function(championship) {
        if ( sports.indexOf( championship.sport_id) === -1 ) {
          sports.push( championship.sport_id );
        }
      });

      $scope.getSports().map(function(sport) {
        if ( sports.indexOf(sport.id) != -1 ) {
          result.push(sport);
        }
      });

      return result;
    }

    $scope.getManagedChampionshipsBySport = function(sport) {
      return filterFilter( $scope.getManagedLeagues(), { sport_id: sport.id}, true);
    }

    $scope.getCountryByChampionship = function(championship) {
      return filterFilter( $scope.getCountries(), { id: championship.country_id }, true)[0];
    }

    /*  on  */

    $rootScope.$on('reloadManagedLeagues', function() {
      $scope.getManagedLeagues();
    });

    $rootScope.$on('reloadSports', function() {
      $scope.getSports();
    });

    $rootScope.$on('reloadCountries', function() {
      $scope.getCountries();
    });

  }])