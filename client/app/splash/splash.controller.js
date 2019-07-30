(function(){
    'use strict';

    angular
        .module('app.splash')
        .controller('SplashController', SplashController)

    SplashController.$inject = ['$stateParams', '$state', 'splashFactory', 'authFactory'];

    function SplashController($stateParams, $state, splashFactory, authFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.logout = logout;

        activate();

        function activate() {}

        function logout(){
            authFactory
                .logout()
                    localStorage.clear()
                    $state.go('landing');
        }

        


    }
})();
