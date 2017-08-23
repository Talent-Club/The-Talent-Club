(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('loginFactory', loginFactory)

    loginFactory.$inject = ['$http'];

    function loginFactory($http) {
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
				.get('/api/login')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/login/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(login) {
			return $http
				.post('/api/login', login)
				.then(function (response) {
					return response.data;
				});
		}

		function update(login) {
			return $http
				.put('/api/login/' + login.id, login)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(login) {
			return $http
				.delete('/api/login/' + login.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
