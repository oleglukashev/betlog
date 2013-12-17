betlog_controllers.controller('MainFavoriteEvents', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams', 
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    $scope.favorite_sports = [];
    $scope.favorite_countries_by_sport = [];
    $scope.favorite_championships_by_sport_and_country = [];
    

    $scope.getFavoriteEvents = function() {
      var result = [];

      Storage.getEvents().map(function(event, key) {
        if ( key < 5 ) {
          result.push(event);
        }
      });

      return result;
    }

    $scope.getSportByCountry = function(country) {
      if ( country ) {
        return filterFilter( Storage.getSports(), { id: country.sport_id }, true)[0];
      }
    }

    $scope.getCountryByEvent = function(event) {
      return filterFilter( Storage.getCountries(), { id: event.country_id }, true)[0];
    }

    $scope.getChampionshipByEvent = function(event) {
      return filterFilter( Storage.getChampionships(), { id: event.championship_id }, true)[0];
    }
    
    //$rootScope.$broadcast('getFavoriteSports');

    /* on */
    $scope.$on('sendFavoriteSports', function(event, sports) {
      $scope.favorite_sports = sports;
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

    $scope.$on('reloadEvents', function() {
      Storage.getEvents();
    });

  }])