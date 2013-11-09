betlog_controllers.controller('Championships', ['$scope', '$http', '$element', function( $scope, $http, $element ) {
    $scope.sports = [];
    $scope.championships = [];

    $scope.init = function() {
      /* get dates */
      $http({method: 'GET', url: '/'}).
        success(function(data, status, headers, config) {
          if ( status === 200 ) {
            if ( data.sports.length ) {

              for( var i = 0; i < data.sports.length; i++ ) {
                var new_sport = {
                  id: data.sports[i].id,
                  name: data.sports[i].name,
                  isActive: i === 0 ? true : false
                }

                $scope.sports.push( new_sport );
              }
            }

            if ( data.championships.length ) {

              for( var i = 0; i < data.championships.length; i++ ) {
                var new_championship = {
                  id: data.championships[i].id,
                  name: data.championships[i].name,
                  sport_id: data.championships[i].sport_id,
                  active: i === 0 ? true : false
                }

                $scope.championships.push( new_championship );
              }
            }
          }
      }).
      error(function(data, status, headers, config) {

      });
    }
    
    $scope.active = function( sport ) {
      for( var i = 0; i < $scope.sports.length; i++) {
        $scope.sports[i].isActive = false;
      }

      sport.isActive = true;
    }

    $scope.getChampionshipsBySportId = function( sport_id ) {
      var championships_for_sport = [];

      for( var i = 0; i < $scope.championships.length; i++ ) {
        if ( $scope.championships[i].sport_id === sport_id)
          championships_for_sport.push( $scope.championships[i] );
      }

      return championships_for_sport;
    }

    $scope.init();
  
  }])