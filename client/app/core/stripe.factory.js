(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('stripeFactory', stripeFactory)

    stripeFactory.$inject = ['$http'];

    function stripeFactory($http) {
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
				.get('/api/stripe')
				.then(function (response) {
					return response.data;
				});
		}

		function getById(id) {
			return $http
				.get('/api/stripe/' + id)
				.then(function (response) {
					return response.data;
				});
		}

		function create(stripe) {
			return $http
				.post('/api/stripe', stripe)
				.then(function (response) {
					return response.data;
				});
		}

		function update(stripe) {
			return $http
				.put('/api/stripe/' + stripe.id, stripe)
				.then(function (response) {
					return response.data;
				});
		}

		function remove(stripe) {
			return $http
				.delete('/api/stripe/' + stripe.id)
				.then(function (response) {
					return response.data;
				});
		}

    }
})();
