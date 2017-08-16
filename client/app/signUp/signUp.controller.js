(function(){
    'use strict';

    angular
        .module('app.signUp')
        .controller('SignUpController', SignUpController)

    SignUpController.$inject = ['signUpFactory','authFactory'];

    function SignUpController(signUpFactory, authFactory) {
        /* jshint validthis:true */
        var vm = this;

        vm.register = register;

        function register(registration) {
            authFactory 
                .register(registration)
                .then(function(response) {
        			$state.go('pending');
        		})
                .catch(function(error) {
        			alert(error.error_description);
        		});
        }
    }

    
})();
