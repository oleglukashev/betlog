betlog_controllers.controller('menuSportCountries', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.active_country = false;
    $scope.first_word = "";

    $scope.selectWidthCountryAndSport = function(country, sport) {
      $scope.activeSportBySportId(country.sport_id);
      $scope.activeCountryAndSportSendHimToBroadcast(country, sport);
    }

    $scope.getCountriesBySport = function(sport) {
      var result = [];
      var championships = filterFilter( $scope.getChampionships(), { sport_id: sport.id }, true);

      championships.map(function(championship) {
        var country = filterFilter( $scope.getCountries(), { id: championship.country_id }, true)[0];

        if ( country && result.indexOf( country ) === -1) {
          result.push( country );
        } 
      });

      return result;
    }

    $scope.getBlockCountryBySport = function( sport ) {
      var countries_length = $scope.getCountriesBySport( sport ).length;
      var count_result = countries_length ? Math.ceil( countries_length / 8 ) : 0;
      var result = [];

      for (var i = 0; i < count_result; i++) {
        result.push(i);
      }

      return result;
    }

    $scope.getCountriesByBlockAndSport = function( block_number, sport ) {
      var result = [];
      var block_size = 8;

      $scope.getCountriesBySport(sport).map(function(country, key) {
        if ( key >= ( block_number * block_size ) && key < ( block_number * block_size ) + block_size ) {
          result.push( country );
        }
      });

      return result;
    }

    $scope.activeCountryAndSportSendHimToBroadcast = function(country, sport) {
      $rootScope.$broadcast('countrySelected', country, sport);
    }

    $scope.activeSportBySportId = function(sport_id) {
      $rootScope.$broadcast('activeSport', sport_id);
    }

    $scope.getFirstWordByCountry = function( country ) {
      return country.name.slice(0,1).toUpperCase();
    }

    $scope.setFirstWord = function( word ) {
      $scope.first_word = word;
    }

    $scope.getCountries = function() {
      return Storage.getCountries();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }


    /* on */

    $scope.$on('reloadCountries', function() {
      $scope.getCountries();
    });

    $scope.$on('reloadChampionships', function() {
      $scope.getChampionships();
    });

  }])