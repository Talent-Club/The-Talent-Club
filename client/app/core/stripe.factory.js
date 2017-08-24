(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('stripeFactory', stripeFactory)


    stripeFactory.$inject = ['$http', 'apiUrl'];

    function stripeFactory($http, apiUrl) {
 
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
