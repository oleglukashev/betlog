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
  function( $scope, $rootScope, $http, filterFilter, $filter, $animate, $route, $routeParams, Storage ) {    $scope.coefficients = [];

    $scope.getCoefficients = function() {
        return Storage.getCoefficients();
    }



    $scope.getAllCoefficientsByEventGroupedByBookmaker = function(event) {
      var result = [];
      var bookmakers = [];
      var event_id = event.id;
      var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': event_id }, true );

      coefficients.map(function(coefficients_item) {
        if ( bookmakers.indexOf(coefficients_item.bookmaker_name) === -1 ) {
          result_coeffs = filterFilter( coefficients, { 'bookmaker_name': coefficients_item.bookmaker_name }, true );
          result.push( result_coeffs );
          bookmakers.push( coefficients_item.bookmaker_name );
        }
      });

      return result;
    }



    $scope.getLastCoefficientsByEventGroupedByBookmaker = function( event ) {
      var result = [];

      $scope.getAllCoefficientsByEventGroupedByBookmaker(event).map(function(coefficients_group) {
        result.push(coefficients_group[coefficients_group.length - 1]);
      });

      return result;
    }

    $scope.getCoefficientsDatesEvent = function(coefficient_item) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( $filter('date')(coefficient.created_at, "dd.MM") );
          }
        });

        return result;
      }
    }

    $scope.getCoefficientsDatesEventOnlyOneBookmaker = function(coefficient_item) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id, 'bookmaker_name': coefficient_item.bookmaker_name  }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( $filter('date')(coefficient.created_at, "dd.MM") );
          }
        });

        return result;
      }
    }

    $scope.getMaxCoefficientByEventAndName = function(event, param) {
      var result = [];
      var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': event.id }, true );

      return coefficients.sort(function(a, b) {
        a = a[param];
        b = b[param];

        return b - a;
      })[0];
    }

    $scope.getMaxCoefficientFirstByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'first');
    }

    $scope.getMaxCoefficientDrawByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'draw');
    }

    $scope.getMaxCoefficientSecondByEvent = function(event) {
      return $scope.getMaxCoefficientByEventAndName(event, 'second');
    } 

    $scope.getCoefficientsParamEventOnlyOneBookmaker = function(coefficient_item, param) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id, 'bookmaker_name': coefficient_item.bookmaker_name  }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( coefficient[param] );
          }
        });

        return result;
      }
    }

    $scope.getCoefficientsParamEvent = function(coefficient_item, param) {
      if ( coefficient_item ) {
        var result = [];
        var coefficients = filterFilter( $scope.getCoefficients(), { 'event_id': coefficient_item.event_id }, true );

        coefficients.map(function(coefficient) {
          if ( result.indexOf( coefficient.created_at ) === -1 ) {
            result.push( coefficient[param] );
          }
        });

        return result;
      }
    }



    /* on */

    $rootScope.$on('reloadCoefficients', function() {
        $scope.getCoefficients();
    });
  
  }])