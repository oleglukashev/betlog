'use strict';


// Declare app level module which depends on filters, and services
var betlog = angular.module('betlog', [
  'ngRoute',
  'ngAnimate',
  'betlog.filters',
  'betlog.services',
  'betlog.directives',
  'betlog.controllers'
  ]);

var betlog_controllers = angular.module('betlog.controllers', [])

  betlog.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'favorites.html',
          controller: 'MainFavoriteEvents'
        }).
        when('/sport/:sportId/country/:countryId/championships', {
          templateUrl: 'championships_events.html',
          controller: 'EventsList'
        }).
        when('/sport/:sportId/country/:countryId/championship/:championshipId/events', {
          templateUrl: 'championships_events.html',
          controller: 'EventsList'
        })
    }])

    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);


function getRandom(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

