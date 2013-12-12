betlog_controllers.controller('Coefficients', ['$scope', '$rootScope', '$http', '$element', 'filterFilter', '$animate', function( $scope, $rootScope, $http, $element, filterFilter, $animate ) {
    $scope.coefficients = [];

    $scope.init = function() {
      $http.get('/coefficients.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.coefficients.length ) {
            data.coefficients.map(function(coefficient, i) {
              var new_coefficients = {
                id: coefficient.item.id,
                event_id: coefficient.item.event_id,
                bookmaker_id: coefficient.item.bookmaker_id,
                bookmaker_name: coefficient.item.bookmaker_name,
                first: coefficient.item.first,
                draw: coefficient.item.draw,
                second: coefficient.item.second,
                first_or_draw: coefficient.item.first_or_draw,
                first_or_second: coefficient.item.first_or_second,
                draw_or_second: coefficient.item.draw_or_second,
                first_fora: coefficient.item.first_fora,
                second_fora: coefficient.item.second_fora,
                coeff_first_fora: coefficient.item.coeff_first_fora,
                coeff_second_fora: coefficient.item.coeff_second_fora,
                total_less: coefficient.item.total_less,
                total_more: coefficient.item.total_more,
                coeff_first_total: coefficient.item.coeff_first_total,
                coeff_second_total: coefficient.item.coeff_second_total
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