betlog_controllers.controller('menuSportCountries', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', function( $scope, $rootScope, $http, $element, filterFilter ) {
    $scope.active_country = false;
    $scope.first_word = "";
    $scope.isActive = false;
    var column_height = 6;

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
      var count_result = countries_length ? Math.ceil( countries_length / column_height ) : 0;
      var result = [];

      for (var i = 0; i < count_result; i++) {
        result.push(i);
      }

      return result;
    }

    $scope.getCountriesByBlockAndSport = function( block_number, sport ) {
      var result = [];

      $scope.getCountriesBySport(sport).map(function(country, key) {
        if ( key >= ( block_number * column_height ) && key < ( block_number * column_height ) + column_height ) {
          result.push( country );
        }
      });

      return result;
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