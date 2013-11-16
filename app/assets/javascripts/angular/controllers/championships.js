betlog_controllers.controller('Championships', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.championships = [];
    $scope.countries = [];
    $scope.active_sport = false;
    $scope.active_country = false;

    $scope.init = function() {
      /* get dates */
      $scope.initCountries();
      $scope.initChampionships();
    }

    $scope.initChampionships = function() {
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

    $scope.initCountries = function() {
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
    
    $scope.activeChampionship = function( championship ) {
      $scope.championships.map(function(championship, i) {
        championship.isActive = false; 
      });

      championship.isActive = true;
    }

    $scope.activeCountry = function( country ) {
      $scope.countries.map(function(country, i) {
        country.isActive = false;  
      })

      country.isActive = true;
    }

    $scope.selectCountry = function(country) {
      $scope.activeCountryAndSendHimToBroadcast(country);
    }

    $scope.selectChampionship = function(championship) {
      $scope.activeChampionshipAndSendHimToBroadcast(championship);
    }

    $scope.getChampionshipsByCountryId = function( country_id ) {
      var result = [];

      $scope.championships.map(function(championship, i) {
        if ( championship.country_id === country_id ) {
          result.push( championship );
        }
      });

      return result;
    }

    $scope.getCountriesByActiveSport = function() { 
      return filterFilter( $scope.countries, { sport_id: $scope.active_sport.id });
    }

    $scope.getChampionshipsByActiveCountry = function() {
      return filterFilter( $scope.championships, { country_id: $scope.active_country.id, sport_id: $scope.active_sport.id });
    }

    $scope.activeCountryAndSendHimToBroadcast = function(country) {
      var country_to_active = country ? country : $scope.getCountriesByActiveSport()[0];
      $scope.activeCountry( country_to_active );
      var active_country = filterFilter($scope.getCountriesByActiveSport(), { isActive: true })[0];
      $rootScope.$broadcast('countrySelected', active_country);
    }

    $scope.activeChampionshipAndSendHimToBroadcast = function(championship) {
      var championship_to_active = championship ? championship : $scope.getChampionshipsByActiveCountry()[0];
      $scope.activeChampionship( championship_to_active );
      var active_championship = filterFilter( $scope.getChampionshipsByActiveCountry(), { isActive: true })[0];
      $rootScope.$broadcast('championshipSelected', active_championship);
    }


    /* on */

    $rootScope.$on('sportSelected', function(event, sport) {
      $scope.active_sport = sport;

      if ($scope.countries.length) {
        $scope.activeCountryAndSendHimToBroadcast();
      } else {
        var countries_length_listener = $scope.$watch('countries.length', function() {
          if ($scope.countries.length) {
            $scope.activeCountryAndSendHimToBroadcast();
            countries_length_listener();
          }
        });
      }
    });

    $rootScope.$on('countrySelected', function(event, country) {
      $scope.active_country = country;

      if ($scope.championships.length) {
        $scope.activeChampionshipAndSendHimToBroadcast();
      } else {
        var championships_length_listener = $scope.$watch('championships.length', function() {
          if ($scope.championships.length) {
            $scope.activeChampionshipAndSendHimToBroadcast();
            championships_length_listener();
          }  
        });
      }
    });


    /* init */

    $scope.init();
  
  }])