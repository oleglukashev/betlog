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
    
    $scope.getCoefficients = function() {
        return Storage.getCoefficients();
    }

    $scope.getEvents = function() {
      return Storage.getEvents();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }

    $scope.getBookmakers = function() {
      return Storage.getBookmakers();
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

    $scope.getMaxCoefficientByEventAndName = function(event, param) {
      var result = [];
      var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': event.id }, true );

      return coefficients.sort(function(a, b) {
        a = a[param];
        b = b[param];

        return b - a;
      })[0];
    }

    $scope.getMaxCoefficientFirstByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'first');
    }

    $scope.getMaxCoefficientDrawByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'draw');
    }

    $scope.getMaxCoefficientSecondByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'second');
    }

    $scope.getCoefficientsParamEvent = function(coefficient_item, param) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( coefficient[param] );
          }
        });

        return result;
      }
    }

    $scope.getCoefficientsDatesEvent = function(coefficient_item) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( $filter('date')(coefficient.created_at, "dd.MM") );
          }
        });

        return result;
      }
    }

    $scope.getBookmaker = function(id) {
      return filterFilter( Storage.getBookmakers(), { 'id': id }, true)[0];
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

    $rootScope.$on('reloadCoefficients', function() {
        $scope.getCoefficients();
    });

    
  }])