betlog_controllers.controller('SearchEvents', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {
    $scope.str_for_search_teams = '';
    $scope.search_result = [];

    $scope.getEvents = function() {
      return Storage.getEvents();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }

    $scope.getCountries = function() {
      return Storage.getCountries();
    }

    $scope.getSports = function() {
      return Storage.getSports();
    }
    
    $scope.searchEvents = function() {
      $scope.search_result = [];

      if ( $scope.str_for_search_teams.length > 2 ) {
        var searched_events_by_first_team = filterFilter( $scope.getEvents(), { opponent_1: $scope.str_for_search_teams } );
        var searched_events_by_second_team = filterFilter( $scope.getEvents(), { opponent_2: $scope.str_for_search_teams } );
        $scope.search_result = searched_events_by_first_team.concat(searched_events_by_second_team);
      }
    }

    $scope.getSearchedChampionshipsResults = function() {
      var result = [];
      var championships_ids = [];

      if ( $scope.getSearchedResults().length ) {
        $scope.getSearchedResults().map(function(event) {
          var championship = filterFilter( $scope.getChampionships(), { id: event.championship_id }, true)[0];
          
          if ( result.indexOf( championship ) === -1 && championship ) {
            result.push( championship );
          }
        });
      }

      return result;
    }

    $scope.getSearchedResults = function() {
      return $scope.search_result;
    }

    $scope.getSearchedResultsByChampionship = function(championship) {
      return filterFilter( $scope.getSearchedResults(), { championship_id: championship.id }, true );
    }

    $scope.closeSearch = function() {
      $scope.search_result = [];
    }

    $scope.getSportByCountry = function(country) {
      if ( country ) {
        return filterFilter( $scope.getSports(), { id: country.sport_id }, true)[0];
      }
    }

    $scope.getCountryByEvent = function(event) {
      return filterFilter( $scope.getCountries(), { id: event.country_id }, true)[0];
    }

    $scope.getSportByChampionship = function(championship) {
      return filterFilter( $scope.getSports(), { id: championship.sport_id }, true)[0]
    }

    $scope.getCountryByChampionship = function(championship) {
      return filterFilter( $scope.getCountries(), { id: championship.country_id }, true)[0]
    }

    $scope.getChampionshipByEvent = function(event) {
      return filterFilter( $scope.getChampionships(), { id: event.championship_id }, true)[0];
    }


    /*  on  */


    $scope.$on('reloadEvents', function() {
      $scope.getEvents();
    });

    $scope.$on('reloadCountries', function() {
      Storage.getCountries();
    });

    $scope.$on('reloadSports', function() {
      Storage.getSports();
    });

    $scope.$on('reloadChampionships', function() {
      Storage.getChampionships();
    });
}]);