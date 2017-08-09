(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('pendingFactory', pendingFactory)

    pendingFactory.$inject = ['$http'];

    function pendingFactory($http) {
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
				.get('/api/pending')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/pending/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(pending) {
			return $http
				.post('/api/pending', pending)
				.then(function (response) {
					return response.data;
				});
		}

		function update(pending) {
			return $http
				.put('/api/pending/' + pending.id, pending)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(pending) {
			return $http
				.delete('/api/pending/' + pending.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
