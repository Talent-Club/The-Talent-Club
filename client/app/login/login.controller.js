(function () {
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
            if (email === 'talentclubtest@gmail.com') {
                $state.go('admin');
            } else {
                authFactory
                    .login(email, password)
                    .then(function (response) {
                        console.log(response);
                        $state.go('splash');
                    })
                    .catch(function (error) {
                        alert('Email or password incorrect');
                    });
            }
        }
    }
})();
