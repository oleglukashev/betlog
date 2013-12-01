betlog_controllers.controller('Events', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', '$animate', function( $scope, $rootScope, $http, $element, filterFilter, $animate ) {
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
                date_event: event.date_event,
                isOpened: false
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


    /* init */

    $scope.init();
  
  }])