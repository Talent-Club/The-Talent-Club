(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('landingFactory', landingFactory)

    landingFactory.$inject = ['$http'];

    function landingFactory($http) {
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
				.get('/api/landing')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/landing/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(landing) {
			return $http
				.post('/api/landing', landing)
				.then(function (response) {
					return response.data;
				});
		}

		function update(landing) {
			return $http
				.put('/api/landing/' + landing.id, landing)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(landing) {
			return $http
				.delete('/api/landing/' + landing.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
