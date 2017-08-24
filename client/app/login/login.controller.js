(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams', 'authFactory'];

    /* @ngInject */
    function LoginController($state, $stateParams, authFactory) {
        var vm = this;

        vm.login = login;
       
        
   

        ////////////////

        function login(email, password) {
            
        	authFactory
                .login(email, password)
                .then(function(response) {
                    console.log(response);
                    console.log('world');
        			$state.go('splash', {
                        id: $stateParams.id
                    });
        		})
                .catch(function(error) {
                    // console.log('error');
        			alert('Email or password incorrect');
        		});
        }

        

        
        
    }
})();
