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
            var count_countries_by_sport_id = {};

            data.map(function(country, i) {
              var new_country = {
                id: country.id,
                name: country.name,
                sport_id: country.sport_id,
                isActive: false
              }

              $scope.countries.push( new_country );

              count_countries_by_sport_id[country['sport_id']] = !count_countries_by_sport_id[country['sport_id']] ? 1 : count_countries_by_sport_id[country['sport_id']] + 1;
            });

            $rootScope.$broadcast('countCountries', count_countries_by_sport_id);
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
      var result = [];

      $scope.countries.map(function(country, i) {
        if (country.sport_id === $scope.active_sport.id) {
          result.push(country);
        }
      });

      return result;
    }

    $scope.getChampionshipsByActiveCountry = function() {
      var result = [];

      $scope.championships.map(function(championship, i) {
        if (championship.country_id === $scope.active_country.id && championship.sport_id === $scope.active_sport.id) {
          result.push(championship);
        }
      });
      return result;
    }

    $scope.activeCountryAndSendHimToBroadcast = function(country) {
      $scope.activeCountry( country );
      $rootScope.$broadcast('countrySelected', country);
    }

    $scope.activeChampionshipAndSendHimToBroadcast = function(championship) {
      $scope.activeChampionship( championship );
      $rootScope.$broadcast('championshipSelected', championship);
    }


    /* on */

    $rootScope.$on('sportSelected', function(event, sport) {
      $scope.active_sport = sport;

      if ($scope.countries.length) {
        var first_of_country = $scope.getCountriesByActiveSport()[0];
        $scope.activeCountryAndSendHimToBroadcast(first_of_country);
      } else {
        var countries_length_listener = $scope.$watch('countries.length', function() {
          if ($scope.countries.length) {
            var first_of_country = $scope.getCountriesByActiveSport()[0];
            $scope.activeCountryAndSendHimToBroadcast(first_of_country);
            countries_length_listener();
          }
        });
      }
    });

    $rootScope.$on('countrySelected', function(event, country) {
      $scope.active_country = country;

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