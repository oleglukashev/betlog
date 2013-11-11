betlog_controllers.controller('Events', ['$scope', '$http', '$element', 'filterFilter', function( $scope, $http, $element, filterFilter ) {
    $scope.events = [];

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

    $scope.getDatesFromEvents = function() {
      var result = [];

      $scope.events.map(function(event, i) {
        if ( ! filterFilter( result, event.date_event ).length ) {
          result.push( event.date_event );
        }
      });

      return result.sort();
    }

    $scope.getEventsByDate = function( date ) {
      return filterFilter( $scope.events, { date_event: date });
    }
    
    $scope.active = function( event ) {
      $scope.events.map(function(event, i) {
        event.isActive = false;  
      })

      event.isActive = true;
    }

    $scope.init();
  
  }])