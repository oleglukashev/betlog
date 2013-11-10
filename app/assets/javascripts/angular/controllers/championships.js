betlog_controllers.controller('Championships', ['$scope', '$http', '$element', 'filterFilter', function( $scope, $http, $element, filterFilter ) {
    $scope.championships = [];

    $scope.init = function() {
      /* get dates */
      $http.get('/championships.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length) {
            data.map(function(championship, i) {
              var new_championship = {
                id: championship.id,
                name: championship.name,
                country_id: championship.country_id,
                active: i === 0 ? true : false
              }

              $scope.championships.push( new_championship ); 
            })
          }
        }).
        error(function(data, status, headers, config) {

        });
    }
    
    $scope.active = function( championship ) {
      $scope.championships.map(function(championship, i) {
        championship.isActive = false; 
      });

      championship.isActive = true;
    }

    $scope.getChampionshipsByCountryId = function( country_id ) {
      console.log( $scope.championships );
      return filterFilter( $scope.championships, { country_id: country_id} )
    }

    $scope.init();
  
  }])