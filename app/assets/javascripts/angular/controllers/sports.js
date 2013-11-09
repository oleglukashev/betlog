betlog_controllers.controller('Sports', ['$scope', '$http', '$element', function( $scope, $http, $element ) {
    $scope.sports = [];

    $scope.init = function() {
      $http.get('/sports.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(sport, i) {
              var new_sport = {
                id: sport.id,
                name: sport.name,
                isActive: i === 0 ? true : false
              }

              $scope.sports.push( new_sport );
            });
          }
        })
        .error(function(data, status, headers, config) {

        });
    }
    
    $scope.active = function( sport ) {
      $scope.sports.map(function(sport, i) {
        sport.isActive = false;  
      })

      sport.isActive = true;
    }

    /*$scope.getChampionshipsBySportId = function( sport_id ) {
      var championships_for_sport = [];


      for( var i = 0; i < $scope.championships.length; i++ ) {
        if ( $scope.championships[i].sport_id === sport_id)
          championships_for_sport.push( $scope.championships[i] );
      }

      return championships_for_sport;
    }*/

    $scope.init();
  
  }])