'use strict';

/* Directives */


angular.module('betlog.directives', [])
  .directive('fancybox', function() {
    return function( scope, element ) {
      element.fancybox({
				padding					: 0,
				closeBtn 				: false,
				beforeShow			: function() {
		      $("div.fancybox-wrap").addClass('fancybox-wrap-1').css('marginLeft', ( $(window).width() / 2 ) + 200 + 'px' );
		   	}
    	});
   	};
	})
	.directive('loginValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.lgHasRequired = (viewValue && viewValue.length > 0 ? 'valid' : undefined);
                scope.lgHasEmail = (viewValue && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(viewValue)) ? 'valid' : undefined;
                
                $http({method: 'GET', url: '/users/is_user?login=' + viewValue}).
									success(function(data, status, headers, config) {
										scope.lgAlredyExist = data == false ? 'valid' : undefined; 
							  	}).
							  	error(function(data, status, headers, config) {

							  	});
                
                if(scope.lgHasRequired && scope.lgHasEmail && scope.lgAlredyExist) {
                    ctrl.$setValidity('lg', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('lg', false);                    
                    return undefined;
                }

            });
        }
    };
	})
	.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
	})
	.directive('onKeyup', function() {
	  return function(scope, elm, attrs) {
	    elm.bind("keyup", function() {
	      scope.$apply(attrs.onKeyup);
	    });
	  };
	});