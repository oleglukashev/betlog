'use strict';
/* Directives */
angular.module('betlog.services', [])
  .factory('Storage', [
  'filterFilter',
  '$http',
  '$rootScope',
  '$cookieStore',
  function( filterFilter, $http, $rootScope, $cookieStore ) {
    var sports = [];
    var countries = [];
    var championships = [];
    var events = [];
    var current_user = {};
    var coefficients = [];
    var managed_leagues = [];
    var bookmakers = [];

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

            $rootScope.$broadcast('reloadSports');
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

            $rootScope.$broadcast('reloadCountries');
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
            });

            $rootScope.$broadcast('reloadChampionships');

            Storage.initManagedLeagues();
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
            });

            $rootScope.$broadcast('reloadEvents');
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    Storage.initCurrentUser = function() {
      $http.get('/user_sessions/current_user')
        .success(function(data, status, headers, config) {
          if ( status === 200 ) {
            var user = {
              login: data.login,
              name: data.name
            }

            Storage.setCurrentUser(user);

            $rootScope.$broadcast('reloadCurrentUser');
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    Storage.initCoefficients = function() {
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
                coeff_second_total: coefficient.item.coeff_second_total,
                created_at: coefficient.item.created_at
              }

              coefficients.push( new_coefficients );
            });

            $rootScope.$broadcast('reloadCoefficients');
          }
        })
        .error(function(data, status, headers, config) {

        });
    }

    Storage.initBookmakers = function() {
      $http.get('/bookmakers.json')
        .success(function(data, status, headers, config) {
          if ( status === 200 && data.length ) {
            data.map(function(bookmaker, i) {
              var new_bookmaker = {
                id: bookmaker.id,
                name: bookmaker.name,
                rating: bookmaker.rating
              }

              bookmakers.push( new_bookmaker );
            });

            $rootScope.$broadcast('reloadBookmakers');
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

    Storage.getCoefficients = function() {
      return coefficients;
    }

    Storage.getCurrentUser = function() {
      return current_user;
    }

    Storage.getManagedLeagues = function() {
      return managed_leagues;
    }

    Storage.getBookmakers = function() {
      return bookmakers;
    }

    Storage.setCurrentUser = function(data) {
      current_user = data;
      $rootScope.$broadcast('reloadCurrentUser');
    }



    Storage.hasCurrentUser = function() {
      return ( current_user.login && current_user.name ) ? true : false;
    }

    Storage.signIn = function(data, success_callback) {
      
      $http({ method: 'POST', url: '/user_sessions', data: data }).
        success(function(data, status, headers, config) {
          if ( status === 200 ) {
            var user = {
              login: data.login,
              name: data.name
            }

            Storage.setCurrentUser( user );
            $rootScope.$broadcast('authorization_success');
          }
      }).
      error(function(data, status, headers, config) {
        $rootScope.$broadcast('authorization_error', data);
      });
    }

    Storage.signOut = function() {
      
      $http.delete('/user_sessions').
        success(function(data, status, headers, config) {
          if ( status === 200 && data.status === "ok") {
            var user = {};

            Storage.setCurrentUser( user );
            $rootScope.$broadcast('signout_success');
          }
      }).
      error(function(data, status, headers, config) {
      });
    }

    Storage.signUp = function(data) {
      $http.post('/users', data)
        .success(function(data, status, headers, config) {
          if ( status === 200 ) {
            var user = {
              login: data.user.login,
              name: data.user.name
            }

            Storage.setCurrentUser( user );
            $rootScope.$broadcast('signup_success');
          }
        })
        .error(function(data, status, headers, config) {
          
        });
    }

    Storage.initManagedLeagues = function() {
      var result = [];
      var championships_ids = $cookieStore.get('managedLeagues');

      if ( championships_ids && championships_ids.length ) {
        championships_ids.map(function(id) {
          var championship = filterFilter( championships, { id: id }, true )[0];

          if ( championship && result.indexOf( championship ) === -1 ) {
            result.push( championship );
          }
        });

        managed_leagues = result;
        $rootScope.$broadcast("reloadManagedLeagues");
      }
    }

    Storage.addChampionshipInToManagerLeagues = function(add_championship) {
      var championships_ids = $cookieStore.get('managedLeagues');

      if ( ! championships_ids ) {
        championships_ids = [];
      }
      
      if (championships_ids.indexOf(add_championship.id) === -1) {
        championships_ids.push(add_championship.id);
        managed_leagues.push(add_championship)
      }

      $rootScope.$broadcast("reloadManagedLeagues");
      $cookieStore.put('managedLeagues', championships_ids);
    }

    Storage.removeChampionshipFromManagerLeagues = function(championship) {
      var championships_ids = $cookieStore.get('managedLeagues');

      championships_ids.map(function(championships_id, key) {
        if ( championships_id === championship.id) {
          championships_ids.splice(key, 1);
        }
      });

      managed_leagues.map(function(managed_championship, key) {
        if ( managed_championship.id === championship.id) {
          managed_leagues.splice(key, 1);
        }
      });

      $rootScope.$broadcast("reloadManagedLeagues");
      $cookieStore.put('managedLeagues', championships_ids); 
    }

    Storage.initSports();
    Storage.initCountries();
    Storage.initChampionships();
    Storage.initEvents();
    Storage.initCoefficients();
    Storage.initCurrentUser();
    Storage.initBookmakers();

    return Storage;
}]);