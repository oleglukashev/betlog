betlog_controllers.controller('Championships', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.championships = [];
    $scope.countries = [];
    $scope.active_sport = false;
    $scope.active_country = false;

    $scope.init = function() {
      $http.get('/championships.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length) {
            data.map(function(championship, i) {
              var new_championship = {
                id: championship.id,
                name: championship.name,
                country_id: championship.country_id,
                sport_id: championship.sport_id,
                isActive: false
              }

              $scope.championships.push( new_championship ); 
            });
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

    $scope.select = function(championship) {
      $scope.activeChampionshipAndSendHimToBroadcast(championship);
    }

    $scope.getChampionshipsByCountryIdAndSportId = function( country_id, sport_id ) {
      return filterFilter( $scope.championships, { country_id: $scope.active_country.id }, true);
    }

    $scope.getChampionshipsByActiveCountry = function() {
      return filterFilter( $scope.championships, { country_id: $scope.active_country.id, sport_id: $scope.active_sport.id }, true);
    }

    $scope.activeChampionshipAndSendHimToBroadcast = function(championship) {
      $scope.active( championship );
      $rootScope.$broadcast('championshipSelected', championship);
    }


    /* on */

    $rootScope.$on('countrySelected', function(event, country, sport) {
      $scope.active_country = country;
      $scope.active_sport = sport;

      if ($scope.championships.length) {
        var first_of_championship = $scope.getChampionshipsByActiveCountry()[0];
        $scope.activeChampionshipAndSendHimToBroadcast(first_of_championship);
      } else {
        var championships_length_listener = $scope.$watch('championships.length', function() {
          if ($scope.championships.length) {
            var first_of_championship = $scope.getChampionshipsByActiveCountry()[0];
            $scope.activeChampionshipAndSendHimToBroadcast(first_of_championship);
            championships_length_listener();
          }  
        });
      }
    });


    /* init */

    $scope.init();
  
  }])