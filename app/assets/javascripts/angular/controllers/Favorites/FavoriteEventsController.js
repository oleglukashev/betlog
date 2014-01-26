betlog_controllers.controller('FavoriteEvents', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams', 
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    $scope.coefficients = [];
    $scope.events = [];
    $scope.championships = [];
    $scope.bookmakers = [];

    $scope.favorite_championships = [];
    $scope.events_of_championship = {};
    $scope.sport_of_championship = {};
    $scope.country_of_championship = {};
    $scope.championship_of_event = {};
    $scope.max_coefficient_of_event = {};
    $scope.coefficients_params_of_event = {};
    $scope.coefficients_dates_of_event = {};

    $scope.getBookmaker = function(id) {
      return filterFilter( $scope.bookmakers, { 'id': id }, true )[0];
    }

    $scope.reloadCoefficients = function() {
      $scope.coefficients = Storage.getCoefficients();
    }


    $scope.reloadEvents = function() {
      $scope.events = Storage.getEvents();
    }


    $scope.reloadChampionships = function() {
      $scope.championships = Storage.getChampionships();
    }


    $scope.reloadBookmakers = function() {
      $scope.bookmakers = Storage.getBookmakers();
    }


    $scope.reloadSports = function() {
      $scope.sports = Storage.getSports();
    }


    $scope.reloadCountries = function() {
      $scope.countries = Storage.getCountries();
    }


    $scope.reloadFavoriteChampionships = function() {
      $scope.favorite_championships = [];

      $scope.championships.map(function(championship) {
        if ( championship.id === 494 || championship.id === 503
        || championship.id === 508 || championship.id === 514 || championship.id === 515 ) {
          $scope.favorite_championships.push( championship );
          $scope.reloadEventsByChampionship( championship );
        }
      });
    }


    $scope.reloadEventsByChampionship = function( championship ) {
      $scope.events_of_championship[championship.id] = [];
      
      filterFilter( $scope.events, { championship_id: championship.id }, true)
        .map(function(event, key) {
          if ( key <= 3 ) {
            $scope.events_of_championship[championship.id].push( event );
            $scope.reloadSportByChampionship( championship );
            $scope.reloadCountryByChampionship( championship );
            $scope.reloadChampionshipByEvent( championship );
            $scope.reloadMaxCoefficientFirstByEvent( event );
            $scope.reloadMaxCoefficientSecondByEvent( event );
            $scope.reloadMaxCoefficientDrawByEvent( event );
          }
        });
    }


    $scope.reloadSportByChampionship = function( championship ) {
      $scope.sport_of_championship[championship.id] = filterFilter( $scope.sports, { id: championship.sport_id }, true)[0];
    }


    $scope.reloadCountryByChampionship = function( championship ) {
      $scope.country_of_championship[championship.id] = filterFilter( $scope.countries, { id: championship.country_id }, true)[0];
    }


    $scope.reloadChampionshipByEvent = function( event ) {
      $scope.championship_of_event[event.id] = filterFilter( $scope.championships, { id: event.championship_id }, true)[0];
    }
    

    $scope.reloadMaxCoefficientByEventAndName = function( event, param ) {
      if ( ! $scope.max_coefficient_of_event[event.id] ) {
        $scope.max_coefficient_of_event[event.id] = {};
      }

      $scope.max_coefficient_of_event[event.id][param] = filterFilter( $scope.coefficients, { 'event_id': event.id }, true )
        .sort(function(a, b) {
          a = a[param];
          b = b[param];

          return b - a;
        })[0][param];
    }


    $scope.reloadMaxCoefficientFirstByEvent = function( event ) {
      $scope.reloadMaxCoefficientByEventAndName( event, 'first' );
    }


    $scope.reloadMaxCoefficientDrawByEvent = function( event ) {
      $scope.reloadMaxCoefficientByEventAndName( event, 'draw' );
    }


    $scope.reloadMaxCoefficientSecondByEvent = function( event ) {
      $scope.reloadMaxCoefficientByEventAndName( event, 'second' );
    }


    $scope.reloadCoefficientsParamEvent = function( coeff_item, param ) {
      if ( ! $scope.coefficients_params_of_event[coeff_item.event_id] ) {
        $scope.coefficients_params_of_event[coeff_item.event_id] = {};
      }

      $scope.coefficients_params_of_event[coeff_item.event_id][param] = [];

      var coefficients = filterFilter( $scope.coefficients, { 'event_id': coeff_item.event_id }, true );

      coefficients.map(function(coefficient) {
        if ( $scope.coefficients_params_of_event[coeff_item.event_id][param].indexOf( coefficient.created_at ) === -1 ) {
          $scope.coefficients_params_of_event[coeff_item.event_id][param].push( coefficient[param] );
        }
      });
    }


    $scope.reloadCoefficientsDatesEvent = function(coeff_item) {
      var coefficients = filterFilter( $scope.coefficients, { 'event_id': coeff_item.event_id }, true );

      coefficients.map(function(coefficient) {
        if ( $scope.coefficients_dates_of_event[coeff_item.event_id].indexOf( coefficient.created_at ) === -1 ) {
          $scope.coefficients_dates_of_event[coeff_item.event_id].push( $filter('date')(coefficient.created_at, "dd.MM") );
        }
      });
    }


    $scope.reloadJcarousel = function() {
      $('.jcarousel').jcarousel();
    }

  


    $scope.reloadChampionships();
    $scope.reloadSports();
    $scope.reloadCountries();
    $scope.reloadEvents();
    $scope.reloadCoefficients();
    $scope.reloadBookmakers();
    $scope.reloadFavoriteChampionships();


    //$rootScope.$broadcast('getFavoriteSports');

    /* on */
    $scope.$on('sendFavoriteSports', function(event, sports) {
      $scope.favorite_sports = sports;
    });

    $scope.$on('reloadCountries', function() {
      $scope.reloadCountries();
    });

    $scope.$on('reloadSports', function() {
      $scope.reloadSports();
    });

    $scope.$on('reloadChampionships', function() {
      $scope.reloadChampionships();
    });

    $scope.$on('reloadEvents', function() {
      $scope.reloadEvents();
    });

    $rootScope.$on('reloadCoefficients', function() {
      $scope.reloadCoefficients();
    });

  }])