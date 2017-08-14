(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['apiUrl', '$http', '$q', 'localStorageService'];

    /* @ngInject */
    function authFactory(apiUrl, $http, $q, localStorageService) {
        var service = {
            initialize: initialize,
            register: register,
            login: login,
            logout: logout
        };

        service.isAuth = false;
        service.email = '';

        return service;

        ////////////////

        function initialize() {
            var authData = localStorageService.get('auth');
            if(authData) {
                service.isAuth = false;
                service.email = '';
            }
        }

        function register(registration) {
            logout();

            return $http
                .post(apiUrl + 'users/register', registration)
                .then(function(response) {
                    return response.data;
                });
        }

        function login(email, password) {
            logout();
            
            return $http
                .post(apiUrl + 'users/login', { 
                    email: email, 
                    password: password 
                })
                .then(function({ data }) {
                    localStorageService.set('auth', {
                        token: data.token,
                        email: email
                    });

                    service.isAuth = true;
                    service.email = email;
                    
                    return data;
                })
                .catch(function(error) {
                    logout();
                    console.log(error);
                });
        }

        function logout() {
            localStorageService.remove('auth');

            service.isAuth = false;
            service.email = '';
        }
    }
})();
