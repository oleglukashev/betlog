betlog_controllers.controller('Coefficients', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', '$animate', function( $scope, $rootScope, $http, $element, filterFilter, $animate ) {
    $scope.coefficients = [];

    $scope.init = function() {
      $http.get('/coefficients.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(coefficient, i) {
              var new_coefficients = {
                id: coefficient.id,
                event_id: coefficient.event_id,
                bookmaker_id: coefficient.bookmaker_id,
                first: coefficient.first,
                draw: coefficient.draw,
                second: coefficient.second,
                first_or_draw: coefficient.first_or_draw,
                first_or_second: coefficient.first_or_second,
                draw_or_second: coefficient.draw_or_second,
                first_fora: coefficient.first_fora,
                second_fora: coefficient.second_fora,
                coeff_first_fora: coefficient.coeff_first_fora,
                coeff_second_fora: coefficient.coeff_second_fora,
                total_less: coefficient.total_less,
                total_more: coefficient.total_more,
                coeff_first_total: coefficient.coeff_first_total,
                coeff_second_total: coefficient.coeff_second_total
              }

              $scope.coefficients.push( new_coefficients );
            });
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    $scope.getCoefficientsByEventId = function( event_id ) {
      return filterFilter( $scope.coefficients, { 'event_id': event_id }, true );
    }



    /* on */



    /* init */

    $scope.init();
  
  }])