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

            //$scope.select( $scope.sports[0] );
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    $scope.hasEvents = function(sport) {
      return sport.count_of_countries;
    }

    $scope.active = function(sport) {
      $scope.sports.map(function(sport, i) {
        sport.isActive = false;  
      })

      sport.isActive = true;
    }

    /* watch */

    /*$scope.$watch('sports', function() {
      if ($scope.sports.length) {
        sport = filterFilter($scope.sports, { isActive: true })[0];
        $rootScope.$broadcast( 'sportSelected', sport ); 
      } 
    });*/

    /* on */

    $scope.$on('countCountries', function(event, count_countries_by_sport_id) {
      $scope.sports.map(function(sport) {
        sport.count_of_countries = count_countries_by_sport_id[sport.id];
      });
    });

    $scope.$on('activeSport', function(event, sport_id) {
      var sport = filterFilter( $scope.sports, { id: sport_id }, true )[0];
      $scope.active( sport );
    });

   

    /* init */

    $scope.init();
  
  }])