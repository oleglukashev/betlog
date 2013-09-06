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
					scope.nameValidate = true;
			});
		}};
	})

	
	.directive('loginValidate', function( $http ) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					scope.lgHasRequired = undefined;
					scope.lgHasEmail = undefined;
					//scope.lgAlredyExists = undefined;
					scope.loginValidate = false;
					scope.lgHasRequired = (viewValue && viewValue.length > 0 ? false : true);

					if ( scope.lgHasRequired ) {
						return false;

				}

				scope.lgHasEmail = (viewValue && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(viewValue)) ? false : true;

				if ( scope.lgHasEmail ) {
					return false;
				}

				$http({method: 'GET', url: '/users/user_exists?login=' + viewValue})
					.success(function(data, status, headers, config) {
						scope.lgAlredyExists = true;
					})
					.error(function(data, status, headers, config) {
						scope.lgAlredyExists = false;
					});

				if ( scope.lgAlredyExists ) {
					return false;
				}

				scope.loginValidate = true;
			});
		}};
	})

	
	.directive('passwordValidate', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					scope.pwdValidLength = undefined;
					scope.pwdHasLetter = undefined;
					scope.pwdHasNumber = undefined;
					scope.pwdValidate = false;
					scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? undefined : 'novalid' );

					if ( scope.pwdValidLength ) {
						return false;
					}

					scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? undefined : 'novalid';

					if ( scope.pwdHasLetter ) { 
						return false;
					}

					scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? undefined : 'novalid';

					if ( scope.pwdHasNumber ) {
						return false;
					}

					scope.pwdValidate = true;
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