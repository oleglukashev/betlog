betlog_controllers.controller('Countries', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.countries = [];
    $scope.activeSport = false;
    $scope.activecountry = false;

    $scope.init = function() {
      $http.get('/countries.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(country, i) {
              var new_country = {
                id: country.id,
                name: country.name,
                sport_id: country.sport_id,
                isActive: false
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

    $scope.getCountriesByActiveSport = function() {
      var result = filterFilter( $scope.countries, { sport_id: $scope.activeSport.id });

      if ( result.length ) {
        if ( ! filterFilter( $scope.countries, { isActive: true }).length ) {
          $scope.active( result[0] );
        }
      }

      return result;
    }


    /* on */

    $rootScope.$on('sportSelected', function( event, sport) {
      $scope.activeSport = sport;

      var selected_country = filterFilter( $scope.countries, { isActive: true });

      $rootScope.$broadcast('countrySelected', selected_country);
    })

    /* init */

    $scope.init();
  
  }])