(function(){
    'use strict';

    angular
        .module('app.signUp')
        .controller('SignUpController', SignUpController)

    SignUpController.$inject = ['signUpFactory'];

    function SignUpController(signUpFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
