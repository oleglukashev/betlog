betlog_controllers.controller('Events', [
    '$scope', 
    '$rootScope',
    '$http', 
    'filterFilter', 
    '$animate', 
    '$route', 
    '$routeParams', 
    function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams ) {
    
    $scope.events = [];
    $scope.active_championship = false;

    $scope.active = function( event ) {
      $scope.events.map(function(event, i) {
        event.isActive = false;  
      })

      event.isActive = true;
    }

    $scope.getChampionshipEvents = function() {
      var result = [];

      $scope.events.map(function(event, i) {
        if (event.championship_id === $scope.active_championship.id) {
          result.push(event);
        }
      });

      return result;
    }

    $scope.getDatesFromCmapionshipEvents = function() {
      var result = [];

      $scope.getChampionshipEvents().map(function(event, i) {
        var day = event.date_event.slice(0, 10);
        if ( ! filterFilter( result, day ).length ) {
          result.push( day );
        }
      });

      return result.sort();
    }

    $scope.getChampionshipEventsByEventDate = function(date_event) {
      var result = [];

      $scope.events.map(function(event, i) {
        if (event.championship_id === $scope.active_championship.id && event.date_event.indexOf(date_event) != -1) {
          result.push(event);
        }
      });

      return result;
    }

    $scope.toggle = function( event_obj ) {
      event_obj.isOpened = event_obj.isOpened ? false : true;  
    }


    /* on */

    $rootScope.$on('championshipSelected', function(event, championship) {
      $scope.active_championship = championship;
    });

  
  }])