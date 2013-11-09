'use strict';
/* Directives */
angular.module('betlog.directives', [])
	.directive('fancyboxLogin', function( $rootScope ) {
		return {
			restrict: 'AC',
			link: function( scope, element ) {
				$rootScope.$broadcast('showAuthorization');
			}
		};
	})

	
	.directive('nameValidate', function( $http ) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					scope.nameHasRequired = undefined;
					scope.nameValidate = false;
					
					scope.nameHasRequired = (viewValue && viewValue.length > 0 ? false : true);

					if( ! scope.nameHasRequired ) {
						scope.nameValidate = true;
          	return viewValue;
          } else {                    
            return undefined;
          }
			});
		}};
	})

	
	.directive('loginValidate', ['$http', function( $http ) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					scope.lgHasRequired = undefined;
					scope.lgHasEmail = undefined;
					scope.lgAlredyExists = undefined;
					scope.loginValidate = false;
					scope.lgHasRequired = (viewValue && viewValue.length > 0 ? false : true);

					scope.lgHasEmail = (viewValue && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(viewValue)) ? false : true;

					$http({method: 'GET', url: '/users/user_exists?login=' + viewValue})
						.success(function(data, status, headers, config) {
							scope.lgAlredyExists = true;

							//change loginvalidete after return response
							scope.loginValidate = false;
						})
						.error(function(data, status, headers, config) {
							scope.lgAlredyExists = false;
						});

					if( ! scope.lgHasRequired && ! scope.lgHasEmail && ! scope.lgAlredyExists ) {
						scope.loginValidate = true;
          	return viewValue;
          } else {                    
            return undefined;
          }
			});
		}};
	}])

	
	.directive('passwordValidate', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					scope.pwdValidLength = undefined;
					scope.pwdHasLetter = undefined;
					scope.pwdHasNumber = undefined;
					scope.pwdValidate = false;
					scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? false : true );

					scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? false : true;

					if( ! scope.pwdHasLetter && ! scope.pwdHasNumber && ! scope.pwdValidLength ) {
						scope.pwdValidate = true;
          	return viewValue;
          } else {                    
            return undefined;
          }
				});
			}};
		}).directive('onKeyup', function() {
			return function(scope, elm, attrs) {
				elm.bind("keyup", function() {
					scope.$apply(attrs.onKeyup);
				});
			};
		})

		.directive('eatClick', function() {
    	return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})