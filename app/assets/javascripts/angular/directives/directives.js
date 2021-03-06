'use strict';
/* Directives */
angular.module('betlog.directives', [])
	.directive('fancyboxLogin', ['$rootScope', function( $rootScope ) {
		return {
			restrict: 'AC',
			link: function( scope, element ) {
				$rootScope.$broadcast('showAuthorization');
			}
		};
	}]).directive('nameValidate', ['$http', function( $http ) {
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
	}]).directive('loginValidate', ['$http', function( $http ) {
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
	.directive('passwordValidate', [function() {
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
			}
		};
	}])

	.directive('eatClick', [function() {
		return function(scope, element, attrs) {	
    		$(element).on('click', function(event) {
        		event.preventDefault();
    		});
		}	
	}])

	.directive('slideable', function () {
	    return {
	        restrict:'C',
	        compile: function (element, attr) {
	            // wrap tag
	            var contents = element.html();
	            element.html('<div class="slideable_content">' + contents + '</div>');

	            return function postLink(scope, element, attrs) {
	                // default properties
	                attrs.duration = (!attrs.duration) ? '0.3s' : attrs.duration;
	                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
	                element.css({
	                    'overflow': 'hidden',
	                    'height': '0px',
	                    'transitionProperty': 'height',
	                    'transitionDuration': attrs.duration,
	                    'transitionTimingFunction': attrs.easing
	                });
	            };
	        }
	    };
	})
	.directive('slideToggle', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var target = element.next().get(0);
	            attrs.expanded = false;
	            element.bind('click', function() {
	            	var content = target.querySelector('.slideable_content');

	  						if ( element.hasClass("hidden-leagues")) {
	  							element.removeClass("hidden-leagues");
	  							element.addClass("visibled-leagues");
	  						} else {
	  							element.removeClass("visibled-leagues");
	  							element.addClass("hidden-leagues");
	  						}
                
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
	            });
	        }
	    }
	})
	.directive('tabs', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var tab_titles = element.find("div.tab-title-item");
	            tab_titles.on('click', function() {

                element.find("div.tab-content").removeClass("active");
                element.find("div.tab-title-item").removeClass("active");

                $(this).addClass("active");

                var index = element.find("div.tab-title-item").index( $(this) )
 								jQuery(element.find("div.tab-content")[index]).addClass("active");
	            });
	            tab_titles[0].click();
	        }
	    }
	})
	.directive('eventGraph', function() {
	  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      	element.parent().on('mouseover', function() {
      		if ( ! element.find('div.highcharts-container').length ) {
      			element.highcharts({
			        title: {
			            text: 'История изменения коэффициента',
			            x: -20 //center
			        },
			        xAxis: {
			            categories: scope.$eval(attrs.dates)
			        },
			        yAxis: {
			            title: {
			                text: ''
			            },
			            plotLines: [{
			                value: 0,
			                width: 0.5,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: ''
			        },
			        legend: {
			            enabled: false
			        },
			        series: [{
			            name: attrs.paramName,
			            data: scope.$eval(attrs.coefficients)
			        }],
			        exporting: {
		            enabled: false
		        	}
		    		});
      		}
      	});
			}
		}
	})

	.directive('jcarousel', function () {
		    return {
		        restrict:'C',
		        compile: function (element, attr) {
	            return function postLink(scope, element, attrs) {
	            	(function($) {
								    $(function() {
								        $('.jcarousel').jcarousel({wrap: 'circular'});

								        $('.hot-matches-left')
								            .on('jcarouselcontrol:active', function() {
								                $(this).removeClass('inactive');
								            })
								            .on('jcarouselcontrol:inactive', function() {
								                $(this).addClass('inactive');
								            })
								            .jcarouselControl({
								                target: '-=1'
								            });

								        $('.hot-matches-right')
								            .on('jcarouselcontrol:active', function() {
								                $(this).removeClass('inactive');
								            })
								            .on('jcarouselcontrol:inactive', function() {
								                $(this).addClass('inactive');
								            })
								            .jcarouselControl({
								                target: '+=1'
								            });
								    });
								})(jQuery);
	            };
		        }
		    };
		});
