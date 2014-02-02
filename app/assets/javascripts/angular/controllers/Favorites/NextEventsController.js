betlog_controllers.controller('NextEvents', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams', 
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    $scope.events = [];
    $scope.sports = [];
    $scope.championships = [];
    $scope.countries = [];

    $scope.next_events = [];
    $scope.sport_of_championship = {};
    $scope.country_of_championship = {};
    $scope.championship_of_event = {};

    $scope.mainDataIsLoaded = function() {
      if ( $scope.sports.length && $scope.championships.length && $scope.events.length
      && $scope.countries.length) {
        return true;
      }
    }


    $scope.reloadEvents = function() {
      $scope.events = Storage.getEvents();
    }


    $scope.reloadChampionships = function() {
      $scope.championships = Storage.getChampionships();
    }


    $scope.reloadSports = function() {
      $scope.sports = Storage.getSports();
    }


    $scope.reloadCountries = function() {
      $scope.countries = Storage.getCountries();
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

    
    $scope.reloadNextEvents = function() {
      if ( ! $scope.mainDataIsLoaded() ) {
        return false;
      }

      var sort_next_events = [];
      
      $scope.events.map(function(event) {
        if ( new Date(event.date_event) > new Date() ) {
          sort_next_events.push(event);
        }
      });

      sort_next_events.sort(function(a, b) {
        a = new Date(a.date_event);
        b = new Date(b.date_event);
        return a - b;
      });

      $scope.next_events = [];
      sort_next_events.map(function(event, key) {
        if ( key <= 4 ) {
          $scope.next_events.push( event );
          $scope.reloadChampionshipByEvent( event );
          $scope.reloadSportByChampionship( $scope.championship_of_event[event.id] );
          $scope.reloadCountryByChampionship( $scope.championship_of_event[event.id] );
        } else {
          return false;
        } 
      });

    }

    $scope.reloadChampionships();
    $scope.reloadSports();
    $scope.reloadCountries();
    $scope.reloadEvents();
    $scope.reloadNextEvents();


    /* on */

    $scope.$on('reloadCountries', function() {
      $scope.reloadCountries();
      $scope.reloadNextEvents();
    });

    $scope.$on('reloadSports', function() {
      $scope.reloadSports();
      $scope.reloadNextEvents();
    });

    $scope.$on('reloadChampionships', function() {
      $scope.reloadChampionships();
      $scope.reloadNextEvents();
    });

    $scope.$on('reloadEvents', function() {
      $scope.reloadEvents();
      $scope.reloadNextEvents();
    });

  }])