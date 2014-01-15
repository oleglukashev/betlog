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
    
    $scope.getEvents = function() {
      return Storage.getEvents();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }

    $scope.getFavoriteEvents = function() {
      var result = [];

      Storage.getEvents().map(function(event, key) {
        if ( key < 5 ) {
          result.push(event);
        }
      });

      return result;
    }

    $scope.getEventsByChampionship = function(championship) {
      var result = [];
      var events_of_championship = filterFilter( $scope.getEvents(), { championship_id: championship.id}, true);

      events_of_championship.map(function(event, key) {
        if ( key <= 3) {
          result.push( event );
        }
      });

      return result;
    }

    $scope.getFavoriteChampionships = function() {
      var result = [];

      $scope.getChampionships().map(function(championship) {
        if ( championship.id === 494 || championship.id === 503
         || championship.id === 508 || championship.id === 514 || championship.id === 515) {
          result.push( championship );
        }
      });

      return result;
    }

    $scope.getSportByChampionship = function(championship) {
      if ( championship ) {
        return filterFilter( Storage.getSports(), { id: championship.sport_id }, true)[0];
      }
    }

    $scope.getCountryByChampionship = function(championship) {
      if ( championship ) {
        return filterFilter( Storage.getCountries(), { id: championship.country_id }, true)[0];
      }
    }

    $scope.getChampionshipByEvent = function(event) {
      return filterFilter( Storage.getChampionships(), { id: event.championship_id }, true)[0];
    }
    
    $scope.getNextEvents = function() {
      var result = [];
      var sort_next_events = [];
      
      $scope.getEvents().map(function(event) {
        if ( new Date(event.date_event) > new Date() ) {
          sort_next_events.push(event);
        }
      });

      sort_next_events.sort(function(a, b) {
        a = new Date(a.date_event);
        b = new Date(b.date_event);
        return a - b;
      });

      sort_next_events.map(function(event, key) {
        if ( key <= 4 ) {
          result.push( event );
        } else {
          return
        } 
      });

      return result;
    }

    $scope.reloadJcarousel = function() {
      $('.jcarousel').jcarousel();
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