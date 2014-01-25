betlog_controllers.controller('Coefficients', [
  '$scope', 
  '$rootScope',
  '$http', 
  'filterFilter', 
  '$filter',
  '$animate', 
  '$route', 
  '$routeParams',
  'Storage',
  function( $scope, $rootScope, $http, filterFilter, $filter, $animate, $route, $routeParams, Storage ) {
    $scope.coefficients = [];
    $scope.coefficients_by_event = {};
    $scope.last_coefficients_by_event = {};
    $scope.coefficients_dates_event_only_one_bookmaker = {};
    $scope.coefficients_params_event_only_one_bookmaker = {};


    $scope.getCoefficients = function() {
      return Storage.getCoefficients();
    }

    $scope.getAllCoefficientsGroupedByBookmaker = function( event ) {
      if ( ! $scope.coefficients_by_event[event.id] ) {
        var bookmakers = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': event.id }, true );
        $scope.coefficients_by_event[event.id] = [];

        coefficients.map(function(coefficients_item) {
          if ( bookmakers.indexOf(coefficients_item.bookmaker_name) === -1 ) {
            result_coeffs = filterFilter( coefficients, { 'bookmaker_name': coefficients_item.bookmaker_name }, true );
            $scope.coefficients_by_event[event.id].push( result_coeffs );
            bookmakers.push( coefficients_item.bookmaker_name );
          }
        });
      }

      return $scope.coefficients_by_event[event.id];
    }



    $scope.getLastCoefficientsGroupedByBookmaker = function( event ) {
      if ( ! $scope.last_coefficients_by_event[event.id] ) {
        $scope.last_coefficients_by_event[event.id] = [];

        $scope.getAllCoefficientsGroupedByBookmaker(event).map(function(coefficients_group) {
          $scope.last_coefficients_by_event[event.id].push(coefficients_group[coefficients_group.length - 1]);
        });
      }

      return $scope.last_coefficients_by_event[event.id];
    }

    $scope.getCoefficientsDatesEventOnlyOneBookmaker = function(coefficient_item) {
      if ( coefficient_item ) {
        if ( ! $scope.coefficients_dates_event_only_one_bookmaker[coefficient_item.id] ) {
          var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id, 'bookmaker_name': coefficient_item.bookmaker_name  }, true );
          $scope.coefficients_dates_event_only_one_bookmaker[coefficient_item.id] = [];

          coefficients.map(function(coefficient) {
            if ( $scope.coefficients_dates_event_only_one_bookmaker[coefficient_item.id].indexOf( coefficient.created_at ) === -1 ) {
              $scope.coefficients_dates_event_only_one_bookmaker[coefficient_item.id].push( $filter('date')(coefficient.created_at, "dd.MM") );
            }
          });
        }

        return $scope.coefficients_dates_event_only_one_bookmaker[coefficient_item.id];
      }
    }

    

    $scope.getCoefficientsParamEventOnlyOneBookmaker = function(coefficient_item, param) {
      if ( coefficient_item ) {
        if ( ! $scope.coefficients_params_event_only_one_bookmaker[coefficient_item.id] ) {
          var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id, 'bookmaker_name': coefficient_item.bookmaker_name  }, true );
          $scope.coefficients_params_event_only_one_bookmaker[coefficient_item.id] = [];

          coefficients.map(function(coefficient) {
            if ( $scope.coefficients_params_event_only_one_bookmaker[coefficient_item.id].indexOf( coefficient.created_at ) === -1 ) {
              $scope.coefficients_params_event_only_one_bookmaker[coefficient_item.id].push( coefficient[param] );
            }
          });
        }

        return $scope.coefficients_params_event_only_one_bookmaker[coefficient_item.id];
      }
    }


    /* on */

    $rootScope.$on('reloadCoefficients', function() {
        $scope.getCoefficients();
    });
  
  }])