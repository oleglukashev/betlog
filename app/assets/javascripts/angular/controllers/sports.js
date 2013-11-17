betlog_controllers.controller('Sports', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.sports = [];

    $scope.init = function() {
      $http.get('/sports.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(sport, i) {
              var new_sport = {
                id: sport.id,
                name: sport.name,
                isActive: false
              }

              $scope.sports.push( new_sport );
            });

            $scope.selectSport( $scope.sports[0] );
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

    $scope.activeSportAndSendHimToBroadcast = function(sport) {
      var sport_to_active = sport ? sport : $scope.sports[0];
      $rootScope.$broadcast( 'sportSelected', sport );
    }

    $scope.selectSport = function(sport) {
      $scope.activeSportAndSendHimToBroadcast(sport); 
    }

    /* watch */

    $scope.$watch('sports', function() {
      if ($scope.sports.length) {
        sport = filterFilter($scope.sports, { isActive: true})[0];
        $rootScope.$broadcast( 'sportSelected', sport ); 
      } 
    })

   

    /* init */

    $scope.init();
  
  }])