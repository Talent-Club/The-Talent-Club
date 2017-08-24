(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('orderFactory', orderFactory)

    orderFactory.$inject = ['$http', 'apiUrl'];

    function orderFactory($http, apiUrl) {
        var service = {
            create: create
        };

        return service;

        function create(stripeToken) {
          return $http
            .post(apiUrl + 'stripe/' + stripeToken)
            .then(function(response) {
              return response.data;
            });
        }
    }
})();
