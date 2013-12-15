betlog_controllers.controller('Championships', [
    '$scope', 
    '$rootScope',
    '$http', 
    'filterFilter', 
    '$animate', 
    '$route', 
    '$routeParams', 
    function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    $scope.active_sport = false;
    $scope.active_country = false;

    $scope.active = function( championship ) {
      $scope.championships.map(function(championship, i) {
        championship.isActive = false; 
      });

      championship.isActive = true;
    }

    $scope.select = function(championship) {
      $scope.activeChampionshipAndSendHimToBroadcast(championship);
    }

    /*$scope.selectFavorite = function(championship) {
      var first_championship = $scope.getChampionshipsByActiveCountryOrFavorites()[0];
      $scope.select(first_championship);
    }*/

    $scope.getChampionships = function( country_id, sport_id ) {
      return filterFilter( $scope.championships, { country_id: $routeParams.countryId, sport_id: $routeParams.sportId }, true);
    }

    $scope.getChampionshipsByActiveCountryOrFavorites = function() {
      return filterFilter( $scope.championships, { country_id: $scope.active_country.id, sport_id: $scope.active_sport.id }, true);
    }

    $scope.activeChampionshipAndSendHimToBroadcast = function(championship) {
      $scope.active( championship );
      $rootScope.$broadcast('championshipSelected', championship);
    }

    $scope.getCountryName = function() {
      return $scope.active_country ? $scope.active_country.name : "Избранное";
    }

  }])