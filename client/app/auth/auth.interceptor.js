(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$q', '$location', 'localStorageService'];

    /* @ngInject */
    function authInterceptorService($q, $location, localStorageService) {
        var service = {
            request: request,
            responseError: responseError
        };
        return service;

        ////////////////

        function request(httpRequest) {
        	httpRequest.headers = httpRequest.headers || {};

        	var authData = localStorageService.get('auth');

        	if(authData) {
        		httpRequest.headers.Authorization = 'JWT ' + authData.token;
        	}

        	return httpRequest;
        }

        function responseError(httpResponse) {
        	if(httpResponse.status === 401) {
        		$location.path('/login');
        	}
        	return $q.reject(httpResponse);
        }
    }
})();
