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
		},
        beforeClose         : function() {
          $("div.fancybox-wrap form input").each(function() {
            $(this).val('');    
          });
            
            $('div.fancybox-wrap form p.loginbox-input-error').removeClass('novalid')
        }
    	});
   	};
	})
	.directive('loginValidate', function( $http ) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                scope.lgHasRequired = undefined;
                scope.lgHasEmail = undefined;
                scope.lgAlredyExists = undefined;
                scope.loginValidate = false;

                scope.lgHasRequired = (viewValue && viewValue.length > 0 ? undefined : 'novalid');
                if ( scope.lgHasRequired )
                {
                    return false;
                }

                scope.lgHasEmail = (viewValue && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(viewValue)) ? undefined : 'novalid';
                if ( scope.lgHasEmail )
                {
                    return false;
                }

                $http({method: 'GET', url: '/users/user_exists?login=' + viewValue}).
			       success(function(data, status, headers, config) {
                        scope.lgAlredyExists = 'novalid';
					})
                   .error(function(data, status, headers, config) {
                        scope.lgAlredyExists = undefined;
				    });
                if ( scope.lgAlredyExists )
                {
                    return false;
                }

                scope.loginValidate = true;
            });
        }
    };
	})
	.directive('passwordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                scope.pwdValidLength = undefined;
                scope.pwdHasLetter = undefined;
                scope.pwdHasNumber = undefined;
                scope.passwdValidate = false;

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? undefined : 'novalid' );
                if ( scope.pwdValidLength )
                {
                    return false;
                }

                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? undefined : 'novalid';
                if ( scope.pwdHasLetter )
                {
                    return false;
                }

                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? undefined : 'novalid'
                if ( scope.pwdHasNumber )
                {
                    return false;
                }

                scope.passwdValidate = true;
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