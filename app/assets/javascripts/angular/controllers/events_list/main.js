betlog_controllers.controller('EventsList', [
    '$scope', 
    '$rootScope',
    '$http', 
    'filterFilter', 
    '$animate', 
    '$route', 
    '$routeParams', 
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {

    $scope.active_championship = false;
    $scope.active_sport = false;
    $scope.active_country = false;

    $scope.getEventsAllChampionships = function() {
      var result = [];

      $scope.getChampionshipsBySportAndCountry().map(function(championship) {
        var championship_events = filterFilter( $scope.getEvents(), { championship_id: championship.id }, true);

        championship_events.map(function(events) {
          result.push( events );
        });
      })

      return result;
    }

    $scope.getEventsByActiveChampionship = function() {
      return filterFilter( $scope.getEvents(), { championship_id: $scope.getActiveChampionship().id }, true);
    }

    $scope.getChampionshipsBySportAndCountry = function() {
      return filterFilter( $scope.getChampionships(), { sport_id: parseInt($routeParams.sportId), country_id: parseInt($routeParams.countryId) }, true);
    }




    $scope.active = function( event ) {
      $scope.getEventsByActiveCountryAndSport().map(function(event, i) {
        event.isActive = false;  
      })

      event.isActive = true;
    }

    $scope.getDatesFromCmapionshipEvents = function() {
      var result = [];

      var event_scope = $scope.getActiveChampionship() ?
        $scope.getEventsByActiveChampionship() :
        $scope.getEventsAllChampionships();

      event_scope.map(function(event, i) {
        var day = event.date_event.slice(0, 10);
        if ( ! filterFilter( result, day ).length ) {
          result.push( day );
        }
      });

      return result.sort();
    }

    $scope.getEventsChampionshipByEventDate = function(date_event) {
      var result = [];

      var event_scope = $scope.getActiveChampionship() ?
        $scope.getEventsByActiveChampionship() :
        $scope.getEventsAllChampionships();

      event_scope.map(function(event, i) {
        if (event.date_event.indexOf(date_event) != -1) {
          result.push(event);
        }
      });

      return result;
    }

    $scope.toggle = function( event_obj ) {
      event_obj.isOpened = event_obj.isOpened ? false : true;  
    }

    $scope.getCountryName = function() {
      var result_country = filterFilter( $scope.getCountries(), { id: parseInt($routeParams.countryId) }, true)[0];

      if ( result_country )
      {
        return result_country.name
      }
    }



    $scope.getCountries = function() {
      return Storage.getCountries();
    }

    $scope.getSports = function() {
      return Storage.getSports();
    }

    $scope.getEvents = function() {
      return Storage.getEvents();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }

    $scope.getActiveSport = function() {
      return filterFilter( $scope.getSports(), { id: parseInt($routeParams.sportId) }, true)[0];
    }

    $scope.getActiveCountry = function() {
      return filterFilter( $scope.getCountries(), { id: parseInt($routeParams.countryId) }, true)[0];
    }

    $scope.getActiveChampionship = function() {
      return filterFilter( $scope.getChampionships(), { id: parseInt($routeParams.championshipId) ? parseInt($routeParams.championshipId) : false }, true)[0];
    }
  



    /* on */

    $scope.$on('reloadCountries', function() {
      //console.log(Storage.getCountries());
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