betlog_controllers.controller('Countries', ['$scope', '$http', '$element', 'filterFilter', function( $scope, $http, $element, filterFilter ) {
    $scope.countries = [];

    $scope.init = function() {
      $http.get('/countries.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(country, i) {
              var new_country = {
                id: country.id,
                name: country.name,
                sport_id: country.sport_id,
                isActive: i === 0 ? true : false
              }

              $scope.countries.push( new_country );
            });
          }
        })
        .error(function(data, status, headers, config) {

        });
    }
    
    $scope.active = function( country ) {
      $scope.countries.map(function(country, i) {
        country.isActive = false;  
      })

      country.isActive = true;
    }

    $scope.init();
  
  }])