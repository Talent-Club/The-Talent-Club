(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('splashFactory', splashFactory)

    splashFactory.$inject = ['$http'];

    function splashFactory($http) {
        var service = {
			getAll: getAll,
			getById: getById,
			create: create,
			update: update,
			remove: remove
		};

		return service;

		function getAll() {
			return $http
				.get('/api/splash')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/splash/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(splash) {
			return $http
				.post('/api/splash', splash)
				.then(function (response) {
					return response.data;
				});
		}

		function update(splash) {
			return $http
				.put('/api/splash/' + splash.id, splash)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(splash) {
			return $http
				.delete('/api/splash/' + splash.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
