(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('signUpFactory', signUpFactory)

    signUpFactory.$inject = ['$http'];

    function signUpFactory($http) {
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
				.get('/api/signup')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/signup/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(signUp) {
			return $http
				.post('/api/signup', signUp)
				.then(function (response) {
					return response.data;
				});
		}

		function update(signUp) {
			return $http
				.put('/api/signup/' + signUp.id, signUp)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(signUp) {
			return $http
				.delete('/api/signup/' + signUp.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
