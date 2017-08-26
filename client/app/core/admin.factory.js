(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('adminFactory', adminFactory)

    adminFactory.$inject = ['$http'];

    function adminFactory($http) {
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
                .get('/api/admin')
                .then(function (response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get('/api/admin/' + id)
                .then(function (response) {
                    return response.data;
                });
        }

        function create(member) {
            return $http
                .post('/api/admin', member)
                .then(function (response) {
                    return response.data;
                });
        }

        function update(member) {
            return $http
                .put('/api/admin/' + member.id, member)
                .then(function (response) {
                    return response.data;
                });
        }

        function remove(member) {
            return $http
                .delete('/api/admin/' + member.id)
                .then(function (response) {
                    return response.data;
                });
        };
    }
})();
