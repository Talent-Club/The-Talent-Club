(function () {
    'use strict';

    angular
        .module('app.signUp')
        .controller('SignUpController', SignUpController)

    SignUpController.$inject = ['$stateParams', '$state', 'signUpFactory', 'authFactory'];

    function SignUpController($stateParams, $state, signUpFactory, authFactory) {
        /* jshint validthis:true */
        var vm = this;

        vm.register = register;
        vm.registration = {
            isMember: false
        };

        function register(registration) {
            console.log(registration);
            authFactory
                .register(registration)

                .then(function (response) {
                    
                    $state.go('pending');
                })
                .catch(function (error) {
                   
                    alert(error.error_description);
                });
        }
        
    }

})();
