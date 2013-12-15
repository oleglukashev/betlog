'use strict';
/* Directives */
angular.module('betlog.services', [])
  .factory('Storage', [
  '$http',
  '$rootScope', 
  function( $http, $rootScope ) {
    var sports = [];
    var countries = [];
    var championships = [];
    var events = [];

    Storage.initSports = function() {
      $http.get('/sports.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(sport, i) {
              var new_sport = {
                id: sport.id,
                name: sport.name,
                isActive: false
              }

              sports.push( new_sport );
            });

            $rootScope.$broadcast('reloadSports', sports);
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    Storage.initCountries = function() {
      $http.get('/countries.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            var count_countries_by_sport_id = {};

            data.map(function(country, i) {
              var new_country = {
                id: country.id,
                name: country.name,
                sport_id: country.sport_id,
                isActive: false
              }

              countries.push( new_country );
            });

            $rootScope.$broadcast('reloadCountries', countries);
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    Storage.initChampionships = function() {
      $http.get('/championships.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length) {
            data.map(function(championship, i) {
              var new_championship = {
                id: championship.id,
                name: championship.name,
                country_id: championship.country_id,
                sport_id: championship.sport_id,
                isActive: false
              }

              championships.push( new_championship ); 

              $rootScope.$broadcast('reloadChampionships', championships);
            });
          }
        }).
        error(function(data, status, headers, config) {

        }); 
    }

    Storage.initEvents = function() {
      $http.get('/events.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(event, i) {
              var new_event = {
                id: event.id,
                championship_id: event.championship_id,
                opponent_1: event.opponent_1,
                opponent_2: event.opponent_2,
                date_event: event.date_event,
                isOpened: false
              }

              events.push( new_event );

              $rootScope.$broadcast('reloadEvents', events);
            });
          }
        })
        .error(function(data, status, headers, config) {

        });
    }


    Storage.getSports = function() {
      return sports;
    }

    Storage.getCountries = function() {
      return countries;
    }

    Storage.getChampionships = function() {
      return championships;
    }

    Storage.getEvents = function() {
      return events;
    }

    Storage.initSports();
    Storage.initCountries();
    Storage.initChampionships();
    Storage.initEvents();

    return Storage;
}]);