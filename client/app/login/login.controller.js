(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'authFactory'];

    /* @ngInject */
    function LoginController($state, authFactory) {
        var vm = this;

        vm.login = login;
       
        
   

        ////////////////

        function login(email, password) {
            
        	authFactory
                .login(email, password)
                .then(function(response) {
                    console.log('world');
        			$state.go('splash');
        		})
                .catch(function(error) {
                    console.log('error');
        			alert(error.error_description);
        		});
        }

        

        
        
    }
})();
