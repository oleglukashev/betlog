betlog_controllers.controller('menuSports', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $animate, $route, $routeParams, Storage ) {
    

    $scope.getSports = function() {
      return Storage.getSports();
    }

    $scope.getChampionships = function() {
      return Storage.getChampionships();
    }

    $scope.getActiveSports = function() {
      var result = [];

      $scope.getSports().map(function(sport) {
        var championships_length_of_sport = filterFilter( $scope.getChampionships(), { sport_id: sport.id }, true).length;
        
        if ( championships_length_of_sport ) {
          result.push(sport);
        }
      });

      return result;
    }

    $scope.isActive = function(sport) {
      return sport.id === parseInt($routeParams.sportId);
    }



    /* on */

    $scope.$on('reloadSports', function() {
      Storage.getSports();
    });

    $scope.$on('reloadChampionships', function() {
      $scope.getChampionships();
    });
   
  
  }])