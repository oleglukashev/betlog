'use strict';


// Declare app level module which depends on filters, and services
var betlog = angular.module('betlog', [
  'ngRoute',
  'betlog.filters',
  'betlog.services',
  'betlog.directives',
  'betlog.controllers'
  ]);

var betlog_controllers = angular.module('betlog.controllers', [])

  betlog.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
