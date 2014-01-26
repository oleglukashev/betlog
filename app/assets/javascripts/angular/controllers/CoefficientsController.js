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

    $scope.grouped_coefficients_of_event = {};
    $scope.last_grouped_coefficients_of_event = {};
    $scope.coefficients_dates_event_one_bookmaker = {};
    $scope.coefficients_params_event_only_one_bookmaker = {};


    $scope.reloadCoefficients = function() {
      $scope.coefficients = Storage.getCoefficients();
    }


    $scope.getLastGroupedCoefficientsByEvent = function( event ) {
      if ( typeof $scope.last_grouped_coefficients_of_event[event.id] === 'undefined' ) {
        $scope.reloadLastCoefficientsGroupedByBookmaker( event )
      }

      return $scope.last_grouped_coefficients_of_event[event.id];
    }


    $scope.reloadLastCoefficientsGroupedByBookmaker = function( event ) {
      $scope.reloadCoefficientsGroupedByBookmaker( event );
      $scope.last_grouped_coefficients_of_event[event.id] = [];

      $scope.grouped_coefficients_of_event[event.id].map(function(coefficients_item) {
        var last_coefficients_item = coefficients_item[coefficients_item.length - 1];
        $scope.last_grouped_coefficients_of_event[event.id].push( last_coefficients_item );
        $scope.reloadCoefficientsDatesEventOnlyOneBookmaker( last_coefficients_item );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'first' );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'draw' );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'second' );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'first_or_draw' );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'first_or_second' );
        $scope.reloadCoefficientsParamEventOnlyOneBookmaker( last_coefficients_item, 'draw_or_second' );
      });
    }
    

    $scope.reloadCoefficientsGroupedByBookmaker = function( event ) {
      var bookmakers = [];
      var coefficients = filterFilter( $scope.coefficients, { 'event_id': event.id }, true );
      $scope.grouped_coefficients_of_event[event.id] = [];

      coefficients.map(function(coefficients_item) {
        if ( bookmakers.indexOf(coefficients_item.bookmaker_name) === -1 ) {
          var result_coeffs = filterFilter( coefficients, { 'bookmaker_name': coefficients_item.bookmaker_name }, true );
          $scope.grouped_coefficients_of_event[event.id].push( result_coeffs );
          bookmakers.push( coefficients_item.bookmaker_name );
        }
      });
    }


    $scope.reloadCoefficientsDatesEventOnlyOneBookmaker = function( coeff_item ) {
      var coefficients = filterFilter( $scope.coefficients, { 'event_id': coeff_item.event_id, 'bookmaker_name': coeff_item.bookmaker_name  }, true );
      
      if ( typeof $scope.coefficients_dates_event_one_bookmaker[coeff_item.id] === 'undefined' ) {
        $scope.coefficients_dates_event_one_bookmaker[coeff_item.id] = [];  
      }

      coefficients.map(function(coefficient) {
        if ( $scope.coefficients_dates_event_one_bookmaker[coeff_item.id].indexOf( coefficient.created_at ) === -1 ) {
          $scope.coefficients_dates_event_one_bookmaker[coeff_item.id].push( $filter('date')(coefficient.created_at, "dd.MM") );
        }
      });
    }


    $scope.reloadCoefficientsParamEventOnlyOneBookmaker = function( coeff_item, param ) {
      var coefficients = filterFilter( $scope.coefficients, { 'event_id': coeff_item.event_id, 'bookmaker_name': coeff_item.bookmaker_name  }, true );
      
      if ( typeof $scope.coefficients_params_event_only_one_bookmaker[coeff_item.id] === 'undefined' ) {
        $scope.coefficients_params_event_only_one_bookmaker[coeff_item.id] = {};
      }

      $scope.coefficients_params_event_only_one_bookmaker[coeff_item.id][param] = [];

      coefficients.map(function(coefficient) {
        if ( $scope.coefficients_params_event_only_one_bookmaker[coeff_item.id][param].indexOf( coefficient.created_at ) === -1 ) {
          $scope.coefficients_params_event_only_one_bookmaker[coeff_item.id][param].push( coefficient[param] );
        }
      });
    }


    $scope.reloadCoefficients();


    /* on */

    $rootScope.$on('reloadCoefficients', function() {
        $scope.reloadCoefficients();
    });
  
  }])