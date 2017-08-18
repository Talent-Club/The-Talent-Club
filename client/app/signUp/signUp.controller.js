(function(){
    'use strict';

    angular
        .module('app.signUp')
        .controller('SignUpController', SignUpController)

    SignUpController.$inject = ['$stateParams', '$state', 'signUpFactory','authFactory'];

    function SignUpController($stateParams, $state, signUpFactory, authFactory) {
        /* jshint validthis:true */
        var vm = this;

        vm.register = register;
        
        function register(registration) {
            console.log('hello');
            authFactory 
                .register(registration)
                .then(function(response) {
                    console.log('world');
        			$state.go('pending');
        		})
                .catch(function(error) {
                    console.log('error');
        			alert(error.error_description);
        		});
        }
        
    }

})();
