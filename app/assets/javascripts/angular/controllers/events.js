betlog_controllers.controller('Events', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.events = [];
    $scope.active_championship = false;

    $scope.init = function() {
      $http.get('/events.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(event, i) {
              var new_event = {
                id: event.id,
                championship_id: event.championship_id,
                opponent_1: event.opponent_1,
                opponent_2: event.opponent_2,
                date_event: event.date_event
              }

              $scope.events.push( new_event );
            });
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    $scope.active = function( event ) {
      $scope.events.map(function(event, i) {
        event.isActive = false;  
      })

      event.isActive = true;
    }

    $scope.getChampionshipEvents = function() {
      return filterFilter($scope.events, { championship_id: $scope.active_championship.id });
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
      return filterFilter( $scope.events, { championship_id: $scope.active_championship.id, date_event: date_event });
    }


    /* on */

    $rootScope.$on('championshipSelected', function(event, championship) {
      $scope.active_championship = championship;
    });


    /* init */

    $scope.init();
  
  }])